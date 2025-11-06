export function AuthLayout({ children }) {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-purple-700 via-purple-500 to-white flex flex-col items-center px-4 pt-4 relative">
      {/* Logo */}
      <img src="/logo.png" alt="Logo" className="w-24 h-24 mt-4" />

      {children}
    </div>
  );
}
