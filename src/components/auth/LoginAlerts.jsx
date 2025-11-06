// src/components/auth/LoginAlerts.jsx
export function LoginAlerts({ cadastroSucesso, erro }) {
  if (!cadastroSucesso && !erro) return null;

  return (
    <>
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
    </>
  );
}
