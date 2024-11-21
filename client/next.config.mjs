/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Dodaj localhost do domen
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
  
  export default nextConfig;