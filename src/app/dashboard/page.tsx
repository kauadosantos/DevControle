import { Container } from "../components/container"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Tickte } from "./components/tickte" 
import prismaClient from "@/lib/prisma"
import { ButtonRefresh } from "./components/button"

export default async function Dashboard() {

    const session = await getServerSession(authOptions)

    // Se não tiver sessão ou se o usuário não tiver ID válido na sessão
    if (!session || !session.user) {
        redirect("/")
    }

    const tickets = await prismaClient.ticket.findMany({
        where: {
            status: "aberto", 
            custumer: {
                // Certifique-se de que seu NextAuth injeta o 'id' em session.user no callback da session
                userid: (session.user as any).id 
            }
        },
        include: {
            custumer: true
        }
    })

    console.log(tickets)

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Chamados</h1>
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard/chamados" className="bg-blue-500 py-1.5 px-4 rounded text-white font-medium">
                            Novo chamado
                        </Link>
                        <ButtonRefresh/>
                    </div>
                </div>
                <table className="min-w-full my-2 mt-10">
                    <thead>
                        <tr>
                            <th className="font-medium text-center pl-1">Cliente</th>
                            <th className="font-medium text-center hidden sm:block">Data cadastro</th>
                            <th className="font-medium text-center">Status</th>
                            <th className="font-medium text-center">#</th>
                        </tr>
                    </thead>

                    <tbody>
                {tickets.map((ticket: any) => (
                    <Tickte 
                    key={ticket.id}
                    customer={ticket.custumer} 
                    ticket={ticket} 
                    />
                ))}
                    </tbody>
                </table>
            </main>
        </Container>
    )
}