'''
Desenvolvido por José Luiz Bruiani Barco
'''

# * Importações
import customtkinter

class App(customtkinter.CTk):
    def __init__(self):
        super().__init__()

        self.title("Customtkinter")
        self.geometry("640x640")

        self.nomes = []
        self.notas = []
        self.alunos_labels = []

        # * Frame da lista
        self.framePrint = customtkinter.CTkScrollableFrame(self, width=300)
        self.framePrint.grid(row=0, column=0, padx=10, pady=10)

        # * Frame de entrada
        self.frameInput = customtkinter.CTkFrame(self, width=300)
        self.frameInput.grid(row=0, column=1, padx=25, pady=25)

        self.labelStatus = customtkinter.CTkLabel(self.frameInput, text='')
        self.labelStatus.grid(row=0, column=0, padx=10, pady=10)

        self.entradaNome = customtkinter.CTkEntry(self.frameInput, placeholder_text='Digite o nome:')
        self.entradaNome.grid(row=1, column=0, padx=10, pady=10)

        self.entradaNota = customtkinter.CTkEntry(self.frameInput, placeholder_text='Digite a nota:')
        self.entradaNota.grid(row=2, column=0, padx=10, pady=10)

        self.botãoSubmit = customtkinter.CTkButton(self.frameInput, text='Adicionar', command=self.button_click)
        self.botãoSubmit.grid(row=3, column=0, padx=10, pady=10)

        # * Frame de informações
        self.frameInformações = customtkinter.CTkFrame(self, width=300)
        self.frameInformações.grid(row=1, column=0, padx=25, pady=25)

        self.labelMínima = customtkinter.CTkLabel(self.frameInformações, text='')
        self.labelMínima.grid(row=0, column=0, padx=10, pady=10)

        self.labelMedia = customtkinter.CTkLabel(self.frameInformações, text='Média das notas: 0.00')
        self.labelMedia.grid(row=1, column=0, padx=10, pady=10)

        self.labelMáxima = customtkinter.CTkLabel(self.frameInformações, text='')
        self.labelMáxima.grid(row=2, column=0, padx=10, pady=10)

    def button_click(self):
        nome = self.entradaNome.get().strip()
        nota_str = self.entradaNota.get().strip()

        # * Validação
        if not nome:
            self.labelStatus.configure(text='Adicione um nome para enviar')
            return

        try:
            nota = float(nota_str)
            if nota < 0 or nota > 10:
                self.labelStatus.configure(text='Nota deve estar entre 0 e 10')
                return
        except ValueError:
            self.labelStatus.configure(text='Nota inválida')
            return

        # * Adiciona novo aluno se não possuir na lista
        if nome not in self.nomes:
            self.nomes.append(nome)
            self.notas.append(nota)
            self.labelStatus.configure(text='Adicionado com sucesso!')
        else:
            self.labelStatus.configure(text='Aluno já existente')

        # * Atualiza lista ordenada
        for label in self.alunos_labels:
            label.destroy()
        self.alunos_labels.clear()

        if self.nomes:
            dados_ordenados = sorted(zip(self.nomes, self.notas), key=lambda x: x[1], reverse=True)
            maior_nota = dados_ordenados[0][1]

            for nome, nota in dados_ordenados:
                cor = "green" if nota == maior_nota else "white"
                aluno_label = customtkinter.CTkLabel(self.framePrint, text=f'{nome} | {nota}', text_color=cor)
                aluno_label.pack(pady=5)
                self.alunos_labels.append(aluno_label)

            # * Atualiza nota mínima
            nomeMínimo, notaMínima = dados_ordenados[-1]
            self.labelMínima.configure(text=f'{nomeMínimo} possui a menor nota: {notaMínima}')

            # * Atualiza nota máxima
            nomeMáximo, notaMáximo = dados_ordenados[0]
            self.labelMáxima.configure(text=f'{nomeMáximo} possui a maior nota: {notaMáximo}')

            # * Atualiza média
            media = sum(self.notas) / len(self.notas)
            self.labelMedia.configure(text=f'Média das notas: {media:.2f}')
        else:
            self.labelMínima.configure(text='')
            self.labelMáxima.configure(text='')
            self.labelMedia.configure(text='Média das notas: 0.00')

        # * Limpa campos
        self.entradaNome.delete(0, 'end')
        self.entradaNota.delete(0, 'end')

# * Executa o aplicativo
if __name__ == "__main__":
    app = App()
    app.mainloop()
