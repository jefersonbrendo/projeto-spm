import { useState } from "react";

export function LeiCard({ lei }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-[#EDEDED] rounded-xl shadow-md p-4 mb-4">

      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between"
      >
        <h2 className="font-bold text-[15px]">{lei.titulo}</h2>

        <span
          className={`material-symbols-outlined text-[28px] text-purple-700 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Conteúdo expandido */}
      {open && (
        <div className="mt-4 bg-white rounded-xl p-4 shadow-inner">

          <p className="text-purple-700 font-semibold text-sm mb-2">
            {lei.artigo}
          </p>

          <p className="text-gray-700 text-sm mb-3">
            {lei.descricao}
          </p>

          <h3 className="font-semibold text-purple-600 mb-1">
            Principais Pontos:
          </h3>

          <ul className="text-sm text-gray-600 space-y-2 mb-4">
            {lei.pontos.map((p, index) => (
              <li key={index}>• {p}</li>
            ))}
          </ul>

          <div className="flex gap-3">
            <a
              href={lei.link}
              target="_blank"
              className="flex-1 py-2 text-center bg-purple-600 text-white rounded-lg"
            >
              Saiba Mais
            </a>

            
          </div>
        </div>
      )}
    </div>
  );
}
