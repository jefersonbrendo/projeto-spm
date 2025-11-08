import { useState } from "react";
import { createPortal } from "react-dom";
import { Toast } from "../components/ui/Toast";

export function useToast() {
  const [toast, setToast] = useState(null);

  function showToast(tipo, mensagem) {
    setToast({ tipo, mensagem });
  }

  function closeToast() {
    setToast(null);
  }

  const ToastPortal =
    toast &&
    createPortal(
      <Toast tipo={toast.tipo} mensagem={toast.mensagem} onClose={closeToast} />,
      document.body
    );

  return { showToast, ToastPortal };
}
