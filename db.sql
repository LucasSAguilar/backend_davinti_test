CREATE DATABASE AgendaContatos;
USE AgendaContatos;

CREATE TABLE contato (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    idade INT(3)
);

CREATE TABLE telefone (
    id INT NOT NULL AUTO_INCREMENT,
    idcontato INT NOT NULL,
    numero VARCHAR(16),
    PRIMARY KEY (id),
    FOREIGN KEY (idcontato) REFERENCES contato(id)
);

INSERT INTO contato (nome, idade) VALUES
('Ana Silva', 25),
('Carlos Souza', 32),
('Mariana Lima', 29);

INSERT INTO telefone (idcontato, numero) VALUES
(1, '(11) 91234-5678'),
(1, '(11) 99876-5432'),
(2, '(21) 98765-4321'),
(3, '(31) 97654-3210'),
(3, '(31) 93456-7890');
