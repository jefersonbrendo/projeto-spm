import { useLogin } from "../hooks/useLogin";
import { LoginAlerts } from "../components/auth/LoginAlerts";
import { SocialLoginButtons } from "../components/auth/SocialLoginButtons";
import { LoginForm } from "../components/auth/LoginForm";

export default function Login() {
  const {
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
  } = useLogin();

  return (
    <div className="relative w-screen min-h-screen flex flex-col items-center justify-start px-4 pt-10 overflow-hidden">
      
      {/* Fundo com waves */}
      <div className="absolute inset-0 z-0">
        <img
          src="/wave-bg.svg"
          alt="Ondas de fundo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 w-full flex flex-col items-center ">
        
        {/* Alertas */}
        <LoginAlerts cadastroSucesso={cadastroSucesso} erro={erro} />

        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="w-24 h-24 mt-12" />

        {/* Card de Login */}
        <LoginForm
          email={email}
          setEmail={setEmail}
          senha={senha}
          setSenha={setSenha}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          loading={loading}
          handleLogin={handleLogin}
        />

        {/* Botões Sociais */}
        <SocialLoginButtons />
      </div>
    </div>
  );
}
