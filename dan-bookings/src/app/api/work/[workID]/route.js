import { NextResponse } from "next/server";
import { useWorkData } from "../../../controllers/WorkController";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route"; // Ajusta la ruta según tu estructura

export async function GET(request, { params }) {
    try {
        const { workID } = (await params);
        const { searchParams } = request.nextUrl;
        // const categoria = searchParams.get('categoria');
        let allParams = { workID };
        
        let workDetail = await useWorkData.getWorkDetail(allParams) || {};
        if(workDetail) workDetail.media = await useWorkData.getWorkMedias(allParams);
        return NextResponse.json(workDetail, { status: 200 });
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

