-- +Café - dados de exemplo
-- Execute depois de 001_schema.sql.
insert into public.cafeterias (name)
values ('+Café - Unidade Escola');
with cafeteria as (
  select id from public.cafeterias
  where name = '+Café - Unidade Escola'
  limit 1
)
insert into public.categories (cafeteria_id, name)
select id, category_name
from cafeteria
cross join (values ('Cafés'), ('Doces'), ('Salgados'), ('Bebidas')) as v(category_name);
with cafeteria as (
  select id from public.cafeterias where name = '+Café - Unidade Escola' limit 1
), category_ids as (
  select c.id, c.name from public.categories c
  join cafeteria f on f.id = c.cafeteria_id
)
insert into public.products (cafeteria_id, category_id, name, description, price)
select f.id, c.id, p.name, p.description, p.price
from cafeteria f
join (values
  ('Cafés', 'Espresso', 'Café curto e encorpado', 7.00::numeric),
  ('Cafés', 'Cappuccino', 'Café, leite e espuma', 12.90::numeric),
  ('Cafés', 'Café coado', 'Café filtrado tradicional', 8.00::numeric),
  ('Doces', 'Brownie', 'Brownie de chocolate', 9.50::numeric),
  ('Doces', 'Bolo de cenoura', 'Fatia com cobertura', 9.00::numeric),
  ('Salgados', 'Pão de queijo', 'Porção com 3 unidades', 8.50::numeric),
  ('Bebidas', 'Água com gás', 'Garrafa 500 ml', 5.00::numeric),
  ('Bebidas', 'Suco de laranja', 'Copo 300 ml', 9.00::numeric)
) as p(category_name, name, description, price) on true
join category_ids c on c.name = p.category_name;
with cafeteria as (
  select id from public.cafeterias where name = '+Café - Unidade Escola' limit 1
)
insert into public.cafe_tables (cafeteria_id, number, status)
select id, n, 'livre'
from cafeteria
cross join generate_series(1, 8) as n;
Estudo dirigido de 4 horas • Material para iniciantes
