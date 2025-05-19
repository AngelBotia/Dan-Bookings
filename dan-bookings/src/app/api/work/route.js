import { useWorkData } from "../../controllers/WorkController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, hasPermission } from "../../libs/nextAuth"; 
import { useFileData } from "../../controllers/FilesController";
import { WO_DB_PROPS } from "../../constants/worksDB";
import { getToken } from "next-auth/jwt";
import { US_DB_PROPS } from "../../constants/usersDB";

export async function GET(request) {
    try {
        const { searchParams } = request.nextUrl;
        const limit = Number(searchParams.get('limit'));
        const page = Number(searchParams.get('page'));
        let params ={ limit , page };
        const allWorks = await useWorkData.getAllWorks(params);
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

        const urlsImg = await Promise.all(files?.map(file =>{
            let { type, img } = file || {};
            const imgToSave = {
                name: `MAIN-${URL}`,
                file: Buffer.from(img, 'base64'),
                ContentType: type
            }
            return useFileData.saveImg(imgToSave);
        })) || [];

        const workToSave = {
            WO_NAME,
            URL,
            IMAGE_URL: urlsImg[0] || null,
        }
        let newWork = await useWorkData.createWork(workToSave);
        newWork.detail = await useWorkData.createDetailWork(newWork) || {};
    

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
        const files = newWork.IMAGE_URL || [];

        if(!newWork.ID_WORK)  return NextResponse.json({ error: "Bad request" }, { status: 400 });

        const { WO_NAME } = newWork;
        
        const URL = WO_NAME?.trim().replaceAll(" ","-") || null
        const urlsImg = await Promise.all(files?.map(file =>{
                let { type, img } = file || {};
                const imgToSave = {
                    name: `MAIN-${URL}`,
                    file: Buffer.from(img, 'base64'),
                    ContentType: type
                }
                return useFileData.saveImg(imgToSave);
        })) || [];


        const IMAGE_URL = urlsImg[0] || null;
        const workToSave = {
            ...newWork,
            URL,
            IMAGE_URL
        }
        //TODO: update works_detail_media
        //TODO: update works_detail
        const updateWork = await useWorkData.updateWork(workToSave);
        // updateWork.detail=
        // updateWork.media=

        //TODO: update works
        return NextResponse.json(updateWork,{status:200})
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
export async function DELETE(request,{ params }) {
    try {
        if (!hasPermission(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.formData();
        const ID_WORK = JSON.parse(body.get('ID'));
        const deleteWork = await useWorkData.deleteWork({ID_WORK})
        return NextResponse.json({sucess:!!deleteWork,ID_WORK},{status:200})
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}