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

user = int(input('Digite um número para verificar se é Par ou Ímpar: '))
resultado = par_ou_impar(user)
print(f'O número {user} é {resultado}')

# Programa 03
print('Programa 03')
def fibonacci(limite):
    n1, n2 = 0, 1
    sequencia = []
    while n1 < limite:
        sequencia.append(n1)
        n1, n2 = n2, n1 + n2
    return sequencia

user = int(input('Digite o limite da sequência de Fibonacci: '))
numeros = fibonacci(user)
print('Sequência de Fibonacci:', ' -> '.join(map(str, numeros)))

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

user = input("Digite uma frase: ").strip()
contagem = contar_vogais(user)
print(f"A frase '{user}' tem {contagem} vogais.")

# Programa 06
print('Programa 06')