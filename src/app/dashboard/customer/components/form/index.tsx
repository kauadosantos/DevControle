'use client'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/app/components/input"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"
const schema = z.object({
    name: z.string().min(1 , "campo obrigatorio"),
    email: z.string().email("digite um email valido").min(1 , "Email obrigatorio"),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    } , {
        message: "O numero de telefone deve estar (DDD) 9999-99999"
    }) , 
    addres: z.string(),
})

    type FormData = z.infer<typeof schema>

export function NewForm({userId}: {userId: string}){
    const route = useRouter()
    const { register , handleSubmit , formState: {errors} } = useForm<FormData>({
        resolver: zodResolver(schema)
    })
    

   async function handlecustomer(data: FormData){
            await api.post("/api/customer" , {
            name: data.name , 
            phone: data.phone , 
            email: data.email , 
            addres: data.addres , 
            userId: userId
        })
        route.refresh()
        route.replace("/dashboard/customer")
        
    }

    return(
        <form className="flex flex-col my-6" onSubmit={handleSubmit(handlecustomer)}>
            <label className="mb-1 text-lg font-medium">Nome completo</label>
            <Input 
            name="name"
            placeholder="Digite o nome..."
            type="text"
            error={errors.name?.message}
            register={register}
            />
            <section className="flex gap-2 mt-3 flex-col sm:flex-row">
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Digite o email</label>
                    <Input
                    name="email"
                    placeholder="Digite o email..."
                    type="text"
                    error={errors.email?.message}
                    register={register}
                    />
                </div>
                
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Digite o telefone</label>
                    <Input
                    name="phone"
                    placeholder="exemplo (DDD) 9999-99999"
                    type="text"
                    error={errors.phone?.message}
                    register={register}
                    />
                </div>

            </section>

            <label className="mb-1 text-lg font-medium">Endereço</label>
                    <Input
                    name="addres"
                    placeholder="Digite o endereço..."
                    type="text"
                    error={errors.addres?.message}
                    register={register}
                    />

                    <button 
                    type="submit" 
                    className="bg-blue-500 px-2 my-4 h-9 rounded text-lg font-medium text-white">Cadastrar</button>

        </form>
    )
}