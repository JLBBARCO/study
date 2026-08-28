Algoritmo "Creuza05"
Var
   emprestimo, parcelas, valor_juros, valor_parcela: Real
Inicio
      Escreva("Qual o valor do emprestimo? ")
      Leia(emprestimo)
      Escreva("Quantas parcelas? ")
      Leia(parcelas)
      valor_juros <- emprestimo + ((emprestimo * 20) / 100)
      valor_parcela <- valor_juros / parcelas
      Escreva("Vou pagar ", parcelas, " parcelas de R$", valor_parcela)
Fimalgoritmo