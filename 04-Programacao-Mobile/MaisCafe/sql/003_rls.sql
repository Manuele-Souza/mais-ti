alter table public.cafeterias enable row level security;
alter table public.perfis enable row level security;
alter table public.clientes enable row level security;
alter table public.categorias enable row level security;
alter table public.produtos enable row level security;
alter table public.mesas enable row level security;
alter table public.comandas enable row level security;
alter table public.itens_comanda enable row level security;
alter table public.pagamentos enable row level security;
alter table public.avaliacoes enable row level security;
alter table public.reservas enable row level security;

create policy cafeteria_mesma on public.cafeterias for select to authenticated using(id=public.minha_cafeteria_id());
create policy perfis_ler on public.perfis for select to authenticated using(id=auth.uid() or (cafeteria_id=public.minha_cafeteria_id() and public.meu_papel() in ('gerente','garcom')));
create policy perfis_atualizar_proprio on public.perfis for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
revoke update on public.perfis from authenticated;
grant update(nome,telefone) on public.perfis to authenticated;

create policy categorias_ler on public.categorias for select to authenticated using(cafeteria_id=public.minha_cafeteria_id());
create policy categorias_gerente on public.categorias for all to authenticated using(cafeteria_id=public.minha_cafeteria_id() and public.meu_papel()='gerente') with check(cafeteria_id=public.minha_cafeteria_id() and public.meu_papel()='gerente');
create policy produtos_ler on public.produtos for select to authenticated using(cafeteria_id=public.minha_cafeteria_id());
create policy produtos_gerente on public.produtos for all to authenticated using(cafeteria_id=public.minha_cafeteria_id() and public.meu_papel()='gerente') with check(cafeteria_id=public.minha_cafeteria_id() and public.meu_papel()='gerente');

create policy mesas_ler on public.mesas for select to authenticated using(cafeteria_id=public.minha_cafeteria_id());
create policy mesas_staff on public.mesas for update to authenticated using(cafeteria_id=public.minha_cafeteria_id() and public.meu_papel() in ('gerente','garcom')) with check(cafeteria_id=public.minha_cafeteria_id());
create policy mesas_gerente_insert on public.mesas for insert to authenticated with check(cafeteria_id=public.minha_cafeteria_id() and public.meu_papel()='gerente');

create policy clientes_staff on public.clientes for all to authenticated using(cafeteria_id=public.minha_cafeteria_id() and public.meu_papel() in ('gerente','garcom')) with check(cafeteria_id=public.minha_cafeteria_id());
create policy cliente_proprio on public.clientes for select to authenticated using(perfil_id=auth.uid());

create policy comandas_staff on public.comandas for all to authenticated using(cafeteria_id=public.minha_cafeteria_id() and public.meu_papel() in ('gerente','garcom')) with check(cafeteria_id=public.minha_cafeteria_id());
create policy comandas_cliente on public.comandas for select to authenticated using(cliente_id in(select id from public.clientes where perfil_id=auth.uid()));

create policy itens_staff on public.itens_comanda for all to authenticated using(exists(select 1 from public.comandas c where c.id=comanda_id and c.cafeteria_id=public.minha_cafeteria_id() and public.meu_papel() in ('gerente','garcom'))) with check(exists(select 1 from public.comandas c where c.id=comanda_id and c.cafeteria_id=public.minha_cafeteria_id()));
create policy itens_cliente on public.itens_comanda for select to authenticated using(exists(select 1 from public.comandas c join public.clientes cl on cl.id=c.cliente_id where c.id=comanda_id and cl.perfil_id=auth.uid()));

create policy pagamentos_staff on public.pagamentos for all to authenticated using(exists(select 1 from public.comandas c where c.id=comanda_id and c.cafeteria_id=public.minha_cafeteria_id() and public.meu_papel() in ('gerente','garcom'))) with check(exists(select 1 from public.comandas c where c.id=comanda_id and c.cafeteria_id=public.minha_cafeteria_id()));
create policy pagamentos_cliente on public.pagamentos for select to authenticated using(exists(select 1 from public.comandas c join public.clientes cl on cl.id=c.cliente_id where c.id=comanda_id and cl.perfil_id=auth.uid()));

create policy avaliacoes_ler on public.avaliacoes for select to authenticated using(cafeteria_id=public.minha_cafeteria_id());
create policy avaliacoes_cliente on public.avaliacoes for insert to authenticated with check(cafeteria_id=public.minha_cafeteria_id() and cliente_perfil_id=auth.uid());
create policy reservas_proprias on public.reservas for select to authenticated using(cliente_id in(select id from public.clientes where perfil_id=auth.uid()) or (cafeteria_id=public.minha_cafeteria_id() and public.meu_papel() in ('gerente','garcom')));
create policy reservas_cliente_insert on public.reservas for insert to authenticated with check(cliente_id in(select id from public.clientes where perfil_id=auth.uid()));
create policy reservas_staff_update on public.reservas for update to authenticated using(cafeteria_id=public.minha_cafeteria_id() and public.meu_papel() in ('gerente','garcom'));

alter publication supabase_realtime add table public.mesas;
alter publication supabase_realtime add table public.comandas;
alter publication supabase_realtime add table public.itens_comanda;
