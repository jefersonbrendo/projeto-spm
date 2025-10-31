import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Login() {
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

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-purple-700 via-purple-500 to-white flex flex-col items-center px-4 pt-4 relative">
      {cadastroSucesso && (
        <div className="bg-green-400 text-white px-4 py-2 rounded-md mb-4 text-sm transition-all duration-300">
          Cadastro realizado com sucesso!
        </div>
      )}

      {erro && (
        <div className="bg-red-400 text-white px-4 py-2 rounded-md mb-4 text-sm transition-all duration-300">
          {erro}
        </div>
      )}

      {/* Logo */}
      <img src="/logo.png" alt="Logo" className="w-24 h-24 mt-4" />

      {/* Card de Login */}
      <form
        onSubmit={handleLogin}
        className="bg-purple-100 mt-4 rounded-2xl shadow-lg w-full max-w-sm p-6 z-10"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-1">LOGIN</h2>
        <p className="text-center text-sm text-gray-700 mb-6">Acessa seu conta</p>

        {/* Email */}
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

        {/* Senha */}
        <div className="flex items-center bg-gray-200 px-3 py-2 rounded-md mb-1">
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

        {/* Esqueceu a senha */}
        <div className="text-right text-xs text-blue-700 mb-4">
          <a href="#">Esqueceu a senha?</a>
        </div>

        {/* Entrar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white font-medium py-2 rounded-full mb-4 hover:bg-purple-700 transition"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* Rodapé */}
        <div className="text-sm text-center text-gray-700">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="text-blue-700 font-medium">
            Cadastre-se
          </Link>
        </div>
      </form>

      {/* Botões Sociais */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition text-sm">
          <img src="https://img.icons8.com/color/24/google-logo.png" alt="Google" />
          Google
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition text-sm">
          <img src="https://img.icons8.com/fluency/24/facebook-new.png" alt="Facebook" />
          Facebook
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-full shadow hover:bg-gray-100 transition text-sm">
          <img src="https://img.icons8.com/ios-filled/24/mac-os.png" alt="Apple" />
          Apple
        </button>
      </div>
    </div>
  );
}
