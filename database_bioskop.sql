/*
SQLyog Professional v12.5.1 (64 bit)
MySQL - 10.4.32-MariaDB : Database - database_bioskop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`database_bioskop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `database_bioskop`;

/*Table structure for table `film` */

DROP TABLE IF EXISTS `film`;

CREATE TABLE `film` (
  `id_film` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `judul` varchar(100) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `durasi` time DEFAULT NULL,
  `genre` varchar(200) DEFAULT NULL,
  `tanggal_rilis` date DEFAULT NULL,
  PRIMARY KEY (`id_film`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `film` */

insert  into `film`(`id_film`,`judul`,`deskripsi`,`durasi`,`genre`,`tanggal_rilis`) values 
(1,'Spiderman','Film Manusia Laba-Laba','02:00:00','Action, Hero','2022-02-10'),
(2,'Avanger','Film SuperHero','02:00:00','Action, Hero','2022-02-10');

/*Table structure for table `pelanggan` */

DROP TABLE IF EXISTS `pelanggan`;

CREATE TABLE `pelanggan` (
  `id_pelanggan` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) DEFAULT NULL,
  `no_telp` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_pelanggan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pelanggan` */

/*Table structure for table `pemesanan` */

DROP TABLE IF EXISTS `pemesanan`;

CREATE TABLE `pemesanan` (
  `id_pemesanan` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `penayangan_id` int(10) unsigned DEFAULT NULL,
  `pelanggan_id` int(10) unsigned DEFAULT NULL,
  `jumlah_tiket` int(11) DEFAULT NULL,
  `total_harga` int(11) DEFAULT NULL,
  `status_pembayaran` tinyint(1) DEFAULT NULL,
  `tanggal_pemesanan` datetime DEFAULT NULL,
  PRIMARY KEY (`id_pemesanan`),
  KEY `fk_pemesanan_penayangan` (`penayangan_id`),
  KEY `fk_pemesanan_pelanggan` (`pelanggan_id`),
  CONSTRAINT `fk_pemesanan_pelanggan` FOREIGN KEY (`pelanggan_id`) REFERENCES `pelanggan` (`id_pelanggan`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pemesanan_penayangan` FOREIGN KEY (`penayangan_id`) REFERENCES `penayangan` (`id_penayangan`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `pemesanan` */

/*Table structure for table `penayangan` */

DROP TABLE IF EXISTS `penayangan`;

CREATE TABLE `penayangan` (
  `id_penayangan` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `film_id` int(10) unsigned DEFAULT NULL,
  `studio_id` int(10) unsigned DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `waktu_mulai` time DEFAULT NULL,
  `waktu_selesai` time DEFAULT NULL,
  `harga_tiket` int(11) DEFAULT NULL,
  `max_tiket` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_penayangan`),
  KEY `fk_penayangan_film` (`film_id`),
  KEY `fk_penayangan_studio` (`studio_id`),
  CONSTRAINT `fk_penayangan_film` FOREIGN KEY (`film_id`) REFERENCES `film` (`id_film`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_penayangan_studio` FOREIGN KEY (`studio_id`) REFERENCES `studio` (`id_studio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `penayangan` */

/*Table structure for table `studio` */

DROP TABLE IF EXISTS `studio`;

CREATE TABLE `studio` (
  `id_studio` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nama_studio` varchar(100) DEFAULT NULL,
  `lokasi` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_studio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `studio` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
