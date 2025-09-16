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

        # * Declarando listas para nomes, notas e concatenado
        self.nomes = list()
        self.notas = list()
        self.alunos_labels = list()

        # * Cria Frame que mostra a lista de alunos e notas
        self.framePrint = customtkinter.CTkScrollableFrame(self, width=300)
        self.framePrint.grid(row=0, column=0, padx=10, pady=10)

        # * Cria e exibe os labels
        for nome, nota in zip(self.nomes, self.notas):
            aluno_label = customtkinter.CTkLabel(self.framePrint, text=f'{nome} | {nota}')
            aluno_label.pack(pady=5)
            self.alunos_labels.append(aluno_label)

        # * Cria Frame que pede os nomes, notas e confirma
        self.frameInput = customtkinter.CTkFrame(self, width=300)
        self.frameInput.grid(row=0, column=1, padx=25, pady=25)

        # * Cria os inputs para digitar o nome e a nota e cria o botão para confirmar
        self.entradaNome = customtkinter.CTkEntry(self.frameInput, placeholder_text='Digite o nome:')
        self.entradaNome.grid(row=0, column=0, padx=10, pady=10)

        self.entradaNota = customtkinter.CTkEntry(self.frameInput, placeholder_text='Digite a nota:')
        self.entradaNota.grid(row=1, column=0, padx=10, pady=10)

        self.botãoSubmit = customtkinter.CTkButton(self.frameInput, text='Adicionar')
        self.botãoSubmit.grid(row=2, column=0, padx=10, pady=10)

# Executa o aplicativo
app = App()
app.mainloop()
