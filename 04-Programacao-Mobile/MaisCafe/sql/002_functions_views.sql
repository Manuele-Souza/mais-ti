create or replace function public.minha_cafeteria_id() returns uuid
language sql stable security definer set search_path=public
as $$ select cafeteria_id from public.perfis where id=auth.uid() $$;

create or replace function public.meu_papel() returns text
language sql stable security definer set search_path=public
as $$ select papel from public.perfis where id=auth.uid() $$;

grant execute on function public.minha_cafeteria_id() to authenticated;
grant execute on function public.meu_papel() to authenticated;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path=public
as $$
declare v_cafeteria uuid; v_nome text;
begin
  v_cafeteria := nullif(new.raw_user_meta_data->>'cafeteria_id','')::uuid;
  v_nome := coalesce(new.raw_user_meta_data->>'nome',split_part(new.email,'@',1));
  if v_cafeteria is null then raise exception 'cafeteria_id é obrigatório'; end if;
  insert into public.perfis(id,cafeteria_id,nome,papel) values(new.id,v_cafeteria,v_nome,'cliente');
  insert into public.clientes(cafeteria_id,perfil_id,nome) values(v_cafeteria,new.id,v_nome);
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.recalcular_total_comanda() returns trigger
language plpgsql security definer set search_path=public
as $$
declare v_id uuid;
begin
  v_id := coalesce(new.comanda_id,old.comanda_id);
  update public.comandas set total=coalesce((select sum(quantidade*preco_unitario) from public.itens_comanda where comanda_id=v_id),0) where id=v_id;
  return coalesce(new,old);
end; $$;
create trigger trg_total_item after insert or update or delete on public.itens_comanda for each row execute procedure public.recalcular_total_comanda();

create or replace function public.fechar_comanda(p_comanda_id uuid,p_mesa_id uuid) returns void
language plpgsql security invoker set search_path=public
as $$ begin
 update public.comandas set status='fechada',fechada_em=now() where id=p_comanda_id;
 update public.mesas set status='limpando' where id=p_mesa_id;
end; $$;

grant execute on function public.fechar_comanda(uuid,uuid) to authenticated;

create or replace view public.vw_dashboard_gerente with (security_invoker=true) as
select
  coalesce(sum(c.total) filter(where c.status='fechada' and c.fechada_em::date=current_date),0) as vendas,
  count(distinct m.id) filter(where m.status='ocupada') as mesas,
  count(distinct c.id) filter(where c.status='aberta') as comandas,
  coalesce(avg(c.total) filter(where c.status='fechada' and c.fechada_em::date=current_date),0) as ticket
from public.mesas m
left join public.comandas c on c.cafeteria_id=m.cafeteria_id
where m.cafeteria_id=public.minha_cafeteria_id();
