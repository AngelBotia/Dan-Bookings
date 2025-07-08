import { NextResponse } from "next/server";

export async function GET(request) {
    return NextResponse.json({ok:"ok"},{status:200})
}