/** @type {import('next').NextConfig} */
const nextConfig = {
  // All images are served locally from /public/images — no remote hosts needed.
  // Photos are already web-sized, so skip Vercel Image Optimization (its quota
  // ran out and uncached /_next/image requests returned 402).
  images: { unoptimized: true },
};

export default nextConfig;
