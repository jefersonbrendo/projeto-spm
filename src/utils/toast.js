/**
 * Mostra um toast (mensagem temporária) no topo, perfeitamente centralizado.
 * @param {"success"|"error"|"info"} tipo - Tipo do toast (verde, vermelho ou azul)
 * @param {string} mensagem - Texto a ser exibido
 */
export function mostrarToast(tipo, mensagem) {
  // Remove qualquer toast anterior
  const antigo = document.getElementById("toast-sas");
  if (antigo) antigo.remove();

  const toast = document.createElement("div");
  toast.id = "toast-sas";

  // 🎨 Cores de acordo com o tipo
//   const cores =
//     tipo === "success"
//       ? "bg-green-500 text-white"
//       : tipo === "info"
//       ? "bg-blue-500 text-white"
//       : "bg-red-500 text-white";

  // 💅 Estilo centralizado e elegante
  toast.style.position = "fixed";
  toast.style.top = "1.5rem";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "9999px";
  toast.style.fontSize = "0.9rem";
  toast.style.fontWeight = "500";
  toast.style.color = "white";
  toast.style.backgroundColor =
    tipo === "success"
      ? "#22c55e" // verde Tailwind 500
      : tipo === "info"
      ? "#3b82f6" // azul Tailwind 500
      : "#ef4444"; // vermelho Tailwind 500
  toast.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  toast.textContent = mensagem;

  document.body.appendChild(toast);

  // 🪄 Anima suavemente a entrada
  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  }, 50);

  // ⏰ Remove automaticamente após 3 segundos
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(-10px)";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
