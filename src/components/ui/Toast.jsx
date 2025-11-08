import { useEffect } from "react";

export function Toast({ tipo = "info", mensagem = "", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const cores = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      className={`
        fixed top-6 left-1/2 transform -translate-x-1/2
        px-5 py-3 rounded-full shadow-lg text-sm font-medium
        ${cores[tipo] || cores.info}
        transition-all duration-500 animate-fadeIn
        z-[9999]
      `}
      style={{
        animation: "fadeInOut 3s ease forwards",
      }}
    >
      {mensagem}
    </div>
  );
}

/* 🔧 Animação simples (fade + slide) */
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeInOut {
  0% { opacity: 0; transform: translate(-50%, -20px); }
  10% { opacity: 1; transform: translate(-50%, 0); }
  90% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -10px); }
}
`;
document.head.appendChild(style);
