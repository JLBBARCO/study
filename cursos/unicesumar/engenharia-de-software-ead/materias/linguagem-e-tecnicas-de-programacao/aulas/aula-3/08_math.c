/*
 * 08_math.c
 * Slides: Funcoes da math.h / Laboratorio: funcoes matematicas
 *
 * Todas as funcoes de math.h recebem e devolvem double.
 *
 * Compilacao:
 *   GCC:  gcc 08_math.c -o 08_math -lm      (o -lm liga a biblioteca matematica)
 *   MSVC/CLion: nao precisa de -lm.
 */
#include <stdio.h>
#include <math.h>

/* Em alguns compiladores M_PI nao existe; no MSVC ela exige
   #define _USE_MATH_DEFINES antes de math.h. Para o programa funcionar
   em qualquer ambiente, definimos o valor se ele estiver ausente. */
#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

int main()
{
    double x = 2.4;

    printf("sqrt(%.1f)  = %.2f\n", x, sqrt(x));      /* 1.55  raiz quadrada       */
    printf("pow(%.1f,3) = %.2f\n", x, pow(x, 3));    /* 13.82 x elevado a 3       */
    printf("ceil(%.1f)  = %.0f\n", x, ceil(x));      /* 3     arredonda p/ cima   */
    printf("floor(%.1f) = %.0f\n", x, floor(x));     /* 2     arredonda p/ baixo  */
    printf("fabs(-%.1f) = %.1f\n", x, fabs(-x));     /* 2.4   valor absoluto real */
    printf("log(10)     = %.4f\n", log(10.0));       /* 2.3026 logaritmo natural  */
    printf("sin(PI/2)   = %.1f\n", sin(M_PI / 2));   /* 1.0   seno em RADIANOS    */

    /* ---- Exemplo do slide ---- */
    double r = sqrt(81.0);
    double p = pow(2.0, 10.0);
    printf("%.0f %.0f\n", r, p);                     /* 9 1024 */

    /* abs() e para inteiros e fica em stdlib.h; para reais use fabs(). */
    return 0;
}
