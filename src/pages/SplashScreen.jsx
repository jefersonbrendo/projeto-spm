import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/wave-bg.svg"
          alt="Ondas de fundo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Logo */}
      <div className="z-10 mt-[-80px] flex flex-col items-center">
        <img
          src="/logo.png"
          alt="Logo SAS"
          className="w-24 h-24 object-contain"
        />
        <div className="w-20 h-2 bg-black/10 rounded-full mt-4 blur-sm shadow-lg" />
      </div>

      {/* Barra de progresso animada */}
      <div className="absolute bottom-48 w-4/5 max-w-xs z-10 px-4">
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-full bg-purple-700 rounded-full animate-[progress_3s_linear_forwards]" />
        </div>
      </div>

      {/* Estrelinha decorativa */}
      <div className="absolute bottom-6 right-6 z-10">
        <span className="text-white text-2xl opacity-60">✧</span>
      </div>

      {/* Tailwind animation customizada */}
      <style>
        {`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  );
}
