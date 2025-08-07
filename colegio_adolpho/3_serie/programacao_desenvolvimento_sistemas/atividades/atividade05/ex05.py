# Programa 01
print('Programa 01')
def media(n1, n2, n3):
    media_valor = (n1 + n2 + n3) / 3
    return media_valor

nota1 = float(input("Digite a primeira nota: "))
nota2 = float(input("Digite a segunda nota: "))
nota3 = float(input("Digite a terceira nota: "))
media_resultado = media(nota1, nota2, nota3)
print(f"A média das notas {nota1}, {nota2} e {nota3} é: {media_resultado:.2f}")

# Programa 02
print('Programa 02')
def par_ou_impar(num):
    if num % 2 == 0:
        return 'Par'
    else:
        return 'Ímpar'

resultado = par_ou_impar(media_resultado)
print(f'O número {media_resultado} é {resultado}')

# Programa 03
print('Programa 03')
def fibonacci(limite):
    n1 = 0
    n2 = 1
    sequencia = list()
    while n1 < limite:
        sequencia.append(n1)
        n1, n2 = n2, n1 + n2
    return sequencia

numeros = fibonacci(media_resultado)
print('Sequência de Fibonacci:', ' -> '.join(map(str, numeros)))

# Programa 04
print('Programa 04')
from statistics import mode, mean, median
def estatísticas(números):
    print(f'A média é {mean(números)}, a mediana é {median(números)}, a moda é {mode(números)}, valor máximo é {max(números)} e o valor mínimo é {min(números)}.')
    return

número = list()

número.append(nota1)
número.append(nota2)
número.append(nota3)
número.append(media_resultado)

estatísticas(número)

# Programa 05
print('Programa 05')
def contar_vogais(frase):
    vogais = "aeiouAEIOU"
    contagem = 0
    for letra in frase:
        if letra in vogais:
            contagem += 1
    return contagem

user = input("Digite uma frase: ").strip()
contagem = contar_vogais(user)
print(f"A frase '{user}' tem {contagem} vogais.")

# Programa 06
print('Programa 06')
def pessoas(nome, idade, telefone):
    lista_nomes = list()
    lista_idades = list()
    lista_telefones = list()

    verifica(lista_nomes, lista_idades, lista_telefones)

    # Exibe os dados após o término do loop
    print(f'{"Nome":<20} | {"Idade":^20} | {"Telefone":>20}')
    for nome, idade, telefone in zip(lista_nomes, lista_idades, lista_telefones):
        print(f'{nome:<20} | {idade:^20} | {telefone:>20}')


def verifica(lista_nomes, lista_idades, lista_telefones):
    while True:
        try:
            nome = input('Digite seu nome: ').strip().title()
            idade = input('Digite sua idade: ').strip()
            telefone = input('Digite seu telefone: ').strip()

            # Verifica se algum dos campos está vazio
            if not nome or not idade or not telefone:
                raise ValueError('Todos os campos devem ser preenchidos.')

            # Verifica se o nome contém apenas letras
            if not nome.replace(' ', '').isalpha():
                raise ValueError('O nome deve conter apenas letras.')

            # Verifica se idade e telefone são numéricos
            if not idade.isdigit() or not telefone.isdigit():
                raise ValueError('A idade e o telefone devem conter apenas números.')

            # Converte a idade para inteiro
            idade = int(idade)

            # Adiciona os dados às listas
            lista_nomes.append(nome)
            lista_idades.append(idade)
            lista_telefones.append(telefone)

        except ValueError as e:
            print(f'\033[31mERRO! {e}\033[m')
            continue

        # Pergunta se o usuário deseja continuar
        if input('Deseja continuar? (s/n): ').strip().lower() != 's':
            break

pessoas(input('Digite seu nome: '), input('Digite sua idade: '), input('Digite seu telefone: '))
