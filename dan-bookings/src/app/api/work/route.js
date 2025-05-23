import { workController } from "../../controllers/WorkController";
import { NextResponse } from "next/server";
import { hasPermission } from "../../libs/nextAuth"; 
import { saveImgsInCloud } from '../../libs/server/filesHelper'
export async function GET(request) {
    try {
        const { searchParams } = request.nextUrl;
        const limit = Number(searchParams.get('limit'));
        const page = Number(searchParams.get('page'));
        let params ={ limit , page };
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

        const urlsImg = await saveImgsInCloud(files,'MAIN',URL);

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
        const { detail } = newWork || {};
        const files = newWork.IMAGE_URL || [];

        if(!newWork.ID_WORK)  return NextResponse.json({ error: "Bad request" }, { status: 400 });

        const { WO_NAME } = newWork;
        
        const URL = WO_NAME?.trim().replaceAll(" ","-") || null

        const urlsImg = await saveImgsInCloud(files,'MAIN',URL);
        const IMAGE_URL = urlsImg[0] || null;

        const workToSave = {
            ...newWork,
            URL,
            IMAGE_URL
        }
      
        const updateWork = await workController.updateWork(workToSave);
        if(!updateWork) return NextResponse.json({error:"Dont found this work"},{status:404})

        if(detail){
            const MAIN_IMG_URL = IMAGE_URL || null;
            const WO_URL = URL || null;
            const detailToSave = {
                ...detail,
                MAIN_IMG_URL,
                WO_URL
            }
            updateWork.detail = await workController.updateWorkDetail(detailToSave);
            updateWork.media = await workController.updateWorkMedias(detailToSave) || [];
        }
        return NextResponse.json(updateWork,{status:200})
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
export async function DELETE(request,{ params }) {
    try {
        debugger
        if (!hasPermission(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.formData();
        const ID_WORK = JSON.parse(body.get('ID'));
        const URL = JSON.parse(body.get('URL'));
        
        
        //DELETE IMGS
        // const allUrlsMedias = await workController.getWorkMedias({URL});
        // // allUrlsMedias.map(async media => {
        // //     const { URL_MEDIA } = media || {};
        // //     const isDeleteToCloud = await fileController.deleteImg(URL_MEDIA); 
        // //     return isDeleteToCloud;
        // // })
                                                  

        const deleteMedias = await workController.deleteWorkMedias({URL})
        const deleteDetails = await workController.deleteWorkDetail(URL);
        const deleteWork = await workController.deleteWork({ID_WORK});

        const isOK = !!deleteWork && !!deleteDetails && !!!!deleteMedias
        return NextResponse.json({success:isOK, ID_WORK},{status:204})
    } catch (error) {
        debugger
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

