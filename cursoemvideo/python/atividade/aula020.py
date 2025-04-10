# Programa principal
# def soma(a, b, c=0):
#     print(f'A = {a} e B = {b}')
#     s = a + b
#     print(f'A soma de {a} + {b} é igual a {s}')
# soma(b=4,a=5)
# soma(7,2)
# soma(8,9)
# soma(2,1)
# soma(3,9,5)


# def contador (*number):
#     tamanho = len(number)
#     print(f'Recebi os valores {number} e são ao todo {tamanho} números.')
# contador(2,1,7)
# contador(8,0)
# contador(4,4,7,6,2)


# def dobra(lst):
#     pos = 0
#     while pos < len(lst):
#         lst[pos] *= 2
#         pos += 1
# valores = [6,3,9,1,0,2]
# dobra(valores)
# print(valores)


def soma(* valores):
    s = 0
    for num in valores:
        s += num
    print(f'A soma de {valores} é igual a {s}')

soma(5,2)
soma(2,9,4)
