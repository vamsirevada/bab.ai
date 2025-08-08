/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  env: {
    DB_URL: process.env.DB_URL,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },
}
export default nextConfig
