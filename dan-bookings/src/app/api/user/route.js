import { useUserData } from '../../controllers/UserController';
import { NextResponse } from 'next/server';


export async function GET(request) {
    try {
        const key = request.headers.get('x-api-key');
        if(!key || !useUserData.checkApikey(key)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const name = searchParams.get('name');
        const id = searchParams.get('id');
        if(!email || !name || !id) return NextResponse.json({error:"Bad Request"},{status:400})

        const userToDb = await useUserData.getUser({email,name,id});
        return NextResponse.json(userToDb,{status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error:"Something went wrong"},{status:500});

    }
    
}
export async function POST(request) {
    try {
        const key = request.headers.get('x-api-key');
        if(!key || !useUserData.checkApikey(key)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        
        const body =  await request.json();
        const {id,name, email} = body;
        if(!email || !name || !id) return NextResponse.json({error:"Bad Request"},{status:400})

        const newUser = await useUserData.createNewUser({id,name,email})
        return NextResponse.json(newUser,{status:200});
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({status:"ok"},{status:200});

    }
    
}