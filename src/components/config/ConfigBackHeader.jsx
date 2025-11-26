import { useNavigate } from "react-router-dom";

export function ConfigBackHeader({ title }) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center gap-3 mb-4 px-1">
      {/* Botão de voltar */}
      <button
        onClick={() => navigate("/configuracoes")}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100"
      >
        <span className="material-symbols-outlined text-[26px] text-gray-800">
          arrow_back
        </span>
      </button>

      {/* Título */}
      <h1 className="text-xl font-semibold text-gray-800">
        {title}
      </h1>
    </div>
  );
}
