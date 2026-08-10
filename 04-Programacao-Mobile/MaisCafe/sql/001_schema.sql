create extension if not exists pgcrypto;

create table public.cafeterias (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  chave_pix text,
  cidade text,
  criado_em timestamptz not null default now()
);

create table public.perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  cafeteria_id uuid not null references public.cafeterias(id) on delete cascade,
  nome text not null,
  telefone text,
  papel text not null default 'cliente' check (papel in ('gerente','garcom','cliente')),
  ativo boolean not null default true,
  criado_em timestamptz not null default now()
);

create table public.clientes (
  id uuid primary key default gen_random_uuid(),
  cafeteria_id uuid not null references public.cafeterias(id) on delete cascade,
  perfil_id uuid unique references public.perfis(id) on delete set null,
  nome text not null,
  telefone text,
  pontos integer not null default 0 check (pontos >= 0),
  criado_em timestamptz not null default now()
);

create table public.categorias (
  id uuid primary key default gen_random_uuid(),
  cafeteria_id uuid not null references public.cafeterias(id) on delete cascade,
  nome text not null,
  ordem integer not null default 0,
  unique (cafeteria_id,nome)
);

create table public.produtos (
  id uuid primary key default gen_random_uuid(),
  cafeteria_id uuid not null references public.cafeterias(id) on delete cascade,
  categoria_id uuid not null references public.categorias(id) on delete restrict,
  nome text not null,
  descricao text,
  preco numeric(10,2) not null check (preco >= 0),
  imagem_url text,
  ativo boolean not null default true,
  destaque boolean not null default false,
  criado_em timestamptz not null default now()
);

create table public.mesas (
  id uuid primary key default gen_random_uuid(),
  cafeteria_id uuid not null references public.cafeterias(id) on delete cascade,
  numero integer not null check (numero > 0),
  capacidade integer not null default 4 check (capacidade > 0),
  status text not null default 'livre' check (status in ('livre','ocupada','reservada','limpando')),
  codigo_qr text not null default gen_random_uuid()::text,
  unique (cafeteria_id,numero)
);

create table public.comandas (
  id uuid primary key default gen_random_uuid(),
  cafeteria_id uuid not null references public.cafeterias(id) on delete cascade,
  mesa_id uuid not null references public.mesas(id) on delete restrict,
  garcom_id uuid not null references public.perfis(id) on delete restrict,
  cliente_id uuid references public.clientes(id) on delete set null,
  pessoas integer not null default 1 check (pessoas > 0),
  status text not null default 'aberta' check (status in ('aberta','fechada','cancelada')),
  total numeric(10,2) not null default 0,
  aberta_em timestamptz not null default now(),
  fechada_em timestamptz
);

create table public.itens_comanda (
  id uuid primary key default gen_random_uuid(),
  comanda_id uuid not null references public.comandas(id) on delete cascade,
  produto_id uuid not null references public.produtos(id) on delete restrict,
  quantidade integer not null check (quantidade > 0),
  preco_unitario numeric(10,2) not null check (preco_unitario >= 0),
  observacao text,
  criado_em timestamptz not null default now()
);

create table public.pagamentos (
  id uuid primary key default gen_random_uuid(),
  comanda_id uuid not null references public.comandas(id) on delete cascade,
  forma text not null check (forma in ('pix','cartao','dinheiro')),
  valor numeric(10,2) not null check (valor > 0),
  status text not null default 'pendente' check (status in ('pendente','confirmado','cancelado')),
  criado_em timestamptz not null default now()
);

create table public.avaliacoes (
  id uuid primary key default gen_random_uuid(),
  cafeteria_id uuid not null references public.cafeterias(id) on delete cascade,
  cliente_perfil_id uuid references public.perfis(id) on delete set null,
  produto_id uuid references public.produtos(id) on delete set null,
  garcom_id uuid references public.perfis(id) on delete set null,
  estrelas integer not null check (estrelas between 1 and 5),
  comentario text,
  criado_em timestamptz not null default now()
);

create table public.reservas (
  id uuid primary key default gen_random_uuid(),
  cafeteria_id uuid not null references public.cafeterias(id) on delete cascade,
  cliente_id uuid not null references public.clientes(id) on delete cascade,
  mesa_id uuid references public.mesas(id) on delete set null,
  data_hora timestamptz not null,
  pessoas integer not null check (pessoas > 0),
  status text not null default 'solicitada' check (status in ('solicitada','confirmada','cancelada','concluida')),
  observacao text
);

create index idx_produtos_categoria on public.produtos(categoria_id);
create index idx_produtos_cafeteria_ativo on public.produtos(cafeteria_id,ativo);
create index idx_mesas_cafeteria_status on public.mesas(cafeteria_id,status);
create index idx_comandas_mesa_status on public.comandas(mesa_id,status);
create index idx_itens_comanda on public.itens_comanda(comanda_id);
create index idx_avaliacoes_produto on public.avaliacoes(produto_id);
