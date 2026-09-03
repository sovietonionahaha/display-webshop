/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.1.213'],
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
