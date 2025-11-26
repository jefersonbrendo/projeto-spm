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
    <div className="relative w-screen min-h-screen flex flex-col items-center justify-start px-4 overflow-hidden">
      
      {/* Fundo com SVG */}
      <div className="absolute inset-0 z-0">
        <img
          src="/wave-bg.svg"
          alt="Ondas de fundo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 w-full flex flex-col items-center pt-12">

        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="w-24 h-24 mb-4" />

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
    </div>
  );
}
