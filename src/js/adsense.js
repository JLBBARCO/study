const ADSENSE_LOADER_PUBLISHER_ID = "ca-pub-1575745628375298";
const ADSENSE_LOADER_SCRIPT_ID = "google-adsense-script";

function loadAdSense() {
  const head = document.head;
  if (!head) return;

  if (!document.querySelector('meta[name="google-adsense-account"]')) {
    const meta = document.createElement("meta");
    meta.name = "google-adsense-account";
    meta.content = ADSENSE_LOADER_PUBLISHER_ID;
    head.appendChild(meta);
  }

  window.adsbygoogle = window.adsbygoogle || [];

  if (document.getElementById(ADSENSE_LOADER_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = ADSENSE_LOADER_SCRIPT_ID;
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_LOADER_PUBLISHER_ID}`;
  script.crossOrigin = "anonymous";
  head.appendChild(script);
}

window.loadAdSense = loadAdSense;
loadAdSense();
