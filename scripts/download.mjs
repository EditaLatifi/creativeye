import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMG_ROOT = path.join(ROOT, "public", "images");
const images = JSON.parse(fs.readFileSync("scripts/images.json", "utf8"));

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

// coverPath overrides let us point a category at one of its own gallery
// images (chosen for being representative) instead of a separate crop.
const CATS = [
  { slug: "concerts", title: "CONCERTS", nav: "CONCERTS", cover: null, coverPath: "/images/concerts/003.jpg" },
  { slug: "celebrities", title: "CELEBRITIES", nav: "CELEBRITIES", cover: null, coverPath: "/images/celebrities/014.jpg" },
  { slug: "creative", title: "CREATIVE", nav: "CREATIVE", cover: "58734f_bf181550435d460c8f39195d274f9b55~mv2.jpg", coverPath: "/images/creative/008.jpg" },
  { slug: "fashion", title: "FASHION", nav: "FASHION", cover: "58734f_e165b1b0499d4865bf116e0d0f89575e~mv2.png", coverPath: "/images/fashion/001.jpg" },
  { slug: "portrait", title: "PORTRAIT", nav: "PORTRAIT", cover: "58734f_9d159e580f2a4e4c9caaef111fb6583c~mv2.jpg", coverPath: "/images/covers/portrait.jpg" },
  { slug: "weddings", title: "WEDDINGS", nav: "WEDDINGS", cover: null, coverPath: "/images/weddings/008.jpg" },
  { slug: "events", title: "EVENTS", nav: "EVENTS", cover: null, coverPath: "/images/events/006.jpg" },
  { slug: "cover-shoot", title: "COVER SHOOT", nav: "COVER SHOOT", cover: "58734f_40da0c7d115a4bcdb1c442d7ee617480~mv2.jpg", coverPath: "/images/covers/cover-shoot.jpg" },
];

const SPECIAL = [
  { id: "58734f_ea0651d0845d47e39ec3b30e17b496f4~mv2.jpg", out: "about/portrait.jpg", w: 900, h: 1125 },
  { id: "58734f_d9fa04d816ff4d81aa144a2a9676aa15~mv2.jpg", out: "contact/portrait.jpg", w: 900, h: 1125 },
  { id: "58734f_6e9cd0ca2c4e4e8984a997b4727dfeec~mv2.png", out: "videos/hero.jpg", w: 1600, h: 900 },
];

// fit -> preserve native aspect ratio (max side <= size)
function fitUrl(id, size) {
  return `https://static.wixstatic.com/media/${id}/v1/fit/w_${size},h_${size},q_85/${id}`;
}
function fillUrl(id, w, h) {
  return `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},q_85/${id}`;
}

async function fetchBuf(u, tries = 4) {
  for (let t = 0; t < tries; t++) {
    try {
      const r = await fetch(u, {
        headers: { "User-Agent": UA, Referer: "https://clientw558.wixsite.com/" },
      });
      if (r.ok) return Buffer.from(await r.arrayBuffer());
    } catch {}
    await new Promise((r) => setTimeout(r, 500 * (t + 1)));
  }
  throw new Error("failed " + u);
}

async function pool(items, worker, size = 8) {
  const q = [...items.entries()];
  let done = 0;
  async function run() {
    while (q.length) {
      const [i, item] = q.shift();
      await worker(item, i);
      done++;
      if (done % 25 === 0) console.log(`  ...${done}/${items.length}`);
    }
  }
  await Promise.all(Array.from({ length: size }, run));
}

async function blurDataUri(buf) {
  const b = await sharp(buf)
    .resize(20, 20, { fit: "inside" })
    .jpeg({ quality: 45 })
    .toBuffer();
  return `data:image/jpeg;base64,${b.toString("base64")}`;
}

const data = {}; // slug -> [{src,w,h,blur}]

for (const cat of CATS) {
  const ids = images[cat.slug] || [];
  const dir = path.join(IMG_ROOT, cat.slug);
  fs.mkdirSync(dir, { recursive: true });
  data[cat.slug] = new Array(ids.length);
  console.log(`Downloading ${cat.slug} (${ids.length})`);
  await pool(ids, async (id, i) => {
    const buf = await fetchBuf(fitUrl(id, 1600));
    const name = String(i + 1).padStart(3, "0") + ".jpg";
    fs.writeFileSync(path.join(dir, name), buf);
    const meta = await sharp(buf).metadata();
    const blur = await blurDataUri(buf);
    data[cat.slug][i] = {
      src: `/images/${cat.slug}/${name}`,
      w: meta.width || 1600,
      h: meta.height || 1600,
      blur,
    };
  });

  // cover (square crop, used in category tiles) - skip when coverPath points
  // at a gallery image (cover === null)
  if (cat.cover) {
    const cdir = path.join(IMG_ROOT, "covers");
    fs.mkdirSync(cdir, { recursive: true });
    const cbuf = await fetchBuf(fillUrl(cat.cover, 900, 900));
    fs.writeFileSync(path.join(cdir, cat.slug + ".jpg"), cbuf);
  }
}

console.log("Downloading portraits / hero...");
for (const s of SPECIAL) {
  const out = path.join(IMG_ROOT, s.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const buf = await fetchBuf(fillUrl(s.id, s.w, s.h));
  fs.writeFileSync(out, buf);
}

// ---- generate lib/data.ts ----
const esc = (s) => s.replace(/"/g, '\\"');
let ts = `// Site content scraped from the original CREATIVEYE Wix site.
// All images are stored locally in /public/images, so the site no longer
// depends on Wix. Re-run scripts/scrape.mjs + scripts/download.mjs to refresh.
// Gallery images keep their native aspect ratio (w/h) for masonry layouts,
// and ship a tiny base64 blur placeholder.

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
console.log(`Done. ${total} gallery images (native ratio + blur). data.ts written.`);
