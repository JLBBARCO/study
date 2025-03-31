"""
2ª Prova - Exercício 01
Sistema de caixa eletrônico simplificado
Aluno 1:
Aluno 2:
"""

saldo = 0
limite_saque = 500
extrato = []
numero_saques = 0
LIMITE_SAQUES = 3

while True:
    print("\n===== MENU =====")
    print("1. Consultar saldo")
    print("2. Depositar")
    print("3. Sacar")
    print("4. Extrato")
    print("5. Sair")

    opcao = input("Escolha uma opção: ")

    if opcao == "1":
        # Mostrar saldo atual
        pass
    elif opcao == "2":
        # Pedir valor e adicionar ao saldo
        # Adicionar transação ao extrato
        pass
    elif opcao == "3":
        # Verificar limites antes de sacar
        # Adicionar transação ao extrato
        pass
    elif opcao == "4":
        # Mostrar todas as transações
        pass
    elif opcao == "5":
        break
    else:
        print("Opção inválida. Tente novamente.")
