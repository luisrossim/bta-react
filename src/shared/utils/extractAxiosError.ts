import axios from "axios";

export type ApiErrorDetails = {
  statusCode: number;
  statusText: string;
  systemMessage: string;
  message: string;
};

export const extractAxiosError = (error: unknown): ApiErrorDetails => {
   const internalErrorMessage = "Erro interno do servidor";
   const unknownErrorMessage = "Erro desconhecido";

   if (axios.isAxiosError(error)) {
      return {
         statusCode: error.response?.status ?? 500,
         statusText: error.response?.statusText ?? internalErrorMessage,
         systemMessage: error.message,
         message: error.response?.data?.message ?? internalErrorMessage
      };
   }

   if (error instanceof Error) {
      return {
         statusCode: 500,
         statusText: internalErrorMessage,
         systemMessage: error.message,
         message: error.message ?? internalErrorMessage
      };
   }

   return {
      statusCode: 500,
      statusText: unknownErrorMessage,
      systemMessage: unknownErrorMessage,
      message: unknownErrorMessage
   };
};
