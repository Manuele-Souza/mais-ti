

CREATE TABLE public.cafeterias (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT cafeterias_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  cafeteria_id uuid NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'garcom'::text CHECK (role = ANY (ARRAY['admin'::text, 'garcom'::text, 'caixa'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id),
  CONSTRAINT profiles_cafeteria_id_fkey FOREIGN KEY (cafeteria_id) REFERENCES public.cafeterias(id)
);
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  cafeteria_id uuid NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT categories_pkey PRIMARY KEY (id),
  CONSTRAINT categories_cafeteria_id_fkey FOREIGN KEY (cafeteria_id) REFERENCES public.cafeterias(id)
);
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  cafeteria_id uuid NOT NULL,
  category_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0::numeric),
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_cafeteria_id_fkey FOREIGN KEY (cafeteria_id) REFERENCES public.cafeterias(id),
  CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);
CREATE TABLE public.cafe_tables (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  cafeteria_id uuid NOT NULL,
  number integer NOT NULL CHECK (number > 0),
  status text NOT NULL DEFAULT 'livre'::text CHECK (status = ANY (ARRAY['livre'::text, 'ocupada'::text, 'reservada'::text, 'limpando'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT cafe_tables_pkey PRIMARY KEY (id),
  CONSTRAINT cafe_tables_cafeteria_id_fkey FOREIGN KEY (cafeteria_id) REFERENCES public.cafeterias(id)
);
CREATE TABLE public.orders (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  cafeteria_id uuid NOT NULL,
  table_id uuid NOT NULL,
  waiter_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'aberta'::text CHECK (status = ANY (ARRAY['aberta'::text, 'fechada'::text, 'cancelada'::text])),
  opened_at timestamp with time zone NOT NULL DEFAULT now(),
  closed_at timestamp with time zone,
  CONSTRAINT orders_pkey PRIMARY KEY (id),
  CONSTRAINT orders_cafeteria_id_fkey FOREIGN KEY (cafeteria_id) REFERENCES public.cafeterias(id),
  CONSTRAINT orders_table_id_fkey FOREIGN KEY (table_id) REFERENCES public.cafe_tables(id),
  CONSTRAINT orders_waiter_id_fkey FOREIGN KEY (waiter_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.order_items (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL,
  product_id uuid NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric NOT NULL CHECK (unit_price >= 0::numeric),
  notes text,
  CONSTRAINT order_items_pkey PRIMARY KEY (id),
  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id),
  CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);