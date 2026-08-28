// * Configura o Cookie
function setCookie(cName, cValue, exDays) {
  const d = new Date();
  d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
}

// * Pega o Cookie
function getCookie(cName) {
  let name = cName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// * Verifica o Cookie
function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 30);
    }
  }
}

// * Adiciona evento ao botão
document.getElementById("botaoExibe").addEventListener("click", function () {
  const cookieValue = getCookie("username");
  if (cookieValue === "") {
    document.getElementById("textoExibe").innerHTML =
      "Nenhum cookie encontrado.";
  } else {
    document.getElementById("textoExibe").innerHTML = cookieValue;
  }
});

// * Cria o cookie ao digitar no campo
document.getElementById("criarCookie").addEventListener("click", () => {
  const nomeCookie = document.getElementById("nomeCookie").value.trim();
  const conteudoCookie = document.getElementById("conteúdoCookie").value.trim();

  if (nomeCookie === "" || conteudoCookie === "") {
    alert("Por favor, preencha todos os campos antes de criar o cookie.");
    return;
  }

  setCookie(nomeCookie, conteudoCookie, 30);
  alert(`Cookie "${nomeCookie}" criado com sucesso!`);
});
