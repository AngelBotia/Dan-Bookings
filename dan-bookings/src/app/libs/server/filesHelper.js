import { fileController } from "../../controllers/FilesController";

export const saveImgsInCloud = (files = [],title="GENERIC",ID="NoID") => {
    return Promise.all(files?.map((file, i) => {
        let { type, img } = file || {};
        const randomID = generateShortID();
        const imgToSave = {
            name: `${title}-${ID}-${i}-${randomID}`,
            file: Buffer.from(img, 'base64'),
            ContentType: type
        }
        return fileController.saveImg(imgToSave);
    })) || [];
}
export function generateShortID() {
    return Date.now().toString(36).slice(-4);
}