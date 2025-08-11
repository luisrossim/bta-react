import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CustomerFilterProps {
   search: string
   onSearch: (value: string) => void
}

export function CustomerFilter({ search, onSearch }: CustomerFilterProps) {
   return (
     <div className="flex relative w-full">
         <Input 
            type="text" 
            placeholder="Pesquisar por nome ou CPF" 
            value={search} 
            onChange={(e) => onSearch(e.target.value)} 
         />
         <Search size={16} className="absolute right-5 top-3 text-muted-foreground" />
      </div>
   )
}