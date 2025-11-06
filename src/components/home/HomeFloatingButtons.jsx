// src/components/home/HomeFloatingButtons.jsx
import IconMais from "../../assets/icons/botao-adicionar.svg";
import IconAlerta from "../../assets/icons/botao-alerta.svg";
import IconFechar from "../../assets/icons/botao-esconder.svg";
import IconAbrir from "../../assets/icons/botao-aparecer.png";

export function HomeFloatingButtons({
  aberto,
  onToggleMenu,
  onAdicionar,
  onAlerta,
}) {
  return (
    <div className="fixed bottom-24 right-6 flex flex-col items-end gap-3 z-50">
      {aberto && (
        <>
          <button onClick={onAdicionar} className="transition-all duration-300">
            <img src={IconMais} alt="Adicionar" className="w-14 h-14" />
          </button>

          <button onClick={onAlerta} className="transition-all duration-300">
            <img src={IconAlerta} alt="Alerta" className="w-14 h-14" />
          </button>
        </>
      )}

      {/* Botão principal (gira 180° quando o menu está fechado) */}
      <button
        onClick={onToggleMenu}
        className="transition-transform duration-300"
      >
        <img
          src={aberto ? IconFechar : IconAbrir}
          alt={aberto ? "Esconder" : "Abrir"}
          className="w-14 h-14 transition-all duration-300"
        />
      </button>
    </div>
  );
}
