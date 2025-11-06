// src/pages/Cadastro.jsx
import { useCadastro } from "../hooks/useCadastro";
import { CadastroForm } from "../components/auth/CadastroForm";
import { CadastroSocialButtons } from "../components/auth/CadastroSocialButtons";

export default function Cadastro() {
  const {
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
  } = useCadastro();

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-purple-700 via-purple-500 to-white flex flex-col items-center px-4 pt-4 relative">
      {/* Logo */}
      <img src="/logo.png" alt="Logo" className="w-24 h-24 mt-4" />

      {/* Card de cadastro */}
      <CadastroForm
        usuario={usuario}
        setUsuario={setUsuario}
        telefone={telefone}
        setTelefone={setTelefone}
        email={email}
        setEmail={setEmail}
        senha={senha}
        setSenha={setSenha}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        erro={erro}
        sucesso={sucesso}
        loading={loading}
        handleCadastro={handleCadastro}
      />

      {/* Botões sociais */}
      <CadastroSocialButtons />
    </div>
  );
}
