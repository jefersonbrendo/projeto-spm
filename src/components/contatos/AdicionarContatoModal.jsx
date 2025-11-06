import { useEffect, useState } from "react";

export default function AdicionarContatoModal({
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
    const telefoneLimpo = telefone.replace(/\D/g, "");

    if (!nome.trim() || telefoneLimpo.length !== 11) {
      alert("Preencha nome e um telefone válido com 11 dígitos.");
      return;
    }

    onSalvar({
      nome: nome.trim(),
      telefone: telefoneLimpo,
    });

    setNome("");
    setTelefone("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal */}
      <div
        className="w-11/12 max-w-md bg-white rounded-2xl p-6 shadow-lg"
        style={{
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {contatoExistente ? "Editar contato" : "Adicionar contato"}
        </h2>

        <div className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Nome
            </label>
            <input
              type="text"
              placeholder="Nome do contato"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B00FF]/40 focus:border-[#8B00FF] transition"
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Telefone
            </label>
            <input
              type="tel"
              placeholder="(85) 9 9999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B00FF]/40 focus:border-[#8B00FF] transition"
            />
          </div>
        </div>

        {/* ⚠️ Aviso */}
        <div className="flex items-start gap-2 mt-5 text-xs text-gray-600 leading-snug">
          <span className="text-yellow-500 text-sm"></span>
          <p>
            ⚠️ Certifique-se de adicionar apenas pessoas de confiança que possam
            te ajudar em situações de emergência.
          </p>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            className="px-4 py-2 text-sm font-medium text-white rounded-md shadow-md transition"
            style={{
              background: "linear-gradient(90deg, #8B00FF 0%, #BF00FF 100%)",
            }}
          >
            {contatoExistente ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
