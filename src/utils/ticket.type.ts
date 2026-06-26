
export interface ticketProps {
  id: string;
  name: string;
  description: string;
  status: string;
  created_al: Date | null;
  update_al: Date | null;
  custumerId: string | null; // Alterado para aceitar null do schema
  userid: string | null;     // Alterado para aceitar null do schema
  
  // Adiciona a estrutura do cliente que o Prisma traz quando faz o include
  custumer?: {
    id: string;
    name: string;
    phone: string;
    email: string;
    addres: string | null;
    created_al: Date | null;
    update_al: Date | null;
    userid: string | null;
  } | null;
}