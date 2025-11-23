export function ConfigContent() {
  return (
    <div className="flex-1 w-full px-4 py-6">

      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Configurações
      </h2>

      <div className="bg-gray-100 rounded-xl shadow p-4 text-sm text-gray-700 space-y-4">

        <button className="w-full text-left bg-white rounded-lg shadow px-4 py-3">
          Editar Perfil
        </button>

        <button className="w-full text-left bg-white rounded-lg shadow px-4 py-3">
          Privacidade e Segurança
        </button>

        <button className="w-full text-left bg-white rounded-lg shadow px-4 py-3">
          Termos de Uso
        </button>

        <button className="w-full text-left bg-white rounded-lg shadow px-4 py-3 text-red-500">
          Sair da Conta
        </button>

      </div>

    </div>
  );
}
