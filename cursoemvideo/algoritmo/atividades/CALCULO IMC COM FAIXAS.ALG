Algoritmo "Calculo IMC com Faixas"
Var
   M, A, IMC: Real
Inicio
      Escreva("Massa (KG): ")
      Leia(M)
      Escreva("Altura (m): ")
      Leia(A)
      IMC <- M / (A ^ 2)
      EscrevaL("IMC: ", IMC:5:2)
      Se (IMC < 17) entao
           EscrevaL("Muito abaixo do Peso")
      SeNao
           Se (IMC >= 17) e (IMC < 18.5) entao
                EscrevaL("Abaixo do Peso")
           SeNao
                Se (IMC >= 18.5) e (IMC < 25) entao
                     EscrevaL("Peso ideal")
                SeNao
                     Se (IMC >= 25) e (IMC < 30) entao
                          EscrevaL("Sobrepeso")
                     SeNao
                          Se (IMC >= 30) e (IMC < 35) entao
                               EscrevaL("Obesidade")
                          SeNao
                               Se (IMC >= 35) e (IMC < 40) entao
                                    EscrevaL("Obesidade Severa")
                               SeNao
                                    EscrevaL("Obesidade Morbida")
                               FimSe
                          FimSe
                     FimSe
                FimSe
           FimSe
      FimSe
Fimalgoritmo