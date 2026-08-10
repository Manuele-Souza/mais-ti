-- Depois de criar usuários no Supabase Auth, promova-os pelo e-mail.
-- Troque os e-mails pelos usados na aula.
update public.perfis p set papel='gerente'
from auth.users u where p.id=u.id and u.email='gerente@maiscafe.com';
update public.perfis p set papel='garcom'
from auth.users u where p.id=u.id and u.email='garcom@maiscafe.com';
