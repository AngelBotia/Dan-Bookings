import { NextResponse } from "next/server";
import { useControllerData } from "../../../controllers/WorkController";

export async function GET(request, { params }) {
    try {
        const { details: workURL } = (await params);
        const workDetail = await useControllerData.getWorkDetails(workURL);
        const mediaWorks = await useControllerData.getWorkMediaDetails(workURL);
        return NextResponse.json(workDetail, { status: 200 });
    } catch (error) {
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}