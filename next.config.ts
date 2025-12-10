import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path((?!showcase).*)",
        destination: "/showcase",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
