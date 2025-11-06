// src/components/auth/LoginForm.jsx
import { Link } from "react-router-dom";

import IconEsconderSenha from "../../assets/icons/ocultar-senha.svg";
import IconRevelarSenha from "../../assets/icons/revelar-senha.svg";

export function LoginForm({
  email,
  setEmail,
  senha,
  setSenha,
  showPassword,
  toggleShowPassword,
  loading,
  handleLogin,
}) {
  return (
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
          onClick={toggleShowPassword}
          type="button"
          className="focus:outline-none"
        >
          <img
            src={showPassword ? IconEsconderSenha : IconRevelarSenha}
            alt={showPassword ? "Ocultar senha" : "Revelar senha"}
            className="w-4 h-4 opacity-70 hover:opacity-100 transition"
          />
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
  );
}
