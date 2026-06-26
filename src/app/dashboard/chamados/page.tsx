import { Container } from "@/app/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma"
export default async function Chamados() {

    const session = await getServerSession(authOptions)

    if (session === null) {
        redirect("/")
    }

    const customers = await prismaClient.custumer.findMany({
        where: {
            userid: session.user.id
        }
    })

   async function handleRegisterChamado(formdata: FormData){
        "use server"

        const name = formdata.get("name")
        const description = formdata.get("description")
        const customer = formdata.get("customer")
        
        if(!name || !description || !customer){
            return;
        }
        await prismaClient.ticket.create({
            data:{
                name: name as string,
                description: description as string,
                custumerId: customer as string,
                status: "aberto",
                userid: session?.user.id
            }
        })
        redirect("/dashboard")
    }

    return (
        <Container>

            <main className="mt-8 mb-2">
                <div className="flex items-center gap-3">
                    <Link
                        className="text-white px-4 py-1 rounded bg-gray-700"
                        href="/dashboard">
                        Voltar
                    </Link>

                    <h1 className="text-2xl font-bold">Novo chamado</h1>

                </div>

                <form className="flex flex-col mt-6" action={handleRegisterChamado}>
                    <label className="mb-1 font-medium text-lg">Nome do chamado: </label>

                    <input type="text" placeholder="Digite o nome do chamado" required className="w-full border-2 rounded-md px-2 mb-2 h-11" name="name"/>

                    <label className="mb-1 font-medium text-lg">Descreva o chamado</label>

                    <textarea placeholder="Descreva o chamado:" required className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none" name="description">

                    </textarea>

                    {customers.length !== 0 && (
                        <>
                            <label className="mb-1 font-medium text-lg">Selecione o cliente</label>

                            <select className="w-full border-2 rounded-md px-2 mb-2 h-11" name="customer">
                                {customers.map((item) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </>
                    )}

                    {customers.length === 0 && (
                        <Link href="/dashboard/customer/new">
                        Você ainda não tem um cadastrado, <span className="text-blue-500 font-medium">cadastre um cliente</span>
                        </Link>
                    )}

                    <button className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={customers.length === 0 }>
                        Cadastrar
                    </button>


                </form>
            </main>



        </Container>
    )
}