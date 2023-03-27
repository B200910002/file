CREATE TABLE IF NOT EXISTS public.users
(
    _id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    verify boolean NOT NULL default false,
    CONSTRAINT user_pkey PRIMARY KEY (_id)
);	

CREATE TABLE IF NOT EXISTS public.categories
(
    _id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (_id)
);

CREATE TABLE IF NOT EXISTS public.extentions
(
    _id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    category_id integer NOT NULL,
    CONSTRAINT extentions_pkey PRIMARY KEY (_id),
	foreign key (category_id) references categories(_id)
);

CREATE TABLE IF NOT EXISTS public.files
(
    _id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    extention_id integer NOT NULL,
	owner_id integer not null,
    CONSTRAINT files_pkey PRIMARY KEY (_id),
	foreign key (extention_id) references extentions(_id),
	foreign key (owner_id) references users(_id)
);