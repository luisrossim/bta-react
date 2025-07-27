import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CustomerFilterProps {
   search: string
   onSearch: (value: string) => void
}

export function CustomerFilter({ search, onSearch }: CustomerFilterProps) {
   return (
     <div className="flex relative w-full lg:w-1/2">
         <Input 
            type="text" 
            placeholder="Pesquisar pelo nome ou CPF" 
            value={search} 
            onChange={(e) => onSearch(e.target.value)} 
         />
         <Search size={16} className="absolute right-5 top-3 text-muted-foreground" />
      </div>
   )
}