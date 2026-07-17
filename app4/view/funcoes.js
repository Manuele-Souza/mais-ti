function escaparHtml(valor) {
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatarMoeda(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(valor));
}

async function buscarJson(url) {
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error(`Falha na requisicao (${resposta.status})`);
  }
  return resposta.json();
}

function montarCardCompanhia(companhia) {
  const siteTexto = companhia.website ? companhia.website.replace(/^https?:\/\//, '') : 'Sem site';
  return `
    <article class="entity-row">
      <div class="entity-main">
        <div class="entity-title">${escaparHtml(companhia.nome)}</div>
        <div class="entity-meta">Fundacao: ${escaparHtml(companhia.anoFundacao)} | Site: ${escaparHtml(siteTexto)}</div>
      </div>
      <div class="entity-actions">
        <a class="icon-action icon-action-edit" href="/companhias/editar/${companhia.id}" title="Editar companhia" aria-label="Editar companhia"><i class="bi bi-pencil-square"></i></a>
        <a class="icon-action icon-action-delete" href="/companhias/excluir/${companhia.id}" title="Excluir companhia" aria-label="Excluir companhia"><i class="bi bi-trash"></i></a>
      </div>
    </article>
  `;
}

function montarCardCupom(cupom) {
  return `
    <article class="entity-row">
      <div class="entity-main">
        <div class="entity-title">${escaparHtml(cupom.codigo)} (${escaparHtml(cupom.nomeCompanhia)})</div>
        <div class="entity-meta">Desconto: ${escaparHtml(cupom.percentualDesconto)}% | Quantidade: ${escaparHtml(cupom.numeroCupons)}</div>
      </div>
      <div class="entity-actions">
        <a class="icon-action icon-action-edit" href="/cupons/editar/${cupom.id}" title="Editar cupom" aria-label="Editar cupom"><i class="bi bi-pencil-square"></i></a>
        <a class="icon-action icon-action-delete" href="/cupons/excluir/${cupom.id}" title="Excluir cupom" aria-label="Excluir cupom"><i class="bi bi-trash"></i></a>
      </div>
    </article>
  `;
}

function montarCardTrecho(trecho) {
  return `
    <article class="entity-row">
      <div class="entity-main">
        <div class="entity-title">${escaparHtml(trecho.origem)} -> ${escaparHtml(trecho.destino)} (${escaparHtml(trecho.nomeCompanhia)})</div>
        <div class="entity-meta">Valor: ${escaparHtml(formatarMoeda(trecho.valor))} | Passagens: ${escaparHtml(trecho.numeroPassagens)}</div>
      </div>
      <div class="entity-actions">
        <a class="icon-action icon-action-edit" href="/trechos/editar/${trecho.id}" title="Editar trecho" aria-label="Editar trecho"><i class="bi bi-pencil-square"></i></a>
        <a class="icon-action icon-action-delete" href="/trechos/excluir/${trecho.id}" title="Excluir trecho" aria-label="Excluir trecho"><i class="bi bi-trash"></i></a>
      </div>
    </article>
  `;
}

async function carregarCompanhias(container) {
  const lista = await buscarJson('/companhias');
  if (!lista.length) {
    alert('Nenhuma companhia cadastrada.');
    container.innerHTML = '';
    return;
  }
  //container.innerHTML = lista.map(montarCardCompanhia).join('');

  // Exemplo equivalente ao map: monta o HTML acumulando item a item.
  let html = '';
  for (const companhia of lista) {
    html += montarCardCompanhia(companhia);
  }
  container.innerHTML = html;
}

async function carregarCupons(container) {
  const lista = await buscarJson('/cupons');
  if (!lista.length) {
    alert('Nenhum cupom cadastrado.');
    container.innerHTML = '';
    return;
  }
  container.innerHTML = lista.map(montarCardCupom).join('');
}

async function carregarTrechos(container) {
  const lista = await buscarJson('/trechos');
  if (!lista.length) {
    alert('Nenhum trecho cadastrado.');
    container.innerHTML = '';
    return;
  }
  container.innerHTML = lista.map(montarCardTrecho).join('');
}