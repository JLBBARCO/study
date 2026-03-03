Algoritmo "Condicional Composta"
Var
   ano, nasc, idade: Inteiro
Inicio
   Escreva("DigEm que ano nos estamos?
   Leia(N) ano
   Escreva("Em que ano eu nasci? ")
   Leia(nasc)
   idade <- ano - nasc
   Escreva("Em ", ano, " voce tera ", idade, " anos")
   Se(idade >= 21) entao
      Escreval(" e ja tera atingido a maioridade.")
   SeNao
      Escreval(" e ainda e de menor.")
   FimSe
Fimalgoritmo