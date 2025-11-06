import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
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

    // 🔍 Validações
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

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-purple-700 via-purple-500 to-white flex flex-col items-center px-4 pt-4 relative">
      <img src="/logo.png" alt="Logo" className="w-24 h-24 mt-4" />

      <div className="bg-purple-100 mt-4 rounded-2xl shadow-lg w-full max-w-sm p-6 z-10">
        <h2 className="text-2xl font-bold text-center text-black mb-1">
          CADASTRO
        </h2>
        <p className="text-center text-sm text-gray-700 mb-6">
          Crie uma conta gratuita
        </p>

        <form onSubmit={handleCadastro}>
          <div className="flex items-center bg-gray-200 px-3 py-2 rounded-md mb-4">
            <span className="material-symbols-outlined text-purple-700 mr-2 text-xl">
              person
            </span>
            <input
              type="text"
              placeholder="Usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
              required
            />
          </div>

          <div className="flex items-center bg-gray-200 px-3 py-2 rounded-md mb-4">
            <span className="material-symbols-outlined text-purple-700 mr-2 text-xl">
              call
            </span>
            <input
              type="tel"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => {
                const rawValue = e.target.value;
                const numericValue = rawValue.replace(/\D/g, "");
                setTelefone(numericValue);
              }}
              className="bg-transparent outline-none w-full text-sm"
              required
            />
          </div>

          <div className="flex items-center bg-gray-200 px-3 py-2 rounded-md mb-4">
            <span className="material-symbols-outlined text-purple-700 mr-2 text-xl">
              mail
            </span>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
              required
            />
          </div>

          <div className="flex items-center bg-gray-200 px-3 py-2 rounded-md mb-6">
            <span className="material-symbols-outlined text-purple-700 mr-2 text-xl">
              lock
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="bg-transparent outline-none w-full text-sm"
              required
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="text-gray-500 text-sm"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-medium py-2 rounded-full mb-4 hover:bg-purple-700 transition"
          >
            {loading ? "Cadastrando..." : "Cadastrar-se"}
          </button>
        </form>

        {erro && <p className="text-red-500 text-sm mt-2">{erro}</p>}
        {sucesso && <p className="text-green-600 text-sm mt-2">{sucesso}</p>}

        <div className="text-sm text-center text-gray-700 mt-4">
          Tem uma conta?{" "}
          <Link to="/login" className="text-blue-700 font-medium">
            Conecte-se
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 mt-6">
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-full shadow text-sm">
          <img
            src="https://img.icons8.com/color/24/google-logo.png"
            alt="Google"
          />
          Google
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-full shadow text-sm">
          <img
            src="https://img.icons8.com/fluency/24/facebook-new.png"
            alt="Facebook"
          />
          Facebook
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-full shadow text-sm">
          <img
            src="https://img.icons8.com/ios-filled/24/mac-os.png"
            alt="Apple"
          />
          Apple
        </button>
      </div>
    </div>
  );
}
