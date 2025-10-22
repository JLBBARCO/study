# Importações
import mysql.connector

try:
    conexao = mysql.connector.connect(
        host='127.0.0.1',
        user='root',
        password='',
    )
    cursor = conexao.cursor()

    # Criar banco/esquema e selecionar
    cursor.execute("CREATE DATABASE IF NOT EXISTS ex17PDS")
    cursor.execute("USE ex17PDS")

    # Criar tabelas
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS clientes (
            c_id INT PRIMARY KEY,
            nome VARCHAR(50),
            data_cadastro DATE
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS pedidos (
            p_id INT PRIMARY KEY,
            c_id INT,
            valor_total DECIMAL(10,2),
            status VARCHAR(20),
            FOREIGN KEY (c_id) REFERENCES clientes(c_id)
        )
    """)

    # Inserir registros na tabela clientes
    clientes = [
        (113, 'Antonio', '2025-05-05'),
        (114, 'Bruna',   '2025-06-15'),
        (115, 'Carlos',  '2025-07-20'),
    ]
    for cliente in clientes:
        try:
            cursor.execute(
                "INSERT INTO clientes (c_id, nome, data_cadastro) VALUES (%s, %s, %s)",
                cliente
            )
        except mysql.connector.IntegrityError:
            pass

    # Inserir registros na tabela pedidos
    pedidos = [
        (2025367, 113, 682.95, 'enviado'),
        (2025512, 114, 1199.99, 'a_caminho'),
        (2025951, 115, 152.10, 'em_producao'),
    ]
    for pedido in pedidos:
        try:
            cursor.execute(
                "INSERT INTO pedidos (p_id, c_id, valor_total, status) VALUES (%s, %s, %s, %s)",
                pedido
            )
        except mysql.connector.IntegrityError:
            pass

    conexao.commit()

    # Mostrar tabelas do banco ex17PDS
    cursor.execute("SHOW TABLES")
    tabelas = cursor.fetchall()
    for (tabela,) in tabelas:
        print(tabela)

except mysql.connector.Error as err:
    print(f"Erro de conexão/SQL: {err}")
finally:
    try:
        cursor.close()
        conexao.close()
    except Exception:
        pass
