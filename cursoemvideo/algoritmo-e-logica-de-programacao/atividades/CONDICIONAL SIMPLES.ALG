Algoritmo "Condicional Simples"
Var
   ano, nasc, idade: Inteiro
Inicio
      Escreva("Em que ano nos estamos? ")
      Leia(ano)
      Escreva("Em que ano eu nasci? ")
      Leia(nasc)
      idade <- ano - nasc
      Escreva("Em ", ano, " voce tera ", idade, " anos")
      Se(idade >= 21) entao
               Escreval(" e ja tera atingido a maioridade.")
      FimSe
Fimalgoritmo