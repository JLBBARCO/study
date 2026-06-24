const publisherId = "ca-pub-3137007272676866";
const scriptSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;

// Criando e adicionando o script do AdSense ao <head>
var adScript = document.createElement("script");
adScript.async = true;
adScript.src = scriptSrc;
adScript.setAttribute("crossorigin", "anonymous");
document.head.appendChild(adScript);

// Criando e adicionando a meta tag de verificação da conta ao <head>
if (publisherId && publisherId !== "") {
  var adMeta = document.createElement("meta");
  adMeta.name = "google-adsense-account";
  adMeta.content = publisherId;
  document.head.appendChild(adMeta);
}
