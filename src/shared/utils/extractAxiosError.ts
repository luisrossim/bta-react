import axios from "axios";

export type ApiErrorDetails = {
  statusCode: number;
  statusText: string;
  systemMessage: string;
  message: string;
};

export const extractAxiosError = (error: unknown): ApiErrorDetails => {
   if (axios.isAxiosError(error)) {
      return {
         statusCode: error.response?.status ?? 500,
         statusText: error.response?.statusText ?? "Erro desconhecido",
         systemMessage: error.message,
         message: error.response?.data?.message ?? "Erro desconhecido"
      };
   }

   if (error instanceof Error) {
      return {
         statusCode: 500,
         statusText: "Erro desconhecido",
         systemMessage: error.message,
         message: error.message
      };
   }

   return {
      statusCode: 500,
      statusText: "Erro desconhecido",
      systemMessage: "Erro desconhecido",
      message: "Erro desconhecido"
   };
};
