--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.8 (Ubuntu 14.8-0ubuntu0.22.04.1)

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
-- Name: cats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cats (
    id integer NOT NULL,
    name text NOT NULL,
    url text NOT NULL,
    description text,
    available boolean DEFAULT true NOT NULL
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
-- Name: catsownerid; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.catsownerid (
    id integer NOT NULL,
    ownerid integer NOT NULL,
    catid integer NOT NULL
);


--
-- Name: catsownerid_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.catsownerid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: catsownerid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.catsownerid_id_seq OWNED BY public.catsownerid.id;


--
-- Name: cattags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cattags (
    id integer NOT NULL,
    catid integer NOT NULL,
    tagid integer NOT NULL
);


--
-- Name: cattags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cattags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cattags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cattags_id_seq OWNED BY public.cattags.id;


--
-- Name: owners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.owners (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    number text NOT NULL,
    cpf text NOT NULL,
    url text
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

ALTER SEQUENCE public.owners_id_seq OWNED BY public.owners.id;


--
-- Name: ownerssession; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ownerssession (
    id integer NOT NULL,
    ownerid integer NOT NULL,
    token text NOT NULL
);


--
-- Name: ownerssession_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ownerssession_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ownerssession_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ownerssession_id_seq OWNED BY public.ownerssession.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    tag text NOT NULL
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
-- Name: cats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cats ALTER COLUMN id SET DEFAULT nextval('public.cats_id_seq'::regclass);


--
-- Name: catsownerid id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catsownerid ALTER COLUMN id SET DEFAULT nextval('public.catsownerid_id_seq'::regclass);


--
-- Name: cattags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cattags ALTER COLUMN id SET DEFAULT nextval('public.cattags_id_seq'::regclass);


--
-- Name: owners id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.owners ALTER COLUMN id SET DEFAULT nextval('public.owners_id_seq'::regclass);


--
-- Name: ownerssession id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ownerssession ALTER COLUMN id SET DEFAULT nextval('public.ownerssession_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Data for Name: cats; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cats VALUES (9, 'Macarronada', 'ww.url.com', 'a', true);
INSERT INTO public.cats VALUES (6, 'Mauricio', 'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=620&dpr=1&s=none', 'batata', false);
INSERT INTO public.cats VALUES (8, 'Macarronada', 'https://cdn.britannica.com/39/7139-050-A88818BB/Himalayan-chocolate-point.jpg', 'muito bom mesmo', true);
INSERT INTO public.cats VALUES (7, 'Charizard', 'https://cdn.theatlantic.com/thumbor/viW9N1IQLbCrJ0HMtPRvXPXShkU=/0x131:2555x1568/976x549/media/img/mt/2017/06/shutterstock_319985324/original.jpg', 'retangulo', true);
INSERT INTO public.cats VALUES (32, 'true', 'true', NULL, true);
INSERT INTO public.cats VALUES (33, 'true', 'true', NULL, true);
INSERT INTO public.cats VALUES (34, 'teste', 'teste', '', true);
INSERT INTO public.cats VALUES (14, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (15, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (16, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (17, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (18, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (19, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (20, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (21, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (22, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (23, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (24, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (25, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (26, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (27, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (28, 'robinson', 'www.youtube.com', 'abc', false);
INSERT INTO public.cats VALUES (10, 'robinson', 'www.youtube.com', 'abc', true);
INSERT INTO public.cats VALUES (11, 'robinson', 'www.youtube.com', 'abc', true);
INSERT INTO public.cats VALUES (12, 'robinson', 'www.youtube.com', 'abc', true);
INSERT INTO public.cats VALUES (13, 'robinson', 'www.youtube.com', 'abc', true);


--
-- Data for Name: catsownerid; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.catsownerid VALUES (9, 9, 6);
INSERT INTO public.catsownerid VALUES (10, 9, 7);
INSERT INTO public.catsownerid VALUES (11, 9, 8);
INSERT INTO public.catsownerid VALUES (12, 5, 10);
INSERT INTO public.catsownerid VALUES (13, 5, 11);
INSERT INTO public.catsownerid VALUES (14, 5, 12);
INSERT INTO public.catsownerid VALUES (15, 5, 13);
INSERT INTO public.catsownerid VALUES (16, 5, 14);
INSERT INTO public.catsownerid VALUES (17, 5, 15);
INSERT INTO public.catsownerid VALUES (18, 5, 16);
INSERT INTO public.catsownerid VALUES (19, 5, 17);
INSERT INTO public.catsownerid VALUES (20, 5, 18);
INSERT INTO public.catsownerid VALUES (21, 5, 19);
INSERT INTO public.catsownerid VALUES (22, 5, 20);
INSERT INTO public.catsownerid VALUES (23, 5, 21);
INSERT INTO public.catsownerid VALUES (24, 5, 22);
INSERT INTO public.catsownerid VALUES (25, 5, 23);
INSERT INTO public.catsownerid VALUES (26, 5, 24);
INSERT INTO public.catsownerid VALUES (27, 5, 25);
INSERT INTO public.catsownerid VALUES (28, 5, 26);
INSERT INTO public.catsownerid VALUES (29, 5, 27);
INSERT INTO public.catsownerid VALUES (30, 5, 28);
INSERT INTO public.catsownerid VALUES (31, 9, 32);
INSERT INTO public.catsownerid VALUES (32, 9, 33);
INSERT INTO public.catsownerid VALUES (33, 9, 34);


--
-- Data for Name: cattags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cattags VALUES (26, 6, 1);
INSERT INTO public.cattags VALUES (27, 6, 3);
INSERT INTO public.cattags VALUES (28, 7, 2);
INSERT INTO public.cattags VALUES (29, 7, 1);
INSERT INTO public.cattags VALUES (30, 7, 3);
INSERT INTO public.cattags VALUES (31, 8, 3);
INSERT INTO public.cattags VALUES (32, 14, 127);
INSERT INTO public.cattags VALUES (33, 20, 140);


--
-- Data for Name: owners; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.owners VALUES (5, 'Gabriel', 'gpsignorini@gmail.com', '$2b$10$wULTKOP/PCK9wTmAzxOvK.UFBt6GymSEp2DPIocFOrKkimGu7Q92W', '40028922', '10068817940', NULL);
INSERT INTO public.owners VALUES (9, 'Chimpanze', 'gpsognorono@gmail.com', '$2b$10$1dUiZUliXjLaCTddHaxhZOQ8Ky4v3es1IXp781i8ISeMwde86tkAq', '(45) 9984-91326', '100.688.179-40', NULL);


--
-- Data for Name: ownerssession; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.ownerssession VALUES (49, 5, '3c05eb2a-6655-433a-9feb-578e78131529');
INSERT INTO public.ownerssession VALUES (51, 9, '018c3d3b-32b5-4a46-922f-55a22f030cd2');


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: cats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cats_id_seq', 34, true);


--
-- Name: catsownerid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.catsownerid_id_seq', 33, true);


--
-- Name: cattags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cattags_id_seq', 33, true);


--
-- Name: owners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.owners_id_seq', 9, true);


--
-- Name: ownerssession_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ownerssession_id_seq', 51, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tags_id_seq', 1, false);


--
-- Name: cats cats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_pkey PRIMARY KEY (id);


--
-- Name: catsownerid catsownerid_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catsownerid
    ADD CONSTRAINT catsownerid_pkey PRIMARY KEY (id);


--
-- Name: cattags cattags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cattags
    ADD CONSTRAINT cattags_pkey PRIMARY KEY (id);


--
-- Name: owners owners_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_email_key UNIQUE (email);


--
-- Name: owners owners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.owners
    ADD CONSTRAINT owners_pkey PRIMARY KEY (id);


--
-- Name: ownerssession ownerssession_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ownerssession
    ADD CONSTRAINT ownerssession_pkey PRIMARY KEY (id);


--
-- Name: ownerssession ownerssession_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ownerssession
    ADD CONSTRAINT ownerssession_token_key UNIQUE (token);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: catsownerid catsownerid_catid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catsownerid
    ADD CONSTRAINT catsownerid_catid_fkey FOREIGN KEY (catid) REFERENCES public.cats(id);


--
-- Name: catsownerid catsownerid_ownerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catsownerid
    ADD CONSTRAINT catsownerid_ownerid_fkey FOREIGN KEY (ownerid) REFERENCES public.owners(id);


--
-- Name: cattags cattags_catid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cattags
    ADD CONSTRAINT cattags_catid_fkey FOREIGN KEY (catid) REFERENCES public.cats(id);


--
-- Name: ownerssession ownerssession_ownerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ownerssession
    ADD CONSTRAINT ownerssession_ownerid_fkey FOREIGN KEY (ownerid) REFERENCES public.owners(id);


--
-- PostgreSQL database dump complete
--

