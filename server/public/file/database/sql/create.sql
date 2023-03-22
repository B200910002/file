DROP DATABASE IF EXISTS HumanResourcesManagement;
CREATE DATABASE IF NOT EXISTS HumanResourcesManagement 
default character set utf8
collate utf8_general_ci;
USE HumanResourcesManagement;

create table ajiltanAngilal
(
    ajiltan_angilal_code int  not null primary key auto_increment,
    angilal_ner          varchar(45) null
);

create table ajiltan
(
    ajiltan_code    int  not null primary key auto_increment,
    ovog            varchar(255)  not null,
    ner             varchar(255)  not null,
    huis            varchar(2) null,
    utas            varchar(8)  not null,
    register_dugaar varchar(10) not null,
    nevtreh_ner     varchar(40) not null,
    nuuts_ug        varchar(16) not null,
    angilal_code    int  not null,
    foreign key (angilal_code) references ajiltanAngilal(ajiltan_angilal_code)
);	
create table utas
(
	utas_code int not null primary key auto_increment,
    utas varchar(8) null unique,
    ajiltan_code int not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code)
);

create table albanTushaalLavlah
(
    alban_tushaal_lavlah_code int not null primary key auto_increment,
    alban_tushaal_ner         varchar(45) null
);

create table albanTushaal
(
	alban_tushaal_code           int  not null primary key auto_increment,
    ajild_orson_ognoo         date not null,
    ajlaas_garsan_ognoo       date not null,
    ajiltan_code  int not null,
    alban_tushaal_lavlah_code int not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (alban_tushaal_lavlah_code) references albanTushaalLavlah(alban_tushaal_lavlah_code)
);

create table amraltLavlah
(
    amralt_lavlah_code int  not null primary key auto_increment,
    amralt_lavlah_ner  varchar(100) null
);

create table amralt
(
    amralt_code         int  not null primary key auto_increment,
    ehleh_ognoo   date not null,
    duusah_ognoo 	date  not null,
    ajiltan_code        int  not null,
    amralt_lavlah_code  int  not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (amralt_lavlah_code) references amraltLavlah(amralt_lavlah_code)
);

create table bolovsrolGerchilgeeLavlah
(
    bolovsrol_gerchilgee_lavlah_code int  not null primary key auto_increment,
    bolovsrol_ner                    varchar(45) null
);

create table bolovsrolLavlah
(
	bolovsrol_lavlah_code int not null primary key auto_increment,
    bolovsrol_ner  varchar(45) not null,
    bolovsrol_code int null
);

create table bolovsrol
(
    bolovsrol_code                   int  not null primary key auto_increment,
    gerchilgeenii_dugaar             varchar(16)  null,
    bolovsrol_ognoo                  date not null,
    ajiltan_code                     int not null,
    bolovsrol_lavlah_code            int not null,
    bolovsrol_gerchilgee_lavlah_code int not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (bolovsrol_lavlah_code) references bolovsrolLavlah(bolovsrol_lavlah_code),
    foreign key (bolovsrol_gerchilgee_lavlah_code) references bolovsrolGerchilgeeLavlah(bolovsrol_gerchilgee_lavlah_code)
);


create table eruulMendLavlah
(
    eruul_mend_lavlah_code int  not null primary key auto_increment,
    eruul_mend_lavlah_ner  varchar(45) null
);

create table eruulMend
(
    eruul_mend_code        int  not null primary key auto_increment,
    ehleh_ognoo            date not null,
    ajiltan_code           int  not null,
    eruul_mend_lavlah_code int not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (eruul_mend_lavlah_code) references eruulMendLavlah(eruul_mend_lavlah_code)
);

create table gadaadHelniiLavlah
(
    gadaad_helnii_lavlah_code varchar(3) not null primary key,
    gadaad_helnii_lavlah_ner  varchar(45) null
);

create table gadaadHel
(
    gadaad_hel_code           int  not null primary key auto_increment,
    zereg                     varchar(45) null,
    olgoson_ognoo             date not null,
    ajiltan_code              int not null,
    gadaad_helnii_lavlah_code varchar(3) not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (gadaad_helnii_lavlah_code) references gadaadHelniiLavlah(gadaad_helnii_lavlah_code)
);

create table gerBulLavlah
(
    ger_bul_lavlah_code int  not null primary key auto_increment,
    ger_bul_lavlah_ner  varchar(45) null
);

create table gerBul
(
    ger_bul_code        int  not null primary key auto_increment,
    ger_bul_ner         varchar(45) null,
    ajiltan_code        int not null,
    ger_bul_lavlah_code int not null,
    undes_ugsaa         varchar(45) null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (ger_bul_lavlah_code) references gerBulLavlah(ger_bul_lavlah_code)
);

create table HotAimgiinLavlah
(
	hot_aimgiin_lavlah_code varchar(2) not null primary key,
    hot_aimgiin_ner varchar(45) null
);
create table DuuregSumiinLavlah
(
	duureg_sumiin_lavlah_code varchar(3) not null primary key,
    duureg_sumiin_lavlah_ner varchar(45) null,
    hot_aimgiin_lavlah_code varchar(2) not null,
    foreign key(hot_aimgiin_lavlah_code) references HotAimgiinLavlah(hot_aimgiin_lavlah_code)
);

create table horooLavlah
(
    horoo_lavlah_code    int  not null primary key auto_increment,
    horoo_ner            varchar(45) null,
    duureg_sumiin_lavlah_code varchar(3) not null,
    foreign key (duureg_sumiin_lavlah_code) references duuregSumiinLavlah(duureg_sumiin_lavlah_code)
); 

create table geriinHayag
(
    geriin_hayag_code int  not null primary key auto_increment,
    geriin_hayag      varchar(45) null,
    ognoo date null,
    ajiltan_code       int not null,
    horoo_lavlah_code int not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (horoo_lavlah_code) references horooLavlah(horoo_lavlah_code)
);

create table heltesLavlah
(
    heltes_lavlah_code int  not null primary key auto_increment,
    heltes_lavlah_ner  varchar(45) null
);

create table heltes
(
    heltes_code        int  not null primary key auto_increment,
    heltes_orson_ognoo date not null,
    ajiltan_code       int not null,
    heltes_lavlah_code int not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (heltes_lavlah_code) references heltesLavlah(heltes_lavlah_code)
);
	
create table surgaltLavlah (
    surgalt_code int not null primary key auto_increment,
    surgalt_ner varchar(45) null
);

create table surgalt
(
    surgalt_code        int  not null primary key auto_increment,
    ehleh_ognoo         timestamp not null,
    duusah_ognoo        timestamp not null,
    ajiltan_code        int  not null,
    surgalt_lavlah_code int not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (surgalt_lavlah_code) references surgaltLavlah(surgalt_code)
);

create table turshlagaLavlah
(
    turshlaga_lavlah_code int  not null primary key auto_increment,
    turshlaga_lavlah_ner  varchar(45) null
);
create table turshlaga
(
	turshlaga_code int not null primary key auto_increment,
    ehleh_ognoo date not null,
    duusah_ognoo date not null,
    ajiltan_code int not null,
    turshlaga_lavlah_code int not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (turshlaga_lavlah_code) references turshlagalavlah(turshlaga_lavlah_code)
);

create table uramshuulalLavlah
(
    uramshuulal_lavlah_code        int  not null primary key auto_increment,
    uramshuulal_lavlah_ner        varchar(45)  null
);

create table uramshuulal
(
    uramshuulal_code        int  not null primary key auto_increment,
    mungun_dun              int  null,
    ognoo                   date not null,
    ajiltan_code            int not null,
    uramshuulal_lavlah_code int not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (uramshuulal_lavlah_code) references uramshuulalLavlah(uramshuulal_lavlah_code)
);

create table urChadvarTurul
(
    ur_chadvar_turul_code int  not null primary key auto_increment,
    ur_chadvar_turul_ner  varchar(45) null
);

create table urChadvarLavlah
(
    ur_chadvar_lavlah_code int  not null primary key auto_increment,
    ur_chadvar             varchar(45) null,
    ur_chadvar_turul_code  int not null,
    foreign key (ur_chadvar_turul_code) references urChadvarTurul(ur_chadvar_turul_code)
);

create table urChadvar
(
    ur_chadvar_code        int not null primary key auto_increment,
    ajiltan_code           int not null,
    ur_chadvar_lavlah_code int not null,
    foreign key (ajiltan_code) references ajiltan(ajiltan_code),
    foreign key (ur_chadvar_lavlah_code) references urChadvarLavlah(ur_chadvar_lavlah_code)
);




