// src/components/auth/CadastroForm.jsx
import { Link } from "react-router-dom";
import IconEsconderSenha from "../../assets/icons/ocultar-senha.svg"
import IconRevelarSenha from "../../assets/icons/revelar-senha.svg"

export function CadastroForm({
  usuario,
  setUsuario,
  telefone,
  setTelefone,
  email,
  setEmail,
  senha,
  setSenha,
  showPassword,
  toggleShowPassword,
  erro,
  sucesso,
  loading,
  handleCadastro,
}) {
  return (
    <div className="bg-purple-100 mt-4 rounded-2xl shadow-lg w-full max-w-sm p-6 z-10">
      <h2 className="text-2xl font-bold text-center text-black mb-1">
        CADASTRO
      </h2>
      <p className="text-center text-sm text-gray-700 mb-6">
        Crie uma conta gratuita
      </p>

      <form onSubmit={handleCadastro}>
        {/* Usuário */}
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

        {/* Telefone */}
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

        {/* E-mail */}
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

        {/* Botão cadastrar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white font-medium py-2 rounded-full mb-4 hover:bg-purple-700 transition"
        >
          {loading ? "Cadastrando..." : "Cadastrar-se"}
        </button>
      </form>

      {/* Mensagens de erro / sucesso */}
      {erro && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4 text-sm whitespace-wrap">
          <p className="font-bold">❌ Erro:</p>
          <p>{erro}</p>
        </div>
      )}
      {sucesso && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 rounded mb-4 text-sm">
          <p className="font-bold">✅ Sucesso!</p>
          <p>{sucesso}</p>
        </div>
      )}

      {/* Link para login */}
      <div className="text-sm text-center text-gray-700 mt-4">
        Tem uma conta?{" "}
        <Link to="/login" className="text-blue-700 font-medium">
          Conecte-se
        </Link>
      </div>
    </div>
  );
}
