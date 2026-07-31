// Instagram reels / videos to feature on the Videos page.
// Paste full links here, e.g. "https://www.instagram.com/reel/ABC123xyz/".
// The first one is shown large as the featured showreel; the rest form a grid.
export const reels: string[] = [
  "https://www.instagram.com/reel/DSFJTbJjOBe/",
  "https://www.instagram.com/reel/DTfRDp2jTDK/",
  "https://www.instagram.com/reel/C9CXPsdADMK/",
  "https://www.instagram.com/reel/DXMDus6jKDV/",
  "https://www.instagram.com/reel/DV1KAcZlSrm/",
  "https://www.instagram.com/reel/DVYSdZdAsxn/",
  "https://www.instagram.com/reel/DH6Oq-vCmpq/",
  "https://www.instagram.com/reel/DOQhEClDX7W/",
  "https://www.instagram.com/reel/DGyMPQGAm5H/",
  "https://www.instagram.com/reel/DDHxZ7yAdHc/",
  "https://www.instagram.com/reel/C3NGqWBgk15/",
];

/** Turn a reel/post URL into its Instagram iframe-embed URL. */
export function toEmbed(url: string): string {
  const clean = url.split("?")[0].replace(/\/+$/, "");
  return `${clean}/embed`;
}
