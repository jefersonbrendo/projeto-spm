import { enviarMensagemWhatsApp } from "./whatsapp";
import { obterLocalizacaoAtual } from "./geolocalizacao";

/**
 * Envia um alerta geral com mensagem + localização (se disponível)
 * @param {Array} contatos - Lista de contatos do usuário.
 * @param {string} usuarioNome - Nome do usuário que enviará o alerta.
 */
export async function enviarAlertaGeral(contatos, usuarioNome) {
  if (!contatos?.length) {
    alert("Nenhum contato de emergência cadastrado!");
    return;
  }

  const primeiroContato = contatos[0];
  let mensagem = `🚨 *Emergência!*\n\n${
    usuarioNome || "Um contato"
  } precisa de ajuda agora!`;

  try {
    const { latitude, longitude } = await obterLocalizacaoAtual();
    const linkMaps = `https://www.google.com/maps?q=${latitude},${longitude}`;
    mensagem += `\n\n📍 Localização: ${linkMaps}`;
  } catch (erro) {
    console.warn(erro);
    mensagem += `\n\n(Localização não disponível)`;
  }

  mensagem += `\n\n(enviado via aplicativo SAS)`;

  enviarMensagemWhatsApp(primeiroContato.telefone, mensagem);
}
