import { useWorkData } from "../../controllers/WorkController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../libs/nextAuth"; 
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
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
 
        const body = await request.formData();
        const files = JSON.parse(body.get("files"));
        const WO_NAME = JSON.parse(body.get('name'));
        const URL = WO_NAME?.trim().replaceAll(" ","-") || null;
        
        if(!files?.length || !WO_NAME)  return NextResponse.json({ error: "Bad request" }, { status: 400 });
        
        const session = await getServerSession(authOptions);
        const isAdmin = token.role === US_DB_PROPS.USER_ROLS.admin;
        if (!session || !isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const urlsImg = await Promise.all(files?.map(async file =>{
            let { type, img } = file || {};
            const imgToSave = {
                name: `MAIN-${URL}`,
                file: Buffer.from(img, 'base64'),
                ContentType: type
            }
            return await useFileData.saveImg(imgToSave);
        })) || []
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