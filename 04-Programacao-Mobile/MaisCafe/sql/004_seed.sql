-- Use um UUID fixo apenas para a aula. Em produção, deixe o banco gerar os UUIDs.
insert into public.cafeterias(id,nome,cidade,chave_pix) values('00000000-0000-0000-0000-000000000001','+Café Escola','Aracaju','CHAVE-PIX-EXEMPLO');
insert into public.categorias(id,cafeteria_id,nome,ordem) values
('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000001','Cafés',1),
('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000001','Doces',2),
('10000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000001','Salgados',3),
('10000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000001','Bebidas',4);
insert into public.produtos(cafeteria_id,categoria_id,nome,descricao,preco,destaque) values
('00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','Espresso','Café intenso de 50 ml',7.00,true),
('00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','Cappuccino','Espresso, leite e espuma cremosa',12.90,true),
('00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000002','Brownie','Chocolate e castanhas',9.50,true),
('00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000003','Pão de queijo','Assado na hora',8.00,false),
('00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000004','Água com gás','Garrafa 500 ml',5.00,false);
insert into public.mesas(cafeteria_id,numero,capacidade,status) select '00000000-0000-0000-0000-000000000001',n,case when n<=4 then 4 else 2 end,'livre' from generate_series(1,12) n;
