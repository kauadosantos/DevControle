import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";


export async function GET(request: Request){
    const {searchParams} = new URL(request.url)
    const customerEmail = searchParams.get("email")

    

    if(!customerEmail || customerEmail == ""){
        return NextResponse.json({error: "Not connection"} , {status: 400})
    }

    try{
        const customer = await prismaClient.custumer.findFirst({
            where:{
                email:customerEmail
            }
        })
        return NextResponse.json(customer)
    }catch{
        return NextResponse.json({error: "Not connection"} , {status: 400})
    }
}


export async function DELETE(request: Request){

    const session = await getServerSession(authOptions)

    if(!session || !session.user){

    return NextResponse.json({error: "Not connection"} , {status: 401})

}

    const { searchParams } = new URL(request.url) 
    const userId = searchParams.get("id")
    const findTickt = await prismaClient.ticket.findFirst({
        where:{
            custumerId: userId
        }
    })
    if(findTickt){
        return NextResponse.json({error: "error in delete"} , {status: 400})
    }

    try{
        await prismaClient.custumer.delete({
            where:{
                id: userId as string
            }
            
        })
        return NextResponse.json({message: "Usuario deletado com sucesso"})
    }catch(err){
        console.log(err)
        return NextResponse.json({error: "error in delete"} , {status: 400})
        

    }

    
    
}


//Rota para cadastrar um cliente
export async function POST(request: Request){

    const session = await getServerSession(authOptions)

    if(!session || !session.user){

        return NextResponse.json({error: "Not connection"} , {status: 401})

}
    const {name , phone , email , addres , userid} = await request.json()

    try{
        await prismaClient.custumer.create({
            data:{
                name , 
                email , 
                phone , 
                addres :  addres ? addres : "" , 
                userid: session.user.id

            }
    })
    return NextResponse.json({message: "cadastrado realizado com sucesso"})

    }catch(err){
        return NextResponse.json({error: "failed customer"} , {status: 400})
    }


    

    
}