import customtkinter as ctk

class App (ctk.CTk):
    def __init__(self):
        super().__init__()
        self.frame1 = ctk.CTkScrollableFrame(self, width=200, height=200)
        self.frame1.grid(row=0, column=0, padx=20, pady=20)

        frase = 'Que Mundo Bonito!\n'*50

        self.texto = ctk.CTkLabel(self.frame1, text=frase)
        self.texto.grid(row=0, column=0, padx=25, pady=25)

        self.frame2 = ctk.CTkScrollableFrame(self, width=200, height=200)
        self.frame2.grid(row=1, column=1, padx=20, pady=20)

        self.texto2 = ctk.CTkLabel(self.frame2, text='')
        self.texto2.grid(row=0, column=0, padx=25, pady=25)

        self.frame3 = ctk.CTkScrollableFrame(self, width=200, height=200)
        self.frame3.grid(row=1, column=0, padx=20, pady=20)

        self.card3 = ctk.CTkLabel(self.frame3, text='')
        self.card3.grid(row=0, column=0, padx=25, pady=25)

        self.button = ctk.CTkButton(self.card3, text='Um Botão', command=self.button_click)
        self.button.grid(row=2, column=0)

        self.entrada = ctk.CTkEntry(self.card3, placeholder_text='Digite seu nome: ')
        self.entrada.grid(row=1, column=0)

    def button_click(self):
        nome = self.entrada.get()

        diálogo = ctk.CTkInputDialog(text='Digite sua idade: ', title='Janela de entrada')
        idade = diálogo.get_input()
        idade = int(idade)
        print(f'Sua idade é: {idade}')

        self.texto2.configure(text=f'Olá, {nome}\nVocê tem {idade} anos!')

        self.entrada.delete(0, ctk.END)

app = App()
app.mainloop()
