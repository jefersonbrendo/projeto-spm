import { obterLocalizacaoAtual } from "./geolocalizacao";
import { mostrarToast } from "./toast";

export function enviarMensagemWhatsApp(telefone, mensagem) {
  if (!telefone) {
    mostrarToast("error", "Telefone inválido!");
    return;
  }

  const numeroLimpo = telefone.replace(/\D/g, "");
  if (numeroLimpo.length < 10) {
    mostrarToast("error", "Número de telefone inválido.");
    return;
  }

  const link = `https://wa.me/55${numeroLimpo}?text=${encodeURIComponent(
    mensagem
  )}`;

  try {
    window.open(link, "_blank");
  } catch (error) {
    console.error("Erro ao abrir WhatsApp:", error);
    mostrarToast("error", "Não foi possível abrir o WhatsApp.");
  }
}

export async function enviarMensagemComLocalizacao(
  telefone,
  usuarioNome,
  mensagemExtra = ""
) {
  try {
    const { latitude, longitude } = await obterLocalizacaoAtual();
    const linkMaps = `https://www.google.com/maps?q=${latitude},${longitude}`;

    const mensagem = `🚨 *Emergência!*\n\n${
      usuarioNome || "Um contato"
    } precisa de ajuda agora!\n\n📍 Localização: ${linkMaps}\n\n${
      mensagemExtra ? mensagemExtra + "\n\n" : ""
    }(enviado via aplicativo SAS)`;

    mostrarToast("success", "Localização anexada com sucesso!");
    enviarMensagemWhatsApp(telefone, mensagem);
  } catch (error) {
    console.warn("Localização indisponível:", error);
    mostrarToast("error", "Não foi possível obter sua localização.");
    const mensagem = `🚨 *Emergência!*\n\n${
      usuarioNome || "Um contato"
    } precisa de ajuda agora!\n\n(Localização não disponível)\n\n(enviado via aplicativo SAS)`;

    enviarMensagemWhatsApp(telefone, mensagem);
  }
}
