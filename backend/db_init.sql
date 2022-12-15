CREATE DATABASE  IF NOT EXISTS `daboyzhobbycorner` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `daboyzhobbycorner`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: daboyzhobbycorner
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `armies`
--

DROP TABLE IF EXISTS `armies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `armies` (
  `armyid` int NOT NULL AUTO_INCREMENT,
  `idusers` int NOT NULL,
  `armyname` varchar(45) NOT NULL,
  `requisition` int DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `updatedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`armyid`),
  UNIQUE KEY `armyid_UNIQUE` (`armyid`),
  KEY `idusers_idx` (`idusers`),
  CONSTRAINT `idusers` FOREIGN KEY (`idusers`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `armies`
--

LOCK TABLES `armies` WRITE;
/*!40000 ALTER TABLE `armies` DISABLE KEYS */;
INSERT INTO `armies` VALUES (1,4,'Test Army',3,'2022-12-10 16:03:47','2022-12-12 20:47:49'),(5,1,'Army3 testing',1,'2022-12-10 16:35:07','2022-12-10 16:51:29'),(7,4,'Miniproject 3 test',0,'2022-12-13 18:14:29','2022-12-13 18:14:29'),(8,1,'Another test',0,'2022-12-13 18:15:47','2022-12-13 18:15:47');
/*!40000 ALTER TABLE `armies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `army_unit`
--

DROP TABLE IF EXISTS `army_unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `army_unit` (
  `idarmy_unit` int NOT NULL AUTO_INCREMENT,
  `armyid` int NOT NULL,
  `unitid` int NOT NULL,
  PRIMARY KEY (`idarmy_unit`),
  KEY `armyid_idx` (`armyid`),
  KEY `unitid_idx` (`unitid`),
  CONSTRAINT `armyid` FOREIGN KEY (`armyid`) REFERENCES `armies` (`armyid`),
  CONSTRAINT `unitid` FOREIGN KEY (`unitid`) REFERENCES `units` (`unitid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `army_unit`
--

LOCK TABLES `army_unit` WRITE;
/*!40000 ALTER TABLE `army_unit` DISABLE KEYS */;
INSERT INTO `army_unit` VALUES (13,5,18),(14,5,19),(15,5,20),(16,5,21),(17,5,22),(18,1,23),(19,1,24),(21,1,26),(22,1,27),(23,1,28),(24,1,29);
/*!40000 ALTER TABLE `army_unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matches` (
  `idmatches` int NOT NULL AUTO_INCREMENT,
  `createddate` datetime DEFAULT NULL,
  `matchname` varchar(45) NOT NULL,
  `idattacker` int NOT NULL,
  `iddefender` int NOT NULL,
  `dateplayed` datetime DEFAULT NULL,
  `matchresult` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idmatches`),
  KEY `idattacker_idx` (`idattacker`),
  KEY `iddefender_idx` (`iddefender`),
  CONSTRAINT `idattacker` FOREIGN KEY (`idattacker`) REFERENCES `users` (`idusers`),
  CONSTRAINT `iddefender` FOREIGN KEY (`iddefender`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
INSERT INTO `matches` VALUES (1,'2022-12-11 17:17:51','First match ever',1,4,'2022-12-12 19:32:48','Jason Win\'s'),(2,'2022-12-11 17:27:21','Second match',4,1,'2022-12-12 19:23:42','Jason wins'),(3,'2022-12-11 17:27:31','Third and Final match',1,4,NULL,'Match yet to be played'),(4,'2022-12-11 22:00:10','It is not over',1,4,NULL,'Match yet to be played'),(5,'2022-12-11 22:15:40','It\'s not over',1,4,'2022-12-12 19:23:42','Jason wins');
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `units` (
  `unitid` int NOT NULL AUTO_INCREMENT,
  `unitname` varchar(45) NOT NULL,
  `unitexp` int NOT NULL,
  `honors` varchar(45) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  `UpdatedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`unitid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (18,'GK Grand Master',1,'Example honors','2022-12-10 19:27:21','2022-12-12 19:22:57'),(19,'GK Librarian',0,' ','2022-12-10 19:27:27','2022-12-10 19:27:27'),(20,'Strike Squad 1',0,' ','2022-12-10 19:27:31','2022-12-10 19:27:31'),(21,'Strike Squad 2',0,' ','2022-12-10 19:27:34','2022-12-10 19:27:34'),(22,'Strike Squad 3',0,' ','2022-12-10 19:27:37','2022-12-10 19:27:37'),(23,'Unit 6',0,' ','2022-12-10 19:28:04','2022-12-10 19:28:04'),(24,'Unit 7',0,' ','2022-12-10 19:28:09','2022-12-10 19:28:09'),(26,'MekBoy',0,' ','2022-12-11 21:00:30','2022-12-11 21:00:30'),(27,'Nob',0,' ','2022-12-11 21:00:35','2022-12-11 21:00:35'),(28,'Warboss',0,' ','2022-12-11 21:00:41','2022-12-11 21:00:41'),(29,'Weirdboy',0,' ','2022-12-11 21:00:48','2022-12-11 21:00:48');
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `useremail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `refreshtoken` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE KEY `idusers_UNIQUE` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'alves.ivan87@gmail.com','$2b$10$j8uYuPl2edYnaJ4rEkUkr.iVfcI24gjOERvdl84kidS3QdwpoGnmS','ThePurgativeWay','2022-11-26 20:56:43','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzZXJzIjoxLCJ1c2VybmFtZSI6IlRoZVB1cmdhdGl2ZVdheSIsImxvZ2ludXNlcmVtYWlsIjoiYWx2ZXMuaXZhbjg3QGdtYWlsLmNvbSIsImlhdCI6MTY3MDkxOTU3MiwiZXhwIjoxNjcxMDA1OTcyfQ.lVWAcc6tIJndmGDYBm6Zqs6Yv2nJCutFxqlDvBgalHE'),(4,'test@test.com','$2b$10$j8uYuPl2edYnaJ4rEkUkr.iVfcI24gjOERvdl84kidS3QdwpoGnmS','Jason','2022-12-09 14:31:53','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHVzZXJzIjo0LCJ1c2VybmFtZSI6Ikphc29uIiwibG9naW51c2VyZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjcwNzI3NjQxLCJleHAiOjE2NzA4MTQwNDF9.Rinzmk7P9Yuhm8__NjoBGf2gE5U7nPWXnGY0UcPor1A'),(5,'test2@test.com','$2b$10$9l8JUONHPJg.RaJCdWyhlemEejbAx5i8WmnJ/xzldXtY0H0vkyxOG','Nathan','2022-12-12 20:45:18',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'daboyzhobbycorner'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-13 21:11:56
