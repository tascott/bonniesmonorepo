import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hyaqdoicuhlzopmxscoc.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/images/blog-covers/**', // More specific path for blog cover images
      },
    ],
  },
};

export default nextConfig;
