/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'external-content.duckduckgo.com',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com'
      },
      {
        protocol: 'https',
        hostname: 'igtnbgdhxezmzgvxesbi.supabase.co'
      },
      {
        protocol: 'https',
        hostname: 'i.gr-assets.com'
      }
    ],
  },
};

export default nextConfig;
