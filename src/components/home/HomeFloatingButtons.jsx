// src/components/home/HomeFloatingButtons.jsx
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-24 right-6 flex flex-col items-end gap-3 z-50">
      {aberto && (
        <>
          <button onClick={onAdicionar} className="transition-all duration-300">
            <img src={IconMais} alt="Adicionar" className="w-14 h-14" />
          </button>

          <button
            onClick={() => navigate("/mapa-delegacias")}
            className="transition-all duration-300"
            title="Ver mapa de delegacias"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <span className="text-white text-xl">🗺️</span>
            </div>
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
