#include <stdio.h> // Inclusão de biblioteca

// int main() // main é uma função
// {
//     // int é o tipo da função

//     printf("Oi, pessoal!\n"); // função da biblioteca stdio.h
//     return 0;                 // A função é obrigada a retornar algo do seu tipo
// }

int main()
{

    // Tipos de identificadores
    // int A = 1;
    // float media = 7.556f;
    // double altura = 1.75;

    // int nota = 10;
    // int Nota = 5;
    // int NoTa = 2;

    // Imprimir texto utilize aspas duplas
    // printf("A = %d, media = %.1f", A, media);

    printf("Tipo\t\tBytes\t\tMaximo\n");
    printf("char\t\t%zu\t\t%d\t\t%d\n", sizeof(char), CHAR_MIN, CHAR_MAX);
    printf("unsigned char\t%zu\t\t0\t\t%d\n", sizeof(unsigned char), UCHAR_MAX);
    printf("short\t\t%zu\t\t%d\t\t%d\n", sizeof(short), SHRT_MIN, SHRT_MAX);
    printf("int\t\t%zu\t\t%d\t\t%d\n", sizeof(int), INT_MIN, INT_MAX);
    printf("unsigned int\t%zu\t\t0\t\t%u\n", sizeof(unsigned int), UINT_MAX);
    printf("long\t\t%zu\t\t%ld\t\t%ld\n", sizeof(long), LONG_MIN, LONG_MAX);
    printf("long long\t\t%zu\t\t%lld\t\t%lld\n", sizeof(long long), LLONG_MIN, LLONG_MAX);
    printf("float\t\t%zu\t\t%e\t\t%e\n", sizeof(float), FLT_MIN, FLT_MAX);
    printf("double\t\t%zu\t\t%e\t\t%e\n", sizeof(double), DBL_MIN, DBL_MAX);

    return 0;
}

/* *
 * Toda função tem dois parênteses {}
 */