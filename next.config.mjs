/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Prototype ships no remote images; add allowed domains here once
    // real photography/screenshots are introduced.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
