import { Container } from "@/app/components/container"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card } from "./components/card"
import  PrismaClient  from "@/lib/prisma"
export default async function Customer(){
    const session = await getServerSession(authOptions)
        
        if(session === null){
            redirect("/")
        }
        ////
        const customers = await PrismaClient.custumer.findMany({
            where:{
                userid: session.user.id
            }
        })
        console.log("==========")
        console.log(customers)
        console.log("==========")
        ////
    return(
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Meus clientes</h1>

                    <Link href="/dashboard/customer/new" className="bg-blue-500 py-1.5 px-4 rounded text-white font-medium">
                    Novo cliente
                    </Link>
                </div>
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                
                    {customers.map(item => (
                        <Card key={item.id} customer={item}/>
                    ))}

            
                
                </section>
            </main>
        </Container>
    )
}