import { Container } from "@/app/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NewForm } from "../components/form";
import Link from "next/link";


export default async function New(){
    const session = await getServerSession(authOptions)
            
            if(session === null){
                redirect("/")
            }
            
    return(
        <Container>
            <main>
                <div className="flex gap-4 items-center">
                    <Link href="/dashboard/customer" className="bg-gray-700 py-1.5 px-4 rounded text-white font-medium">
                        Voltar
                    </Link>

                    <h1 className="text-2xl font-bold">Novo Cliente</h1>
                </div>

                
                    <NewForm userId={session.user.id}/>
                
                
            </main>
        </Container>
    )
}