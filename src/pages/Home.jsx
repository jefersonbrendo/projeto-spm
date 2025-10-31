import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IconHome from "../assets/icons/Home.png";
import IconMapa from "../assets/icons/Mapa.png";
import IconMartelo from "../assets/icons/Martelo.png";
import IconConfig from "../assets/icons/Configuracao.png";
import IconMais from "../assets/icons/botao-adicionar.svg";
import IconAlerta from "../assets/icons/botao-alerta.svg";
import IconFechar from "../assets/icons/botao-esconder.svg";

export default function Home() {
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col justify-between relative bottom-gradient">
      {/* Top Header */}
      <div className="header-gradient w-full h-26 flex items-center px-4  shadow-md">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 mr-2" />
        <h1 className="text-white font-semibold text-lg">HOME</h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center px-4 py-6 bg-white rounded-bl-4xl rounded-br-4xl flex-1 w-full">

        <img
          src="/figura.png"
          alt="Adicionar Contato"
          className="w-40 h-40 object-contain"
        />
        <p className="text-center text-gray-500 text-sm mt-4">
          Toque no ‘+’ para adicionar <br />
          alguém em quem você confia.
        </p>
      </div>

      <div className="fixed bottom-24 right-6 flex flex-col items-end gap-3 z-50">
        {/* Botões secundários visíveis apenas se estiver aberto */}
        {aberto && (
          <>
            <button
              onClick={() => console.log("Adicionar contato")}
              className="transition-all duration-300"
            >
              <img src={IconMais} alt="Adicionar" className="w-14 h-14" />
            </button>

            <button
              onClick={() => console.log("Acionar alerta")}
              className="transition-all duration-300"
            >
              <img src={IconAlerta} alt="Alerta" className="w-14 h-14" />
            </button>
          </>
        )}

        {/* Botão toggle (abre/fecha os outros) */}
        <button
          onClick={() => setAberto(!aberto)}
          className="transition-all duration-300"
        >
          <img src={IconFechar} alt="Abrir/Fechar" className="w-14 h-14" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-gradient px-6 py-3 flex justify-between items-center   shadow-inner ">
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
    </div>
  );
}
