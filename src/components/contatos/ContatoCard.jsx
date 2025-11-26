// src/components/contatos/ContatoCard.jsx
import IconEditar from "../../assets/icons/botao-editar.svg";
import IconExcluir from "../../assets/icons/botao-excluir.png";
import IconEnviar from "../../assets/icons/botao-enviar.svg";

export function ContatoCard({
  contato,
  isExpanded,
  onToggleExpand,
  onEditar,
  onDeletar,
  onEnviar, // ainda não tem lógica, mas mantenho a prop se quiser usar depois
}) {
  return (
    <div className="bg-gray-100 rounded-xl shadow-md px-4 py-3 space-y-2" onClick={onToggleExpand}>
      {/* Cabeçalho do Contato */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-purple-700">
              person
            </span>
          </div>
          <p className="text-sm font-medium text-gray-800">{contato.nome}</p>
        </div>
        <button
          className="text-purple-600 hover:text-purple-800"
          
        >
          <span className="material-symbols-outlined">
            {isExpanded ? "expand_less" : "expand_more"}
          </span>
        </button>
      </div>

      {/* Botões de Ação */}
      {isExpanded && (
        <div className="mt-3 flex justify-between items-center gap-2">
          <button
            onClick={onEditar}
            className="flex flex-row items-center justify-center flex-1 bg-yellow-300 hover:bg-yellow-400 text-black text-xs font-medium py-2 rounded-full shadow gap-2"
          >
            <img src={IconEditar} alt="Editar" className="w-4 h-4" />
            EDITAR
          </button>

          <button
            onClick={onDeletar}
            className="flex flex-row items-center justify-center flex-1 bg-red-400 hover:bg-red-500 text-xs font-medium py-2 rounded-full shadow gap-2"
          >
            <img src={IconExcluir} alt="Excluir" className="w-4 h-4" />
            EXCLUIR
          </button>

          <button
            onClick={onEnviar}
            className="flex flex-row items-center justify-center flex-1 bg-green-300 hover:bg-green-400 text-black text-xs font-medium py-2 rounded-full shadow gap-2"
          >
            <img src={IconEnviar} alt="Enviar" className="w-4 h-4" />
            ENVIAR
          </button>
        </div>
      )}
    </div>
  );
}
