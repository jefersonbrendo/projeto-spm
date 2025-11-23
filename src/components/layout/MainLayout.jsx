import { HomeHeader } from "../home/HomeHeader";
import { HomeBottomNav } from "../home/HomeBottomNav";

export function MainLayout({ children, title = "HOME" }) {
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <HomeHeader title={title} />

      <div className="flex-1 flex flex-col w-full">
        {children}
      </div>

      <HomeBottomNav />
    </div>
  );
}
