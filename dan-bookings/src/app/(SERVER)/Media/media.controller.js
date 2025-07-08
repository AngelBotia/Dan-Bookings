import { MediaModelMYSQL } from "./media.mysql.model";

class MediaController {
    mediaController;
    
    constructor(modelMedia){
        this.mediaController = modelMedia;
    }

    getMedias = (params) =>{
        try {
            return this.mediaController.getMedias(params);
        } catch (error) {
            console.error("[MEDIA-CONTROLLER] -",error)
            throw error;
        }
        
    }
    createMedias = (ID,urls,category,type) =>{
        try {
            return this.mediaController.createMedias(ID,urls,category,type);
        } catch (error) {
            console.error("[MEDIA-CONTROLLER] -",error)
            throw error;
        }
        
    }
    updateMedia = (media) =>{
        try {
            return this.mediaController.updateMedia(media);
        } catch (error) {
            console.error("[MEDIA-CONTROLLER] -",error)
            throw error;
        }
    }
    deleteMedia = (ID) => {
        try {
            return this.mediaController.deleteMedia(ID);
        } catch (error) {
            console.error("[MEDIA-CONTROLLER] -",error)
            throw error;
        }
    }


}

const model = new MediaModelMYSQL();

export const mediaController = new MediaController(model)