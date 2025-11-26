export function CenterMapButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        absolute bottom-12 right-5
        w-14 h-14
        border border-purple-300
        shadow-xl
        rounded-full
        flex items-center justify-center
        active:scale-95
        transition
        z-[9999]
      "
    >
      <img
        src="/icons/center-map.png"
        alt="Centralizar mapa"
        className="w-14 h-14"
      />
    </button>
  );
}
