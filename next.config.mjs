/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
		env: {
				DB_URL: process.env.DB_URL,
		}
}
export default nextConfig
