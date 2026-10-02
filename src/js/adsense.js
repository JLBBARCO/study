function loadAdSense() {
  const head = document.getElementsByTagName("head")[0];
  head.insertAdjacentHTML(
    "beforeend",
    `<meta name="google-adsense-account" content="ca-pub-1575745628375298">`,
  );
  head.insertAdjacentHTML(
    "beforeend",
    `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1575745628375298" crossorigin="anonymous"></script>`,
  );
}
