import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="relative w-screen h-screen bg-white text-neutral-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-neutral-200 rounded-xl p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="w-12 h-12 text-red-600" />
          <h1 className="text-2xl font-semibold text-neutral-800">Página não encontrada</h1>
          <p className="text-sm text-neutral-600">
            A URL acessada não corresponde a nenhum conteúdo disponível no sistema.
          </p>
          <Link to="/">
            <Button className="mt-6 bg-neutral-800 hover:bg-neutral-900 text-white">
              Voltar para o início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
