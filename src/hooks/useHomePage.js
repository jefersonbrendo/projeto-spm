// src/hooks/useHomePage.js
import { useState } from "react";
import { useContatos } from "./useContatos";

export function useHomePage() {
  const { contatos, adicionarContato, editarContato, deletarContato } =
    useContatos();

  const [aberto, setAberto] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [contatoEditando, setContatoEditando] = useState(null);

  const toggleMenu = () => {
    setAberto((prev) => !prev);
  };

  const handleToggleExpand = (index) => {
    setExpandedIndex((atual) => (atual === index ? null : index));
  };

  const abrirModalNovo = () => {
    setContatoEditando(null);
    setMostrarModal(true);
  };

  const abrirModalEditar = (contato) => {
    setContatoEditando(contato);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setContatoEditando(null);
  };

  const salvarContato = async ({ nome, telefone }) => {
    try {
      if (contatoEditando) {
        await editarContato(contatoEditando.id, { nome, telefone });
      } else {
        await adicionarContato({ nome, telefone });
      }
    } catch (err) {
      console.error("Erro ao salvar contato:", err);
    } finally {
      fecharModal();
    }
  };

  const handleDeletarContato = async (id) => {
    try {
      await deletarContato(id);
    } catch (err) {
      console.error("Erro ao deletar contato:", err);
    }
  };

  const sendMensagem = (contato) => {
    try {
      const raw = contato.telefone || "";
      const digits = raw.replace(/\D/g, "");
      // assume Brazil (+55) if number has 11 digits
      let phone = digits;
      if (digits.length === 11) {
        if (!phone.startsWith("55")) phone = `55${phone}`;
      }

      const text = `Olá ${contato.nome}, estou enviando uma mensagem rápida pelo app SAS.`;

      // Prefer WhatsApp (wa.me) when we have international digits
      if (phone && phone.length >= 8) {
        const wa = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(wa, "_blank", "noopener");
        return;
      }

      // Fallback para SMS / telefone
      if (phone) {
        const tel = `tel:${phone}`;
        window.location.href = tel;
        return;
      }

      // Se não há telefone, apenas alertar
      alert(`Nenhum telefone disponível para ${contato.nome}`);
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
    }
  };

  return {
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
    sendMensagem,
  };
}
