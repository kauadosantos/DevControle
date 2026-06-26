"use client"
import { customerProps } from "@/utils/cutomers.type";
import { api } from "@/lib/api"
import { useRouter } from "next/navigation";
export function Card({customer}: {customer: customerProps}){

    const router = useRouter()

   async function handleDelete(){
       try{
        console.log("Entrou no try")
        const response = await api.delete("/api/customer" , {
        params:{
            id: customer.id
        } 
        
       })

       console.log(response.data)
       router.refresh()
       }catch(err){
        console.log("Deu erro no delete e veio parar no catch" + err)

       }
    }

    return(
        <article className="flex flex-col gap-2 bg-gray-200 rounded p-2 hover:scale-105 duration-300 w-full mt-5">
            <h1 className="flex items-center gap-1"><span className="font-bold">Nome:</span> { customer.name}</h1>

            <h1 className="flex items-center gap-1"><span className="font-bold">Email: </span> { customer.email}</h1>

            <h1 className="flex items-center gap-1"><span className="font-bold">Telefone: </span> { customer.phone}</h1>

            {customer.addres && (
                <h1 className="flex items-center gap-1"><span className="font-bold">Endereço: </span> { customer?.addres}</h1>
            ) }

            <button className="bg-red-500 mt-2 px-4 rounded text-white self-start" onClick={handleDelete}>
                Deletar
            </button>


        </article>
    )
}