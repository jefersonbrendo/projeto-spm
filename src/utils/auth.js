import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export function logoutUsuario() {
  signOut(auth)
    .then(() => {
      window.location.href = "/login";
    })
    .catch((err) => {
      console.error("Erro ao sair:", err);
    });
}
