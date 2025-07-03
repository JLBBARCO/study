# Desenvolvido por José Luiz B Barco

class Livro:
    def __init__(self, titulo, autor, isbn, copias_disponíveis=1):
        self.titulo = titulo
        self.autor = autor
        self.isbn = isbn
        self.copias_disponíveis = copias_disponíveis
        
    def copias_disponíveis(self):
        return self.copias_disponíveis

    def emprestar(self):
        if self.copias_disponíveis > 0:
            self.copias_disponíveis -= 1
            return True
        return False

    def devolver(self):
        self.copias_disponíveis += 1

    def __str__(self):
        return f"'{self.titulo}' por {self.autor} (ISBN: {self.isbn})"

class usuário:
    def __init__(self, nome, id_usuário):
        self.nome = nome
        self.id_usuário = id_usuário
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
        return f"Usuário: {self.nome} (ID: {self.id_usuário})"

class Biblioteca:
    def __init__(self):
        self.catálogo = list()
        self.usuários = list()

    def adicionar_livro(self, livro):
        self.catálogo.append(livro)

    def registrar_usuário(self, usuário):
        self.usuário.append(usuário)

    def buscar_livro(self, título_ou_autor):
        resultados = list()
        for livro in self.catálogo:
            if (título_ou_autor.lower() in livro.título.lower() or título_ou_autor.lower() in livro.autor.lower()):
                resultados.append(livro)
        return resultados