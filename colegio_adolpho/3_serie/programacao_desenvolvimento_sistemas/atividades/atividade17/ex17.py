# Importações
import mysql.connector

# Parâmetros de conexão
conexão = mysql.connector.connect(
    host='127.0.0.1',
    user='root',
    password='',
)

# Criar cursor
meuCursor = conexão.cursor()
