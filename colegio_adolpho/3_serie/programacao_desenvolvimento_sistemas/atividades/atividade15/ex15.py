'''
Desenvolvido por José Luiz Bruiani Barco
'''

# * Importações
import customtkinter as ctk

class App(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("Progress Bar")

        self.frame_principal = ctk.CTkFrame(self, width=200, height=200)
        self.frame_principal.grid(row=0, column=0, padx=20, pady=20)

        self.framePrint = ctk.CTkFrame(self, width=200, height=200)
        self.framePrint.grid(row=1, column=0, padx=20, pady=20)

        self.entrada = ctk.CTkEntry(self.frame_principal, placeholder_text="Digite algo entre 0 e 10")
        self.entrada.grid(row=0, column=0, padx=20, pady=10)

        self.botão = ctk.CTkButton(self.frame_principal, text="Atualizar", command=self.atualizar_progressbar)
        self.botão.grid(row=1, column=0, padx=20, pady=10)

        self.progressbar = ctk.CTkProgressBar(self.framePrint, width=150)
        self.progressbar.set(0)
        self.progressbar.grid(row=0, column=0, padx=20, pady=20)

    def atualizar_progressbar(self):
        valor = float(self.entrada.get())
        if 0 <= valor <= 10:
            self.progressbar.set(valor / 10)
        else:
            self.progressbar.set(0)
        self.entrada.delete(0, ctk.END)

app = App()
app.mainloop()