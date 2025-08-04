import { productController } from "../../product/product.controller";
import { NextResponse } from "next/server";
import { hasPermission } from "../../libs/nextAuth"; 
import { fileController } from "../../File/file.controller";
import { mediaController } from "../../Media/media.controller";
import { translationController } from "../../Translation/translation.controller"
export async function GET(request) {
    try {
        const { searchParams } = request.nextUrl;
        const limit = Number(searchParams.get('limit'));
        const page = Number(searchParams.get('page'));
        const ID_WORK = searchParams.get('id');
        const languageApp = searchParams.get('languageAPP');
        const CATEGORY = searchParams.get('category');
        const isAdmin = await hasPermission(request);
        
        let params = { isAdmin, ID_WORK, CATEGORY, limit, page,languageApp };

        let { data,total } = await productController.getAllProducts(params);
        return NextResponse.json({data,total},{ status:200 });
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong";
        return NextResponse.json({error: errorMessage },{ status: 500 });
    }
}

export async function POST(request, { params }) {
    try {
        if (!hasPermission(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 
        const body = await request.formData();
        const work = JSON.parse(body.get('product'));
        const { WO_NAME, IMAGE_URL,languageAPP,CATEGORY} = work || {};
        const files = IMAGE_URL || [];
        const URL = WO_NAME?.trim().replaceAll(" ","-") || null;
        
        if(!files?.length || !WO_NAME)  return NextResponse.json({ error: "Bad request" }, { status: 400 });

        const urlsImg = await fileController.saveImgsInCloud(files,CATEGORY?.replaceAll(" ","-") || 'WORKS',URL);

        const workToSave = {
            WO_NAME,
            CATEGORY,
            URL
        }
        let newProduct = await productController.createProduct(workToSave);
        let translations = await translationController.createTranslation({WO_NAME},newProduct.ID_WORK,languageAPP.toUpperCase());

        newProduct = {
            WO_NAME,
            ...newProduct,
            ...translations,
        }
        // newProduct.detail = await productController.createDetailWork(newProduct) || {};
        newProduct.IMAGE_URL = await mediaController.createMedias(newProduct?.ID_WORK,urlsImg,CATEGORY); 
        
    
    
        return NextResponse.json(newProduct,{status:200})
    } catch (error) {
        console.error(error.message);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
    
}
export async function PUT(request,{ params }) {
    try {
        if (!hasPermission(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const body = await request.formData();
        const newProduct = JSON.parse(body.get('newProduct')) || {};
        const { detail,ID_WORK,IMAGE_URL ,WO_NAME,languageAPP,CATEGORY} = newProduct || {};

        if(!ID_WORK || !WO_NAME)  return NextResponse.json({ error: "Bad request" }, { status: 400 });

        const URL = WO_NAME?.trim().replaceAll(" ","-") || null

        const allMedias = await mediaController.getMedias(ID_WORK,CATEGORY)      
        const mediasToDelete = allMedias?.filter(media => !IMAGE_URL?.find(newMedia => newMedia.URL_MEDIA == media.URL_MEDIA)) || [];
        const statusDelete = await Promise.all(mediasToDelete.map( async media => {
                                                try {
                                                        const { URL_MEDIA } = media || {};
                                                        const key = fileController.getKey(URL_MEDIA);
                                                        const resCloud = await fileController.deleteImg(key);
                                                        const resDB = await mediaController.deleteMedia(URL_MEDIA); 
                                                        return resCloud && resDB;
                                                    } catch (error) {
                                                        return false;
                                                    }
                                                }));
        
        const newMediasToSave = IMAGE_URL?.filter(newMedia => newMedia.img) || [];
        const urlsImg = await fileController.saveImgsInCloud(newMediasToSave,CATEGORY,URL);
        const newMedias = await mediaController.createMedias(ID_WORK,urlsImg,CATEGORY) || [];
        
        
        
        const workToSave = {
            ...newProduct,
            URL
        }

        let updateWork = await productController.updateProduct(workToSave) || {};
        let newTranslation = await translationController.updateTranslation({WO_NAME},ID_WORK,languageAPP);
        let restOfMedias = allMedias?.filter(media => IMAGE_URL?.find(newMedia => newMedia.URL_MEDIA == media.URL_MEDIA)) || [];
        
        updateWork = {
            ...updateWork,
            ...newTranslation,
            IMAGE_URL: [...newMedias,...restOfMedias]
        }

        if(!updateWork) return NextResponse.json({error:"Dont found this work"},{status:404})

        return NextResponse.json(updateWork,{status:200})
    } catch (error) {
        console.error(error);
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
export async function DELETE(request,{ params }) {
    try {
        if (!hasPermission(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.formData();
        const ID_WORK = JSON.parse(body.get('ID'));
        const URL = JSON.parse(body.get('URL'));
        
        const allUrlsMedias = await mediaController.getMedias(ID_WORK);
        //DELETE MEDIA IMGS
        const mediasDelete = await Promise.all(allUrlsMedias.map( media => {
            const { URL_MEDIA } = media || {};
            const key = fileController.getKey(URL_MEDIA);
            if(!key) return false;
            return fileController.deleteImg(key); 
        }))

        const deleteMedias = await mediaController.deleteMedia(ID_WORK);
        const deleteWork = await workController.deleteWork({ID_WORK});
        const deleteTranslations = await translationController.deleteTranslation(ID_WORK);

        const statusResponse = {
            ID_WORK,
            work: !!deleteWork  && !!deleteTranslations,
            media:!!deleteMedias,
            cloudMedia: !!mediasDelete.every(item => item)
        }
        return NextResponse.json(statusResponse,{status:200})
    } catch (error) {
        console.error(error)
        const errorMessage = "something went wrong"
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

