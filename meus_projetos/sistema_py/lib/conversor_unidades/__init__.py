# Importações
from .. import interface

# Função principal
def conversor():
    while True:
        interface.linha()
        interface.cabeçalho('Conversor de Temperaturas')
        interface.linha()
        print(
            'Escolha duas das opções abaixo:\n'
            'Sair\n'
            'Celsius\n'
            'Fahrenheit\n'
            'Kelvin\n'
        )
        resposta1 = input('De qual medida quer converter? ').strip().title()
        resposta2 = input('Para qual medida quer converter? ').strip().title()

        if resposta1 == 'Sair' or resposta2 == 'Sair':
            print('Saindo do conversor...')
            break

        elif resposta1 == 'Celsius' and resposta2 == 'Kelvin':
            conversão = float(input('Digite a temperatura em Celsius: '))
            resultado = conversão + 273.15
            print(f"A temperatura em Kelvin é: {resultado:.2f} K")

        elif resposta1 == 'Kelvin' and resposta2 == 'Celsius':
            conversão = float(input('Digite a temperatura em Kelvin: '))
            resultado = conversão - 273.15
            print(f"A temperatura em Celsius é: {resultado:.2f} °C")

        elif resposta1 == 'Fahrenheit' and resposta2 == 'Kelvin':
            conversão = float(input('Digite a temperatura em Fahrenheit: '))
            resultado = (conversão - 32) * 5/9 + 273.15
            print(f"A temperatura em Kelvin é: {resultado:.2f} K")

        elif resposta1 == 'Kelvin' and resposta2 == 'Fahrenheit':
            conversão = float(input('Digite a temperatura em Kelvin: '))
            resultado = (conversão - 273.15) * 9/5 + 32
            print(f"A temperatura em Fahrenheit é: {resultado:.2f} °F")

        elif resposta1 == 'Celsius' and resposta2 == 'Fahrenheit':
            conversão = float(input('Digite a temperatura em Celsius: '))
            resultado = (conversão * 9/5) + 32
            print(f"A temperatura em Fahrenheit é: {resultado:.2f} °F")

        elif resposta1 == 'Fahrenheit' and resposta2 == 'Celsius':
            conversão = float(input('Digite a temperatura em Fahrenheit: '))
            resultado = (conversão - 32) * 5/9
            print(f"A temperatura em Celsius é: {resultado:.2f} °C")

        elif resposta1 == resposta2:
            print('\033[33mAs unidades de origem e destino são iguais. Nenhuma conversão necessária.\033[m')

        else:
            print('\033[31mERRO! Digite uma opção válida.\033[m')
            continue
