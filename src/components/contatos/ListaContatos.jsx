import { ContatoCard } from "./ContatoCard";
import { enviarMensagemComLocalizacao } from "../../utils/whatsapp";
import { useUsuarioAtual } from "../../hooks/useUsuarioAtual";

export function ListaContatos({
  contatos,
  expandedIndex,
  onToggleExpand,
  onEditarContato,
  onDeletarContato,
}) {
  const usuarioNome = useUsuarioAtual();

  return (
    <div className="w-full space-y-3">
      {contatos.map((contato, index) => (
        <ContatoCard
          key={contato.id}
          contato={contato}
          isExpanded={expandedIndex === index}
          onToggleExpand={() => onToggleExpand(index)}
          onEditar={() => onEditarContato(contato)}
          onDeletar={() => onDeletarContato(contato.id)}
          onEnviar={() =>
            enviarMensagemComLocalizacao(contato.telefone, usuarioNome)
          }
        />
      ))}
    </div>
  );
}
