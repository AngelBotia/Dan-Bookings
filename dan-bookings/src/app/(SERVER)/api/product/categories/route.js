import { NextResponse } from "next/server";
import { categoryController } from "../../../product/category/category.controller"
export async function GET(request) {
    const categories = await categoryController.getCategorys();
    return NextResponse.json(categories,{status:200})
}