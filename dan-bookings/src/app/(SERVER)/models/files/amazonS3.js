import { amazonS3, getPublicUrlImg, s3BucketName } from "../../libs/amazon/amazonS3";
import { PutObjectCommand,DeleteObjectCommand,CopyObjectCommand } from "@aws-sdk/client-s3";


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
    deleteImg = (Key) => {
        return new Promise(async (resolve, reject) => {
            try {
                const params = {
                    Bucket: s3BucketName,
                    Key
                };
                const command = new DeleteObjectCommand(params);
                const res = await amazonS3.send(command);
                if (res.$metadata.httpStatusCode !== 204) return reject(null);

                resolve(true);
            } catch (error) {
                reject(null);
            }
        });
    };

    
    updateImg = (oldKey,newKey) => {
          return new Promise(async (resolve, reject) => {
            try {
                const copyRes = await amazonS3.send(new CopyObjectCommand({
                    Bucket: s3BucketName,
                    CopySource: `${s3BucketName}/${oldKey}`,
                    Key: newKey,
                }));

                const delRes = await amazonS3.send(new DeleteObjectCommand({
                    Bucket: s3BucketName,
                    Key: oldKey,
                }));

                if (delRes.$metadata.httpStatusCode !== 204 && copyRes.$metadata.httpStatusCode !== 200 ) return reject(null);

                resolve(true);
            } catch (error) {
                console.error(error)
                reject(null);
            }
        });
    };
    getKey = (url) =>{
        return decodeURIComponent(url.split('.amazonaws.com/')[1]);
    }

    
}