"use client"
import Link from "next/link"
import { FiUser , FiLogOut  , FiLock , FiLoader} from "react-icons/fi"
import { signOut , signIn , useSession } from "next-auth/react"
export function Header(){

    const {status , data} = useSession()

    async function handleLogin(){
        await signIn()
    }

    async function handleLogout(){
        await signOut()
    }

    return(
        <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
            

            <div className="w-full flex justify-between max-w-7xl mx-auto">
                <Link href="/">
                <h1 className="text-2xl font-bold pl-1 hover:tracking-widest duration-300">
                    <span className="text-blue-500">DEV</span>controle
                </h1>
                </Link>


                

                    {status === "unauthenticated" && (
                    <button onClick={handleLogin}>
                        <Link href="/dashboard">
                        <FiLock size={26} color="#4b5563"/>
                        </Link>
                    </button>
                    )} 

                    
                    {status === "authenticated" && (
                        <div className="flex flex-row justify-center items-center gap-5">
                    
                        <Link href="/dashboard">
                        <FiUser size={26} color="#4b5563"/>
                        </Link>
                        
                    <button onClick={handleLogout}>
                        <Link href="/">
                        <FiLogOut size={26} color="#ff0000"/>
                        </Link>
                    </button>
                    </div>
                    )}

                    {status === "loading" && (
                    <button className="animate-spin">
                        <Link href="/">
                        <FiLoader size={26} color="#634b4b"/>
                        </Link>
                    </button>
                    )}
                    
                </div>
            

        </header>
    )
}