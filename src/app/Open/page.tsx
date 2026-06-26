"use client"
import { useState } from "react"
import { Input } from "@/app/components/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FiSearch , FiX } from "react-icons/fi"
import { FormTicket } from "./components"
import { api } from "@/lib/api"
const schema = z.object({
    email: z.string().email("Digite o email do cliente correto").min(1, "O campo email é obrigatorio")
})

type formData = z.infer<typeof schema>
export interface customerProps {
    id: string,
    name: string
}
export default function Open() {
    const { register, handleSubmit, setValue, formState: { errors } , setError} = useForm({
        resolver: zodResolver(schema)
    })
    const [customer, setCustomer] = useState<customerProps | null>(null)

    function handlecustomer(){
        setCustomer(null)
        setValue("email" , "")
    }

   async function handleSearch(data: formData){
    const response = await api.get("/api/customer" , {
        params:{
            email: data.email
        }
    })
    if(response.data === null){
        setError("email" , {type: "custom" , message: "Ops, cliente não encontrado"})
        return
    }
    setCustomer({
        id: response.data.id , 
        name: response.data.name 
    })
    }
    
    return (
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="font-bold text-3xl mt-24 text-center">Abrir chamado</h1>

            <main className="flex flex-col mt-4 mb-2">
                {customer ? (
                    <div className="bg-slate-200 py-6 px-2 rounded border-2 flex items-center justify-between">
                        <p><strong>Cliente selecionado:</strong> {customer.name}</p>

                        <button className="bg-red-600 h-11 px-2 flex items-center justify-center rounded " onClick={handlecustomer}>
                            <FiX size={24} color="#FFF"/>
                        </button>
                    </div>
                ) : (
                    <form className="bg-slate-200 py-6 px-2 rounded border-2" onSubmit={handleSubmit(handleSearch)}>
                        <div>
                            <Input
                                name="email"
                                placeholder="Digite o email do cliente..."
                                type="text"
                                error={errors.email?.message}
                                register={register} />
                            <button className="bg-blue-500 w-full rounded flex flex-row gap-3 px-2 h-11 items-center justify-center text-white font-bold">Procurar clientes <FiSearch size={24} color="#FFF" /></button>
                        </div>
                    </form>
                )}
                {customer !== null && <FormTicket customer={customer}/>}
            </main>
        </div>
    )
}