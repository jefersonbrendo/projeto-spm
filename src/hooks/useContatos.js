// src/hooks/useContatos.js
import { useCallback, useEffect, useState } from "react";
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
  const [contatos, setContatos] = useState([]);

  const fetchContatos = useCallback(async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setContatos([]);
        return;
      }

      const contatosRef = collection(
        db,
        "usuarios",
        user.uid,
        "contatosEmergencia"
      );
      const snapshot = await getDocs(contatosRef);

      const lista = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      setContatos(lista);
    } catch (err) {
      console.error("Erro ao buscar contatos:", err);
    }
  }, []);

  useEffect(() => {
    fetchContatos();
  }, [fetchContatos]);

  const adicionarContato = async ({ nome, telefone }) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
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

      await fetchContatos();
    } catch (err) {
      console.error("Erro ao adicionar contato:", err);
    }
  };

  const editarContato = async (id, { nome, telefone }) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const contatoRef = doc(
        db,
        "usuarios",
        user.uid,
        "contatosEmergencia",
        id
      );

      await updateDoc(contatoRef, { nome, telefone });
      await fetchContatos();
    } catch (err) {
      console.error("Erro ao editar contato:", err);
    }
  };

  const deletarContato = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "usuarios", user.uid, "contatosEmergencia", id));
      await fetchContatos();
    } catch (err) {
      console.error("Erro ao deletar contato:", err);
    }
  };

  return {
    contatos,
    adicionarContato,
    editarContato,
    deletarContato,
  };
}
