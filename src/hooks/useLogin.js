// src/hooks/useLogin.js
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export function useLogin() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cadastroSucesso, setCadastroSucesso] = useState(
    location.state?.cadastroSucesso || false
  );
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cadastroSucesso) {
      const timer = setTimeout(() => {
        setCadastroSucesso(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [cadastroSucesso]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/home");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    cadastroSucesso,
    email,
    setEmail,
    senha,
    setSenha,
    showPassword,
    toggleShowPassword,
    erro,
    loading,
    handleLogin,
  };
}
