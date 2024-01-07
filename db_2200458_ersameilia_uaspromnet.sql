-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2024 at 06:46 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2200458_ersameilia_uaspromnet`
--

-- --------------------------------------------------------

--
-- Table structure for table `pasien_puskesmas_ersa`
--

CREATE TABLE `pasien_puskesmas_ersa` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `usia` int(3) NOT NULL,
  `jenis_kelamin` enum('perempuan','laki-laki') DEFAULT NULL,
  `alamat` varchar(255) NOT NULL,
  `deskripsi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien_puskesmas_ersa`
--

INSERT INTO `pasien_puskesmas_ersa` (`id`, `nama`, `usia`, `jenis_kelamin`, `alamat`, `deskripsi`) VALUES
(1, 'Hassan Hiday', 21, 'laki-laki', 'Jawa Timur', 'nyeri pada seluruh kepala'),
(2, 'Irham Jundurrahman', 21, 'laki-laki', 'Bandung', 'kulit berwarna kemerahan dan gatal saat terpapar dingin'),
(3, 'Yasmin Hafidah', 19, 'perempuan', 'Garut', 'nyeri perut disertai demam dan nafsu makan berkurang'),
(4, 'Siti Nuraeni', 19, 'perempuan', 'Majalengka', 'Mual dan nyeri'),
(5, 'Fauzan Ramandhika', 20, 'laki-laki', 'Palembang', 'sesak nafas  disertai rasa tidak enak badan'),
(6, 'Ersa Meilia', 19, 'perempuan', 'Tasikmalaya', 'pusing mual');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasien_puskesmas_ersa`
--
ALTER TABLE `pasien_puskesmas_ersa`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pasien_puskesmas_ersa`
--
ALTER TABLE `pasien_puskesmas_ersa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
