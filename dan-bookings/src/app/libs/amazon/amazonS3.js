import { S3Client } from "@aws-sdk/client-s3";
export const amazonS3 = new S3Client({
    credentials:{
        accessKeyId:process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY_ACCESS,
    },
    region: process.env.BUCKET_REGION
})
export const s3BucketName = process.env.BUCKET_NAME;


/**
 * @param {string} key - ID photo.
 * @return {string} Public URL to photo
 */
export function getPublicUrlImg(key) {
    return `https://${s3BucketName}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${key}`;
  }