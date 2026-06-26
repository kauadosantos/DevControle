"use client"
import { Input } from "@/app/components/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/api"
import { customerProps } from "../page"
const schema = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatorio") ,
    description: z.string().min(1 , "Descreva um pouco sobre seu problema")
})

type FormData = z.infer<typeof schema>
interface FormTicktProps{
    customer: customerProps
}
export function FormTicket({customer}: FormTicktProps ){

    const {register , handleSubmit , setValue ,formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    async function handleRegister(data: FormData){
        const response = await api.post("/api/ticket" , {
            name: data.name , 
            description: data.description , 
            customerId: customer.id
        })
        setValue("name","")
        setValue("description","")
    }


    return(
        <form className="bg-slate-200 mt-6 px-4 py-6 rounded" onSubmit={handleSubmit(handleRegister)}>
            <label className="mb-1 font-medium text-lg">
            Nome do chamado
            </label>
            <Input 
            register={register}
            type="text"
            placeholder="Digite o nome do chamado..."
            name="name"
            error={errors.name?.message}/>

            <label className="mb-1 font-medium text-lg">
            Descreva o chamado
            </label>

            <textarea className="w-full border-2 rounded-md h-24 resize-none mb-2 px-2" placeholder="Descreva o problema" id="description" {...register("description")}></textarea>

            {errors.description?.message && <p className="text-red-500 my-1">{errors.description?.message}</p>} 

            <button type="submit" className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold">Cadastrar</button>
        </form>
    )
}