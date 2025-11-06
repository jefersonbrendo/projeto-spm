// src/components/layout/MainLayout.jsx
import { HomeHeader } from "../home/HomeHeader";
import { HomeBottomNav } from "../home/HomeBottomNav";

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {/* Header fixo no topo */}
      <HomeHeader />

      {/* Área central que cresce e onde o conteúdo da página vive */}
      <div className="flex-1 flex flex-col w-full">
        {children}
      </div>

      {/* Navegação inferior */}
      <HomeBottomNav />
    </div>
  );
}
