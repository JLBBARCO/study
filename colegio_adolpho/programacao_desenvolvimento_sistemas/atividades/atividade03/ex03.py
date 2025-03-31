extrato = list()
saldo = saque = 0

while True:
    # Informa as opções e pede ao usuário escolher uma
    print("\n===== MENU =====")
    print("1. Consultar saldo")
    print("2. Depositar")
    print("3. Sacar")
    print("4. Extrato")
    print("5. Sair")
    opção = input('Digite uma opção: ')
    print('-'*30)

    if opção == '1':
        print(f'Seu saldo é de R${saldo:.2f}')
    elif opção == '2':
        deposito = float(input('Digite o valor do depósito: R$'))
        if deposito <= 0:
            print('Valor inválido. Tente novamente.')
        else:
            saldo += deposito
            extrato.append(f'Depósito de R$ {deposito:.2f}')
    elif opção == '3':
        saque += 1
        if saque > 3:
            print('Limite de saques diários atingido.')
        else:
            valor = float(input('Digite o valor do saque: R$'))
            if valor <= 0:
                print('Valor inválido. Tente novamente.')
            elif valor > saldo:
                print('Saldo insuficiente.')
            else:
                saldo -= valor
                extrato.append(f'Saque de R${valor:.2f}')
    elif opção == '4':
        print(f'Seu extrato é {extrato}')
    elif opção == '5':
        break
    else:
        print('Opção inválida. Tente novamente.')
print('Fim da operação! VOLTE SEMPRE!')