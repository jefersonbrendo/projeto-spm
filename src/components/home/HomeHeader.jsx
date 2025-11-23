// src/components/home/HomeHeader.jsx
export function HomeHeader({ title = "HOME" }) {
  return (
    <div className="header-gradient w-full h-26 flex items-center px-4 shadow-md">
      <img src="/logo.png" alt="Logo" className="w-16 h-16 mr-2" />
      <h1 className="text-white font-semibold text-lg uppercase">
        {title}
      </h1>
    </div>
  );
}
