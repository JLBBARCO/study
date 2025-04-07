# 2ª Prova - Exercício 02
# Jogo de adivinhação
# Aluno 1: José Luiz B Barco
# Aluno 2: Kayki G Rocha Ribeiro

from random import randint
tentativa_máxima = 10
tentativas = 0

while True:
    numero_pc = randint(1, 5)
    pontuação = tentativa_máxima - tentativas
    pontuação_user = list()
    recorde = list()

    print('{:=^30}'.format(' JOGO DE ADIVINHAÇÃO '))
    print(f'Tente adivinhar o número entre 1 e 100. Você tem {tentativa_máxima} tentativas!')

    for c in range(tentativa_máxima):
        user = int(input('Digite um número de 1 a 100: '))
        if user == numero_pc:
            print('Você acertou!', end=' ')
            user_name = input('Digite seu nome: ')
            print(f'Seu nome é {user_name}, e você fez {tentativas} tentativas, e sua pontuação foi {pontuação} pontos!')
            pontuação_user.append(user_name)
            pontuação_user.append(pontuação)
            recorde.append(pontuação_user[:])
            pontuação_user.clear()
            tentativas += 1
            break
        elif user < numero_pc:
            print('O número é maior!')
            tentativas += 1
        elif user > numero_pc:
            print('O número é menor!')
            tentativas += 1
        if tentativas == tentativa_máxima:
            print('Você perdeu!')
            print(f'O número era {numero_pc}!')
            break
    continuar = input('Deseja continuar jogando? (S/N): ').strip().upper()[0]
    if continuar == 'N':
        print('Obrigado por jogar!')
        print('Os recordes foram:')
        break
