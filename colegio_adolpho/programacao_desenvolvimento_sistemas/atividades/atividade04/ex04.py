# 2ª Prova - Exercício 02
# Jogo de adivinhação
# Aluno 1: José Luiz B Barco
# Aluno 2: Kayki G Rocha Ribeiro

from random import randint

while True:
    pontuação = tentativa_máxima = 10
    tentativas = 0
    numero_pc = randint(1, 100)
    pontuação_recorde = 0
    recorde = list()

    print('{:=^30}'.format(' JOGO DE ADIVINHAÇÃO '))
    print(f'Tente adivinhar o número entre 1 e 100. Você tem {tentativa_máxima} tentativas!')

    while tentativas < tentativa_máxima:
        tentativas += 1
        pontuação -= 1

        print('-'*20)
        user = int(input('Digite um número de 1 a 100: '))

        if user < numero_pc:
            print('O número é maior!')

        elif user > numero_pc:
            print('O número é menor!')

        elif user == numero_pc:
            print('Você acertou!')
            pontuação += 1


            if pontuação > pontuação_recorde:
                user_name = input('Digite seu nome: ')
                print('Novo recorde!')
                pontuação_recorde = pontuação

            break

        if tentativas == tentativa_máxima:
            print('Você atingiu o limite de tentativas!', end=' ')
            print(f'O número era {numero_pc}!')
            break

    continuar = input('Deseja continuar jogando? (S/N): ').strip().upper()[0]

    if continuar == 'N':
        print('{:=^30}'.format(' RECORDE '))
        print(f'{user_name}: {pontuação_recorde} pontos')
        print('=' * 30)
        print('Obrigado por jogar!')
        break
