# Importações
from time import sleep
import lib.interface

lib.interface.cabeçalho('Sistema Python')
while True:
    print('Escolha uma das opções abaixo:')
    opções = ('Sair', 'Sorteio', 'Conversor', 'Calculadora', 'IA', 'Downloads', 'Jogos')
    lib.interface.menu(opções, mostrarTítulo=False)

    escolha = int(input('Escolha: '))
    while escolha < 0 or escolha > len(opções):
        escolha = int(input('Escolha: '))

    if escolha == 0:
        lib.interface.cabeçalho('Saindo do sistema... Até logo!')
        sleep(.5)
        break

    elif escolha == 1:
        sleep(.25)
        import lib.sorteio
        sleep(.25)
        lib.sorteio.sorteio()

    elif escolha == 2:
        sleep(.25)
        import lib.conversor_unidades
        sleep(.25)
        lib.conversor_unidades.conversor()

    elif escolha == 3:
        pass

    elif escolha == 4:
        pass

    else:
        print('\033[31mOpção inválida. Tente novamente.\033[m')
        # Aqui você pode adicionar o código para lidar com a opção inválida
    sleep(2)
