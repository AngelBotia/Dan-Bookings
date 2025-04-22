import { NextResponse } from "next/server";
import { useControllerData } from "../../../controllers/WorkController";

export async function GET(request, { params }) {
    try {
        const {workID} = (await params);
        const { searchParams } = request.nextUrl;
        // const categoria = searchParams.get('categoria');
        let allParams ={workID} 
        let workDetail = await useControllerData.getWorkDetail(allParams);
        workDetail.media = await useControllerData.getWorkMedias(allParams);
        return NextResponse.json(workDetail, { status: 200 });
    } catch (error) {
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}