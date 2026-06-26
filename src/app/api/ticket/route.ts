import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma"
import next from "next";

export async function PATCH(request: Request){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        return NextResponse.json({error: "Not authorized"},{status: 401})
    }

    const { id } = await request.json()

    try {
        // Adicionado o AWAIT aqui para realmente buscar no banco de dados
        const findTicket = await prismaClient.ticket.findFirst({
            where:{
                id: id as string
            }
        })

        // Agora o IF vai funcionar corretamente se o chamado não existir
        if(!findTicket){
            return NextResponse.json({
                error: "Ticket não encontrado"
            },{
                status: 400
            })
        }

        // Executa a atualização
        await prismaClient.ticket.update({
            where:{
                id: id as string
            },
            data:{
                status: "FECHADO"
            }
        })

        return NextResponse.json({ message: "Status atualizado com sucesso" })

    } catch(error) {
        return NextResponse.json({
            error: "Failed to update ticket"
        }, {
            status: 500 // É bom retornar o status 500 em caso de erro interno
        })
    }
}
export async function POST(request: Request){
    const {customerId , name , description} = await request.json()

    if(!customerId || !name || !description){
        return NextResponse.json({message: "Cadastrado com sucesso"})
    }

    try{
        await prismaClient.ticket.create({
            data:{
                name: name , 
                description: description , 
                status: "aberto" , 
                custumerId: customerId
            }
        })
        return NextResponse.json({message: "Chamado registrado com sucesso"})
    }catch(err){
       return NextResponse.json({error: "failed create new ticket"} , {status: 400})
    }

    return NextResponse.json({message: "Cadastrado com sucesso"})

}