import AdicionarContatoModal from "../components/contatos/AdicionarContatoModal";

import { MainLayout } from "../components/layout/MainLayout";
import { useHomePage } from "../hooks/useHomePage";

import { EmptyStateContatos } from "../components/contatos/EmptyStateContatos";
import { ListaContatos } from "../components/contatos/ListaContatos";
import { HomeHeader } from "../components/home/HomeHeader";
import { HomeBottomNav } from "../components/home/HomeBottomNav";
import { HomeFloatingButtons } from "../components/home/HomeFloatingButtons";

export default function Home() {
  const {
    contatos,
    aberto,
    toggleMenu,
    mostrarModal,
    abrirModalNovo,
    abrirModalEditar,
    fecharModal,
    expandedIndex,
    handleToggleExpand,
    salvarContato,
    handleDeletarContato,
    contatoEditando,
  } = useHomePage();

  return (
    <MainLayout>
      <div className="flex flex-col px-4 py-6 bg-white rounded-bl-4xl rounded-br-4xl flex-1 w-full overflow-y-auto">
        {contatos.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <EmptyStateContatos onAdicionar={abrirModalNovo} />
          </div>
        ) : (
          <ListaContatos
            contatos={contatos}
            expandedIndex={expandedIndex}
            onToggleExpand={handleToggleExpand}
            onEditarContato={abrirModalEditar}
            onDeletarContato={handleDeletarContato}
          />
        )}
      </div>

      <HomeFloatingButtons
        aberto={aberto}
        onToggleMenu={toggleMenu}
        onAdicionar={abrirModalNovo}
        onAlerta={() => console.log("Alerta acionado!")}
      />

      {mostrarModal && (
        <AdicionarContatoModal
          onClose={fecharModal}
          onSalvar={salvarContato}
          contatoExistente={contatoEditando}
        />
      )}
    </MainLayout>
  );
}
