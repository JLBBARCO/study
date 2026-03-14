function adSense(scriptSrc, metaName) {
  var adScript = document.createElement("script");
  adScript.async = true;
  adScript.src = scriptSrc;
  adScript.setAttribute("crossorigin", "anonymous");
  document.head.appendChild(adScript);

  var adMeta = document.createElement("meta");
  adMeta.name = "google-adsense-account";
  adMeta.content = metaName;
  document.head.appendChild(adMeta);
}
