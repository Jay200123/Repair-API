/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 9.3.0 : Database - repair-db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`repair-db` /*!40100 DEFAULT CHARACTER SET utf32 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `repair-db`;

/*Table structure for table `repair_details` */

DROP TABLE IF EXISTS `repair_details`;

CREATE TABLE `repair_details` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `unit_id` int unsigned NOT NULL,
  `complaint` varchar(55) NOT NULL,
  `serial_number` varchar(6) DEFAULT NULL,
  `actual_problem` text,
  `unit_findings` text,
  `work_done` text,
  `date_returned` date DEFAULT NULL,
  `date_repaired` date DEFAULT NULL,
  `unit_status` enum('GOOD','FOR_SCRAP','FOR_REPAIR','UNDER_OBSERVATION') CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL,
  `unit_remarks` enum('CLASS-B','CLASS-C','CLASS-D','FOR-SHIP') CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL,
  `unit_category` enum('DEFECTIVE_UNIT','CUSTOMER_UNIT') CHARACTER SET utf32 COLLATE utf32_general_ci NOT NULL,
  `technician_id` int unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `unit_id` (`unit_id`),
  KEY `technician_id` (`technician_id`),
  CONSTRAINT `repair_details_ibfk_1` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`),
  CONSTRAINT `repair_details_ibfk_2` FOREIGN KEY (`technician_id`) REFERENCES `technician_details` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf32;

/*Data for the table `repair_details` */

insert  into `repair_details`(`id`,`unit_id`,`complaint`,`serial_number`,`actual_problem`,`unit_findings`,`work_done`,`date_returned`,`date_repaired`,`unit_status`,`unit_remarks`,`unit_category`,`technician_id`,`createdAt`,`updatedAt`) values 
(1,7,'Not Working','123456','Projector turning off','Defective Motherboard','Motherboard replaced','2026-01-11','2026-01-11','GOOD','CLASS-B','DEFECTIVE_UNIT',1,'2026-01-11 23:18:09','2026-01-11 23:18:09'),
(2,18,'Not Working','098765','No Suction','Motor Problem','Replaced DC Motor','2026-01-11','2026-01-11','GOOD','FOR-SHIP','CUSTOMER_UNIT',2,'2026-01-11 23:51:27','2026-01-11 23:51:27');

/*Table structure for table `settings` */

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `settings_username` varchar(32) NOT NULL,
  `settings_password` varchar(32) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf32;

/*Data for the table `settings` */

insert  into `settings`(`id`,`settings_username`,`settings_password`,`createdAt`,`updatedAt`) values 
(1,'anymall','051a85ea68f1129497191680bfeec7b4','2026-01-02 21:21:39','2026-01-02 21:21:39');

/*Table structure for table `technician_details` */

DROP TABLE IF EXISTS `technician_details`;

CREATE TABLE `technician_details` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `technician_name` varchar(32) DEFAULT NULL,
  `contact_number` varchar(11) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf32;

/*Data for the table `technician_details` */

insert  into `technician_details`(`id`,`technician_name`,`contact_number`,`updatedAt`,`createdAt`) values 
(1,'RJ','09123456789','2026-01-05 20:53:13','2026-01-05 20:53:13'),
(2,'John Doe','09123456789','2026-01-09 22:34:09','2026-01-09 22:34:09'),
(3,'Jane Doe','09123456789','2026-01-09 22:34:15','2026-01-09 22:34:15');

/*Table structure for table `units` */

DROP TABLE IF EXISTS `units`;

CREATE TABLE `units` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `unit_sku` enum('WANBO','DREAME','UWANT') CHARACTER SET utf32 COLLATE utf32_general_ci DEFAULT NULL,
  `unit_name` varchar(32) CHARACTER SET utf32 COLLATE utf32_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `item_sku` (`unit_sku`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf32;

/*Data for the table `units` */

insert  into `units`(`id`,`unit_sku`,`unit_name`,`createdAt`,`updatedAt`) values 
(7,'WANBO','Dali 1','2025-12-31 12:44:55','2025-12-31 12:44:55'),
(10,'WANBO','Mini','2025-12-31 12:44:55','2025-12-31 12:44:55'),
(14,'WANBO','T2 Ultra','2025-12-31 12:45:12','2025-12-31 12:45:12'),
(15,'WANBO','Mini Pro','2025-12-31 12:45:12','2025-12-31 12:45:12'),
(18,'DREAME','V12s','2025-12-31 12:45:12','2025-12-31 12:45:12'),
(19,'UWANT','D200','2026-01-06 22:09:25','2026-01-06 22:09:25');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(16) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32;

/*Data for the table `users` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
