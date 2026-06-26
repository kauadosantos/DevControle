import Image from "next/image";
import img from '@/assets/hero.svg'

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col min-h-[calc(100vh-80px)]">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-500 sm:text-4xl">Atendimentos, Clientes</h1>

      <Image 
      src={img}
      alt="Imagem logo"
      width={600}
      className="max-w-sm md:max-w-xl"
      />

      


    </div>
  );
}
