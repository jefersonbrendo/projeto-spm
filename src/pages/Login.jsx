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
    <div className="w-screen min-h-screen bg-gradient-to-b from-purple-700 via-purple-500 to-white flex flex-col items-center px-4 pt-4 relative">
      <LoginAlerts cadastroSucesso={cadastroSucesso} erro={erro} />

      {/* Logo */}
      <img src="/logo.png" alt="Logo" className="w-24 h-24 mt-4" />

      {/* Card de Login (extraído para componente) */}
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
  );
}
