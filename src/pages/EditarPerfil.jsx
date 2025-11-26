import { MainLayout } from "../components/layout/MainLayout";
import { ConfigBackHeader } from "../components/config/ConfigBackHeader";

export default function EditarPerfil() {
  return (
    <MainLayout title="Editar Perfil">
      <div className="px-4 py-6 space-y-4">
        <ConfigBackHeader title="Editar Perfil" />

        <h2 className="text-xl font-semibold text-gray-800">Editar Perfil</h2>

        <div className="bg-white p-5 rounded-2xl shadow space-y-4">
          <input
            type="text"
            placeholder="Seu nome"
            className="w-full border rounded-xl px-4 py-3 bg-gray-100"
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            className="w-full border rounded-xl px-4 py-3 bg-gray-100"
          />

          <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium">
            Salvar
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
