import { MainLayout } from "../components/layout/MainLayout";
import { ConfigBackHeader } from "../components/config/ConfigBackHeader";

export default function Sobre() {
  return (
    <MainLayout title="Sobre o App">
      <div className="px-4 py-6 space-y-4">
        <ConfigBackHeader title="Privacidade e Segurança" />

        <h2 className="text-xl font-semibold text-gray-800">Sobre o App</h2>

        <div className="bg-white p-5 rounded-2xl shadow text-gray-700 space-y-4">
          <p>
            O SPM é um aplicativo criado para auxiliar pessoas em situações de
            vulnerabilidade.
          </p>

          <p>
            Ele oferece recursos de alerta, localização e informações de
            suporte.
          </p>

          <p className="text-sm text-gray-500 mt-4">Versão 1.0.0</p>
        </div>
      </div>
    </MainLayout>
  );
}
