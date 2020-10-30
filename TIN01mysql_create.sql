-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-10-23 12:48:06.178

-- tables
-- Table: Mechanik
CREATE TABLE Mechanik (
    id_mechanik integer NOT NULL,
    Nazwisko varchar(20) NOT NULL,
    Doswiadczenie varchar(50) NOT NULL,
    CONSTRAINT Mechanik_pk PRIMARY KEY (id_mechanik)
);

-- Table: Naprawa
CREATE TABLE Naprawa (
    id_Naprawa integer NOT NULL,
    KosztNaprawy double(10,2) NOT NULL,
    OpisUszkodzenia varchar(200) NOT NULL,
    DataNaprawy date NOT NULL,
    id_Klient integer NOT NULL,
    id_mechanik integer NOT NULL,
    CONSTRAINT Naprawa_pk PRIMARY KEY (id_Naprawa)
);

-- Table: Pojazd
CREATE TABLE Pojazd (
    id_Klient integer NOT NULL,
    Marka varchar(30) NOT NULL,
    Przebieg integer NOT NULL,
    CONSTRAINT Pojazd_pk PRIMARY KEY (id_Klient)
);

-- foreign keys
-- Reference: Naprawa_Klient (table: Naprawa)
ALTER TABLE Naprawa ADD CONSTRAINT Naprawa_Klient FOREIGN KEY Naprawa_Klient (id_Klient)
    REFERENCES Pojazd (id_Klient);

-- Reference: Naprawa_Mechanik (table: Naprawa)
ALTER TABLE Naprawa ADD CONSTRAINT Naprawa_Mechanik FOREIGN KEY Naprawa_Mechanik (id_mechanik)
    REFERENCES Mechanik (id_mechanik);

-- End of file.

