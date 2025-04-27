import { useWorkData } from "../../controllers/WorkController";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; 
import { useFileData } from "../../controllers/FilesController";

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
        const session = await getServerSession(authOptions);
        //TODO: CHECK HERE IS ADMIN
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        //TODO: SAVE STORAGE IMGS
        useFileData.saveImg()


        const body = await request.json();
        const newWork = await useWorkData.createWork(body)
        return NextResponse.json(newWork,{status:200})
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
    
}