import { amazonS3, getPublicUrlImg, s3BucketName } from "../../libs/amazon/amazonS3";
import { PutObjectCommand,GetObjectCommand,PutBucketPolicyCommand } from "@aws-sdk/client-s3";


export class s3Model{
    saveImg = ({ name, file, ContentType }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const params = {
                    Bucket: s3BucketName,
                    Key: name,
                    Body: file,
                    ContentType,
                };
                const command = new PutObjectCommand(params);
                const res = await amazonS3.send(command);
    
                if (res.$metadata.httpStatusCode !== 200) return reject(null);
    
                const url = getPublicUrlImg(name);
                resolve(url);
            } catch (error) {
                console.error(error.message);
                reject(new Error("amazon service fail"));
            }
        });
    };
    
}