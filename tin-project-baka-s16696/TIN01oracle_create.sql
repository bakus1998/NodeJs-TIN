-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-12-09 16:52:05.467

-- tables
-- Table: Mechanik
CREATE TABLE Mechanik (
    id_mechanik int NOT NULL AUTO_INCREMENT,
    Imie varchar(60) NOT NULL,
    Nazwisko varchar(60) NOT NULL,
    Doswiadczenie varchar(100) NOT NULL,
    CONSTRAINT Mechanik_pk PRIMARY KEY (id_mechanik)
);

-- Table: Naprawa
CREATE TABLE Naprawa (
    id_Naprawa int NOT NULL AUTO_INCREMENT,
    KosztNaprawy double(100,2) NOT NULL,
    OpisUszkodzenia varchar(300) NOT NULL,
    DataNaprawy date NOT NULL,
    id_Pojazd integer NOT NULL,
    id_mechanik integer NOT NULL,
    CONSTRAINT Naprawa_pk PRIMARY KEY (id_Naprawa)
);

-- Table: Pojazd
CREATE TABLE Pojazd (
    id_Pojazd int NOT NULL AUTO_INCREMENT,
    Marka varchar(20) NOT NULL,
    Przebieg integer NOT NULL,
    Jednostka_KmMil bool NOT NULL,
    Tablica_Rejestracyjna varchar(10) NOT NULL,
    CONSTRAINT Pojazd_pk PRIMARY KEY (id_Pojazd)
);

-- foreign keys
-- Reference: Naprawa_Mechanik (table: Naprawa)
ALTER TABLE Naprawa ADD CONSTRAINT Naprawa_Mechanik FOREIGN KEY Naprawa_Mechanik (id_mechanik)
    REFERENCES Mechanik (id_mechanik);

-- Reference: Naprawa_Pojazd (table: Naprawa)
ALTER TABLE Naprawa ADD CONSTRAINT Naprawa_Pojazd FOREIGN KEY Naprawa_Pojazd (id_Pojazd)
    REFERENCES Pojazd (id_Pojazd);

-- End of file.

