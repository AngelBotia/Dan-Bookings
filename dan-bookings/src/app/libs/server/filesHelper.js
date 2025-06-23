const sharp = require('sharp');

import { fileController } from "../../controllers/FilesController";

export const saveImgsInCloud = (files = [],title="GENERIC",ID="NoID") => {
    return Promise.all(files?.map(async (file, i) => {
        let { type, img } = file || {};
        
        try {
            const imgBase64 =Buffer.from(img, 'base64')

            const imgOptimized = await sharp(imgBase64)
            .resize({ width: 1600 }) 
            .webp({ quality: 90 })  
            .toBuffer();
            const imgToSave = {
                name: `${title}-${ID}-${i}-${generateShortID()}`,
                file: imgOptimized,
                ContentType: type
            }
            return fileController.saveImg(imgToSave);   
        } catch (error) {
            console.error(error)
            return []
        }
    })) || [];
}
export function generateShortID() {
    return Date.now().toString(36).slice(-4);
}