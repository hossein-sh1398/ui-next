/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,// دوبار لاگ نگیره
    images: {// تنظیماt کامپوننت image
        remotePatterns: [
            {
                protocol: `${process.env.API_PROTOCOL}`,
                hostname: `${process.env.API_HOSTNAME}`
            }
        ]
    }
};

export default nextConfig;
