// Ingest locally-provided photos (SwissTransfer folders) into the gallery.
//
// Unlike download.mjs (which pulls the original Wix set), this script treats
// the /public/images/<category> folders as the source of truth: it appends
// new photos (resized to native ratio + EXIF-rotated) with continued
// numbering, records what it ingested in scripts/local-manifest.json so
// re-runs never duplicate, and then rebuilds lib/data.ts by SCANNING the
// folders — so both the original Wix images and every locally-added photo
// are included. Nothing existing is removed.
//
// To add more later: drop files in a source folder, add a SOURCES entry (or
// reuse one), and run `node scripts/local.mjs`.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMG_ROOT = path.join(ROOT, "public", "images");
const DL = "C:/Users/edita/Downloads";
const MANIFEST = path.join(__dirname, "local-manifest.json");

// Category metadata (must match the generated data.ts / download.mjs).
const CATS = [
  { slug: "concerts", title: "CONCERTS", nav: "CONCERTS", coverPath: "/images/concerts/003.jpg" },
  { slug: "celebrities", title: "CELEBRITIES", nav: "CELEBRITIES", coverPath: "/images/celebrities/014.jpg" },
  { slug: "creative", title: "CREATIVE", nav: "CREATIVE", coverPath: "/images/creative/008.jpg" },
  { slug: "fashion", title: "FASHION", nav: "FASHION", coverPath: "/images/fashion/001.jpg" },
  { slug: "portrait", title: "PORTRAIT", nav: "PORTRAIT", coverPath: "/images/covers/portrait.jpg" },
  { slug: "weddings", title: "WEDDINGS", nav: "WEDDINGS", coverPath: "/images/weddings/008.jpg" },
  { slug: "events", title: "EVENTS", nav: "EVENTS", coverPath: "/images/events/006.jpg" },
  { slug: "cover-shoot", title: "COVER SHOOT", nav: "COVER SHOOT", coverPath: "/images/covers/cover-shoot.jpg" },
];

// Local photo drops → target category. (Logos folder intentionally excluded.)
const SOURCES = [
  { folder: "swisstransfer_5a247a1a-9ed8-4546-b8fa-6f79506733cd", cat: "celebrities" }, // Cannes / Paris FW
  { folder: "swisstransfer_a49f41c1-91db-4e8f-be67-3e648309e893", cat: "concerts" },    // Burna Boy / Nissi / JA
  { folder: "swisstransfer_7edcdd46-de48-4cad-ae37-8f6296ec1c8d", cat: "events" },       // Afro Carnival
  { folder: "swisstransfer_f086c9bc-ba47-4d60-93c5-4c0c972f564b", cat: "creative" },     // RedBull / Porsche
  { folder: "swisstransfer_dd0d9553-e3dc-44a0-a019-90fadc088903", cat: "weddings" },     // 3 weddings (skips .mp4)
];

const isImg = (f) => /\.(jpe?g|png)$/i.test(f);
const isGalleryFile = (f) => /^\d+\.jpg$/i.test(f);
const nat = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

async function blurDataUri(buf) {
  const b = await sharp(buf).resize(20, 20, { fit: "inside" }).jpeg({ quality: 45 }).toBuffer();
  return `data:image/jpeg;base64,${b.toString("base64")}`;
}

function loadManifest() {
  try { return JSON.parse(fs.readFileSync(MANIFEST, "utf8")); } catch { return {}; }
}

// ---- 1. Ingest local sources (append, skip already-ingested) ----
const manifest = loadManifest();
let added = 0;

for (const { folder, cat } of SOURCES) {
  const srcDir = path.join(DL, folder);
  if (!fs.existsSync(srcDir)) { console.warn(`! missing source ${folder}`); continue; }
  const dstDir = path.join(IMG_ROOT, cat);
  fs.mkdirSync(dstDir, { recursive: true });

  manifest[cat] = manifest[cat] || [];
  const done = new Set(manifest[cat]);

  // next number = current max gallery file + 1
  let maxN = 0;
  for (const f of fs.readdirSync(dstDir)) {
    const m = f.match(/^(\d+)\.jpg$/i);
    if (m) maxN = Math.max(maxN, parseInt(m[1], 10));
  }

  const srcFiles = fs.readdirSync(srcDir).filter(isImg).sort(nat);
  const key = (f) => `${folder}/${f}`;
  const todo = srcFiles.filter((f) => !done.has(key(f)));
  if (!todo.length) { console.log(`= ${cat}: nothing new from ${folder}`); continue; }

  console.log(`+ ${cat}: ingesting ${todo.length} from ${folder} (start ${maxN + 1})`);
  for (const f of todo) {
    const buf = await sharp(path.join(srcDir, f))
      .rotate() // honour EXIF orientation
      .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true })
      .toBuffer();
    maxN += 1;
    const name = String(maxN).padStart(3, "0") + ".jpg";
    fs.writeFileSync(path.join(dstDir, name), buf);
    manifest[cat].push(key(f));
    added += 1;
  }
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`Ingested ${added} new photo(s).`);

// ---- 2. Rebuild lib/data.ts by scanning every category folder ----
const data = {};
for (const cat of CATS) {
  const dir = path.join(IMG_ROOT, cat.slug);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(isGalleryFile).sort(nat) : [];
  data[cat.slug] = [];
  for (const name of files) {
    const buf = fs.readFileSync(path.join(dir, name));
    const meta = await sharp(buf).metadata();
    const blur = await blurDataUri(buf);
    data[cat.slug].push({
      src: `/images/${cat.slug}/${name}`,
      w: meta.width || 1600,
      h: meta.height || 1600,
      blur,
    });
  }
  console.log(`  ${cat.slug}: ${data[cat.slug].length}`);
}

const esc = (s) => s.replace(/"/g, '\\"');
let ts = `// Site content for CREATIVEYE. Gallery images live in /public/images and
// are generated by scripts/local.mjs (scans the folders — original Wix import
// plus locally-added photos). Native aspect ratio (w/h) for masonry + a tiny
// base64 blur placeholder. Re-run: node scripts/local.mjs

export const site = {
  name: "CREATIVEYE",
  owner: "Massiah Zavahir",
  email: "massiah.zavahir@outlook.com",
  phone: "+41 76 327 31 44",
  instagram: "https://www.instagram.com/massiahzavahir/",
  instagramHandle: "@massiahzavahir",
  location: "Basel, Switzerland",
};

export type GalleryImage = {
  src: string;
  w: number;
  h: number;
  blur: string;
};

export type Category = {
  slug: string;
  title: string;
  nav: string;
  cover: string;
  images: GalleryImage[];
};

export const categories: Category[] = [
`;
for (const cat of CATS) {
  ts += `  {\n    slug: "${cat.slug}",\n    title: "${esc(cat.title)}",\n    nav: "${esc(cat.nav)}",\n    cover: "${cat.coverPath}",\n    images: [\n`;
  for (const im of data[cat.slug]) {
    ts += `      { src: "${im.src}", w: ${im.w}, h: ${im.h}, blur: "${im.blur}" },\n`;
  }
  ts += `    ],\n  },\n`;
}
ts += `];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
`;
fs.writeFileSync(path.join(ROOT, "lib", "data.ts"), ts);
const total = Object.values(data).reduce((a, b) => a + b.length, 0);
console.log(`Done. ${total} gallery images. data.ts written.`);
