// src/components/home/HomeBottomNav.jsx
import IconHome from "../../assets/icons/Home.png";
import IconMapa from "../../assets/icons/Mapa.png";
import IconMartelo from "../../assets/icons/Martelo.png";
import IconConfig from "../../assets/icons/Configuracao.png";

export function HomeBottomNav() {
  return (
    <div className="bottom-gradient px-6 py-3 flex justify-between items-center shadow-inner">
      <button className="w-10 h-10 rounded-full border border-white flex items-center justify-center bg-[#9576F7]">
        <img src={IconHome} alt="Home" className="w-5 h-5 invert" />
      </button>
      <button className="p-2">
        <img src={IconMapa} alt="Mapa" className="w-6 h-6" />
      </button>
      <button className="p-2">
        <img src={IconMartelo} alt="Leis" className="w-6 h-6" />
      </button>
      <button className="p-2">
        <img src={IconConfig} alt="Configurações" className="w-6 h-6" />
      </button>
    </div>
  );
}
