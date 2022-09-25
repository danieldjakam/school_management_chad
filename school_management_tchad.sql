# ************************************************************
# Sequel Ace SQL dump
# Version 20033
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 5.7.38)
# Database: school_management_tchad
# Generation Time: 2022-09-25 15:57:59 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table annual_exams
# ------------------------------------------------------------

DROP TABLE IF EXISTS `annual_exams`;

CREATE TABLE `annual_exams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `school_year` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `annual_exams` WRITE;
/*!40000 ALTER TABLE `annual_exams` DISABLE KEYS */;

INSERT INTO `annual_exams` (`id`, `name`, `school_year`)
VALUES
	(1,'Annual Exam','2022');

/*!40000 ALTER TABLE `annual_exams` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table class
# ------------------------------------------------------------

DROP TABLE IF EXISTS `class`;

CREATE TABLE `class` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  `teacherId` varchar(255) DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT '1',
  `school_id` varchar(255) NOT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  `third_tranch_olds_students` int(50) DEFAULT '30000',
  `third_tranch_news_students` int(50) DEFAULT '30000',
  `inscriptions_news_students` int(50) DEFAULT '0',
  `inscriptions_olds_students` int(50) DEFAULT '0',
  `first_tranch_news_students` int(50) DEFAULT '0',
  `first_tranch_olds_students` int(50) DEFAULT '0',
  `second_tranch_news_students` int(50) DEFAULT '0',
  `second_tranch_olds_students` int(50) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;

INSERT INTO `class` (`id`, `name`, `section`, `teacherId`, `level`, `school_id`, `school_year`, `third_tranch_olds_students`, `third_tranch_news_students`, `inscriptions_news_students`, `inscriptions_olds_students`, `first_tranch_news_students`, `first_tranch_olds_students`, `second_tranch_news_students`, `second_tranch_olds_students`)
VALUES
	('eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','Test Maternelle','1','eyJhbGciOiJIUzI1NiJ9.dGVzdCBtYXQ.c_Ukv2McscWsntwIxm4WCe__T29XQBrvohwuxk4Z4hM',1,'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022',NULL,0,0,0,0,0,0,0),
	('eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','Test Primaire','3','eyJhbGciOiJIUzI1NiJ9.dGVzdCBQcmlt.6m57FrIcHGl4_tMGAHWKMBJkhzCOF1b7QE_yQL218No',1,'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022',NULL,0,0,0,0,0,0,0),
	('eyJhbGciOiJIUzI1NiJ9.VGVzdA.Q9I9ns4usVBJPzyPDT19fIwg-DOw1NZNPHrWV2d4qkU','Test','1','eyJhbGciOiJIUzI1NiJ9.VGVhY2g.L9aPmdPLJV5WCO_jnQ8XH0olbFd1oGo4DDDHcHj1ges',2,'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022',NULL,0,0,0,0,0,0,0);

/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table notes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notes`;

CREATE TABLE `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `exam_id` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  `subject_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8;

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;

INSERT INTO `notes` (`id`, `student_id`, `class_id`, `exam_id`, `value`, `school_year`, `subject_id`)
VALUES
	(145,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','10','2022','1'),
	(146,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','9','2022','2'),
	(147,'2','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','6','2022','2'),
	(148,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','6','2022','1'),
	(149,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','9','2022','2'),
	(150,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','2','2022','1'),
	(151,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','9','2022','2'),
	(152,'2','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','5','2022','1'),
	(153,'2','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','9','2022','2'),
	(154,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','2','2022','1'),
	(155,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','3','2022','2'),
	(156,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','2','2022','1'),
	(157,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','8','2022','2'),
	(158,'2','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','5','2022','1'),
	(159,'2','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','6','2022','2'),
	(160,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','4','2022','1'),
	(161,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','8','2022','2'),
	(192,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','1','5','2022','1'),
	(193,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','1','9','2022','2'),
	(194,'2','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','1','7','2022','2'),
	(195,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','1','4','2022','1'),
	(196,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','1','7','2022','2');

/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table notes_primary
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notes_primary`;

CREATE TABLE `notes_primary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `exam_id` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  `subject_id` varchar(255) DEFAULT NULL,
  `subject_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=159 DEFAULT CHARSET=utf8;

LOCK TABLES `notes_primary` WRITE;
/*!40000 ALTER TABLE `notes_primary` DISABLE KEYS */;

INSERT INTO `notes_primary` (`id`, `student_id`, `class_id`, `exam_id`, `value`, `school_year`, `subject_id`, `subject_type`)
VALUES
	(91,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','8','2022','3','devoir'),
	(92,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','8','2022','3','compo'),
	(93,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','8','2022','4','devoir'),
	(94,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','8','2022','4','compo'),
	(95,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','8','2022','5','devoir'),
	(96,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','8','2022','5','compo'),
	(97,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','9','2022','3','devoir'),
	(98,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','9','2022','3','compo'),
	(99,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','9','2022','4','compo'),
	(100,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','4','2022','5','devoir'),
	(101,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','4','2022','5','compo'),
	(102,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','9','2022','3','devoir'),
	(103,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','8','2022','3','compo'),
	(104,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','2','2022','4','devoir'),
	(105,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','4','2022','5','devoir'),
	(106,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','5','2022','5','compo'),
	(107,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','5','2022','3','devoir'),
	(108,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','5','2022','3','compo'),
	(109,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','5','2022','4','devoir'),
	(110,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','5','2022','4','compo'),
	(111,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','5','2022','5','devoir'),
	(112,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','5','2022','5','compo'),
	(113,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','9','2022','3','devoir'),
	(114,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','9','2022','3','compo'),
	(115,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','9','2022','4','devoir'),
	(116,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','9','2022','4','compo'),
	(117,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','9','2022','5','devoir'),
	(118,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','6','2022','5','compo'),
	(119,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','7','2022','3','devoir'),
	(120,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','5','2022','3','compo'),
	(121,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','2','2022','4','devoir'),
	(122,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','6','2022','4','compo'),
	(123,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','9','2022','5','devoir'),
	(124,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','5','2022','5','compo'),
	(125,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','8','2022','3','devoir'),
	(126,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','8','2022','3','compo'),
	(127,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','8','2022','4','devoir'),
	(128,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','8','2022','4','compo'),
	(129,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','9','2022','5','devoir'),
	(130,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','5','2022','5','compo'),
	(131,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','5','2022','3','devoir'),
	(132,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','9','2022','3','compo'),
	(133,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','5','2022','4','devoir'),
	(134,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','2','2022','4','compo'),
	(135,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','6','2022','5','devoir'),
	(136,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','4','2022','5','compo'),
	(137,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','7','2022','3','devoir'),
	(138,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','5','2022','3','compo'),
	(139,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','2','2022','4','devoir'),
	(140,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','6','2022','4','compo'),
	(141,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','4','2022','5','devoir'),
	(142,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','8','2022','5','compo'),
	(143,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','7','2022','3','devoir'),
	(144,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','7','2022','3','compo'),
	(145,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','7','2022','4','devoir'),
	(146,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','7','2022','4','compo'),
	(147,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','7','2022','5','devoir'),
	(148,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','6','2022','5','compo'),
	(149,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','8','2022','3','devoir'),
	(150,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','9','2022','3','compo'),
	(151,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','7','2022','4','compo'),
	(152,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','6','2022','5','devoir'),
	(153,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','5','2022','5','compo'),
	(154,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','8','2022','3','devoir'),
	(155,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','6','2022','3','compo'),
	(156,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2','2022','4','devoir'),
	(157,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','6','2022','5','devoir'),
	(158,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','6','2022','5','compo');

/*!40000 ALTER TABLE `notes_primary` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table payments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payments`;

CREATE TABLE `payments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int(11) DEFAULT NULL,
  `recu_name` varchar(255) DEFAULT NULL,
  `student_id` varchar(255) DEFAULT NULL,
  `operator_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table schools
# ------------------------------------------------------------

DROP TABLE IF EXISTS `schools`;

CREATE TABLE `schools` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `secret_code` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `schools` WRITE;
/*!40000 ALTER TABLE `schools` DISABLE KEYS */;

INSERT INTO `schools` (`id`, `name`, `secret_code`, `created_at`)
VALUES
	('eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','La semence','$2b$10$/lG72..EAFI.aPBzKYYfa.9CM2cSRbtibsshpaoqRn4x36GEY80Oy','2022-06-26 12:27:44');

/*!40000 ALTER TABLE `schools` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sections
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sections`;

CREATE TABLE `sections` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `school_year` varchar(255) DEFAULT '2022',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;

INSERT INTO `sections` (`id`, `name`, `type`, `school_year`)
VALUES
	(1,'Maternelle',1,'2022'),
	(3,'Primaire',2,'2022');

/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_editable` varchar(10) NOT NULL DEFAULT 'no',
  `year_school` year(4) NOT NULL,
  `school_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;

INSERT INTO `settings` (`id`, `is_editable`, `year_school`, `school_id`)
VALUES
	(1,'yes','2022','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU');

/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table stats
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stats`;

CREATE TABLE `stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) NOT NULL,
  `class_id` varchar(255) NOT NULL,
  `exam_id` varchar(255) NOT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  `totalPoints` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8;

LOCK TABLES `stats` WRITE;
/*!40000 ALTER TABLE `stats` DISABLE KEYS */;

INSERT INTO `stats` (`id`, `student_id`, `class_id`, `exam_id`, `school_year`, `totalPoints`)
VALUES
	(146,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',41),
	(147,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',41),
	(148,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',41),
	(149,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',41),
	(150,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',41),
	(151,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',35),
	(152,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',35),
	(153,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',35),
	(154,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',35),
	(155,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',35),
	(156,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',35),
	(157,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','2022',48),
	(158,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','2022',35),
	(159,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','2022',28),
	(160,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','2022',30),
	(161,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','2022',51),
	(162,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','2022',34),
	(163,'4','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','2022',46),
	(164,'5','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','2022',31),
	(165,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','2022',32),
	(166,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','2022',19),
	(167,'2','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','2022',6),
	(168,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','2022',15),
	(169,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','2022',11),
	(170,'2','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','2022',14),
	(171,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','2022',5),
	(172,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','2022',10),
	(173,'2','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','2022',11),
	(174,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','2022',12),
	(200,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','1','2022',5),
	(201,'1','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','1','2022',14),
	(202,'2','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','1','2022',7),
	(203,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','1','2022',4),
	(204,'3','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','1','2022',11),
	(205,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',28),
	(206,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',28),
	(207,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',28),
	(208,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',28),
	(209,'6','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','1','2022',28);

/*!40000 ALTER TABLE `stats` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table students
# ------------------------------------------------------------

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `fatherName` varchar(255) DEFAULT NULL,
  `subname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `birthday_place` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) DEFAULT '2022',
  `status` varchar(255) DEFAULT 'old',
  `school_id` varchar(255) DEFAULT NULL,
  `third_tranch` int(11) DEFAULT '0',
  `profession` varchar(255) DEFAULT NULL,
  `inscription` int(50) DEFAULT '0',
  `first_tranch` int(50) DEFAULT '0',
  `second_tranch` int(50) DEFAULT '0',
  `birthday` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;

INSERT INTO `students` (`id`, `name`, `fatherName`, `subname`, `email`, `phone_number`, `class_id`, `sex`, `birthday_place`, `school_year`, `status`, `school_id`, `third_tranch`, `profession`, `inscription`, `first_tranch`, `second_tranch`, `birthday`)
VALUES
	(1,'Mat 1','','','','','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','m','','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,NULL),
	(2,'Mat 2','','','','','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','m','','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,NULL),
	(3,'Mat 3','','','','','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','m','','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,NULL),
	(4,'Prim 1','','','','','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','m','','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,NULL),
	(5,'Prim 2','','','','','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','m','','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,NULL),
	(6,'Prim 3','','','','','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','m','','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,NULL),
	(7,'llll','','','','','eyJhbGciOiJIUzI1NiJ9.VGVzdA.Q9I9ns4usVBJPzyPDT19fIwg-DOw1NZNPHrWV2d4qkU','m','','2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,NULL);

/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table subjects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subjects`;

CREATE TABLE `subjects` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `school_year` varchar(255) DEFAULT '2022',
  `name` varchar(255) DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  `over` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;

INSERT INTO `subjects` (`id`, `school_year`, `name`, `section`, `over`)
VALUES
	(1,'2022','Test','1',10),
	(2,'2022','Retest','1',10),
	(3,'2022','Test Prim','3',10),
	(4,'2022','Test Mat','3',10),
	(5,'2022','Reretest','3',10);

/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table teachers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `teachers`;

CREATE TABLE `teachers` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `subname` varchar(255) DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `matricule` varchar(255) DEFAULT NULL,
  `password` varchar(10) DEFAULT '00000',
  `sex` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `school_id` varchar(255) NOT NULL,
  `school_year` varchar(255) DEFAULT '2022'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `teachers` WRITE;
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;

INSERT INTO `teachers` (`id`, `name`, `subname`, `class_id`, `matricule`, `password`, `sex`, `birthday`, `phone_number`, `school_id`, `school_year`)
VALUES
	('eyJhbGciOiJIUzI1NiJ9.dGVzdCBtYXQ.c_Ukv2McscWsntwIxm4WCe__T29XQBrvohwuxk4Z4hM','test mat','','eyJhbGciOiJIUzI1NiJ9.VGVzdCBNYXRlcm5lbGxl.U2cW4FCVTsdwTON4s0MyF5H1Czteg3XteSrYqABSfqk','SEM-TESTMATERNELLE','9823','m',NULL,'','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022'),
	('eyJhbGciOiJIUzI1NiJ9.dGVzdCBQcmlt.6m57FrIcHGl4_tMGAHWKMBJkhzCOF1b7QE_yQL218No','test Prim','','eyJhbGciOiJIUzI1NiJ9.VGVzdCBQcmltYWlyZQ.tICy1nN5jhurzvJCdLqT8MfcERMIFw1eLZpE_-7mOdI','SEM-TESTPRIMAIRE','0579','m',NULL,'','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022'),
	('eyJhbGciOiJIUzI1NiJ9.VGVhY2g.L9aPmdPLJV5WCO_jnQ8XH0olbFd1oGo4DDDHcHj1ges','Teach','','eyJhbGciOiJIUzI1NiJ9.VGVzdA.Q9I9ns4usVBJPzyPDT19fIwg-DOw1NZNPHrWV2d4qkU','SEM-TEST','1236','m',NULL,'','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022');

/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trims
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trims`;

CREATE TABLE `trims` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `school_year` int(11) DEFAULT '2022'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `trims` WRITE;
/*!40000 ALTER TABLE `trims` DISABLE KEYS */;

INSERT INTO `trims` (`id`, `name`, `school_year`)
VALUES
	('eyJhbGciOiJIUzI1NiJ9.VHJpbSAx.k_QekIemt2luoWnwDMkNQEt0upoaHoFXOSHE0_AWqF8','Trim 1',2022),
	('eyJhbGciOiJIUzI1NiJ9.VHJpbSAy.BIfQxF938FwsY3MH1j2vv9yrp3HxAVmsEsX8PVl7AJE','Trim 2',2022),
	('eyJhbGciOiJIUzI1NiJ9.VHJpbSAz.xQVqbAzX2EnnHZgt3tbqxmE3yEax-LQ9jWS7pUs7vLQ','Trim 3',2022);

/*!40000 ALTER TABLE `trims` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `school_id` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'ad'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `username`, `email`, `password`, `school_id`, `role`)
VALUES
	('eyJhbGciOiJIUzI1NiJ9.ZGFuaWxvZXlKaGJHY2lPaUpJVXpJMU5pSjkuVEdFZ2MyVnRaVzVqWlEuZlJ3REZKM0wyUFZta1VxTjRqZDJmVk02a2JUTV80M0JiMUxTRk1MT09HVQ.8WvIeDTyRvmKfsiYRNWtLrN5Ux8mvGk_Vx_en-H5Rxg','danilo','danidjakam@gmail.com','$2b$10$Md/15AWmgwIbdtsBtjy1H.BpNX06XxZDWvvK2IXvYXtsSLYIQj1t2','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','ad'),
	('eyJhbGciOiJIUzI1NiJ9.Y2hyaXM.rESXdOEuZCxMHnGLniHRHTkpRCMrpq1r3Ua35FJUdx4','chris','chriskamgang@gmail.com','$2b$10$WeUnHi8EDtZX86eNmUYJaOdUMrO7dGAH2mxhoS/kBBMpIMFFmVD5e','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','comp');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
