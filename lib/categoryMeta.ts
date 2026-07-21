// Extra, human-friendly keywords per category so search matches the words
// people actually type, in several languages. Kept separate from the
// auto-generated data.ts so it is never overwritten.

// A different image per category for the Services ("What I shoot") page,
// so it doesn't repeat the home-page covers.
export const servicesImage: Record<string, string> = {
  "concert-events": "/images/concert-events/001.jpg",
  creative: "/images/creative/006.jpg",
  fashion: "/images/fashion/002.jpg",
  portrait: "/images/portrait/001.jpg",
  "wedding-events": "/images/wedding-events/005.jpg",
  "cover-shoot": "/images/cover-shoot/001.jpg",
};

export const categoryKeywords: Record<string, string[]> = {
  "concert-events": [
    "concert",
    "concerts",
    "konzert",
    "konzerte",
    "concerti",
    "live",
    "music",
    "musik",
    "stage",
    "tour",
    "festival",
    "event",
    "events",
    "rolling loud",
  ],
  creative: [
    "creative",
    "kreativ",
    "créatif",
    "creativo",
    "art",
    "kunst",
    "conceptual",
    "experimental",
  ],
  fashion: [
    "fashion",
    "mode",
    "moda",
    "editorial",
    "style",
    "model",
    "clothing",
    "runway",
  ],
  portrait: [
    "portrait",
    "porträt",
    "ritratto",
    "people",
    "headshot",
    "face",
    "studio",
  ],
  "wedding-events": [
    "wedding",
    "hochzeit",
    "mariage",
    "matrimonio",
    "bride",
    "groom",
    "celebration",
    "events",
  ],
  "cover-shoot": ["cover", "magazine", "editorial", "cover shoot", "titelseite"],
};
