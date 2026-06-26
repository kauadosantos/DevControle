"use client"
import { customerProps } from "@/utils/cutomers.type"
import { ticketProps } from "@/utils/ticket.type"
import { FiCheckSquare , FiFile } from "react-icons/fi"
import { api } from "@/lib/api"
import { useRouter } from 'next/navigation'
import { Modalcontext } from "@/providers/modal"
import { useContext } from "react"
interface TicketItemProps{
    ticket: ticketProps , 
    customer: customerProps | null
}
export function Tickte({customer , ticket}: TicketItemProps){
    const router = useRouter()
    const {handleModalVible , DetailTicket} = useContext(Modalcontext)
   async function handleStatusCheck(){

      try{
        const response = await api.patch("/api/ticket" , {
            id: ticket.id
        })

        router.refresh();

      }catch(err){
        console.log(err)
      }

    }
    async function handleOpenModal(){
        handleModalVible()
        DetailTicket({
            customer: customer , 
            tickets: ticket
        })
    }

    return(
        <>
            
            
                {ticket.status === "aberto" && (
                    <tr className="border-b-2 border-b-slate-400 h-16 last:border-b-0 bg-slate-100 rounded hover:bg-gray-200 duration-300">
                    <td className="text-center pl-1">{customer?.name ?? "Sem cliente"}</td>

                <td className="text-center hidden sm:table-cell">{ticket?.created_al ? new Date(ticket.created_al).toLocaleDateString("pt-br") : ""}</td>

                <td className="text-center"><span className="bg-green-500 px-2 py-1 rounded">ABERTO</span></td>

                <td className="text-center" >
                    <button className="mr-2" onClick={handleStatusCheck}>
                        <FiCheckSquare size={22} color="#131313"/>
                    </button>

                    <button onClick={handleOpenModal}>
                        <FiFile size={22} color="#3b82f6"/>
                    </button>
                </td>
                </tr>
                )}
                
            
        </>
    )
}