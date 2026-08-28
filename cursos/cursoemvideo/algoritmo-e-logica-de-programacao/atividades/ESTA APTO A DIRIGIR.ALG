Algoritmo "Esta Apto a Dirigir"
Var
   ano, nasc, idade: Inteiro
Inicio
      EscrevaL("--------------------------")
      EscrevaL(" DEPARTAMENTO DE TRANSITO ")
      EscrevaL("--------------------------")
      Escreva("Ano atual (yyyy): ")
      Leia(ano)
      Escreva("Ano de Nascimento (yyyy): ")
      Leia(nasc)
      idade <- ano - nasc
      EscrevaL("-------- STATUS --------")
      EscrevaL(" IDADE: ", idade)
      Se (idade >= 18) entao
         EscrevaL(" APTO A TIRAR CARTEIRA")
      SeNao
         EscrevaL(" INAPTO A TIRAR CARTEIRA")
      FimSe
      EscrevaL("------------------------")
Fimalgoritmo