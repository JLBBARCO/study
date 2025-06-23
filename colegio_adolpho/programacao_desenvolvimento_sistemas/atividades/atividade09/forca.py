def jogar():
    enforcou = False
    acertou = False
    erros = 0
    acertos = 0

    palavra_secreta = 'UVA'

    from lib.forca import exibe_mensagem_abertura
    exibe_mensagem_abertura()

    while not acertou and not enforcou:
        chute = input("Qual a letra? ").strip().upper()

        if chute in palavra_secreta:
            print("Você acertou a letra!")
            acertos += 1

        else:
            print("Você errou a letra!")
            erros += 1

            from lib.forca import desenha_forca
            desenha_forca(erros)

        if erros == 7:
            enforcou = True
            from lib.forca import exibe_mensagem_derrota
            exibe_mensagem_derrota(palavra_secreta=palavra_secreta)

        if acertos == len(palavra_secreta):
            acertou = True
            from lib.forca import exibe_mensagem_vencedor
            exibe_mensagem_vencedor()

jogar()