import { useControllerData } from "../../controllers/WorkController";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const allWorks = await useControllerData.getAllWorks();
        return NextResponse.json(allWorks,{ status:200 });
    } catch (error) {
        const errorMessage = "something went wrong"
        return NextResponse.json({error: errorMessage },{ status: 500 });
    }
}