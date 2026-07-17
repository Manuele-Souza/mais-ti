SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS Cupom;
DROP TABLE IF EXISTS Trecho;
DROP TABLE IF EXISTS Companhia;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE IF NOT EXISTS Companhia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    anoFundacao INT NOT NULL,
    CONSTRAINT chk_companhia_ano CHECK (anoFundacao > 1800)
);

CREATE TABLE IF NOT EXISTS Trecho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idCompanhia INT NOT NULL,
    origem VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    numeroPassagens INT NOT NULL,
    CONSTRAINT chk_trecho_valor CHECK (valor >= 0),
    CONSTRAINT chk_trecho_passagens CHECK (numeroPassagens >= 0),
    CONSTRAINT fk_trecho_companhia
        FOREIGN KEY (idCompanhia)
        REFERENCES Companhia(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS Cupom (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idCompanhia INT NOT NULL,
    codigo VARCHAR(255) NOT NULL UNIQUE,
    percentualDesconto DECIMAL(5,2) NOT NULL,
    numeroCupons INT NOT NULL,
    CONSTRAINT chk_cupom_percentual CHECK (percentualDesconto >= 0 AND percentualDesconto <= 100),
    CONSTRAINT chk_cupom_quantidade CHECK (numeroCupons >= 0),
    CONSTRAINT fk_cupom_companhia
        FOREIGN KEY (idCompanhia)
        REFERENCES Companhia(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
