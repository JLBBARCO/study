# Programa 01
print('Programa 01')
def media (n1, n2, n3):
    Média = (n1 + n2 + n3) / 3
    return Média

nota1 = float(input("Digite a primeira nota: "))
nota2 = float(input("Digite a segunda nota: "))
nota3 = float(input("Digite a terceira nota: "))
media = media(nota1, nota2, nota3)
print(f"A média das notas {nota1}, {nota2} e {nota3} é: {media:.2f}")

# Programa 02
print('Programa 02')
def parímpar(num):
    if num % 2 == 0:
        return 'Par'
    else:
        return 'Ímpar'

user = int(input('Digite um número para verificar se é Par ou Ímpar: '))
número = parímpar(user)
print(f'O número {user} é {número}')

# Programa 03
print('Programa 03')
def fibonacci(n):
    n1 = 0
    n2 = 1
    while True:
        if n2 < n:
            print(n2, end=' -> ')
            n2 += n1
        else:
            break

user = int(input('Digite o limite da sequência de fibonacci: '))
números = fibonacci(user)
print(números)

# Programa 04
print('Programa 04')

# Programa 05
print('Programa 05')
def contar_vogais(frase):
    vogais = "aeiouAEIOU"
    contagem = 0
    for letra in frase:
        if letra in vogais:
            contagem += 1
    return contagem

user = input("Digite uma frase: ").upper().strip()
contagem = contar_vogais(user)
print(f"A frase '{user}' tem {contagem} vogais.")

# Programa 06
print('Programa 06')