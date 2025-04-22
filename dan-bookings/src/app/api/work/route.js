import { useControllerData } from "../../controllers/WorkController";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = request.nextUrl;
        const limit = searchParams.get('limit');
        let params ={ limit } 
        const allWorks = await useControllerData.getAllWorks(params);
        return NextResponse.json(allWorks,{ status:200 });
    } catch (error) {
        const errorMessage = "something went wrong"
        return NextResponse.json({error: errorMessage },{ status: 500 });
    }
}