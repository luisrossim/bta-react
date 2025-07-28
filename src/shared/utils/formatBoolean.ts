export function formatBoolean (value: boolean | null | undefined): string {
   if (value === true) return "Sim";
   if (value === false) return "Não";
   return "Não informado";
};