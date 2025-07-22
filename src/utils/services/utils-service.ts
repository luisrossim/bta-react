import { format } from "date-fns";
import { ptBR } from 'date-fns/locale'

export class UtilsService {

    static actionsForExpiredToken(){
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    static formatDate = (data: Date): string => {
        if(!data) return ""
        return format(data, "dd/MM/yyyy", { locale: ptBR })
    };

    static formatTimestamp = (data?: Date): string => {
        if(!data) return ""
        return format(data, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    };

    static formatBoolean = (value: boolean | null | undefined): string => {
        if (value === true) return "Sim";
        if (value === false) return "Não";
        return "Não informado";
    };
}