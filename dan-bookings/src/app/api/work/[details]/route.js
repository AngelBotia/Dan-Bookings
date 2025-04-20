import { NextResponse } from "next/server";
import { useControllerData } from "../../../controllers/WorkController";

export async function GET(request, { params }) {
    try {
        const { details: workID } = (await params);
        const allWorks = await useControllerData.getWorkDetailsById();
        return NextResponse.json(allWorks, { status: 200 });
    } catch (error) {
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}