import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

export function useExecutionTime() {
   const calculateExecutionTime = (criadoEm: Date, concluidoEm: Date) => {
      const endDate = concluidoEm ?? new Date();
   
      const intervaloEmDias = differenceInDays(endDate, criadoEm);
      const intervaloEmHoras = differenceInHours(endDate, criadoEm);
      const intervaloEmMinutos = differenceInMinutes(endDate, criadoEm);

      if (intervaloEmHoras === 0) {
         return `${intervaloEmMinutos} minutos`;
      } else if (intervaloEmDias === 0) {
         return `${intervaloEmHoras} horas`;
      } else {
         return `${intervaloEmDias} ${intervaloEmDias == 1 ? 'dia' : 'dias'}`;
      }
   }

   return { calculateExecutionTime }
}