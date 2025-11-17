// src/components/contatos/ListaContatos.jsx
import { ContatoCard } from "./ContatoCard";

export function ListaContatos({
  contatos,
  expandedIndex,
  onToggleExpand,
  onEditarContato,
  onDeletarContato,
  onEnviar,
}) {
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
          onEnviar={() => onEnviar && onEnviar(contato)}
        />
      ))}
    </div>
  );
}
