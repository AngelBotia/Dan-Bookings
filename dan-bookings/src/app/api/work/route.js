import { useWorkData } from "../../controllers/WorkController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../libs/nextAuth"; 
import { useFileData } from "../../controllers/FilesController";
import { WO_DB_PROPS } from "../../constants/worksDB";

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
        const { WORKS:{ URL,ORDER_INDEX } } = WO_DB_PROPS;
 
        const body = await request.formData();
        const files = JSON.parse(body.get("files"));
        const WO_NAME = JSON.parse(body.get(URL));
        const WO_ORDER = JSON.parse(body.get(ORDER_INDEX));
        const WO_URL = WO_NAME?.trim().replaceAll(" ","-") || null;
        
        if(!files?.length || !WO_NAME)  return NextResponse.json({ error: "Bad request" }, { status: 400 });
        
        const session = await getServerSession(authOptions);
        //TODO: CHECK HERE IS ADMIN
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const urlsImg = await Promise.all(files?.map(async file =>{
            let { type, img } = file || {};
            const imgToSave = {
                name: `MAIN-${WO_URL}`,
                file: Buffer.from(img, 'base64'),
                ContentType: type
            }
            return await useFileData.saveImg(imgToSave);
        })) || []

        const workToSave = {
            WO_NAME,
            WO_URL: WO_URL,
            WO_IMAGE_URL: urlsImg[0] || null,
            WO_ORDER
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