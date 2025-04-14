# 2ª Prova - Exercício 02
# Jogo de adivinhação
# Aluno 1: José Luiz B Barco
# Aluno 2: Kayki G Rocha Ribeiro

from random import randint

rank = list()
recorde = list()

while True:
    recorde.clear()
    pontuação = tentativa_máxima = 10
    tentativas = 0
    máximo_número = 100
    numero_pc = randint(1, máximo_número)
    pontuação_recorde = 0

    print('{:=^65}'.format(' JOGO DE ADIVINHAÇÃO '))
    print(f'Tente adivinhar o número entre 1 e {máximo_número}. Você tem {tentativa_máxima} tentativas!')

    while tentativas < tentativa_máxima:
        tentativas += 1
        pontuação -= 1

        print('-'*65)
        user = int(input(f'Digite um número de 1 a {máximo_número}: '))

        if tentativas == tentativa_máxima:
            print('Você atingiu o limite de tentativas!', end=' ')
            print(f'O número era {numero_pc}!')
            pontuação = 0
            break
        else:
            if user > máximo_número:
                print(f'Número inválido! Digite um número entre 1 e {máximo_número}')

            elif user < numero_pc:
                print('O número é maior!')

            elif user > numero_pc:
                print('O número é menor!')

            elif not user:
                print('Digite um número válido!')

            elif user == numero_pc:
                print('Você acertou!')
                pontuação += 1

                user_name = input('Digite seu nome: ')
                pontuação_recorde = pontuação
                recorde.append(pontuação)
                recorde.append(user_name)

                rank.append(recorde[:])

                if pontuação > pontuação_recorde:
                    print('Novo recorde!')

                break


    continuar = input('Deseja continuar jogando? (S/N): ').strip().upper()[0]

    if continuar == 'N':
        rank.sort()
        print('{:=^65}'.format(' RANKING '))
        print(f'{'NOME':<30}|{'PONTUAÇÃO':>30}')
        print('='*65)
        for p, u in rank:
            print(f'{u:<30}|{p:>30}')
        print('=' * 65)
        print('Obrigado por jogar!')
        break
