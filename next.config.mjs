/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "60mb"
    }
  },
  images: {
    remotePatterns: [new URL("https://cdn.sovietprojects.hu/**")]
  }
};

export default nextConfig;
