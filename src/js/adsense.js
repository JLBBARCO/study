function adSense() {
  var ad = document.createElement("script");
  ad.async = true;
  ad.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3137007272676866";
  ad.setAttribute("crossorigin", "anonymous");
  document.head.appendChild(ad);
}
