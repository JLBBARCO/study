function carregar() {
    var msg = document.getElementById("msg");
    var img = document.getElementById("imagem");
    var data = new Date();
    var hora = data.getHours();
    msg.innerHTML = `Agora são ${hora} horas.`;
    if (hora >= 0 && hora < 12) {
        // BOM DIA!
        img.src = 'manha.png'
        document.body.style.background = '#fe8e3d';
    } else if (hora >= 12 && hora <= 18) {
        // BOA TARDE!
        img.src = 'tarde.png'
        document.body.style.background = '#a83f00';
    } else {
        // BOA NOITE
        img.src = 'noite.png'
        document.body.style.background = '#0b58b4';
    }
}