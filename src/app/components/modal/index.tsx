"use client"
import { useContext, useRef, MouseEvent } from "react"
import { Modalcontext } from "@/providers/modal"
export function ModalTicket() {
    const { handleModalVible, tickets } = useContext(Modalcontext)
    const modalRef = useRef<HTMLDivElement | null>(null)

    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleModalVible()
        }
    }
    return (
        <section className="absolute bg-gray-900/8 w-full min-h-screen" onClick={handleModalClick}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div ref={modalRef} className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="font-bold text-lg md:text-2xl">Detalhes do chamado</h1>

                        <button className="bg-red-500 text-white p-1 px-2 rounded" onClick={handleModalVible}>Fechar</button>




                    </div>
                    <div className="gap-2 flex flex-wrap mb-2">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{tickets?.tickets.name}</p>
                    </div>

                    <div className="gap-2 flex flex-wrap flex-col mb-2">
                        <h2 className="font-bold">descrição:</h2>
                        <p>{tickets?.tickets.description}</p>
                    </div>
                    <div className="w-full border-b-[1.5px] my-4">



                    </div>
                    <h1 className="font-bold text-lg">Detalhes do cliente</h1>
                    <div className="gap-2 flex flex-wrap mb-2">
                        <h2 className="font-bold">Nome:</h2>
                        <p>{tickets?.customer?.name}</p>
                    </div>

                    <div className="gap-2 flex flex-wrap mb-2">
                        <h2 className="font-bold">telefone:</h2>
                        <p>{tickets?.customer?.phone}</p>
                    </div>

                    <div className="gap-2 flex flex-wrap mb-2">
                        <h2 className="font-bold">email:</h2>
                        <p>{tickets?.customer?.email}</p>
                    </div>

                    {tickets?.customer?.addres && (
                        <div className="gap-2 flex flex-wrap mb-2">
                            <h2 className="font-bold">endereço:</h2>
                            <p>{tickets?.customer?.addres}</p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}