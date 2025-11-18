// src/components/home/HomeBottomNav.jsx
import { useLocation, useNavigate } from "react-router-dom";

import IconHome from "../../assets/icons/Home.png";
import IconMapa from "../../assets/icons/Mapa.png";
import IconMartelo from "../../assets/icons/Martelo.png";
import IconConfig from "../../assets/icons/Configuracao.png";

export function HomeBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: "/home", icon: IconHome },
    { path: "/mapa", icon: IconMapa },
    { path: "/leis", icon: IconMartelo },
    { path: "/config", icon: IconConfig },
  ];

  return (
    <div className="bottom-gradient px-6 py-3 flex justify-between items-center shadow-inner">
      {tabs.map((tab, index) => {
        const ativo = location.pathname === tab.path;

        return (
          <button
            key={index}
            onClick={() => navigate(tab.path)}
            className={`p-2 flex items-center justify-center transition-all ${
              ativo
                ? "bg-[#9576F7] border border-white rounded-full w-10 h-10"
                : "w-10 h-10"
            }`}
          >
            <img
              src={tab.icon}
              alt="icon"
              className={`w-6 h-6 transition ${
                ativo ? "invert brightness-200" : ""
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
