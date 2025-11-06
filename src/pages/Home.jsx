import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import AdicionarContatoModal from "./AdicionarContatoModal";

// Ícones
import IconHome from "../assets/icons/Home.png";
import IconMapa from "../assets/icons/Mapa.png";
import IconMartelo from "../assets/icons/Martelo.png";
import IconConfig from "../assets/icons/Configuracao.png";
import IconMais from "../assets/icons/botao-adicionar.svg";
import IconAlerta from "../assets/icons/botao-alerta.svg";
import IconFechar from "../assets/icons/botao-esconder.svg";
import IconEditar from "../assets/icons/botao-editar.svg";
import IconExcluir from "../assets/icons/botao-excluir.png";
import IconEnviar from "../assets/icons/botao-enviar.svg";

export default function Home() {
  const navigate = useNavigate();

  const [aberto, setAberto] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [contatos, setContatos] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [contatoEditando, setContatoEditando] = useState(null);

  // 🔄 Função para buscar contatos
  const fetchContatos = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const contatosRef = collection(
        db,
        "usuarios",
        user.uid,
        "contatosEmergencia"
      );
      const snapshot = await getDocs(contatosRef);

      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setContatos(lista);
    } catch (err) {
      console.error("Erro ao buscar contatos:", err);
    }
  };

  useEffect(() => {
    fetchContatos();
  }, []);

  // ✅ Adicionar ou Editar Contato
  const salvarContato = async ({ nome, telefone }) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      if (contatoEditando) {
        const contatoRef = doc(
          db,
          "usuarios",
          user.uid,
          "contatosEmergencia",
          contatoEditando.id
        );
        await updateDoc(contatoRef, { nome, telefone });
      } else {
        const contatosRef = collection(
          db,
          "usuarios",
          user.uid,
          "contatosEmergencia"
        );
        await addDoc(contatosRef, {
          nome,
          telefone,
          criadoEm: new Date(),
        });
      }

      await fetchContatos();
    } catch (err) {
      console.error("Erro ao salvar contato:", err);
    } finally {
      setMostrarModal(false);
      setContatoEditando(null);
    }
  };

  // ❌ Deletar Contato
  const deletarContato = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await deleteDoc(doc(db, "usuarios", user.uid, "contatosEmergencia", id));
      await fetchContatos();
    } catch (err) {
      console.error("Erro ao deletar contato:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-white">
      {/* 🔝 Top Header */}
      <div className="header-gradient w-full h-26 flex items-center px-4 shadow-md">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 mr-2" />
        <h1 className="text-white font-semibold text-lg">HOME</h1>
      </div>

      {/* 📋 Conteúdo Principal */}
      <div
        className={`flex flex-col items-center ${
          contatos.length === 0 ? "justify-center" : "justify-start"
        } px-4 py-6 bg-white rounded-bl-4xl rounded-br-4xl flex-1 w-full overflow-y-auto`}
      >
        {contatos.length === 0 ? (
          <>
            <button
              onClick={() => setMostrarModal(true)}
              className="w-40 h-40"
            >
              <img
                src="/figura.png"
                alt="Adicionar Contato"
                className="object-contain"
              />
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              Toque no ‘+’ para adicionar <br />
              alguém em quem você confia.
            </p>
          </>
        ) : (
          <div className="w-full space-y-3">
            {contatos.map((contato, index) => {
              const isExpanded = expandedIndex === index;

              return (
                <div
                  key={contato.id}
                  className="bg-gray-100 rounded-xl shadow-md px-4 py-3 space-y-2"
                >
                  {/* Cabeçalho do Contato */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-purple-700">
                          person
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        {contato.nome}
                      </p>
                    </div>
                    <button
                      className="text-purple-600 hover:text-purple-800"
                      onClick={() =>
                        setExpandedIndex(isExpanded ? null : index)
                      }
                    >
                      <span className="material-symbols-outlined">
                        {isExpanded ? "expand_less" : "expand_more"}
                      </span>
                    </button>
                  </div>

                  {/* Botões de Ação */}
                  {isExpanded && (
                    <div className="mt-3 flex justify-between items-center gap-2">
                      <button
                        onClick={() => {
                          setContatoEditando(contato);
                          setMostrarModal(true);
                        }}
                        className="flex flex-row items-center justify-center flex-1 bg-yellow-300 hover:bg-yellow-400 text-black text-xs font-medium py-2 rounded-full shadow gap-2"
                      >
                        <img
                          src={IconEditar}
                          alt="Editar"
                          className="w-4 h-4"
                        />
                        EDITAR
                      </button>

                      <button
                        onClick={() => deletarContato(contato.id)}
                        className="flex flex-row items-center justify-center flex-1 bg-red-400 hover:bg-red-500 text-xs font-medium py-2 rounded-full shadow gap-2"
                      >
                        <img
                          src={IconExcluir}
                          alt="Excluir"
                          className="w-4 h-4"
                        />
                        EXCLUIR
                      </button>

                      <button className="flex flex-row items-center justify-center flex-1 bg-green-300 hover:bg-green-400 text-black text-xs font-medium py-2 rounded-full shadow gap-2">
                        <img
                          src={IconEnviar}
                          alt="Enviar"
                          className="w-4 h-4"
                        />
                        ENVIAR
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ➕ Botões Flutuantes */}
      <div className="fixed bottom-24 right-6 flex flex-col items-end gap-3 z-50">
        {aberto && (
          <>
            <button
              onClick={() => setMostrarModal(true)}
              className="transition-all duration-300"
            >
              <img src={IconMais} alt="Adicionar" className="w-14 h-14" />
            </button>

            <button
              onClick={() => console.log("Alerta acionado!")}
              className="transition-all duration-300"
            >
              <img src={IconAlerta} alt="Alerta" className="w-14 h-14" />
            </button>
          </>
        )}

        <button
          onClick={() => setAberto(!aberto)}
          className="transition-all duration-300"
        >
          <img src={IconFechar} alt="Abrir/Fechar" className="w-14 h-14" />
        </button>
      </div>

      {/* 🔽 Navegação Inferior */}
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

      {/* 🪟 Modal */}
      {mostrarModal && (
        <AdicionarContatoModal
          onClose={() => {
            setMostrarModal(false);
            setContatoEditando(null);
          }}
          onSalvar={salvarContato}
          contatoExistente={contatoEditando}
        />
      )}
    </div>
  );
}
