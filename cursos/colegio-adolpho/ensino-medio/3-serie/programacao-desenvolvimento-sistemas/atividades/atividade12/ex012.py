def busca_linear(vetor, elemento):
    for índice, valor in enumerate(vetor):
        if valor == elemento:
            return índice
    return -1

vetor_numérico = [10, 23, 45, 67, 89, 12, 34, 56, 78, 90]
elemento_procurado = int(input('Digite um número: '))
resultado = busca_linear(vetor_numérico, elemento_procurado)

if resultado != -1:
    print(f'Elemento encontrado no índice: {resultado}')
else:
    print('\033[31mElemento não encontrado!\033[m')