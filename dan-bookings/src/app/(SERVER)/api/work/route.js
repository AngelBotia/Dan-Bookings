import { workController } from "../../controllers/WorkController";
import { NextResponse } from "next/server";
import { hasPermission } from "../../libs/nextAuth"; 
import { saveImgsInCloud } from '../../utils/filesHelper'
import { fileController } from "../../controllers/FilesController";
import { mediaController } from "../../controllers/MediaController";
export async function GET(request) {
    try {
        const { searchParams } = request.nextUrl;
        const limit = Number(searchParams.get('limit'));
        const page = Number(searchParams.get('page'));
        const ID_WORK = searchParams.get('id');
        const isAdmin = await hasPermission(request);
        let params = { isAdmin, ID_WORK, limit, page, };
        let allWorks = await workController.getAllWorks(params);
        //GET IMG
        allWorks = await Promise.all(
            allWorks.map(async (work) => {
                const IMAGE_URL = await mediaController.getMedias(work.ID_WORK) || [];
                return {
                    ...work,
                    IMAGE_URL
                };
            })
        );

        return NextResponse.json(allWorks,{ status:200 });
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong";
        return NextResponse.json({error: errorMessage },{ status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        if (!hasPermission(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 
        const body = await request.formData();
        const work = JSON.parse(body.get('work'));
        const { WO_NAME, IMAGE_URL } = work || {};
        const files = IMAGE_URL || [];
        const URL = WO_NAME?.trim().replaceAll(" ","-") || null;
        
        if(!files?.length || !WO_NAME)  return NextResponse.json({ error: "Bad request" }, { status: 400 });

        const urlsImg = await saveImgsInCloud(files,'WORKS',URL);

        const workToSave = {
            WO_NAME,
            URL
        }
        let newWork = await workController.createWork(workToSave);
        newWork.detail = await workController.createDetailWork(newWork) || {};
        newWork.IMAGE_URL = await mediaController.createMedias(newWork?.ID_WORK,urlsImg,"WORK") 
    
        return NextResponse.json(newWork,{status:200})
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
    
}
export async function PUT(request,{ params }) {
    try {
        if (!hasPermission(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const body = await request.formData();
        const newWork = JSON.parse(body.get('newWork')) || {};
        const { detail,ID_WORK,IMAGE_URL ,WO_NAME} = newWork || {};
        const categoryImgs = "WORKS"

        if(!ID_WORK || !WO_NAME)  return NextResponse.json({ error: "Bad request" }, { status: 400 });

        const URL = WO_NAME?.trim().replaceAll(" ","-") || null

        const allMedias = await mediaController.getMedias(ID_WORK,categoryImgs)      
        const mediasToDelete = allMedias.filter(media => !IMAGE_URL.find(newMedia => newMedia.URL_MEDIA == media.URL_MEDIA)) || [];
        const statusDelete = await Promise.all(mediasToDelete.map( async media => {
                                                try {
                                                        const { URL_MEDIA } = media || {};
                                                        const key = fileController.getKey(URL_MEDIA);
                                                        const resCloud = await fileController.deleteImg(key);
                                                        const resDB = await mediaController.deleteMedia(URL_MEDIA); 
                                                        return resCloud && resDB;
                                                    } catch (error) {
                                                        return false;
                                                    }
                                                }));
        
        const newMediasToSave = IMAGE_URL.filter(newMedia => newMedia.img) || [];
        const urlsImg = await saveImgsInCloud(newMediasToSave,categoryImgs,URL);
        const newMedias = await mediaController.createMedias(ID_WORK,urlsImg,categoryImgs) || [];
        
        const restOfMedias = allMedias.filter(media => IMAGE_URL.find(newMedia => newMedia.URL_MEDIA == media.URL_MEDIA)) || []
       

        const workToSave = {
            ...newWork,
            URL
        }
        const detailToSave = {
            WO_URL:URL
        }
        let updateWork = await workController.updateWork(workToSave);
        updateWork.IMAGE_URL = [...newMedias,...restOfMedias]

        if(!updateWork) return NextResponse.json({error:"Dont found this work"},{status:404})

        return NextResponse.json(updateWork,{status:200})
    } catch (error) {
        console.error(error);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
export async function DELETE(request,{ params }) {
    try {
        if (!hasPermission(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.formData();
        const ID_WORK = JSON.parse(body.get('ID'));
        const URL = JSON.parse(body.get('URL'));
        
        const allUrlsMedias = await mediaController.getMedias(ID_WORK);
        //DELETE MEDIA IMGS
        const mediasDelete = await Promise.all(allUrlsMedias.map( media => {
            const { URL_MEDIA } = media || {};
            const key = fileController.getKey(URL_MEDIA);
            if(!key) return false;
            return fileController.deleteImg(key); 
        }))

        const deleteMedias = await mediaController.deleteMedia(ID_WORK)
        const deleteWork = await workController.deleteWork({ID_WORK});

        const statusResponse = {
            ID_WORK,
            work: !!deleteWork ,
            media:!!deleteMedias,
            cloudMedia: !!mediasDelete.every(item => item)
        }
        return NextResponse.json(statusResponse,{status:200})
    } catch (error) {
        console.error(error)
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

