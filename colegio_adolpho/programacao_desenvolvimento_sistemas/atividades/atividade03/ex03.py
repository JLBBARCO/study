extrato = list() # Cria uma lista vazia para armazenar o extrato
saldo = saque = 0 # Inicializa com saldo e o número de saques em zero

# Loop infinito para o menu de opções
while True:
    # Informa as opções e pede que o usuário escolha uma
    print("\n===== MENU =====")
    print("1. Consultar saldo")
    print("2. Depositar")
    print("3. Sacar")
    print("4. Extrato")
    print("5. Sair")
    opção = input('Digite uma opção: ')
    print('-'*30)

    # Verifica a opção escolhida pelo usuário
    if opção == '1':
        # Consulta o saldo atual
        print(f'Seu saldo é de R${saldo:.2f}')

    # Verifica se a opção é para depositar
    elif opção == '2':
        # Pede o valor do depósito e verifica se é válido
        deposito = float(input('Digite o valor do depósito: R$'))

        if deposito <= 0:
            print('Valor inválido. Tente novamente.')

        else:
            # Se o valor for inválido, pede novamente
            saldo += deposito
            extrato.append(f'Depósito de R$ {deposito:.2f}')

    # Verifica se a opção é para sacar
    elif opção == '3':
        # Se o número de saques for maior que 3, informa o limite
        saque += 1
        if saque > 3:
            print('Limite de saques diários atingido.')

        else:
            # Se não, pede o valor do saque e verifica se é válido
            valor = float(input('Digite o valor do saque: R$'))
            # Verifica se o valor é válido e se há saldo suficiente
            # Se o valor for inválido ou maior que o saldo, informa o erro

            if valor <= 0:
                print('Valor inválido. Tente novamente.')

            elif valor > saldo:
                print('Saldo insuficiente.')

            else:
                saldo -= valor
                extrato.append(f'Saque de R${valor:.2f}')
    # Verifica se a opção é para ver o extrato
    elif opção == '4':
        # Se o extrato estiver vazio, informa que não há movimentações
        if not extrato:
            print('Não há movimentações no extrato.')

        else:
            # Se tiver movimentações, imprime o extrato e exibe as informações formatadas por ordem de execução
            print('Extrato:')
            for i in range(len(extrato)):
                print(f'{i+1}. {extrato[i]}')

    # Verifica se a opção é para sair
    elif opção == '5':
        # Se for, informa que a operação foi encerrada e sai do loop
        print('Operação encerrada.', end=' ')
        break
    # Verifica se a opção é inválida
    else:
        # Se for, informa que a opção é inválida e pede para tentar novamente e volta para o início do loop
        print('Opção inválida. Tente novamente.')

# Informa que o programa foi encerrado e agradece ao usuário
print('VOLTE SEMPRE!')