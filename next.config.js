/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["cdn2.thecatapi.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
        pathname: "**",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
