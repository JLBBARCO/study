'''
Desenvolvido por José Luiz Bruiani Barco
'''

# * Importações
import mysql.connector

# * Parâmetros de conexão
conexão = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='',
    database='exemplo'
)

# * Criar cursor
meuCursor = conexão.cursor()

# * Verificar conexão
if conexão.is_connected():
    print('Conexão bem sucedida!')

# ! meuCursor.execute('CREATE TABLE pessoas (nome VARCHAR(60), idade INT)')

sql = 'INSERT INTO pessoas (nome, idade) VALUES (%s, %s)'
val = [
    ('Antonio', 76),
    ('Sebastião', 84)
]

meuCursor.executemany(sql, val)
conexão.commit()
