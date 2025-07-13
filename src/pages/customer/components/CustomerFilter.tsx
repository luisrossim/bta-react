import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CustomerFilterProps {
   search: string
   onSearch: (value: string) => void
}

export function CustomerFilter({ search, onSearch }: CustomerFilterProps) {
   return (
      <div>
         <p className="font-medium text-neutral-600 mb-1">
            Pesquisar
         </p>

         <div className="flex relative w-full lg:w-1/2">
            <Input 
               type="text" 
               placeholder="Digite o nome ou CPF do cliente" 
               value={search} 
               onChange={(e) => onSearch(e.target.value)} 
            />
            <Search size={16} className="absolute right-5 top-3 text-neutral-500" />
         </div>
      </div>
   )
}