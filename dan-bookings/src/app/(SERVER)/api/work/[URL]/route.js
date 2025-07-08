import { NextResponse } from "next/server";
import { workController } from "../../../Work/work.controller";
import { hasPermission } from "../../../libs/nextAuth";
import { mediaController } from "../../../Media/media.controller";

export async function GET(request, { params }) {
    try {
        const { URL } = (await params);
        const { searchParams } = request.nextUrl;
        // const categoria = searchParams.get('categoria');
        let paramsQuery = { URL };
        
        let workDetail = await workController.getWorkDetail(paramsQuery) || {};
        
        workDetail.medias = await mediaController.getMedias(workDetail?.ID,'DETAIL') || [];
        if(!workDetail) return NextResponse.json({error:"dont found"},{status:404})

        // workDetail.media = await workController.getWorkMedias(paramsQuery);
        return NextResponse.json(workDetail, { status: 200 });
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        if (!hasPermission(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const { URL } = (await params);
        const body = await request.formData();
        const detailToUpdate = JSON.parse(body.get('newDetail')) || {};
        const { media } = detailToUpdate || {};
        if(!URL)  return NextResponse.json({ error: "Bad request" }, { status: 400 });

        let newDetail = await workController.updateWorkDetail(detailToUpdate);
        // newDetail.media = await workController.updateMedia(detailToUpdate) || []
        
        return NextResponse.json(newDetail, { status: 200 });
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

}


