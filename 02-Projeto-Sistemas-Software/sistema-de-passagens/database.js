const Database = require('better-sqlite3');

const db = new Database('sistema_passagens.db');

db.exec(`
CREATE TABLE IF NOT EXISTS companhia(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        anoFundacao INTEGER NOT NULL
    );
 
CREATE TABLE IF NOT EXISTS trecho(
        id 	INTEGER PRIMARY KEY AUTOINCREMENT,
        idCompanhia INTEGER,
        origem 	TEXT NOT NULL,
        destino TEXT NOT NULL,
        valor 	REAL NOT NULL,
        numeroPassagens INTEGER NOT NULL,
        FOREIGN KEY (idCompanhia) REFERENCES companhia(id)
    );

CREATE TABLE IF NOT EXISTS cupom (
        id 	INTEGER PRIMARY KEY AUTOINCREMENT,
        idCompanhia INTEGER,
        codigo 	TEXT NOT NULL,
        percentualDesconto 	REAL NOT NULL,
        numeroCupons INTEGER NOT NULL,
        FOREIGN KEY (idCompanhia) REFERENCES companhia(id)
    );
`)

module.exports = db;