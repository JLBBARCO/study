# Desenvolvido por José Luiz B Barco

class Livro:
    def __init__(self, titulo, autor, isbn, cópias_disponíveis=1):
        self.titulo = titulo
        self.autor = autor
        self.isbn = isbn
        self.cópias_disponíveis = cópias_disponíveis
        
    def cópias_disponíveis(self):
        return self.cópias_disponíveis

    def emprestar(self):
        if self.cópias_disponíveis > 0:
            self.cópias_disponíveis -= 1
            return True
        return False

    def devolver(self):
        self.cópias_disponíveis += 1

    def __str__(self):
        return f"'{self.titulo}' por {self.autor} (ISBN: {self.isbn})"

class Usuário:
    def __init__(self, nome, id_Usuário):
        self.nome = nome
        self.id_Usuário = id_Usuário
        self.livros_emprestados = list()

    def emprestar_livro(self, livro):
        if livro.emprestar():
            self.livros_emprestados.append(livro)
            return f"Livro emprestado com sucesso!"
        return f"Desculpe, '{livro.titulo}' não está disponível no momento."

    def devolver_livro(self, livro):
        if livro in self.livros_emprestados:
            livro.devolver()
            self.livros_emprestados.remove(livro)
            return f"Livro devolvido com sucesso!"
        return f"Você não possui o livro '{livro.titulo}'."

    def listar_livros_emprestados(self):
        if not self.livros_emprestados:
            return 'Nenhum livro emprestado'
        return '\n'.join(str(livro) for livro in self.livros_emprestados)

    def __str__ (self):
        return f"Usuário: {self.nome} (ID: {self.id_Usuário})"

class Biblioteca:
    def __init__(self):
        self.catálogo = list()
        self.Usuários = list()

    def adicionar_livro(self, livro):
        self.catálogo.append(livro)

    def registrar_usuário(self, Usuário):
        self.Usuários.append(Usuário)

    def buscar_livro(self, título_ou_autor):
        resultados = list()
        for livro in self.catálogo:
            if (título_ou_autor.lower() in livro.título.lower() or título_ou_autor.lower() in livro.autor.lower()):
                resultados.append(livro)
        return resultados

    def relatório_disponibilidade(self):
        return "\n".join(f"{livro} - Disponíveis: {Livro.cópias_disponíveis}" for livro in self.catálogo)

livro1 = Livro('Cinco Minutos', 'José de Alencar', '978-8525407337', 3)
livro2 = Livro('Capitães de Areia', 'Jorge Amado', '978-8535914061', 1)
aluno = Usuário('Saulo Santos', '2023001')
professor = Usuário('Sebastião Silva', '2023002')

biblioteca = Biblioteca()
biblioteca.adicionar_livro(livro1)
biblioteca.adicionar_livro(livro2)
biblioteca.registrar_usuário(aluno)
biblioteca.registrar_usuário(professor)

print(aluno.emprestar_livro(livro1))
print(professor.emprestar_livro(livro1))
print(aluno.emprestar_livro(livro2))
print(professor.emprestar_livro(livro2))

print('\n--- Livros de Saulo ---')
print(aluno.listar_livros_emprestados())

print(aluno.devolver_livro(livro1))
print('\n--- Disponibilidade após Devolução ---')
print(biblioteca.relatório_disponibilidade())
