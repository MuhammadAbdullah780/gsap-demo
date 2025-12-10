import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/showcase",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/showcase",
        permanent: true,
      },
      {
        source: "/bonbon",
        destination: "/showcase",
        permanent: true,
      },
      {
        source: "/demo",
        destination: "/showcase",
        permanent: true,
      },
      {
        source: "/home",
        destination: "/showcase",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
