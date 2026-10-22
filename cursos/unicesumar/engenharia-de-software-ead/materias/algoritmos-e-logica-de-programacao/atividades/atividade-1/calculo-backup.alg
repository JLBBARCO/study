algoritmo "calculo-backup"
var
    volume_diario_gb, capacidade_tb, espaco_necessario_gb, capacidade_total_gb: real
    dias_retencao: inteiro
inicio
    // 1. Leitura das informacoes solicitadas
    escreva("Informe o volume de dados gerado por dia (em GB): ")
        leia(volume_diario_gb)
    escreva("Informe o numero de dias de retencao exigido: ")
        leia(dias_retencao)
    escreva("Informe a capacidade total do storage (em TB): ")
        leia(capacidade_tb)
    // 2. Processamento (Calculos)
    // Espaco total necessario para manter os backups pelo periodo de retencao
    espaco_necessario_gb <- volume_diario_gb * dias_retencao
    // Conversao da capacidade de Terabytes para Gigabytes (1 TB = 1024 GB)
    capacidade_total_gb <- capacidade_tb * 1024
    // 3. Exibicao do resultado e comparacao
    escreval("")
    escreval("================ RESULTADO ================")    escreval("Espaco necessario para backup: ", espaco_necessario_gb, " GB")
 // Verificacao se o storage comporta a politica de backup
    se espaco_necessario_gb <= capacidade_total_gb entao
        escreval("CAPACIDADE SUFICIENTE")
     senao
        escreval("CAPACIDADE INSUFICIENTE")
    fimse
    escreval("===========================================")

fimalgoritmo