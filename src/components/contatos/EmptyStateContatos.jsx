// src/components/contatos/EmptyStateContatos.jsx
export function EmptyStateContatos({ onAdicionar }) {
  return (
    <div className="flex flex-col items-center">
      <button onClick={onAdicionar} className="w-40 h-40">
        <img
          src="/figura.png"
          alt="Adicionar Contato"
          className="object-contain"
        />
      </button>

      <p className="text-center text-gray-500 text-sm mt-4">
        Toque no ‘+’ para adicionar <br />
        alguém em quem você confia.
      </p>
    </div>
  );
}
