import { Container } from "@/app/components/container";
import Link from "next/link";
export function DashboardHeader(){
    return(
        <Container>
            <header className="w-full bg-gray-700 text-white p-3 rounded my-4 items-center flex gap-4">
                <Link href="/dashboard" className="hover:font-bold duration-400">
                    Chamados
                </Link>

                <Link href="/dashboard/customer" className="hover:font-bold duration-400">
                    Clientes
                </Link>

            </header>
        </Container>
    )
}