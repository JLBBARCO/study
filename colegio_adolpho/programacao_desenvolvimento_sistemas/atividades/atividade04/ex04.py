# 2ª Prova - Exercício 02
# Jogo de adivinhação
# Aluno 1: José Luiz B Barco
# Aluno 2: Kayki G Rocha Ribeiro

from random import randint

while True:
    pontuação = tentativa_máxima = 10
    tentativas = 0
    numero_pc = randint(1, 1)
    pontuação_user = [0, 0]
    recorde = list()

    print('{:=^30}'.format(' JOGO DE ADIVINHAÇÃO '))
    print(f'Tente adivinhar o número entre 1 e 100. Você tem {tentativa_máxima} tentativas!')

    while True:
        tentativas += 1
        user = int(input('Digite um número de 1 a 100: '))
        
        if user == numero_pc:
            pontuação + 1
            print('Você acertou!', end=' ')

            user_name = input('Digite seu nome: ')

            print(f'Seu nome é {user_name}, e usou {tentativas} tentativas. Sua pontuação foi {pontuação} pontos!')
            
            pontuação_user[0], pontuação_user[1] = user_name, pontuação
            recorde.append(pontuação_user[:])
            pontuação_user.clear()

            break

        elif user < numero_pc:

            print('O número é maior!')

        elif user > numero_pc:

            print('O número é menor!')
            
        if tentativas == tentativa_máxima:

            print('Você perdeu!')
            print(f'O número era {numero_pc}!')

            break

        pontuação = tentativas

    continuar = input('Deseja continuar jogando? (S/N): ').strip().upper()[0]

    if continuar == 'N':
        
        print('Obrigado por jogar!')

        break
