# ************************************************************
# Sequel Ace SQL dump
# Version 20033
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 5.7.38)
# Database: school_management
# Generation Time: 2022-08-02 19:30:30 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table activities
# ------------------------------------------------------------

DROP TABLE IF EXISTS `activities`;

CREATE TABLE `activities` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `school_year` varchar(255) DEFAULT '2022',
  `name` varchar(255) DEFAULT NULL,
  `domainId` varchar(255) DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  `appreciationsNber` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;

INSERT INTO `activities` (`id`, `school_year`, `name`, `domainId`, `section`, `appreciationsNber`)
VALUES
	(2,'2022','Story Telling','5','11',4),
	(3,'2022','Poetry/Rhymes','5','11',4),
	(4,'2022','Sign Language/Gesture','5','11',4),
	(5,'2022','Reading','5','11',4),
	(6,'2022','Writing','5','11',4),
	(7,'2022','National Language','5','11',4),
	(8,'2022','Mathematics','6','11',4),
	(9,'2022','ICT','6','11',4),
	(10,'2022','Sensory and Perceptive Education','6','11',4),
	(11,'2022','Science and Technology','6','11',4),
	(12,'2022','Agriculture','6','11',4),
	(13,'2022','Citizenship','7','11',4),
	(14,'2022','Character Education','7','11',4),
	(15,'2022','Environmental Education','7','11',4),
	(16,'2022','Safety Education','7','11',4),
	(17,'2022','Health and Nutrition Education','7','11',4),
	(18,'2022','Music and Dance','8','11',4),
	(19,'2022','Drawing and Colouring','8','11',4),
	(20,'2022','Painting','8','11',4),
	(21,'2022','Hand Work','8','11',4),
	(22,'2022','Athletics','9','11',4),
	(23,'2022','Langage','10','12',3),
	(24,'2022','Contes','10','12',3),
	(25,'2022','Poésies-Comptine','10','12',3),
	(26,'2022','Initiation à la lecture/écriture','10','12',3),
	(27,'2022','Graphisme','10','12',3),
	(28,'2022','Expression gestuelle','10','12',3),
	(29,'2022','Langue nationale','10','12',3),
	(30,'2022','English','10','12',3),
	(31,'2022','Mathématiques','11','12',3),
	(32,'2022','TIC','11','12',3),
	(33,'2022','Education sensorielle et perception','11','12',3),
	(34,'2022','Sciences et technologies','11','12',3),
	(35,'2022','Activités agro-pastorales','11','12',3),
	(37,'2022','Education civique et morale','12','12',3),
	(38,'2022','Education à l\'environnement','12','12',3),
	(39,'2022','Education à la sécurité','12','12',3),
	(40,'2022','Education à la santé','12','12',3),
	(41,'2022','Dessin et coloriage','13','12',3),
	(42,'2022','Peinture','13','12',3),
	(43,'2022','Peinture','13','12',3),
	(44,'2022','Activités manuelles','13','12',3),
	(45,'2022','Musique, chant et danse','13','12',3),
	(46,'2022','Athlétisme','14','12',3),
	(47,'2022','Gymnastique','14','12',3),
	(48,'2022','Jeux collectifs','14','12',3);

/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table annual_exams
# ------------------------------------------------------------

DROP TABLE IF EXISTS `annual_exams`;

CREATE TABLE `annual_exams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `school_year` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



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
  `second_tranch_olds_students` int(50) DEFAULT '0',
  `graduation` int(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;

INSERT INTO `class` (`id`, `name`, `section`, `teacherId`, `level`, `school_id`, `school_year`, `third_tranch_olds_students`, `third_tranch_news_students`, `inscriptions_news_students`, `inscriptions_olds_students`, `first_tranch_news_students`, `first_tranch_olds_students`, `second_tranch_news_students`, `second_tranch_olds_students`, `graduation`)
VALUES
	('eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','Nursery 1','11','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA',1,'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022',30000,30000,10004,10000,30000,30000,30000,30000,30000),
	('eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','Petite Section','12','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI',1,'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022',30000,30000,2000,10000,30000,30000,30000,30000,NULL),
	('eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','Class 1','13','eyJhbGciOiJIUzI1NiJ9.VGVhY2hlcjM.twbEJkwDQ_yttHI_9LEs6dka2vttFniL-pdU9mobHu8',1,'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022',30000,30000,30000,10000,30000,30000,30000,30000,NULL),
	('eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','SIL B','14','eyJhbGciOiJIUzI1NiJ9.VGVhY2hlciA0.uMdiVbnJg8i_txJ8rGfMsFzRPmBgvn361ssqElYr7v4',1,'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022',30000,30000,9000,10000,30000,30000,30000,30000,NULL),
	('eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','CM2','15','eyJhbGciOiJIUzI1NiJ9.VGVhY2hlciA1.CKdxg5D6I351K68rVETWjRHNEqeFcp_Fy_lsve_orUo',1,'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022',30000,30000,5000,10000,30000,30000,30000,30000,NULL),
	('eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','jkkkkkk','13','eyJhbGciOiJIUzI1NiJ9.bGw.cVNrcTlaxNvtMwOP4LKeQSKfmJdSQM__btQ5Pcf23Wo',1,'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022',30000,30000,10003,10000,30000,30000,30000,30000,NULL),
	('eyJhbGciOiJIUzI1NiJ9.aWlpaWlpaQ.jB-5RGkFUkgVDRLzDWhG-QV2GNHMAtXjrl2vRh57XX4','iiiiiii','14','eyJhbGciOiJIUzI1NiJ9.dWpqag.nHqsdUMLnH3OTgp46NReVcZ4hxDKyjF5_r2A5kQ5064',1,'eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022',0,0,5555,0,0,0,0,0,NULL);

/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table com
# ------------------------------------------------------------

DROP TABLE IF EXISTS `com`;

CREATE TABLE `com` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) DEFAULT '2022'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `com` WRITE;
/*!40000 ALTER TABLE `com` DISABLE KEYS */;

INSERT INTO `com` (`id`, `name`, `section`, `school_year`)
VALUES
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDEgQ09NTVVOSVFVRVIgRU4gRlJBTkNBSVMsIEFOR0xBSVMgRVQgUFJBVElRVUVSIEFVIE1PSU5TIFVORSBMQU5HVUUgTkFUSU9OQUxF.kpUN4UzISGO6iEtqIJS9Nz5Be4lFvRM7EhG1W4wUEcM','COMPETENCE : 1 COMMUNIQUER EN FRANCAIS, ANGLAIS ET PRATIQUER AU MOINS UNE LANGUE NATIONALE','14','2022'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDIgVVRJTElTRVIgTEVTIE5PVElPTlMgREUgQkFTRSBFTiBNQVRIRU1BVElRVUVTLCBTQ0lFTkNFUyBFVCBURUNITk9MT0dJRQ.MBAF6e7Bznq7EmDcWDn9Qq499vr1nRQhsgULQpFoF6U','COMPETENCE : 2 UTILISER LES NOTIONS DE BASE EN MATHEMATIQUES, SCIENCES ET TECHNOLOGIE','14','2022'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDMgUFJBVElRVUVSIExFUyBWQUxFVVJTIFNPQ0lBTEVTIEVUIENJVE9ZRU5ORVM.GSDRT3c90q8EcaY4580ThB_Oe1pA-1l3N5clZZmmg_c','COMPETENCE : 3 PRATIQUER LES VALEURS SOCIALES ET CITOYENNES','14','2022'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDQgREVNT05UUkVSIEwnQVVUT05PTUlFLCBMJ0VTUFJJVCBEJ0lOSVRJQVRJVkUsIERFIENSRUFUSVZJVEUgRVQgRCdFTlRSRVBSRU5FVVJJQVQ.gqLcihEAZIqixkx3iPcegM7BVLk44CmpXGetsR3Ufew','COMPETENCE : 4 DEMONTRER L\'AUTONOMIE, L\'ESPRIT D\'INITIATIVE, DE CREATIVITE ET D\'ENTREPRENEURIAT','14','2022'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDUgVVRJTElTRVIgTEVTIENPTkNFUFRTIERFIEJBU0UgRVQgTEVTIE9VVElMUyBUSUNT.6wnh6Shxco7RkLJImnMd_yHo32qWewfMCFO0Q3idRSM','COMPETENCE : 5 UTILISER LES CONCEPTS DE BASE ET LES OUTILS TICS','14','2022'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDYgUFJBVElRVUVSIExFUyBBQ1RJVklURVMgUEhZU0lRVUVTLCBTUE9SVElWRVMgRVQgQVJUSVNUSVFVRVM.JvZHtbJlxyr9TA3HdKEJuT98IWYrhbL9jcS3oZfvyaE','COMPETENCE : 6 PRATIQUER LES ACTIVITES PHYSIQUES, SPORTIVES ET ARTISTIQUES','14','2022');

/*!40000 ALTER TABLE `com` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table domains
# ------------------------------------------------------------

DROP TABLE IF EXISTS `domains`;

CREATE TABLE `domains` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `school_year` varchar(255) DEFAULT '2022',
  `name` varchar(255) DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

LOCK TABLES `domains` WRITE;
/*!40000 ALTER TABLE `domains` DISABLE KEYS */;

INSERT INTO `domains` (`id`, `school_year`, `name`, `section`)
VALUES
	(5,'2022','LITERACY AND COMMUNICATION','11'),
	(6,'2022','SCIENCE AND TECHNOLOGICAL SKILL DEVELOPMENT','11'),
	(7,'2022','PRACTICAL LIFE SKILLS','11'),
	(8,'2022',' ARTS AND CRAFT','11'),
	(9,'2022','MOTOR SKILLS','11'),
	(10,'2022','LANGUE ET COMMUNICATION','12'),
	(11,'2022','EVEIL SCIENTIFIQUE ET TECHNOLOGIQUE','12'),
	(12,'2022','VIE COURANTE','12'),
	(13,'2022','CREATION ARTISTIQUE','12'),
	(14,'2022','MOTRICITE','12');

/*!40000 ALTER TABLE `domains` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table notes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notes`;

CREATE TABLE `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) DEFAULT NULL,
  `exam_id` varchar(255) DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `sub_com_id` varchar(255) DEFAULT NULL,
  `tag_name` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;

INSERT INTO `notes` (`id`, `student_id`, `exam_id`, `class_id`, `sub_com_id`, `tag_name`, `value`, `school_year`)
VALUES
	(1,'13','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgMUEgQ29tbXVuaXF1ZXIgZW4gRnJhbsOnYWlz.bxErp9usfBcm5NMaDa8bj86m6f4d0YOIg8Fi-Yo5u7s','Orale','1','2022'),
	(2,'16','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgMUEgQ29tbXVuaXF1ZXIgZW4gRnJhbsOnYWlz.bxErp9usfBcm5NMaDa8bj86m6f4d0YOIg8Fi-Yo5u7s','Orale','0','2022'),
	(3,'13','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgMUEgQ29tbXVuaXF1ZXIgZW4gRnJhbsOnYWlz.bxErp9usfBcm5NMaDa8bj86m6f4d0YOIg8Fi-Yo5u7s','Ecrit','1','2022');

/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table notesByDomain
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notesByDomain`;

CREATE TABLE `notesByDomain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) DEFAULT NULL,
  `exam_id` varchar(255) DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `domain_id` varchar(255) DEFAULT NULL,
  `activitieId` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

LOCK TABLES `notesByDomain` WRITE;
/*!40000 ALTER TABLE `notesByDomain` DISABLE KEYS */;

INSERT INTO `notesByDomain` (`id`, `student_id`, `exam_id`, `class_id`, `domain_id`, `activitieId`, `value`, `school_year`)
VALUES
	(1,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','5','2','14','2022'),
	(2,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','6','9','1','2022'),
	(3,'7','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','10','27','1','2022'),
	(4,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','5','3','10','2022'),
	(5,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','5','4','9','2022'),
	(6,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','5','5','6','2022'),
	(7,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','5','6','6','2022'),
	(8,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','5','7','2','2022'),
	(9,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','7','16','4','2022'),
	(10,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','6','8','2','2022'),
	(11,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','6','10','04','2022'),
	(12,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','6','11','2','2022'),
	(13,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','6','12','1','2022'),
	(14,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','7','13','2','2022'),
	(15,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','7','14','3','2022'),
	(16,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','7','15','1','2022'),
	(17,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','7','17','2','2022'),
	(18,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','8','18','1','2022'),
	(19,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','8','19','3','2022'),
	(20,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','8','20','1','2022'),
	(21,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','8','20','2','2022'),
	(22,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','8','21','1','2022'),
	(23,'3','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','9','22','2','2022'),
	(24,'7','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','14','47','1','2022'),
	(25,'8','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','10','23','1','2022'),
	(26,'7','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','10','23','3','2022'),
	(27,'7','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','10','24','1','2022'),
	(28,'8','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','10','24','1','2022'),
	(29,'7','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','10','25','1','2022'),
	(30,'8','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','10','25','2','2022'),
	(31,'8','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','10','26','3','2022'),
	(32,'8','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','10','27','1','2022'),
	(33,'8','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','10','23','1','2022'),
	(34,'3','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','5','2','1','2022');

/*!40000 ALTER TABLE `notesByDomain` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table notesBySubject
# ------------------------------------------------------------

DROP TABLE IF EXISTS `notesBySubject`;

CREATE TABLE `notesBySubject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` varchar(255) DEFAULT NULL,
  `exam_id` varchar(255) DEFAULT NULL,
  `class_id` varchar(255) DEFAULT NULL,
  `subject_id` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) NOT NULL DEFAULT '2022',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

LOCK TABLES `notesBySubject` WRITE;
/*!40000 ALTER TABLE `notesBySubject` DISABLE KEYS */;

INSERT INTO `notesBySubject` (`id`, `student_id`, `exam_id`, `class_id`, `subject_id`, `value`, `school_year`)
VALUES
	(1,'18','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','4','35','2022'),
	(2,'19','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','4','6','2022'),
	(3,'20','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','4','7','2022'),
	(4,'10','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','13','1','2022'),
	(5,'10','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','14','1','2022'),
	(6,'11','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','13','19','2022'),
	(7,'12','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','14','19','2022'),
	(8,'18','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','4','20','2022'),
	(9,'18','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','5','25','2022'),
	(10,'18','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','6','35','2022'),
	(11,'18','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','4','28','2022'),
	(12,'19','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','4','2','2022'),
	(13,'20','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','5','3','2022'),
	(14,'19','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','4','4','2022'),
	(15,'20','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','4','1','2022'),
	(16,'20','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','6','1','2022'),
	(17,'20','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','4','4','2022'),
	(18,'19','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','7','3','2022'),
	(19,'19','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','7','3','2022'),
	(20,'19','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','7','3','2022'),
	(21,'10','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','17','4','2022'),
	(22,'10','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','13','3','2022'),
	(23,'10','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','13','2','2022');

/*!40000 ALTER TABLE `notesBySubject` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;

INSERT INTO `payments` (`id`, `created_at`, `amount`, `recu_name`, `student_id`)
VALUES
	(12,'2022-07-29 00:15:47',0,'7397','13'),
	(13,'2022-07-29 00:17:01',0,'13107','13'),
	(14,'2022-07-29 00:19:06',0,'2207','13'),
	(15,'2022-07-29 00:21:45',0,'5975','13'),
	(16,'2022-07-29 00:24:23',0,'3662','18'),
	(17,'2022-07-29 00:25:03',0,'9399','18'),
	(18,'2022-07-29 00:25:38',0,'9585','18'),
	(19,'2022-07-29 00:28:28',500,'81510','18'),
	(20,'2022-07-29 00:32:18',1000,'6844','18'),
	(21,'2022-07-29 08:36:42',0,'01080','13'),
	(22,'2022-07-29 08:51:47',0,'7450','13'),
	(23,'2022-07-29 08:52:28',5000,'7533','16'),
	(24,'2022-07-29 08:53:21',0,'5387','16'),
	(25,'2022-07-29 08:54:00',0,'7751','16'),
	(26,'2022-07-29 08:56:56',0,'7695','16'),
	(27,'2022-07-29 08:57:30',0,'10984','16'),
	(28,'2022-07-29 08:57:55',0,'1505','16'),
	(29,'2022-07-29 08:59:25',0,'10219','16'),
	(30,'2022-07-29 08:59:56',0,'2847','16'),
	(31,'2022-07-29 09:01:17',0,'10263','16'),
	(32,'2022-07-30 22:51:04',0,'8412','3'),
	(33,'2022-07-30 22:55:42',0,'9674','3'),
	(34,'2022-07-30 22:58:39',0,'5388','3'),
	(35,'2022-08-01 20:53:05',0,'2835','3'),
	(36,'2022-08-01 20:54:22',0,'8866','3'),
	(37,'2022-08-01 20:54:53',0,'7406','3'),
	(38,'2022-08-01 20:56:29',0,'58109','3'),
	(39,'2022-08-01 21:02:33',0,'10472','3'),
	(40,'2022-08-01 21:07:41',0,'6557','3'),
	(41,'2022-08-01 21:08:13',0,'0765','3'),
	(42,'2022-08-02 07:30:17',0,'1217','3'),
	(43,'2022-08-02 12:03:45',0,'3835','3'),
	(44,'2022-08-02 12:04:26',0,'0165','3'),
	(45,'2022-08-02 12:05:01',0,'21049','3'),
	(46,'2022-08-02 12:10:23',0,'5444','3'),
	(47,'2022-08-02 12:12:32',0,'62104','10'),
	(48,'2022-08-02 12:18:41',0,'01039','10'),
	(49,'2022-08-02 12:19:14',3,'4949','3'),
	(50,'2022-08-02 12:22:26',0,'4212','3'),
	(51,'2022-08-02 12:23:05',0,'91038','3'),
	(52,'2022-08-02 12:23:18',0,'3297','3'),
	(53,'2022-08-02 12:26:11',15,'10166','3'),
	(54,'2022-08-02 12:27:49',15,'5635','10'),
	(55,'2022-08-02 12:29:44',0,'6881','10'),
	(56,'2022-08-02 12:31:51',0,'8565','10'),
	(57,'2022-08-02 12:38:23',0,'2112','11'),
	(58,'2022-08-02 12:38:42',0,'4928','10'),
	(59,'2022-08-02 14:51:41',0,'9912','23'),
	(60,'2022-08-02 14:53:25',0,'16810','3'),
	(61,'2022-08-02 14:58:34',0,'3426','6'),
	(62,'2022-08-02 14:59:53',0,'106104','5'),
	(63,'2022-08-02 15:02:14',0,'5449','21');

/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;


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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;

INSERT INTO `sections` (`id`, `name`, `type`, `school_year`)
VALUES
	(11,'Maternelle en',1,'2022'),
	(12,'Maternelle fr',2,'2022'),
	(13,'Primaire en',4,'2022'),
	(14,'Primaire fr',3,'2022'),
	(15,'CM2',5,'2022');

/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table seq
# ------------------------------------------------------------

DROP TABLE IF EXISTS `seq`;

CREATE TABLE `seq` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) DEFAULT '2022'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `seq` WRITE;
/*!40000 ALTER TABLE `seq` DISABLE KEYS */;

INSERT INTO `seq` (`id`, `name`, `school_year`)
VALUES
	('eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','seq1','2022'),
	('eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','seq2','2022');

/*!40000 ALTER TABLE `seq` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

LOCK TABLES `stats` WRITE;
/*!40000 ALTER TABLE `stats` DISABLE KEYS */;

INSERT INTO `stats` (`id`, `student_id`, `class_id`, `exam_id`, `school_year`, `totalPoints`)
VALUES
	(1,'13','eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','2022',2),
	(2,'16','eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','2022',0),
	(3,'18','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','2022',35),
	(4,'10','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','2022',2),
	(5,'11','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','2022',19),
	(6,'12','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','2022',19),
	(7,'19','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','2022',9),
	(8,'20','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0','2022',8),
	(9,'18','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',28),
	(10,'19','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',7),
	(11,'20','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',4),
	(12,'18','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',28),
	(13,'19','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',7),
	(14,'20','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',4),
	(15,'3','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',0),
	(16,'5','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',0),
	(17,'6','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',0),
	(18,'3','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',0),
	(19,'5','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',0),
	(20,'6','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',0),
	(21,'8','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',0),
	(22,'9','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',0),
	(23,'7','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',0),
	(24,'7','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',0),
	(25,'18','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','2022',80),
	(26,'19','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','2022',5),
	(27,'20','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','2022',4),
	(28,'10','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o','2022',7),
	(29,'10','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','2022',2);

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
  `birthday` float DEFAULT NULL,
  `birthday_place` varchar(255) DEFAULT NULL,
  `school_year` varchar(255) DEFAULT '2022',
  `status` varchar(255) DEFAULT 'old',
  `school_id` varchar(255) DEFAULT NULL,
  `third_tranch` int(11) DEFAULT '0',
  `profession` varchar(255) DEFAULT NULL,
  `inscription` int(50) DEFAULT '0',
  `first_tranch` int(50) DEFAULT '0',
  `second_tranch` int(50) DEFAULT '0',
  `graduation` int(50) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;

INSERT INTO `students` (`id`, `name`, `fatherName`, `subname`, `email`, `phone_number`, `class_id`, `sex`, `birthday`, `birthday_place`, `school_year`, `status`, `school_id`, `third_tranch`, `profession`, `inscription`, `first_tranch`, `second_tranch`, `graduation`)
VALUES
	(3,'Madah ','Madah Fidel','Allesie','chriskamgang@gmail.com','659339778','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','m',20000500000000,'Boufoussam','2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',22000,'Commerçant',10000,17005,1700,5),
	(5,'Tchinda ','Tchinda','Nathan','chriskamgang@gmail.com','6589423685','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','m',19980500000000,'Mbouda','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',30000,'chef d\'entreprise',10004,32000,30000,0),
	(6,'Nguepinse Kamgang','Kamgang Honore','Tite','chriskamgang@gmail.com','656575677','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','m',19980500000000,'Douala','2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',30000,'ONU',10000,30000,30000,0),
	(7,'Student 1','','','','','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','m',NULL,'','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,0),
	(8,'Student 2','','','','','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','f',NULL,'','2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,0),
	(9,'Student 3','','','','','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','m',NULL,'','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,0),
	(10,'Tchinda','Tchinda','Nathan','chriskamgang@gmail.com','659339778','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','m',20000500000000,'Mbouda','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,5,0,0),
	(11,'Donfack ','kamgang','Steve','chriskamgang@gmail.com','65656988','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','m',20000700000000,'Mbouda','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,0),
	(12,'Nguepinse Kamgang','Kamgang','Tite','chriskamgang@gmail.com','656575677','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','m',20000500000000,'Bafoussam','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'ONU',0,0,0,0),
	(13,'Student 1','','','','','eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','m',NULL,'','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',8000,0,0,0),
	(16,'Student 2','','','','','eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','m',NULL,'','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',5000,0,0,0),
	(17,'Student 3','','','','','eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','m',NULL,'','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,0),
	(18,'Student 1','','','','','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','m',NULL,'','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',4000,0,0,0),
	(19,'Student 2','','','','','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','m',NULL,'','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,0),
	(20,'Student 3','','','','','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','m',NULL,'','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,0),
	(21,'Megha Kamgang','kamgang','Ruth','','','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','f',20000500000000,'2000-05-15','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',5000,0,0,0),
	(23,'Madah','Allesie','Allesie','chriskamgang@gmail.com','656575677','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','m',20000100000000,'2000-01-01','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'ddddd',0,0,0,0),
	(24,'5555','','','','','eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','m',NULL,'','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,0),
	(25,'1mk','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','m',NULL,'','2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,'',0,0,0,0),
	(35,'Madah ','Madah Fidel','Allesie','chriskamgang@gmail.com','659339778','eyJhbGciOiJIUzI1NiJ9.aWlpaWlpaQ.jB-5RGkFUkgVDRLzDWhG-QV2GNHMAtXjrl2vRh57XX4','m',20000500000000,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(36,'Tchinda ','Tchinda','Nathan','chriskamgang@gmail.com','6589423685','eyJhbGciOiJIUzI1NiJ9.aWlpaWlpaQ.jB-5RGkFUkgVDRLzDWhG-QV2GNHMAtXjrl2vRh57XX4','m',19980500000000,NULL,'2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(37,'Nguepinse Kamgang','Kamgang Honore','Tite','chriskamgang@gmail.com','656575677','eyJhbGciOiJIUzI1NiJ9.aWlpaWlpaQ.jB-5RGkFUkgVDRLzDWhG-QV2GNHMAtXjrl2vRh57XX4','m',19980500000000,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(38,'Megha Kamgang','kamgang','Ruth','','','eyJhbGciOiJIUzI1NiJ9.aWlpaWlpaQ.jB-5RGkFUkgVDRLzDWhG-QV2GNHMAtXjrl2vRh57XX4','f',20000500000000,NULL,'2022','new','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(40,'ANOUDEM SARAH LISA','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(41,'AOUOBENG NANDJOU KEURTIS ELIAS','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(42,'BONIE MEUGANG ABIGAELLE MAEVA','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(43,'DIKOSSO YOLO ANNE MIRINDA','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(44,'DONGMO TAMAFO KEYRA JOVIALE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(45,'DOUANLA SOH DADJEU JOHAN RAPHAEL','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(46,'EMOUNGUE ELOMBO ELIORA FLORENTINA','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(47,'FOMAT MANTHO KELLYNE PRINCESSE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(48,'GUIMDO TAZO DIAMANT WARRENE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(49,'HAMZA M','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(50,'KENGNE TCHAMENI ENZO MAËL','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(51,'KENMATIO NZANGUE CHRIST LEROY','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(52,'KOUNGA TCHEUNDOM ABIGAËLLE NESLINE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(53,'LONTSI NDONKENG ADORA','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(54,'MADZEKA FOGOU GRACE DIVINE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(55,'MAKUETE YMEFAHA PRINCESSE DOULCE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(56,'MAMAH SUFO KENSZA STARLINE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(57,'MAZOHO TIDO MERVEILLE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(58,'MEGAPTCHE CHRIS WALTER','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(59,'MELI TEKWOUO ELVIS','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(60,'NANTIA NGUIMAKO ARCANGE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(61,'NDOCKO MALIA CAMILLE AYLINE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(62,'NGOFACK TSAMO EMMANUELLA AURELLE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(63,'NGOUMTSA FOMEKONG JODORESS','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(64,'NOLA DJUKEM LAETITIA','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(65,'NSON NSON EITEL WILLIAM','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(66,'NTOUA N ZACHARIE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(67,'NZEPA BATCHAKUI PRINCE NATHAN','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(68,'SISSA TAFADJI MAËL JORES','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(69,'TALOM TSOFACK RAPHAËL NATHAN','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(70,'TATSAWOU ANGE MALLEVA','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(71,'TCHINDA DJIMELI ANGE RAPHAELLE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(72,'TEMFACK FOUELEFACK PATRICE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(73,'TIOMALA TAKOUTSOP EDENNE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(74,'TSAKOU FOFE FREDY','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(75,'TSEMZANG TADONLEKEU ELTON POLY','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(76,'WAMBA GEORGES JUNIOR','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0),
	(77,'YOTA NANFACK NATIVA JOYCE','','','','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','',NULL,NULL,'2022','old','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU',0,NULL,0,0,0,0);

/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sub_com
# ------------------------------------------------------------

DROP TABLE IF EXISTS `sub_com`;

CREATE TABLE `sub_com` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `section` varchar(255) DEFAULT NULL,
  `comId` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sub_com` WRITE;
/*!40000 ALTER TABLE `sub_com` DISABLE KEYS */;

INSERT INTO `sub_com` (`id`, `name`, `slug`, `section`, `comId`, `tags`)
VALUES
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgMUEgQ29tbXVuaXF1ZXIgZW4gRnJhbsOnYWlz.bxErp9usfBcm5NMaDa8bj86m6f4d0YOIg8Fi-Yo5u7s','COMPETENCES 1A Communiquer en Français','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDEgQ09NTVVOSVFVRVIgRU4gRlJBTkNBSVMsIEFOR0xBSVMgRVQgUFJBVElRVUVSIEFVIE1PSU5TIFVORSBMQU5HVUUgTkFUSU9OQUxF.kpUN4UzISGO6iEtqIJS9Nz5Be4lFvRM7EhG1W4wUEcM','[{\"name\":\"Orale\",\"over\":\"20\"},{\"name\":\"Ecrit\",\"over\":\"15\"},{\"name\":\"Savoir Etre\",\"over\":5}]'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgMUIgQ29tbXVuaWNhdGlvbiBpbiBFbmdsaXNo.ngnPNcTLMLIKzjmIjSYLrLseaqm-Wwp8dbOzKBXs9QY','COMPETENCES 1B Communication in English','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDEgQ09NTVVOSVFVRVIgRU4gRlJBTkNBSVMsIEFOR0xBSVMgRVQgUFJBVElRVUVSIEFVIE1PSU5TIFVORSBMQU5HVUUgTkFUSU9OQUxF.kpUN4UzISGO6iEtqIJS9Nz5Be4lFvRM7EhG1W4wUEcM','[{\"name\":\"Orale\",\"over\":\"20\"},{\"name\":\"Ecrit\",\"over\":\"15\"},{\"name\":\"Savoir Etre\",\"over\":5}]'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgMUMgUHJhdGlxdWVyIHVuZSBMYW5ndWUgTmF0aW9uYWxl.SSeFcBAPgpOANkY8EQ8m55ch3-KSFuKNEtctB-exD04','COMPETENCES 1C Pratiquer une Langue Nationale','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDEgQ09NTVVOSVFVRVIgRU4gRlJBTkNBSVMsIEFOR0xBSVMgRVQgUFJBVElRVUVSIEFVIE1PSU5TIFVORSBMQU5HVUUgTkFUSU9OQUxF.kpUN4UzISGO6iEtqIJS9Nz5Be4lFvRM7EhG1W4wUEcM','[{\"name\":\"Orale\",\"over\":\"10\"},{\"name\":\"Ecrit\",\"over\":\"5\"},{\"name\":\"Pratique\",\"over\":\"2\"},{\"name\":\"Savoir Etre\",\"over\":\"3\"}]'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgMkEgVXRpbGlzZXIgbGVzIE5vdGlvbnMgZGUgQmFzZSBlbiBNYXRow6ltYXRpcXVlIHM.Sdd-Lp2QIb7nSbYhP7d7KYUcW9SqoYrA6yXgOJ0aVV8','COMPETENCES 2A Utiliser les Notions de Base en Mathématique s','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDIgVVRJTElTRVIgTEVTIE5PVElPTlMgREUgQkFTRSBFTiBNQVRIRU1BVElRVUVTLCBTQ0lFTkNFUyBFVCBURUNITk9MT0dJRQ.MBAF6e7Bznq7EmDcWDn9Qq499vr1nRQhsgULQpFoF6U','[{\"name\":\"Orale\",\"over\":\"5\"},{\"name\":\"Ecrit\",\"over\":\"20\"},{\"name\":\"Savoir Etre\",\"over\":5}]'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgMkIgVXRpbGlzZXIgbGVzIE5vdGlvbnMgZGUgQmFzZSBlbiBTY2llbmNlIGV0IGVuIFRlY2hub2xvZ2ll.NuaxjnN55SkgGCG2py4SDun5qWZ1ioTXG7zzjbhqjrA','COMPETENCES 2B Utiliser les Notions de Base en Science et en Technologie','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDIgVVRJTElTRVIgTEVTIE5PVElPTlMgREUgQkFTRSBFTiBNQVRIRU1BVElRVUVTLCBTQ0lFTkNFUyBFVCBURUNITk9MT0dJRQ.MBAF6e7Bznq7EmDcWDn9Qq499vr1nRQhsgULQpFoF6U','[{\"name\":\"Orale\",\"over\":\"5\"},{\"name\":\"Ecrit\",\"over\":\"5\"},{\"name\":\"Pratique\",\"over\":15},{\"name\":\"Savoir Etre\",\"over\":5}]'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgNEEgRGVtb250cmVyIGwnQXV0b25vbWllLCBsJ0VzcHJpdCBkJ0luaXRpYXRpdmUsIGRlIENyw6lhdGl2aXTDqSBldCBkJ0VudHJlcHJlbmV1cmlhdA.ntW54kq0d6G0CENBQzUR2mCX9vGI_6xQaj00EmrD-AI','COMPETENCES 4A Demontrer l\'Autonomie, l\'Esprit d\'Initiative, de Créativité et d\'Entrepreneuriat','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDQgREVNT05UUkVSIEwnQVVUT05PTUlFLCBMJ0VTUFJJVCBEJ0lOSVRJQVRJVkUsIERFIENSRUFUSVZJVEUgRVQgRCdFTlRSRVBSRU5FVVJJQVQ.gqLcihEAZIqixkx3iPcegM7BVLk44CmpXGetsR3Ufew','[{\"name\":\"Orale\",\"over\":\"5\"},{\"name\":\"Ecrit\",\"over\":\"3\"},{\"name\":\"Pratique\",\"over\":\"10\"},{\"name\":\"Savoir Etre\",\"over\":\"2\"}]'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgNUEgVXRpbGlzZXIgbGVzIENvbmNlcHRzIGRlIEJhc2UgZXQgbGVzIE91dGlscyBUSUNz.e0ZZR5dbE30T1Ua1xK2GwT6wAMpFLc-tjrZXgYhWii0','COMPETENCES 5A Utiliser les Concepts de Base et les Outils TICs','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDUgVVRJTElTRVIgTEVTIENPTkNFUFRTIERFIEJBU0UgRVQgTEVTIE9VVElMUyBUSUNT.6wnh6Shxco7RkLJImnMd_yHo32qWewfMCFO0Q3idRSM','[{\"name\":\"Orale\",\"over\":\"3\"},{\"name\":\"Ecrit\",\"over\":\"4\"},{\"name\":\"Pratique\",\"over\":\"10\"},{\"name\":\"Savoir Etre\",\"over\":\"3\"}]'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgNkEgUHJhdGlxdWVyIGxlcyBBY3Rpdml0w6lzIFBoeXNpcXVlcyBldCBTcG9ydGl2ZSBz.YCrCmK96AOyexs0gChc5Ql5fbvhaJr8apvFjSUMs4lE','COMPETENCES 6A Pratiquer les Activités Physiques et Sportive s','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDYgUFJBVElRVUVSIExFUyBBQ1RJVklURVMgUEhZU0lRVUVTLCBTUE9SVElWRVMgRVQgQVJUSVNUSVFVRVM.JvZHtbJlxyr9TA3HdKEJuT98IWYrhbL9jcS3oZfvyaE','[{\"name\":\"Orale\",\"over\":\"2\"},{\"name\":\"Ecrit\",\"over\":\"2\"},{\"name\":\"Pratique\",\"over\":\"12\"},{\"name\":\"Savoir Etre\",\"over\":\"4\"}]'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgNkMgUHJhdGlxdWVyIGxlcyBBY3Rpdml0w6lzIEFydGlzdGlxdWVz.LqimXe7I0fr10yfC_VYFQ4EDg3PJX27PEgO_RsbIHiU','COMPETENCES 6C Pratiquer les Activités Artistiques','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDYgUFJBVElRVUVSIExFUyBBQ1RJVklURVMgUEhZU0lRVUVTLCBTUE9SVElWRVMgRVQgQVJUSVNUSVFVRVM.JvZHtbJlxyr9TA3HdKEJuT98IWYrhbL9jcS3oZfvyaE','[{\"name\":\"Orale\",\"over\":\"2\"},{\"name\":\"Ecrit\",\"over\":\"4\"},{\"name\":\"Pratique\",\"over\":\"12\"},{\"name\":\"Savoir Etre\",\"over\":\"2\"}]'),
	('eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRVMgM0EgUHJhdGlxdWVyIGxlcyBWYWxldXJzIFNvY2lhbGVz.pUR4sF08yVpdGcYqipPOI2VvSHwgvtYSnCcYi8NiqhY','COMPETENCES 3A Pratiquer les Valeurs Sociales','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDMgUFJBVElRVUVSIExFUyBWQUxFVVJTIFNPQ0lBTEVTIEVUIENJVE9ZRU5ORVM.GSDRT3c90q8EcaY4580ThB_Oe1pA-1l3N5clZZmmg_c','[{\"name\":\"Orale\",\"over\":\"0\"},{\"name\":\"Ecrit\",\"over\":\"0\"},{\"name\":\"Pratique\",\"over\":\"0\"},{\"name\":\"Savoir Etre\",\"over\":\"0\"}]'),
	('eyJhbGciOiJIUzI1NiJ9.IENPTVBFVEVOQ0VTIDNCIFByYXRpcXVlciBsZXMgVmFsZXVycyBDaXRveWVubmVz.PolhhJaDBwTiLePCbM-OEe7ilfX8ytYytDS5ussQXT8',' COMPETENCES 3B Pratiquer les Valeurs Citoyennes','raf','14','eyJhbGciOiJIUzI1NiJ9.Q09NUEVURU5DRSA6IDMgUFJBVElRVUVSIExFUyBWQUxFVVJTIFNPQ0lBTEVTIEVUIENJVE9ZRU5ORVM.GSDRT3c90q8EcaY4580ThB_Oe1pA-1l3N5clZZmmg_c','[{\"name\":\"Orale\",\"over\":\"5\"},{\"name\":\"Ecrit\",\"over\":\"8\"},{\"name\":\"Pratique\",\"over\":\"5\"},{\"name\":\"Savoir Etre\",\"over\":\"2\"}]');

/*!40000 ALTER TABLE `sub_com` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;

INSERT INTO `subjects` (`id`, `school_year`, `name`, `section`, `over`)
VALUES
	(4,'2022','DICTEE QUESTIONS','15',40),
	(5,'2022',' PRODUCTION D\'ECRITS','15',40),
	(6,'2022','ANGLAIS','15',50),
	(7,'2022',' CALCUL RAPIDE','15',20),
	(8,'2022','PROBLEMES','15',50),
	(9,'2022','SCIENCES ET TECHNOLOGIES','15',50),
	(10,'2022','SCIENCES HUMAINES & SOCIALES','15',40),
	(11,'2022','TIC','15',30),
	(12,'2022','EPS','15',20),
	(13,'2022','Mathematics','13',20),
	(14,'2022','English Language','13',20),
	(15,'2022','Français','13',20),
	(16,'2022',' Science and Technology','13',20),
	(17,'2022','Social Studies','13',20),
	(18,'2022',' Vocational Studies','13',20),
	(19,'2022','Art','13',20),
	(20,'2022',' National Language and Culture','13',20),
	(21,'2022','Physical Education','13',20),
	(22,'2022','ICT','13',20);

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
	('eyJhbGciOiJIUzI1NiJ9.VGVhY2hlciAx.JGrgB09Mw2Ap9rIqPMqlBZUEYMJkOVfaAIb5jGdN3rA','Mr Kodjo','Armand','eyJhbGciOiJIUzI1NiJ9.TnVyc2VyeSAx.sk5r0OEdWSX3tGFHzO015FQPzq_IK9KU35UKEDARgoA','SEM-NURSERY1','6966','m',NULL,'656576588','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022'),
	('eyJhbGciOiJIUzI1NiJ9.VGVhY2hlciAy.ndC0FVccy0aRVGwhvLn9zrQo7rrDbACRqNdNAHwL65Q','Mr NFONE','Abdoulaye','eyJhbGciOiJIUzI1NiJ9.UGV0aXRlIFNlY3Rpb24.a-83PyrruPnd4a7tCS0D7r7ySlogqPZyCCTc_0FjXiI','SEM-PETITESECTION','1229','m',NULL,'6565656565','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022'),
	('eyJhbGciOiJIUzI1NiJ9.VGVhY2hlcjM.twbEJkwDQ_yttHI_9LEs6dka2vttFniL-pdU9mobHu8','Teacher3','','eyJhbGciOiJIUzI1NiJ9.Q2xhc3MgMQ.yC4Z-RCT2PUlVDkfXBY070I8TwWaVy2bWHjyOH7Ti7w','SEM-CLASS1','1396','m',NULL,'','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022'),
	('eyJhbGciOiJIUzI1NiJ9.VGVhY2hlciA0.uMdiVbnJg8i_txJ8rGfMsFzRPmBgvn361ssqElYr7v4','Teacher 4','','eyJhbGciOiJIUzI1NiJ9.U0lMIEI.WnDylHBcIkn1ls8NhskxZFkSc8HaE9vWeRkCDikET5o','SEM-SILB','2667','m',NULL,'','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022'),
	('eyJhbGciOiJIUzI1NiJ9.VGVhY2hlciA1.CKdxg5D6I351K68rVETWjRHNEqeFcp_Fy_lsve_orUo','Teacher 5','','eyJhbGciOiJIUzI1NiJ9.Q00y.lEbIZ46P-tfV9TfAfYNNPuoWA-FbgHXfVeydpo0FGss','SEM-CM2','10335','m',NULL,'','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022'),
	('eyJhbGciOiJIUzI1NiJ9.bGw.cVNrcTlaxNvtMwOP4LKeQSKfmJdSQM__btQ5Pcf23Wo','ll','','eyJhbGciOiJIUzI1NiJ9.amtra2traw.Nljs0oe0sBuyz_Jd00th-1IEX60VpwW2_c9Dk9sgl1c','SEM-JKKKKKK','9637','m',NULL,'','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022'),
	('eyJhbGciOiJIUzI1NiJ9.dWpqag.nHqsdUMLnH3OTgp46NReVcZ4hxDKyjF5_r2A5kQ5064','ujjj','','eyJhbGciOiJIUzI1NiJ9.aWlpaWlpaQ.jB-5RGkFUkgVDRLzDWhG-QV2GNHMAtXjrl2vRh57XX4','SEM-IIIIIII','7695','m',NULL,'','eyJhbGciOiJIUzI1NiJ9.TGEgc2VtZW5jZQ.fRwDFJ3L2PVmkUqN4jd2fVM6kbTM_43Bb1LSFMLOOGU','2022');

/*!40000 ALTER TABLE `teachers` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table trims
# ------------------------------------------------------------

DROP TABLE IF EXISTS `trims`;

CREATE TABLE `trims` (
  `id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `seqIds` text,
  `school_year` int(11) DEFAULT '2022'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `trims` WRITE;
/*!40000 ALTER TABLE `trims` DISABLE KEYS */;

INSERT INTO `trims` (`id`, `name`, `seqIds`, `school_year`)
VALUES
	('eyJhbGciOiJIUzI1NiJ9.dHJpbTE.0xVVTspZIJcbVp1BMkTNu1xbfj_-aFFnEyf3bFvDs9A','trim1','[\"eyJhbGciOiJIUzI1NiJ9.c2VxMQ.n3D7SmuKn_644JJj4ZcElTz30mRMbU25Lj_OLudMrx0\",\"eyJhbGciOiJIUzI1NiJ9.c2VxMg.8GWTiUNaXbRbBOiazzW5cfZlR6DskbdlIJO41r4Dg-o\"]',2022);

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
