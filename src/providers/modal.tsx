"use client"
import { createContext , ReactNode , useState } from "react"
import { ticketProps } from "@/utils/ticket.type"
import { customerProps } from "@/utils/cutomers.type"
import { ModalTicket } from "@/app/components/modal"

interface ModalcontextData{
    visible: boolean , 
    handleModalVible: () => void , 
    tickets: TicketInfoProps | undefined , 
    DetailTicket: (detail: TicketInfoProps) => void
}
interface TicketInfoProps{
    tickets: ticketProps , 
    customer: customerProps | null
}

export const Modalcontext = createContext({} as ModalcontextData)
export const ModalProvider = ({children}: {children: ReactNode}) => {
    const [visible , setVisible] = useState(false)
    const [tickets , setTicket] = useState<TicketInfoProps>()
    
    function handleModalVible(){
        setVisible(!visible)
    }

    function DetailTicket(detail: TicketInfoProps){
        console.log(detail)
        setTicket(detail)

    }
    return(
        <Modalcontext.Provider value={{handleModalVible ,visible , tickets , DetailTicket}}>
            {visible && <ModalTicket/>}
            {children}
        </Modalcontext.Provider>
    )
}