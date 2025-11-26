import { useNavigate } from "react-router-dom";
import { logoutUsuario } from "../../utils/auth.js";

export function ConfigContent() {
  const navigate = useNavigate();

  const opcoes = [
    {
      titulo: "Editar Perfil",
      icon: "person",
      rota: "/config/editar",
    },
    {
      titulo: "Privacidade & Segurança",
      icon: "shield_person",
      rota: "/config/privacidade",
    },
    {
      titulo: "Termos de Uso",
      icon: "description",
      rota: "/config/termos",
    },
    {
      titulo: "Sobre o App",
      icon: "info",
      rota: "/config/sobre",
    },
  ];

  return (
    <div className="flex-1 w-full px-4 py-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Configurações</h2>

      <div className="bg-white rounded-2xl shadow-md p-4 space-y-3">
        {opcoes.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.rota)}
            className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow active:scale-[0.98] transition"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-purple-600 text-3xl">
                {item.icon}
              </span>
              <span className="font-medium text-gray-800">{item.titulo}</span>
            </div>

            <span className="material-symbols-outlined text-gray-500">
              chevron_right
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={logoutUsuario}
        className="w-full bg-red-500 text-white py-3 rounded-xl shadow-md font-medium active:scale-[0.98] transition"
      >
        Sair da Conta
      </button>
    </div>
  );
}
