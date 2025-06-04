import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="relative w-screen h-screen bg-white text-slate-800 overflow-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(#dbeafe_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex justify-center items-center h-full p-6">
        <div className="flex flex-col gap-6 border border-blue-200 p-10 rounded-2xl bg-white/90 shadow-2xl max-w-lg text-center items-center backdrop-blur-md">
          <Ghost className="w-16 h-16 text-blue-600 animate-bounce drop-shadow" />
          <h1 className="text-5xl font-extrabold tracking-widest text-blue-700">404</h1>
          <p className="text-lg font-light text-slate-600">Oops! Você caiu em um buraco negro digital</p>
          <p className="text-xs text-slate-500">A página que você procura não foi encontrada neste universo.</p>

          <Link to="/">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors">
              Voltar para o início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
