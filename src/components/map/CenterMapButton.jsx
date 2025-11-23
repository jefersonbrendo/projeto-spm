export function CenterMapButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        absolute bottom-24 right-5
        w-14 h-14
        bg-white
        border border-purple-300
        shadow-xl
        rounded-full
        flex items-center justify-center
        active:scale-95
        transition
        z-[9999]
      "
    >
      <span className="material-icons text-purple-600 text-3xl">
        my_location
      </span>
    </button>
  );
}
