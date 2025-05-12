# Importações
from .. import interface

# Função principal
def conversor():
    try:
        while True:
            opções = [
                'Voltar',
                'Temperatura'
            ]
            interface.menu(opções, título='Conversor')
            resposta = int(input('Selecione uma opção: '))
            if resposta == 0:
                break

            elif resposta == 1:
                    temperatura()

            else:
                print('\033[31mERRO! Digite uma opção válida.\033[m')
        return
    except resposta is float or str:
        print('\033[31mERRO! Digite um número inteiro válido.')

    except KeyboardInterrupt:
        return

def temperatura():
    try:
        opções = [
            'Voltar',
            '°C para °K',
            '°K para °C',
            '°C para °F',
            '°F para °C',
            '°F para °K',
            '°K para °F',
        ]
        interface.menu(opções, título='Conversor de Temperatura')
        resposta = int(input('Selecione uma opção: '))
        while True:
            if resposta == 0:
                break
            elif resposta == 1:
                # °C para °K
                pass
            elif resposta == 2:
                # °K para °C
                pass
            elif resposta == 3:
                # °C para °F
                pass
            elif resposta == 4:
                # °F para °C
                pass
            elif resposta == 5:
                # °F para °K
                pass
            elif resposta == 6:
                # °K para °F
                pass
            else:
                print('\033[31mERRO! Digite uma opção válida.\033[m')
        return
    except (float, str):
        print('\033[31mERRO! Digite um número válido.\033[m')
    except KeyboardInterrupt:
        return