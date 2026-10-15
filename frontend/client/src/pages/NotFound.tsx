import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <main className="relative grid min-h-screen place-items-center bg-white p-4">
      <button
        type="button"
        onClick={handleGoHome}
        className="absolute left-5 top-5 z-10 inline-flex min-h-12 items-center gap-3 border border-[#12395d]/25 px-5 text-sm font-bold uppercase tracking-[.12em] text-[#12395d] transition-colors hover:border-[#0f7065] hover:text-[#0f7065] sm:left-8 sm:top-8"
      >
        <ArrowLeft className="size-5" aria-hidden="true" />
        Home
      </button>
      <div className="max-w-full">
        <img
          src="/404.webp"
          alt="Página no encontrada"
          className="max-h-[78svh] max-w-full object-contain"
        />
      </div>
    </main>
  );
}
