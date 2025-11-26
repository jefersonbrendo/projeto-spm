import { MainLayout } from "../components/layout/MainLayout";
import { ConfigBackHeader } from "../components/config/ConfigBackHeader";

export default function Privacidade() {
  return (
    <MainLayout title="Privacidade">
      <div className="px-4 py-6 space-y-4">
        <ConfigBackHeader title="Privacidade e Segurança" />
        <h2 className="text-xl font-semibold text-gray-800">Privacidade & Segurança</h2>

        <div className="bg-white p-5 rounded-2xl shadow text-gray-700 space-y-4">
          <p>
            Suas informações são armazenadas com segurança e nunca são compartilhadas sem
            permissão.
          </p>
          <p>
            Você pode solicitar exclusão da conta a qualquer momento.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
