/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static HTML export -> ./out (served by nginx on the VPS)
  images: { unoptimized: true }, // static export has no on-demand image optimizer
  trailingSlash: true, // emit /lead-captruring-form/index.html so clean URLs resolve on nginx
};
export default nextConfig;
