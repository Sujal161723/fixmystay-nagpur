import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  /* config options here */
};

export default nextConfig;
=======
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
>>>>>>> 24274fa8898d80e7b1111d181bed3310353f577e
