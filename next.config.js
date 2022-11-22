/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {nextConfig, resolve: {
  extensions: [".ts", ".tsx", ".js"],
  images: {
    domains: ['workcom2.s3.amazonaws.com'],
  },
//   alias = {
//     ...config.resolve.alias, // <<< ADD THIS LINE to extend the old one
//     "@components": path.join(__dirname, "src/components"),
//     "@images": path.join(__dirname, "public/images"),
// }
} }
