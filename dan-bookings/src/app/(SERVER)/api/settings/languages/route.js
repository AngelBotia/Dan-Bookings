import { translationController } from "../../../Translation/translation.controller";
import { NextResponse } from "next/server";

export async function GET(request) {
    const languagues = await translationController.getLanguages();
    return NextResponse.json(languagues,{status:200})
}