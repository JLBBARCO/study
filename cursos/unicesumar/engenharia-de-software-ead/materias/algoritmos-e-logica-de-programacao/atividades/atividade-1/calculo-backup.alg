algoritmo "calculo-backup"
var
    volume_diario_gb: real
    capacidade_tb: real
    espaco_necessario_gb: real
    capacidade_total_gb: real
    dias_retencao: inteiro
inicio
    escreva("Informe o volume de dados gerado por dia (em GB): ")
        leia(volume_diario_gb)
    escreva("Informe o numero de dias de retenção exigido: ")
        leia(dias_retencao)
    escreva("Informe a capacidade total do storage (em TB): ")
        leia(capacidade_tb)
    espaco_necessario_gb <- volume_diario_gb * dias_retencao
    capacidade_total_gb <- capacidade_tb * 1024
    escreval("")
    escreval("================ RESULTADO ================")
    escreval("Espaço necessário para backup: ", espaco_necessario_gb, " GB")
    se espaco_necessario_gb <= capacidade_total_gb entao
        escreval("CAPACIDADE SUFICIENTE")
     senao
        escreval("CAPACIDADE INSUFICIENTE")
    fimse
    escreval("===========================================")

fimalgoritmo