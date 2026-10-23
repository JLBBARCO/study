#include <stdio.h>

/* Definição da estrutura heterogênea para o aluno */
struct Aluno
{
    /* Dados Pessoais */
    int matricula; // Código identificador único do aluno
    char nome[60]; // Nome completo do estudante (cadeia de caracteres)

    /* Notas e Desempenho Acadêmico */
    float notas[4];   // Vetor homogêneo armazenando as notas das 4 disciplinas
    float mediaGeral; // Média aritmética calculada

    /* Situação Acadêmica */
    char situacao[15]; // String indicando "Aprovado" ou "Reprovado"
};