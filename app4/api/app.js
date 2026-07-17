const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const dbConfig = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;
const VIEW_PAGES_DIR = path.resolve(__dirname, '../../view/pages');
const VIEW_PUBLIC_DIR = path.resolve(__dirname, '../../view/public');

app.use(express.json());
app.use('/public', express.static(VIEW_PUBLIC_DIR));

const dbPool = mysql.createPool(dbConfig);

const queryAll = async (sql, params = []) => {
  const [rows] = await dbPool.query(sql, params);
  return rows;
};

const handleListError = (res, err) => {
  res.status(500).json({
    message: 'Erro ao carregar dados.',
    detail: err.message,
  });
};

const renderPage = (fileName) => (req, res) => {
  res.sendFile(path.join(VIEW_PAGES_DIR, fileName));
};

const notImplemented = (feature) => (req, res) => {
  res.status(501).json({
    message: `Rota de ${feature} criada, mas ainda sem implementacao.`,
  });
};

function listarCompanhiasTela(req, res) {
  renderPage('companhia-listar.html')(req, res);
}

function cadastrarCompanhiaTela(req, res) {
  renderPage('companhia-cadastrar.html')(req, res);
}

function editarCompanhiaTela(req, res) {
  renderPage('companhia-editar.html')(req, res);
}

function excluirCompanhiaTela(req, res) {
  renderPage('companhia-excluir.html')(req, res);
}

function listarCuponsTela(req, res) {
  renderPage('cupom-listar.html')(req, res);
}

function cadastrarCupomTela(req, res) {
  renderPage('cupom-cadastrar.html')(req, res);
}

function editarCupomTela(req, res) {
  renderPage('cupom-editar.html')(req, res);
}

function excluirCupomTela(req, res) {
  renderPage('cupom-excluir.html')(req, res);
}

function listarTrechosTela(req, res) {
  renderPage('trecho-listar.html')(req, res);
}

function cadastrarTrechoTela(req, res) {
  renderPage('trecho-cadastrar.html')(req, res);
}

function editarTrechoTela(req, res) {
  renderPage('trecho-editar.html')(req, res);
}

function excluirTrechoTela(req, res) {
  renderPage('trecho-excluir.html')(req, res);
}

function adminLoginTela(req, res) {
  renderPage('admin-login.html')(req, res);
}

function adminPainelTela(req, res) {
  renderPage('admin-painel.html')(req, res);
}

function homeTela(req, res) {
  renderPage('index.html')(req, res);
}

async function listarCompanhias(req, res) {
  try {
    const companhias = await queryAll(
      `SELECT id, nome, website, anoFundacao
       FROM Companhia
       ORDER BY nome`
    );
    res.status(200).json(companhias);
  } catch (err) {
    handleListError(res, err);
  }
}

async function listarCupons(req, res) {
  try {
    const cupons = await queryAll(
      `SELECT cp.id, cp.idCompanhia, c.nome AS nomeCompanhia, cp.codigo,
              cp.percentualDesconto, cp.numeroCupons
       FROM Cupom cp
       INNER JOIN Companhia c ON c.id = cp.idCompanhia
       ORDER BY c.nome, cp.codigo`
    );
    res.status(200).json(cupons);
  } catch (err) {
    handleListError(res, err);
  }
}

async function listarTrechos(req, res) {
  try {
    const trechos = await queryAll(
      `SELECT t.id, t.idCompanhia, c.nome AS nomeCompanhia,
              t.origem, t.destino, t.valor, t.numeroPassagens
       FROM Trecho t
       INNER JOIN Companhia c ON c.id = t.idCompanhia
       ORDER BY c.nome, t.origem, t.destino`
    );
    res.status(200).json(trechos);
  } catch (err) {
    handleListError(res, err);
  }
}

app.get('/', (req, res) => {
  res.redirect('/home');
});

// Admin
app.get('/admin/login', adminLoginTela);
app.post('/admin/login', notImplemented('autenticacao admin'));
app.get('/admin/painel', adminPainelTela);

// Companhia, rotas nomeadas para telas
app.get('/companhias/listar', listarCompanhiasTela);
app.get('/companhias/cadastrar', cadastrarCompanhiaTela);
app.get('/companhias/editar/:id', editarCompanhiaTela);
app.get('/companhias/excluir/:id', excluirCompanhiaTela);

// Companhia, rotas de CRUD
app.get('/companhias', listarCompanhias);
app.get('/companhias/:id', notImplemented('detalhe de companhia'));
app.post('/companhias', notImplemented('cadastro de companhia'));
app.put('/companhias/:id', notImplemented('edicao de companhia'));
app.delete('/companhias/:id', notImplemented('exclusao de companhia'));

// Cupom, rotas nomeadas para telas
app.get('/cupons/listar', listarCuponsTela);
app.get('/cupons/cadastrar', cadastrarCupomTela);
app.get('/cupons/editar/:id', editarCupomTela);
app.get('/cupons/excluir/:id', excluirCupomTela);

// Cupom, rotas de CRUD
app.get('/cupons', listarCupons);
app.get('/cupons/:id', notImplemented('detalhe de cupom'));
app.post('/cupons', notImplemented('cadastro de cupom'));
app.put('/cupons/:id', notImplemented('edicao de cupom'));
app.delete('/cupons/:id', notImplemented('exclusao de cupom'));

// Trecho, rotas nomeadas para telas
app.get('/trechos/listar', listarTrechosTela);
app.get('/trechos/cadastrar', cadastrarTrechoTela);
app.get('/trechos/editar/:id', editarTrechoTela);
app.get('/trechos/excluir/:id', excluirTrechoTela);

// Trecho, rotas de CRUD
app.get('/trechos', listarTrechos);
app.get('/trechos/:id', notImplemented('detalhe de trecho'));
app.post('/trechos', notImplemented('cadastro de trecho'));
app.put('/trechos/:id', notImplemented('edicao de trecho'));
app.delete('/trechos/:id', notImplemented('exclusao de trecho'));

// Home/index
app.get('/home', homeTela);

app.use((req, res) => {
  res.status(404).json({ message: 'Rota nao encontrada.' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
  });
}

module.exports = app;
