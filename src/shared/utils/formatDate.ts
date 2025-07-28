import { format } from "date-fns";
import { ptBR } from 'date-fns/locale'

export const formatDate = (data: Date): string => {
   if(!data) return ""
   return format(data, "dd/MM/yyyy", { locale: ptBR })
};

export const formatTimestamp = (data?: Date): string => {
   if(!data) return ""
   return format(data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
};
