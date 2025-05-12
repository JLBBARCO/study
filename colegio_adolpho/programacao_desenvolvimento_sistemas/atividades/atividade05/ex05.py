# Programa 01
def media (n1, n2, n3):
    Média = (n1 + n2 + n3) / 3
    return Média

notas1 = float(input("Digite a primeira nota: "))
notas2 = float(input("Digite a segunda nota: "))
notas3 = float(input("Digite a terceira nota: "))
media = media(notas1, notas2, notas3)
print(f"A média das notas {notas1}, {notas2} e {notas3} é: {media:.2f}")

# Programa 02
def parímpar(num):
    if num % 2 == 0:
        return True
    else:
        return False



# Programa 03

# Programa 04

# Programa 05
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