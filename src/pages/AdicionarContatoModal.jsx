import { useEffect, useState } from "react";

export default function ModalAdicionarContato({
  onClose,
  onSalvar,
  contatoExistente = null,
}) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    setNome(contatoExistente?.nome || "");
    setTelefone(contatoExistente?.telefone || "");
  }, [contatoExistente]);

  const handleSalvar = () => {
    const telefoneLimpo = telefone.replace(/\D/g, ""); // remove tudo que não é número

    if (nome.trim() && telefoneLimpo.length === 11) {
      onSalvar({ nome, telefone: telefoneLimpo });
      setNome("");
      setTelefone("");
    } else {
      alert(
        "Preencha corretamente o nome e um telefone válido com 11 dígitos."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/10">
      <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-purple-300 flex items-center justify-center mr-2">
            <span className="material-symbols-outlined text-white text-xl">
              person
            </span>
          </div>
          <h2 className="text-sm font-semibold text-gray-800 flex-1">
            {contatoExistente ? "Editar Contato" : "Adicionar Contato"}
          </h2>

          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Ex: Jeferson Brendo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="tel"
              placeholder="(85) 93243-4343"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 text-xs px-3 py-2 rounded-md">
            ⚠️ Certifique-se de adicionar apenas pessoas de confiança que possam
            te ajudar em situações de emergência.
          </div>
        </div>

        {/* Botões */}
        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="bg-purple-600 hover:bg-purple-700 text-sm text-white px-4 py-2 rounded-md"
          >
            {contatoExistente ? "Salvar Alterações" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
