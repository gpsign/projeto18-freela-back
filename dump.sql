--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cat_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cat_tags (
    id integer NOT NULL,
    cat_id integer NOT NULL,
    tag_id integer NOT NULL,
    created_at date DEFAULT now()
);


--
-- Name: cat_tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cat_tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cat_tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cat_tags_id_seq OWNED BY public.cat_tags.id;


--
-- Name: cats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cats (
    id integer NOT NULL,
    name text NOT NULL,
    url text NOT NULL,
    description text,
    available boolean DEFAULT true NOT NULL,
    created_at date DEFAULT now()
);


--
-- Name: cats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cats_id_seq OWNED BY public.cats.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    from_user_id integer NOT NULL,
    to_user_id integer NOT NULL,
    cat_id integer NOT NULL,
    type character varying(9) NOT NULL,
    created_at date DEFAULT now(),
    CONSTRAINT distinct_users CHECK ((from_user_id <> to_user_id)),
    CONSTRAINT notifications_type_check CHECK (((type)::text = ANY ((ARRAY['REQUEST'::character varying, 'ACCEPTED'::character varying, 'REJECTED'::character varying])::text[])))
);


--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    phone text NOT NULL,
    cpf text NOT NULL,
    url text,
    created_at date DEFAULT now()
);


--
-- Name: owners_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.owners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: owners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.owners_id_seq OWNED BY public.users.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(255) NOT NULL,
    created_at date DEFAULT now()
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name text NOT NULL,
    created_at date DEFAULT now()
);


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: user_cats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_cats (
    id integer NOT NULL,
    user_id integer NOT NULL,
    cat_id integer NOT NULL,
    created_at date DEFAULT now()
);


--
-- Name: user_cats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_cats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_cats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_cats_id_seq OWNED BY public.user_cats.id;


--
-- Name: cat_tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cat_tags ALTER COLUMN id SET DEFAULT nextval('public.cat_tags_id_seq'::regclass);


--
-- Name: cats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cats ALTER COLUMN id SET DEFAULT nextval('public.cats_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: user_cats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_cats ALTER COLUMN id SET DEFAULT nextval('public.user_cats_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.owners_id_seq'::regclass);


--
-- Data for Name: cat_tags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cat_tags VALUES (34, 6, 1, '2023-10-16');
INSERT INTO public.cat_tags VALUES (35, 6, 3, '2023-10-16');
INSERT INTO public.cat_tags VALUES (36, 6, 15, '2023-10-16');
INSERT INTO public.cat_tags VALUES (37, 7, 16, '2023-10-16');
INSERT INTO public.cat_tags VALUES (38, 8, 38, '2023-10-16');
INSERT INTO public.cat_tags VALUES (39, 8, 44, '2023-10-16');
INSERT INTO public.cat_tags VALUES (48, 43, 49, '2023-10-16');
INSERT INTO public.cat_tags VALUES (49, 43, 50, '2023-10-16');
INSERT INTO public.cat_tags VALUES (50, 43, 51, '2023-10-16');
INSERT INTO public.cat_tags VALUES (51, 44, 52, '2023-10-16');
INSERT INTO public.cat_tags VALUES (52, 44, 15, '2023-10-16');
INSERT INTO public.cat_tags VALUES (53, 44, 16, '2023-10-16');
INSERT INTO public.cat_tags VALUES (54, 44, 53, '2023-10-16');
INSERT INTO public.cat_tags VALUES (55, 44, 54, '2023-10-16');
INSERT INTO public.cat_tags VALUES (56, 46, 16, '2023-10-16');
INSERT INTO public.cat_tags VALUES (57, 46, 3, '2023-10-16');
INSERT INTO public.cat_tags VALUES (58, 46, 53, '2023-10-16');
INSERT INTO public.cat_tags VALUES (1, 55, 60, '2023-10-16');
INSERT INTO public.cat_tags VALUES (2, 56, 61, '2023-10-16');
INSERT INTO public.cat_tags VALUES (3, 56, 62, '2023-10-16');
INSERT INTO public.cat_tags VALUES (4, 56, 63, '2023-10-16');
INSERT INTO public.cat_tags VALUES (5, 56, 64, '2023-10-16');
INSERT INTO public.cat_tags VALUES (6, 56, 65, '2023-10-16');
INSERT INTO public.cat_tags VALUES (7, 56, 66, '2023-10-16');
INSERT INTO public.cat_tags VALUES (8, 57, 67, '2023-10-16');
INSERT INTO public.cat_tags VALUES (9, 57, 16, '2023-10-16');
INSERT INTO public.cat_tags VALUES (10, 57, 3, '2023-10-16');
INSERT INTO public.cat_tags VALUES (11, 59, 15, '2023-10-16');


--
-- Data for Name: cats; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cats VALUES (55, '!Cat', 'https://pm1.aminoapps.com/6686/8a210fa96c69cafcd4f2cb0170d4e30a26e793f0_hq.jpg', 'Definitivamente não é um gato', true, '2023-10-16');
INSERT INTO public.cats VALUES (56, 'TESTE ULTIMATO', 'https://www.petz.com.br/blog/wp-content/uploads/2020/08/cat-sitter-felino-1280x720.jpg', 'dsadsa', true, '2023-10-16');
INSERT INTO public.cats VALUES (57, 'aksdksakdsa', 'https://www.petz.com.br/blog/wp-content/uploads/2023/08/como-saber-quantos-meses-o-gato-tem2.jpg', 'Qualquer  descricao', true, '2023-10-16');
INSERT INTO public.cats VALUES (59, 'Banco de dados', 'https://www.petz.com.br/blog/wp-content/uploads/2023/08/como-saber-quantos-meses-o-gato-tem2.jpg', 'Veio do banco', true, '2023-10-16');
INSERT INTO public.cats VALUES (7, 'Charizard', 'https://cdn.theatlantic.com/thumbor/viW9N1IQLbCrJ0HMtPRvXPXShkU=/0x131:2555x1568/976x549/media/img/mt/2017/06/shutterstock_319985324/original.jpg', 'retangulo', true, '2023-10-16');
INSERT INTO public.cats VALUES (43, 'ULTIMATE GATO', 'https://img.freepik.com/premium-photo/sphynx-cat-muscle_879398-235.jpg?w=826', 'Gato mais forte de todos', true, '2023-10-16');
INSERT INTO public.cats VALUES (6, 'Mauricio', 'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=620&dpr=1&s=none', 'batata', true, '2023-10-16');
INSERT INTO public.cats VALUES (8, 'Macarronada', 'https://cdn.britannica.com/39/7139-050-A88818BB/Himalayan-chocolate-point.jpg', 'muito bom mesmo', true, '2023-10-16');
INSERT INTO public.cats VALUES (44, 'Gato generico', 'https://www.petz.com.br/blog/wp-content/uploads/2017/02/gatos-agressivos.jpg', 'Apenas um gato genérico para eu poder testar o post. Agora eu preciso testar com uma descrição longa e comprida. O dobro disso na verdade, então se me permite irei encher linguiça por mais algumas palavras. Acho que agora terminei, ou não?', true, '2023-10-16');
INSERT INTO public.cats VALUES (45, 'Gato Nulo', 'https://media.tenor.com/patKcXgljGYAAAAd/cursed-cat.gif', 'NULLNULLNULLNULLNULLNULLNULLNULLNULLNULLNULLNULLNULLNULL', true, '2023-10-16');
INSERT INTO public.cats VALUES (46, 'José Almeida', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/RedCat_8727.jpg/1280px-RedCat_8727.jpg', 'Gato laranja dormindo', true, '2023-10-16');


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.notifications VALUES (6, 9, 5, 45, 'REQUEST', '2023-10-16');
INSERT INTO public.notifications VALUES (4, 9, 5, 6, 'ACCEPTED', '2023-10-16');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (5, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcwMDkxMTgzNywiZXhwIjoxNzAwOTk4MjM3fQ.TmR8hovQXdbgSOmxQ5HBR7jVemHdG90Bq644YRwcZr0', '2023-11-25');


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.tags VALUES (1, 'FEIO', '2023-10-16');
INSERT INTO public.tags VALUES (3, 'LARANJA', '2023-10-16');
INSERT INTO public.tags VALUES (15, 'CHATO', '2023-10-16');
INSERT INTO public.tags VALUES (16, 'PREGUIÇOSO', '2023-10-16');
INSERT INTO public.tags VALUES (38, 'MALÍGNO', '2023-10-16');
INSERT INTO public.tags VALUES (44, 'SIAMÊS', '2023-10-16');
INSERT INTO public.tags VALUES (49, 'FORTE', '2023-10-16');
INSERT INTO public.tags VALUES (50, 'ELEGANTE', '2023-10-16');
INSERT INTO public.tags VALUES (51, 'PODEROSO', '2023-10-16');
INSERT INTO public.tags VALUES (52, 'CINZA', '2023-10-16');
INSERT INTO public.tags VALUES (53, 'ENTEDIADO', '2023-10-16');
INSERT INTO public.tags VALUES (54, 'OLHOS AZUIS', '2023-10-16');
INSERT INTO public.tags VALUES (60, 'PERDIDO', '2023-10-16');
INSERT INTO public.tags VALUES (61, 'UM', '2023-10-16');
INSERT INTO public.tags VALUES (62, 'QUATRO', '2023-10-16');
INSERT INTO public.tags VALUES (63, 'TRÊS', '2023-10-16');
INSERT INTO public.tags VALUES (64, 'DOIS', '2023-10-16');
INSERT INTO public.tags VALUES (65, 'CINCO', '2023-10-16');
INSERT INTO public.tags VALUES (66, 'SEIS', '2023-10-16');
INSERT INTO public.tags VALUES (67, 'BEBE', '2023-10-16');


--
-- Data for Name: user_cats; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_cats VALUES (3, 5, 7, '2023-10-16');
INSERT INTO public.user_cats VALUES (5, 5, 43, '2023-10-16');
INSERT INTO public.user_cats VALUES (8, 5, 46, '2023-10-16');
INSERT INTO public.user_cats VALUES (10, 5, 56, '2023-10-16');
INSERT INTO public.user_cats VALUES (4, 10, 8, '2023-10-16');
INSERT INTO public.user_cats VALUES (7, 10, 45, '2023-10-16');
INSERT INTO public.user_cats VALUES (9, 14, 55, '2023-10-16');
INSERT INTO public.user_cats VALUES (2, 14, 6, '2023-10-16');
INSERT INTO public.user_cats VALUES (6, 5, 44, '2023-10-16');
INSERT INTO public.user_cats VALUES (11, 5, 57, '2023-10-16');
INSERT INTO public.user_cats VALUES (12, 5, 59, '2023-10-16');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (14, 'João Roberto', 'jo.beto@gmail.com', '$2b$10$fSJG9FWMFz.foGeZ0otAV.Yce7pWcZ7SlkPLONLsgIMhkm3RigK3y', '(12) 34567-8901', '123.456.789-00', NULL, '2023-10-16');
INSERT INTO public.users VALUES (10, 'Jackson', 'jackson@email.com', '$2b$10$wULTKOP/PCK9wTmAzxOvK.UFBt6GymSEp2DPIocFOrKkimGu7Q92W', '(31) 98765-4321', '123.543.123-31', NULL, '2023-10-16');
INSERT INTO public.users VALUES (9, 'Camarao', 'gpsognorono@gmail.com', '$2b$10$1dUiZUliXjLaCTddHaxhZOQ8Ky4v3es1IXp781i8ISeMwde86tkAq', '(42) 9931-4314', '023.032.032-40', NULL, '2023-10-16');
INSERT INTO public.users VALUES (15, '1313123', '312312@gmail.com', '$2b$10$xFqSxJebggv8vETZBO74ouSbfG5p9mnfdtMgvuYH04W/JcyYVQdNa', '(31) 23123-1231', '312.312.312-31', NULL, '2023-10-16');
INSERT INTO public.users VALUES (16, '312312', '1@gmail.com', '$2b$10$93dGr4Cd5NlvdhhmiyBuuOIS5EoyNqzBlyzZOCPNEprO0F/0dOrDK', '(31) 2312', '312.312.312-31', NULL, '2023-10-16');
INSERT INTO public.users VALUES (5, 'Gabriel', 'gpsignorini@gmail.com', '$2b$10$wULTKOP/PCK9wTmAzxOvK.UFBt6GymSEp2DPIocFOrKkimGu7Q92W', '(45) 9984-91326', '421.434.656-43
', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/5a181d54-170b-428a-8727-7459e27aa774/d8o1fh8-4497fe5f-f564-4394-95a8-c174314fc9bc.png/v1/fit/w_619,h_619,q_70,strp/toon_link_animation_by_psarahdactyls_d8o1fh8-375w-2x.jpg', '2023-10-16');


--
-- Name: cat_tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cat_tags_id_seq', 1, false);


--
-- Name: cats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cats_id_seq', 59, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notifications_id_seq', 6, true);


--
-- Name: owners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.owners_id_seq', 16, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 5, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tags_id_seq', 67, true);


--
-- Name: user_cats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_cats_id_seq', 1, false);


--
-- Name: cat_tags cat_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cat_tags
    ADD CONSTRAINT cat_tags_pkey PRIMARY KEY (id);


--
-- Name: cats cats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: users owners_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT owners_email_key UNIQUE (email);


--
-- Name: users owners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: user_cats user_cats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_cats
    ADD CONSTRAINT user_cats_pkey PRIMARY KEY (id);


--
-- Name: cat_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX cat_id_index ON public.cats USING btree (id);


--
-- Name: name_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX name_unique ON public.tags USING btree (name);


--
-- Name: tag_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tag_id_index ON public.tags USING btree (id);


--
-- Name: user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_id_index ON public.users USING btree (id);


--
-- Name: cat_tags cat_tags_cat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cat_tags
    ADD CONSTRAINT cat_tags_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.cats(id);


--
-- Name: cat_tags cat_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cat_tags
    ADD CONSTRAINT cat_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- Name: notifications notifications_cat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.cats(id);


--
-- Name: notifications notifications_from_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES public.users(id);


--
-- Name: notifications notifications_to_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_to_user_id_fkey FOREIGN KEY (to_user_id) REFERENCES public.users(id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_cats user_cats_cat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_cats
    ADD CONSTRAINT user_cats_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.cats(id);


--
-- Name: user_cats user_cats_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_cats
    ADD CONSTRAINT user_cats_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

