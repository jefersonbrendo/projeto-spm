// src/hooks/useUsuarioAtual.js
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useUsuarioAtual() {
  const [usuarioNome, setUsuarioNome] = useState(null);

  useEffect(() => {
    async function fetchUsuario() {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "usuarios", user.uid);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setUsuarioNome(snapshot.data().usuario);
      } else {
        setUsuarioNome(user.displayName || "Usuário");
      }
    }

    fetchUsuario();
  }, []);

  return usuarioNome;
}
