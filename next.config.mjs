// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'images.pexels.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig;