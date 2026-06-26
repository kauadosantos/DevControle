import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient

if(process.env.NODE_ENV === "production"){
    prisma = new PrismaClient();

}else{
    let globalWhitePrisma = global as typeof globalThis & {
        prisma: PrismaClient
    }

    if(!globalWhitePrisma.prisma){
        globalWhitePrisma.prisma = new PrismaClient(); 
    }

    prisma = globalWhitePrisma.prisma
}

export default prisma