SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE Cupom;
TRUNCATE TABLE Trecho;
TRUNCATE TABLE Companhia;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO Companhia (id, nome, website, anoFundacao) VALUES
    (1, 'Aero Sul', 'https://www.aerosul.com.br', 1998),
    (2, 'Voa Norte', 'https://www.voanorte.com.br', 2004),
    (3, 'Litoral Air', 'https://www.litoralair.com.br', 2011),
    (4, 'SerraJet', 'https://www.serrajet.com.br', 2016);

INSERT INTO Trecho (idCompanhia, origem, destino, valor, numeroPassagens) VALUES
    (1, 'Porto Alegre', 'Curitiba', 320.00, 18),
    (1, 'Porto Alegre', 'Florianopolis', 210.00, 22),
    (1, 'Curitiba', 'Sao Paulo', 260.00, 16),
    (2, 'Recife', 'Salvador', 280.00, 35),
    (2, 'Salvador', 'Fortaleza', 310.00, 20),
    (2, 'Recife', 'Maceio', 190.00, 28),
    (3, 'Florianopolis', 'Porto Alegre', 260.00, 14),
    (3, 'Florianopolis', 'Curitiba', 240.00, 19),
    (3, 'Porto Alegre', 'Rio de Janeiro', 390.00, 12),
    (4, 'Belo Horizonte', 'Brasilia', 330.00, 21),
    (4, 'Brasilia', 'Goiania', 170.00, 26),
    (4, 'Belo Horizonte', 'Vitoria', 295.00, 17);

INSERT INTO Cupom (idCompanhia, codigo, percentualDesconto, numeroCupons) VALUES
    (1, 'PROMO20', 20.0, 25),
    (1, 'VERAO15', 15.0, 12),
    (2, 'FERIAS10', 10.0, 40),
    (4, 'SERRA12', 12.0, 18),
    (4, 'JET5', 5.0, 30);
