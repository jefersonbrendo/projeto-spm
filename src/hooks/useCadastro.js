// src/hooks/useCadastro.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export function useCadastro() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    // 🔍 Validações (iguais às atuais)
    if (usuario.trim().length < 3) {
      setErro("O nome de usuário deve ter pelo menos 3 caracteres.");
      setLoading(false);
      return;
    }

    const telefoneRegex = /^\d{11}$/;
    if (!telefoneRegex.test(telefone)) {
      setErro("O telefone deve conter 11 números (DDD + número).");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErro("Por favor, insira um e-mail válido.");
      setLoading(false);
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      setLoading(false);
      return;
    }

    // 🔐 Firebase cadastro
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      const user = userCredential.user;

      // Criar documento do usuário
      await setDoc(doc(db, "usuarios", user.uid), {
        usuario,
        telefone,
        email,
        criadoEm: new Date(),
      });

      navigate("/login", { state: { cadastroSucesso: true } });
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setErro("Este e-mail já está em uso.");
      } else if (err.code === "auth/invalid-email") {
        setErro("E-mail inválido.");
      } else {
        setErro("Erro ao cadastrar: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    showPassword,
    toggleShowPassword,
    usuario,
    setUsuario,
    telefone,
    setTelefone,
    email,
    setEmail,
    senha,
    setSenha,
    erro,
    sucesso,
    loading,
    handleCadastro,
  };
}
