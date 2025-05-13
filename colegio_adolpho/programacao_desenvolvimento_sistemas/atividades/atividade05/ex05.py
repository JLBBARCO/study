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
lista_nomes = list()
lista_idades = list()
lista_telefones = list()

while True:
    nome = input('Digite seu nome: (Digite 0 para parar) ').strip().title()
    if nome == '0':  # Verifica antes de adicionar às listas
        break

    idade = int(input('Digite sua idade: '))
    telefone = input('Digite seu telefone: ').strip()

    lista_nomes.append(nome)
    lista_idades.append(idade)
    lista_telefones.append(telefone)

# Exibe os dados após o término do loop
for c in range(len(lista_nomes)):
    print(f'Nome: {lista_nomes[c]}, Idade: {lista_idades[c]}, Telefone: {lista_telefones[c]}')
