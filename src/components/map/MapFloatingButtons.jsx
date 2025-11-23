import IconMais from "../../assets/icons/botao-adicionar.svg";
import IconAlerta from "../../assets/icons/botao-alerta.svg";
import IconCheck from "../../assets/icons/botao-check.svg";

export function MapFloatingButtons() {
  return (
    <div className="fixed bottom-24 right-6 flex flex-col items-end gap-3 z-50">

      <button className="transition-all duration-300">
        <img src={IconMais} className="w-14 h-14" alt="Adicionar" />
      </button>

      <button className="transition-all duration-300">
        <img src={IconAlerta} className="w-14 h-14" alt="Alerta" />
      </button>

      <button className="transition-all duration-300">
        <img src={IconCheck} className="w-14 h-14" alt="Confirmar" />
      </button>
    </div>
  );
}
