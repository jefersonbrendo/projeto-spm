import { MainLayout } from "../components/layout/MainLayout";
import { ConfigBackHeader } from "../components/config/ConfigBackHeader";

export default function Termos() {
  return (
    <MainLayout title="Termos de Uso">
      <div className="px-4 py-6">
        <ConfigBackHeader title="Privacidade e Segurança" />
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Termos de Uso</h2>

        <div className="bg-white p-5 rounded-2xl shadow text-gray-700 space-y-3 text-sm">
          <p>Este aplicativo não substitui autoridades ou serviços oficiais.</p>
          <p>Use os recursos de alerta com responsabilidade.</p>
          <p>Em caso de emergência real, contate a polícia: <b>190</b>.</p>
        </div>
      </div>
    </MainLayout>
  );
}
