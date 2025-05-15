import { NextResponse } from "next/server";
import { useWorkData } from "../../../controllers/WorkController";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../libs/nextAuth"; // Ajusta la ruta según tu estructura

export async function GET(request, { params }) {
    try {
        const { workID } = (await params);
        const { searchParams } = request.nextUrl;
        // const categoria = searchParams.get('categoria');
        let allParams = { workID };
        
        let workDetail = await useWorkData.getWorkDetail(allParams) || {};
        if(!workDetail) return NextResponse.json({error:"dont found"},{status:404})

        workDetail.media = await useWorkData.getWorkMedias(allParams);
        return NextResponse.json(workDetail, { status: 200 });
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// export async function POST(request, { params }) {
//     try {

//     } catch (error) {

//     }

// }
