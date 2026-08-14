CREATE TABLE Cliente
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    senha VARCHAR(512) NOT NULL,
    Celular CHAR(14) NOT NULL,
    cpf CHAR (14) NOT NULL,
    email VARCHAR(50) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    UNIQUE (cpf,email)
);

SELECT email, senha FROM `Cliente`;


SELECT email, senha FROM `Cliente` WHERE email = "juliana.lima@email.com;"

SELECT * FROM `Cliente` WHERE id <= 30 AND LENGTH(senha) <=15;

DELETE FROM `Cliente` WHERE id = 37;

UPDATE `Cliente` SET nome = "Natasha Matos", email = "natashaquero0508@gmail.com" WHERE id = 11