import { workController } from "../../controllers/WorkController";
import { NextResponse } from "next/server";
import { hasPermission } from "../../libs/nextAuth"; 
import { saveImgsInCloud } from '../../libs/server/filesHelper'
import { fileController } from "../../controllers/FilesController";
export async function GET(request) {
    try {
        const { searchParams } = request.nextUrl;
        const limit = Number(searchParams.get('limit'));
        const page = Number(searchParams.get('page'));
        const ID_WORK = searchParams.get('id');
        let params ={ limit , page,ID_WORK };
        const allWorks = await workController.getAllWorks(params);
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

        const urlsImg = await saveImgsInCloud(files,'MAIN',URL,true);

        const workToSave = {
            WO_NAME,
            URL,
            IMAGE_URL: urlsImg[0] || null,
        }
        let newWork = await workController.createWork(workToSave);
        newWork.detail = await workController.createDetailWork(newWork) || {};
    
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
        const { detail,ID_WORK } = newWork || {};
        const files = newWork.IMAGE_URL || [];

        if(!newWork.ID_WORK || !newWork.WO_NAME)  return NextResponse.json({ error: "Bad request" }, { status: 400 });

        const { WO_NAME } = newWork;
        const URL = WO_NAME?.trim().replaceAll(" ","-") || null

        const oldWork = await workController.getAllWorks({ID_WORK});
        if(oldWork[0].WO_NAME != WO_NAME){
            const oldKey = `MAIN-${oldWork[0].URL}`
            const newKey = `MAIN-${URL}`
            await fileController.updateImg(oldKey,newKey)
        }

        
        const urlsImg = await saveImgsInCloud(files,'MAIN',URL,true);
        const IMAGE_URL = urlsImg[0] || null;

        const workToSave = {
            ...newWork,
            URL,
            IMAGE_URL
        }

        const MAIN_IMG_URL = IMAGE_URL || null;
        const WO_URL = URL || null;
        const detailToSave = {
            MAIN_IMG_URL,
            WO_URL
        }
        const updateWork = await workController.updateWork(workToSave);
        updateWork.detail = await workController.updateWorkDetail(detailToSave);

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
        const IMAGE_URL = JSON.parse(body.get('IMAGE_URL')) || [];
        
        
        //DELETE MEDIA IMGS
        const allUrlsMedias = await workController.getWorkMedias({URL});
        const mediasDelete = allUrlsMedias.map(async media => {
            const { URL_MEDIA } = media || {};
            const key = fileController.getKey(URL_MEDIA);
            const isDeleteToCloud = await fileController.deleteImg(key); 
            return isDeleteToCloud;
        })
        //DELETE WORK AND MAIN URL DETAIL IMG
        const mainImgsIsDelete = await Promise.all( IMAGE_URL?.map(async url => {
            const key = fileController.getKey(url);
            const isDelete = await fileController.deleteImg(key);
            return isDelete;
        }));

        const deleteMedias = await workController.deleteWorkMedias({URL})
        const deleteDetails = await workController.deleteWorkDetail(URL);
        const deleteWork = await workController.deleteWork({ID_WORK});

        const statusResponse = {
            ID_WORK,
            work: !!deleteWork ,
            detail: !!deleteDetails,
            cloudMain: !!mainImgsIsDelete.includes(true),
            media:!!deleteMedias,
            cloudMedia: !!mediasDelete.includes(true)
        }
        return NextResponse.json(statusResponse,{status:200})
    } catch (error) {
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

