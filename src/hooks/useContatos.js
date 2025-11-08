/* eslint-disable react-hooks/exhaustive-deps */
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

export function useContatos() {
  const [contatos, setContatos] = useState(() => {
    // 🔹 tenta carregar do cache local primeiro
    const cache = localStorage.getItem("contatosEmergencia");
    return cache ? JSON.parse(cache) : [];
  });

  // ✅ Atualiza contatos e salva em cache
  const atualizarCache = (lista) => {
    setContatos(lista);
    localStorage.setItem("contatosEmergencia", JSON.stringify(lista));
  };

  // 🔄 Buscar contatos do Firestore
  const fetchContatos = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const contatosRef = collection(db, "usuarios", user.uid, "contatosEmergencia");
      const snapshot = await getDocs(contatosRef);
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      atualizarCache(lista);
    } catch (err) {
      console.error("Erro ao buscar contatos:", err);
    }
  };

  useEffect(() => {
    fetchContatos();
  }, []);

  // ✅ Adicionar
  const adicionarContato = async ({ nome, telefone }) => {
    const user = auth.currentUser;
    if (!user) return;

    const contatosRef = collection(db, "usuarios", user.uid, "contatosEmergencia");
    const novoContato = {
      nome,
      telefone,
      criadoEm: new Date(),
    };

    await addDoc(contatosRef, novoContato);
    await fetchContatos(); // Atualiza e salva no cache
  };

  // ✏️ Editar
  const editarContato = async (id, { nome, telefone }) => {
    const user = auth.currentUser;
    if (!user) return;

    const contatoRef = doc(db, "usuarios", user.uid, "contatosEmergencia", id);
    await updateDoc(contatoRef, { nome, telefone });
    await fetchContatos();
  };

  // ❌ Deletar
  const deletarContato = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(doc(db, "usuarios", user.uid, "contatosEmergencia", id));
    await fetchContatos();
  };

  return {
    contatos,
    fetchContatos,
    adicionarContato,
    editarContato,
    deletarContato,
  };
}
