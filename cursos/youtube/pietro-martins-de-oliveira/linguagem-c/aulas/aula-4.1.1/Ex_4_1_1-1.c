#include <stdio.h>

int main()
{
    float m;

    printf("Insira uma nota: ");
    scanf("%f", &m);

    if (m >= 4.0 && m < 7.0)
    {
        printf("Tem direito a exame\n");
    }
}