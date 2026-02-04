/* 
    fase 1
    [x] Saber quando o botão foi clicado
    [x] Pegar o texto que o usário digitou
    [x] Mando para o servidor traduzir
    [x] Receber a resposta do servidor (traducao)  
    [x] Colocar o texto na tela 
    [x] Escolher idioma  
    
    fase 2
    [x] Saber quando o botão do microfone foi clicado
    [x] IA - Detectar voz e pegar a transcrição 
    [x] Traduzir o que foi falado

*/

let inputText = document.querySelector(".input-text");
let translate = document.querySelector(".translate");
let language = document.querySelector(".language");

async function translateLanguage() {
  let address =
    "https://api.mymemory.translated.net/get?q=" +
    inputText.value +
    "&langpair=pt-BR|" +
    language.value;

  let response = await fetch(address);

  let data = await response.json();

  translate.innerHTML = data.responseData.translatedText;

  console.log(data);
}

function hearingVoice() {
  //ferramenta de transcrição de audio
  let speech = window.webkitSpeechRecognition;
  // Deixando ela pronta para uso
  let voiceRecognition = new speech();

  // Configurando a ferramenta
  voiceRecognition.lang = "pt-BR";

  // Me avise quano ele terminar de transcrever a voz
  voiceRecognition.onresult = (e) => {
    let capturVoice = e.results[0][0].transcript;

    inputText.innerHTML = capturVoice;

    translateLanguage();
  };

  voiceRecognition.start();
}
