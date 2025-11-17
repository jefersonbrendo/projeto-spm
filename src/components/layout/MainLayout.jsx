// src/components/layout/MainLayout.jsx
import { HomeHeader } from "../home/HomeHeader";
import { HomeBottomNav } from "../home/HomeBottomNav";

export function MainLayout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-white overflow-hidden">
      {/* Header fixo no topo */}
      <HomeHeader />

      {/* Área central que cresce e onde o conteúdo da página vive */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {children}
      </div>

      {/* Navegação inferior */}
      <HomeBottomNav />
    </div>
  );
}
