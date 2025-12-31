def leiaDinheiro(msg):
    válido = False
    while not válido:
        entrada = input(msg).replace(',', '.').strip()
        if entrada.isalpha() or entrada == '':
            print(f'\033[0;31mERRO: \"{entrada}\" é um preço inválido!\033[m')
        else:
            válido = True
            return float(entrada)
