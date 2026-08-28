function verificar() {
    var data = new Date();
    var ano = data.getFullYear();
    var fano = document.getElementById('txtano');
    var res = document.querySelector('div#res');
    if (fano.value.length == 0 || fano.value > ano) {
        window.alert('[ERRO] Verifique os dados e tente novamente!');
    } else{
        var fsex = document.getElementsByName('radsex');
        var idade = ano - Number(fano.value);
        var genero = '';
        var img = document.createElement('img');
        img.setAttribute('id', 'foto')
        if (fsex[0].checked) {
            genero = 'Homem';
            if (idade >= 0 && idade < 10) {
                //Criança
                img.setAttribute('src', 'm_crianca.jpg')
            } else if (idade >= 10 && idade < 21) {
                //Jovem
                img.setAttribute("src", "m_jovem.jpg")
            } else if (idade < 50) {
                //Adulto
                img.setAttribute("src", "m_adulto.jpg")
            } else {
                //Idoso
                img.setAttribute("src", "m_idoso.jpg")
            }
        } else if (fsex[1].checked) {
            genero = 'Mulher';
            if (idade >= 0 && idade < 10) {
                //Criança
                img.setAttribute ("src", "f_crianca.jpg")
            } else if (idade >= 10 && idade < 21) {
                //Jovem
                img.setAttribute("src", "f_jovem.jpg")
            } else if (idade < 50) {
                //Adulto
                img.setAttribute('src', 'f_adulto.jpg')
            } else {
                //Idoso
                img.setAttribute('src', 'f_idoso.jpg')
            }
        }
        res.style.textAlign = "center";
        res.innerHTML = `Detectamos ${genero} com ${idade} anos.`
        res.appendChild(img);
    }
}