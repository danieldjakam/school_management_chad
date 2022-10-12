-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.29 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour empty_db
CREATE DATABASE IF NOT EXISTS `empty_db` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `empty_db`;

-- Listage de la structure de la table empty_db. annual_exams
CREATE TABLE IF NOT EXISTS `annual_exams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `school_year` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table empty_db.annual_exams : ~0 rows (environ)
/*!40000 ALTER TABLE `annual_exams` DISABLE KEYS */;
/*!40000 ALTER TABLE `annual_exams` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. class
CREATE TABLE IF NOT EXISTS `class` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  `teacherId` varchar(255) DEFAULT NULL,
  `level` int NOT NULL DEFAULT '1',
  `school_id` varchar(255) NOT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  `third_tranch_olds_students` int DEFAULT '30000',
  `third_tranch_news_students` int DEFAULT '30000',
  `inscriptions_news_students` int DEFAULT '0',
  `inscriptions_olds_students` int DEFAULT '0',
  `first_tranch_news_students` int DEFAULT '0',
  `first_tranch_olds_students` int DEFAULT '0',
  `second_tranch_news_students` int DEFAULT '0',
  `second_tranch_olds_students` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table empty_db.class : ~0 rows (environ)
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
/*!40000 ALTER TABLE `class` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. notes
CREATE TABLE IF NOT EXISTS `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `exam_id` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  `subject_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table empty_db.notes : ~0 rows (environ)
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. notes_primary
CREATE TABLE IF NOT EXISTS `notes_primary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `exam_id` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  `subject_id` varchar(255) DEFAULT NULL,
  `subject_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Listage des données de la table empty_db.notes_primary : ~0 rows (environ)
/*!40000 ALTER TABLE `notes_primary` DISABLE KEYS */;
/*!40000 ALTER TABLE `notes_primary` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. payments
CREATE TABLE IF NOT EXISTS `payments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` int DEFAULT NULL,
  `recu_name` varchar(255) DEFAULT NULL,
  `student_id` varchar(255) DEFAULT NULL,
  `operator_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table empty_db.payments : ~0 rows (environ)
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. schools
CREATE TABLE IF NOT EXISTS `schools` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `secret_code` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table empty_db.schools : ~1 rows (environ)
/*!40000 ALTER TABLE `schools` DISABLE KEYS */;
INSERT INTO `schools` (`id`, `name`, `secret_code`, `created_at`) VALUES
	('eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU', 'La semence', '$2b$10$/lG72..EAFI.aPBzKYYfa.9CM2cSRbtibsshpaoqRn4x36GEY80Oy', '2022-06-26 12:27:44');
/*!40000 ALTER TABLE `schools` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. sections
CREATE TABLE IF NOT EXISTS `sections` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` int NOT NULL,
  `school_year` varchar(255) DEFAULT '2022',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table empty_db.sections : ~0 rows (environ)
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_editable` varchar(10) NOT NULL DEFAULT 'no',
  `year_school` year NOT NULL,
  `school_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table empty_db.settings : ~1 rows (environ)
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` (`id`, `is_editable`, `year_school`, `school_id`) VALUES
	(1, 'yes', '2022', 'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. stats
CREATE TABLE IF NOT EXISTS `stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) NOT NULL,
  `class_id` varchar(255) NOT NULL,
  `exam_id` varchar(255) NOT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  `totalPoints` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table empty_db.stats : ~0 rows (environ)
/*!40000 ALTER TABLE `stats` DISABLE KEYS */;
/*!40000 ALTER TABLE `stats` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. students
CREATE TABLE IF NOT EXISTS `students` (
  `id` int NOT NULL AUTO_INCREMENT,
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
  `third_tranch` int DEFAULT '0',
  `birthday` varchar(255) DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `inscription` int DEFAULT '0',
  `first_tranch` int DEFAULT '0',
  `second_tranch` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table empty_db.students : ~0 rows (environ)
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. subjects
CREATE TABLE IF NOT EXISTS `subjects` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `school_year` varchar(255) DEFAULT '2022',
  `name` varchar(255) DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  `over` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table empty_db.subjects : ~0 rows (environ)
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. teachers
CREATE TABLE IF NOT EXISTS `teachers` (
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table empty_db.teachers : ~0 rows (environ)
/*!40000 ALTER TABLE `teachers` DISABLE KEYS */;
/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. trims
CREATE TABLE IF NOT EXISTS `trims` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `school_year` int DEFAULT '2022'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table empty_db.trims : ~0 rows (environ)
/*!40000 ALTER TABLE `trims` DISABLE KEYS */;
/*!40000 ALTER TABLE `trims` ENABLE KEYS */;

-- Listage de la structure de la table empty_db. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `school_id` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT 'ad'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Listage des données de la table empty_db.users : ~2 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `username`, `email`, `password`, `school_id`, `role`) VALUES
	('eyJhbGciOiJIUzI1NiJ9.ZGFuaWxvZXlKaGJHY2lPaUpJVXpJMU5pSjkuVEdFZ2MyVnRaVzVqWlEuZlJ3REZKM0wyUFZta1VxTjRqZDJmVk02a2JUTV80M0JiMUxTRk1MT09HVQ.8WvIeDTyRvmKfsiYRNWtLrN5Ux8mvGk_Vx_en-H5Rxg', 'danilo', 'danidjakam@gmail.com', '$2b$10$Md/15AWmgwIbdtsBtjy1H.BpNX06XxZDWvvK2IXvYXtsSLYIQj1t2', 'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU', 'ad'),
	('eyJhbGciOiJIUzI1NiJ9.Y2hyaXM.rESXdOEuZCxMHnGLniHRHTkpRCMrpq1r3Ua35FJUdx4', 'chris', 'chriskamgang@gmail.com', '$2b$10$WeUnHi8EDtZX86eNmUYJaOdUMrO7dGAH2mxhoS/kBBMpIMFFmVD5e', 'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU', 'comp');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
