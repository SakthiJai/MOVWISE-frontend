/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // optional, helps static hosting
};

export default nextConfig;
