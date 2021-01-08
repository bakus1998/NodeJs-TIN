-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Czas generowania: 07 Sty 2021, 11:04
-- Wersja serwera: 8.0.22
-- Wersja PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `tin_project`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Mechanik`
--

CREATE TABLE `Mechanik` (
  `id_mechanik` int NOT NULL,
  `Imie` varchar(60) NOT NULL,
  `Nazwisko` varchar(60) NOT NULL,
  `Doswiadczenie` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `Mechanik`
--

INSERT INTO `Mechanik` (`id_mechanik`, `Imie`, `Nazwisko`, `Doswiadczenie`) VALUES
(2, 'Stanisław', 'Nowakowski', 'Doświadczenie w naprawianiu bulbulatorów'),
(5, 'Stefan', 'Kowalczyk', 'Certyfikat AutoKasacja 2020'),
(49, 'Maksymilian', 'Nowak', 'Certyfikat Złote koło'),
(62, 'Krzysztof', 'Bakalarski', 'Certyfikat Gold Piston'),
(63, 'Patryk', 'Malinowski', 'Praca u Wiesia 4 lata'),
(64, 'Mieczysław', 'Rododendroński', 'Technikum w Żbikowicach');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Naprawa`
--

CREATE TABLE `Naprawa` (
  `id_Naprawa` int NOT NULL,
  `KosztNaprawy` double(100,2) NOT NULL,
  `OpisUszkodzenia` varchar(300) NOT NULL,
  `DataNaprawy` date NOT NULL,
  `id_Pojazd` int NOT NULL,
  `id_mechanik` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `Naprawa`
--

INSERT INTO `Naprawa` (`id_Naprawa`, `KosztNaprawy`, `OpisUszkodzenia`, `DataNaprawy`, `id_Pojazd`, `id_mechanik`) VALUES
(5, 680.00, 'Silnik nie odpalał', '2020-11-11', 1, 5),
(6, 1260.00, 'Naprawa rozrusznika ', '2020-11-09', 22, 5),
(15, 500.00, 'Tuning nitro', '2020-12-31', 2, 2),
(23, 1860.00, 'Wymiana sprzęgła', '2020-12-13', 22, 62),
(25, 1900.00, 'Wymiana tłumika', '2020-12-10', 24, 63);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Pojazd`
--

CREATE TABLE `Pojazd` (
  `id_Pojazd` int NOT NULL,
  `Marka` varchar(20) NOT NULL,
  `Przebieg` int NOT NULL,
  `Jednostka_KmMil` varchar(3) NOT NULL,
  `Tablica_Rejestracyjna` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Zrzut danych tabeli `Pojazd`
--

INSERT INTO `Pojazd` (`id_Pojazd`, `Marka`, `Przebieg`, `Jednostka_KmMil`, `Tablica_Rejestracyjna`) VALUES
(1, 'Alfa Romeo', 192564, 'km', 'WY 13920'),
(2, 'Audi', 322564, 'mil', 'WGM 20139'),
(5, 'BMW', 292564, 'km', 'PO KM40L'),
(8, 'Skoda', 175100, 'mil', 'WY WASIAK'),
(22, 'BMW', 51923, 'km', 'WGM 83KLV'),
(24, 'Bentley', 163453, 'km', 'WPR F8A3');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `Mechanik`
--
ALTER TABLE `Mechanik`
  ADD PRIMARY KEY (`id_mechanik`);

--
-- Indeksy dla tabeli `Naprawa`
--
ALTER TABLE `Naprawa`
  ADD PRIMARY KEY (`id_Naprawa`),
  ADD KEY `Naprawa_Mechanik` (`id_mechanik`),
  ADD KEY `Naprawa_Pojazd` (`id_Pojazd`);

--
-- Indeksy dla tabeli `Pojazd`
--
ALTER TABLE `Pojazd`
  ADD PRIMARY KEY (`id_Pojazd`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `Mechanik`
--
ALTER TABLE `Mechanik`
  MODIFY `id_mechanik` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT dla tabeli `Naprawa`
--
ALTER TABLE `Naprawa`
  MODIFY `id_Naprawa` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT dla tabeli `Pojazd`
--
ALTER TABLE `Pojazd`
  MODIFY `id_Pojazd` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `Naprawa`
--
ALTER TABLE `Naprawa`
  ADD CONSTRAINT `Naprawa_Mechanik` FOREIGN KEY (`id_mechanik`) REFERENCES `Mechanik` (`id_mechanik`),
  ADD CONSTRAINT `Naprawa_Pojazd` FOREIGN KEY (`id_Pojazd`) REFERENCES `Pojazd` (`id_Pojazd`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
