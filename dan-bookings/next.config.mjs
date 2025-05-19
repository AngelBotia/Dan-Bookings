/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [`${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com`],
    },
  };

export default nextConfig;
