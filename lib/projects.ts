// Selected project case studies. Client names come from the artist's own
// "Selected Work" list. Images are drawn from his galleries; swap any for the
// real project photography when available. Copy (role/blurb) lives in i18n.
export type Project = {
  slug: string;
  client: string;
  image: string;
};

export const projects: Project[] = [
  { slug: "rolling-loud", client: "Rolling Loud", image: "/images/concerts/003.jpg" },
  { slug: "kanye-west", client: "Kanye West", image: "/images/fashion/003.jpg" },
  { slug: "nike", client: "Nike", image: "/images/creative/019.jpg" },
  { slug: "mercedes-benz", client: "Mercedes-Benz", image: "/images/creative/003.jpg" },
  { slug: "paco-rabanne", client: "Paco Rabanne", image: "/images/creative/007.jpg" },
  { slug: "mcm", client: "MCM", image: "/images/fashion/005.jpg" },
  { slug: "swatch", client: "Swatch", image: "/images/weddings/002.jpg" },
  { slug: "urban-outfitters", client: "Urban Outfitters", image: "/images/fashion/010.jpg" },
  { slug: "logitech", client: "Logitech", image: "/images/concerts/002.jpg" },
];
