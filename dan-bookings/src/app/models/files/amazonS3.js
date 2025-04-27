import { amazonS3, getPublicUrlImg, s3BucketName } from "../../libs/amazon/amazonS3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand,GetObjectCommand,PutBucketPolicyCommand } from "@aws-sdk/client-s3";


export class s3Model{
    saveImg = async () => {
        try {
       
            const params = {
                Bucket: s3BucketName, 
                Key: "test.txt",   
                Body: "test", 
                ContentType: "text/plain" ,    
              };
            const command = new PutObjectCommand(params)
            const res = await amazonS3.send(command);

            const url = getPublicUrlImg("apache.txt")
           
            return url;
        } catch (error) {
            console.error(error.message);
            throw new Error("amazon service fail")
        }
    };
}