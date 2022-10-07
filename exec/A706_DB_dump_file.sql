CREATE DATABASE  IF NOT EXISTS `bcssafy` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bcssafy`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: j7a706.p.ssafy.io    Database: bcssafy
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
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorite` (
  `favorite_id` bigint NOT NULL AUTO_INCREMENT,
  `laundry_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`favorite_id`),
  KEY `FKjee7hirx77vjckuw35ge02g8e` (`laundry_id`),
  KEY `FKh3f2dg11ibnht4fvnmx60jcif` (`user_id`),
  CONSTRAINT `FKh3f2dg11ibnht4fvnmx60jcif` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKjee7hirx77vjckuw35ge02g8e` FOREIGN KEY (`laundry_id`) REFERENCES `laundry` (`laundry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laundry`
--

DROP TABLE IF EXISTS `laundry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laundry` (
  `laundry_id` bigint NOT NULL AUTO_INCREMENT,
  `addr` varchar(255) DEFAULT NULL,
  `addr_detail` varchar(255) DEFAULT NULL,
  `addr_lat` double DEFAULT NULL,
  `addr_lng` double DEFAULT NULL,
  `ceo_name` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `delivery_cost` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `is_deliver` bit(1) NOT NULL,
  `is_pickup` bit(1) NOT NULL,
  `is_withdrawn` bit(1) NOT NULL,
  `join_date` datetime(6) DEFAULT NULL,
  `laundry_name` varchar(255) DEFAULT NULL,
  `min_cost` bigint NOT NULL,
  `reg_date` date DEFAULT NULL,
  `reg_num` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`laundry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laundry`
--

LOCK TABLES `laundry` WRITE;
/*!40000 ALTER TABLE `laundry` DISABLE KEYS */;
INSERT INTO `laundry` VALUES (1,'서울 강남구 역삼로1길 19 ','2층',37.4944907014981,127.030148156363,'김뱅순','02-2222-2575',3000,'안녕하세요 뱅순세탁소 입니다^^','https://setakcloth.s3.ap-northeast-2.amazonaws.com/88f94ebb-8183-451b-bf17-7ff050d4b46d_%EB%B1%85%EC%88%9C%EC%84%B8%ED%83%81%EC%86%8C.jpg',_binary '',_binary '',_binary '\0','2022-10-07 06:38:14.730929','뱅순세탁소',15000,'2022-10-06','01001001001',4),(2,'서울 강남구 강남대로 298 푸르덴셜타워','2층',37.4900527091667,127.032163623819,'한상우','0298553652',0,'안녕하세요 상우세탁소입니다 ^^ 행복하세요ㅎㅎ','https://setakcloth.s3.ap-northeast-2.amazonaws.com/356da039-e33c-4d67-8135-ab2f754b6906_%EC%83%81%EC%9A%B0%EC%84%B8%ED%83%81%EC%86%8C.png',_binary '',_binary '',_binary '\0','2022-10-07 06:39:23.127058','상우세탁소',0,'2022-10-06','02002020',5),(3,'서울 강남구 역삼로3길 7 역삼SK허브블루','3층',37.4940357694986,127.031240784642,'김수미','02551632158',0,'안녕하세요 행복을 드리는 수미 세탁소입니다.','https://setakcloth.s3.ap-northeast-2.amazonaws.com/337ce457-8b2a-4d2a-9785-7c6bb571bef4_%EC%88%98%EB%AF%B8%EC%84%B8%ED%83%81%EC%86%8C.jpg',_binary '',_binary '',_binary '\0','2022-10-07 06:49:07.779141','수미세탁소',15000,'2022-10-06','03300201',8),(4,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5012767241426,127.039600248343,'김싸피','0212345678',3000,'싸피 최고의 세탁소',NULL,_binary '',_binary '',_binary '\0','2022-10-07 08:01:16.856826','싸피세탁소',8000,'2022-10-06','96',9),(5,'서울 강남구 테헤란로 212 멀티캠퍼스','123123',37.5012767241426,127.039600248343,'qweqwe','01000000000',2000,'ㅁㄹㄴㅇㄻㄴㅇㄻㄴㅇㄹ',NULL,_binary '',_binary '',_binary '\0','2022-10-07 08:27:59.988265','qweqweqew',2000,'2022-10-06','상우세탁소',11),(6,'서울 강서구 강서로 486 ','1층',37.5686944138766,126.841609434619,'조미곤','01012341234',3000,'저희 피곤미곤 세탁소의 세탁 서비스를 많이 이용해주세요~!','https://setakcloth.s3.ap-northeast-2.amazonaws.com/cb92b46e-aced-4cf4-a110-a987e513bf7a_1.png',_binary '',_binary '',_binary '\0','2022-10-07 08:52:27.916618','피곤미곤 세탁소',1000,'2022-10-23','12345678',12);
/*!40000 ALTER TABLE `laundry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laundry_item`
--

DROP TABLE IF EXISTS `laundry_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laundry_item` (
  `laundry_item_id` bigint NOT NULL AUTO_INCREMENT,
  `is_withdrawn` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint NOT NULL,
  `laundry_id` bigint DEFAULT NULL,
  PRIMARY KEY (`laundry_item_id`),
  KEY `FK4ct8o9bsbteeg9wbuiekk7kso` (`laundry_id`),
  CONSTRAINT `FK4ct8o9bsbteeg9wbuiekk7kso` FOREIGN KEY (`laundry_id`) REFERENCES `laundry` (`laundry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laundry_item`
--

LOCK TABLES `laundry_item` WRITE;
/*!40000 ALTER TABLE `laundry_item` DISABLE KEYS */;
INSERT INTO `laundry_item` VALUES (1,_binary '\0','셔츠',5000,2),(2,_binary '\0','바지',3000,2),(3,_binary '\0','자켓',15000,2),(4,_binary '\0','셔츠',5000,1),(5,_binary '\0','바지',3000,1),(6,_binary '\0','자켓',8000,1),(7,_binary '\0','셔츠',10000,3),(8,_binary '\0','바지',10000,3),(9,_binary '\0','자켓',10000,3),(10,_binary '\0','ㄴㅇㅁㄴㅇ',2000,5),(11,_binary '\0','ㅁㄴㅇㅁㄴㅇ',2000,5),(12,_binary '\0','바지 세탁',5000,6),(13,_binary '\0','코트',10000,1);
/*!40000 ALTER TABLE `laundry_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `date` datetime(6) DEFAULT NULL,
  `hash` varchar(255) DEFAULT NULL,
  `is_img` bit(1) DEFAULT NULL,
  `order_type` varchar(255) DEFAULT NULL,
  `review_content` varchar(255) DEFAULT NULL,
  `review_date` datetime(6) DEFAULT NULL,
  `review_score` int DEFAULT NULL,
  `state` int NOT NULL,
  `total_price` bigint DEFAULT NULL,
  `laundry_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FKsxssll80omdcxtjp3h2g9f9cw` (`laundry_id`),
  KEY `FKcpl0mjoeqhxvgeeeq5piwpd3i` (`user_id`),
  CONSTRAINT `FKcpl0mjoeqhxvgeeeq5piwpd3i` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKsxssll80omdcxtjp3h2g9f9cw` FOREIGN KEY (`laundry_id`) REFERENCES `laundry` (`laundry_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (10,'2022-10-07 07:44:45.024510','hash',NULL,'PICKUP',NULL,NULL,NULL,2,16000,1,1),(11,'2022-10-07 08:29:34.006240','hash',NULL,'PICKUP',NULL,NULL,NULL,2,2000,5,10),(12,'2022-10-07 08:50:53.059467','hash',_binary '\0','PICKUP','너무 깨끗해요!!','2022-10-07 08:53:10.722694',5,3,16000,1,1),(13,'2022-10-07 08:55:16.805157','hash',NULL,'PICKUP',NULL,NULL,NULL,3,35000,1,1),(14,'2022-10-07 09:50:19.839599','hash',_binary '\0','PICKUP','최고에요','2022-10-07 09:55:10.780105',5,3,26000,1,1);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `order_detail_id` bigint NOT NULL AUTO_INCREMENT,
  `block_addr1` varchar(255) DEFAULT NULL,
  `block_addr2` varchar(255) DEFAULT NULL,
  `block_addr3` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint NOT NULL,
  `order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `FKlb8mofup9mi791hraxt9wlj5u` (`order_id`),
  CONSTRAINT `FKlb8mofup9mi791hraxt9wlj5u` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (28,NULL,NULL,NULL,'셔츠',5000,10),(29,NULL,NULL,NULL,'바지',3000,10),(30,NULL,NULL,NULL,'자켓',8000,10),(31,NULL,NULL,NULL,'ㄴㅇㅁㄴㅇ',2000,11),(32,'0x0d7914b1267932c22849fd6e54f424bcfd51b06dadddad2c22610e244465cb9f','0x0a8a9fa380dc1cb2046a5bddbcd053a162ccfa344b0876f08d10c48c0873ad60',NULL,'셔츠',5000,12),(33,'0x0c227bd9c58ff53789793c7527d74cdd3d2fa98c96606940bd0996cde3038c64','0x5ab3e138c09c9c6a576c5d771ae5f6e730a55723922a958f3d66d9032e168be8',NULL,'바지',3000,12),(34,'0x28b68fb16280644f227d56b9b6c17452c4e4a6e3037b7f9efa47a9a457b1ec25','0x0e7a6896ca308eb76596d76584258fb1f8ccb891a1b6ee8a5d97d52f389a644c',NULL,'자켓',8000,12),(35,'0x25ca9f076d854a781a13552431ceacb667e807a20adf15200220237fc7c0ac35','0x99f37a7b6543f674ea15d8ebdc544d7af1b0cb13219add6b469e6b6f899f6050',NULL,'셔츠',5000,13),(36,'0xb62e11c4d8c01c3abc66450cb0a124cde2f259a09993d439898ef41f37f1b3fb','0x816d24afaacbadb2755018d1b71d60b60fdf3bb0b6228a9f7d3598081afa268a',NULL,'바지',3000,13),(37,'0x9d0f5c0491c94cde6d46285032afad16b9a228def9edfaeb3f7e92113ef2df4b','0xf58def353be509a3784ec61ca29c0e1e1d1ee1a3da148feafb1c2d870bdcaef9',NULL,'바지',3000,13),(38,'0xb61b1efc418abf096017d345e8eedf58f4d400fb13bf55b5cdf897ddc8b586ed','0x094f3b053fd68430ab5865289820abdef2d5cae8f24a52422201909cafc3782d',NULL,'자켓',8000,13),(39,'0x3a148aaa7b2083f80386f5b77a4eb1e39ce23aa5ce8eb57d4d9401d62942bc0b','0xd3ddc359ae53fd20eedea5ddff5c1c114bd30107359abae937722c8f358feee1',NULL,'자켓',8000,13),(40,'0xa976836781f8ae2b56296d0f3382a47795673cb56a3bfb913cdffcceeb3cc190','0x3fc966f363f070fc2a6cc34add206b6e3b9cb56047339dd69cc18fadf841a014',NULL,'자켓',8000,13),(41,'0xedc6606a01a594a3768fb405339ba8cdac1e3012d6010f40557e6b0f538c360a','0xdfddf49aa04db3f605612cf3509d62daca900b63e94eb4dea39402b8a1c87677',NULL,'셔츠',5000,14),(42,'0x34553a42ac5ab0484621416a50cafec1ecfa04d7242a3321f68110897e5b0d61','0xc329a9c7fc12ff77c552cba8500329062560f6a41bbeaa7471b4141747401dd7',NULL,'바지',3000,14),(43,'0x72e2501c34a302599fbfff7c3c0aefe7432a6dd62bc4d8c6766a4a4fbc4da670','0x7642b14db57bed7e6ebb7362ae80e7837732cce9d9dc5ddce9ad7eacd0e5eeda',NULL,'자켓',8000,14),(44,'0x71e3c486ee4cb76c7ba4abdff915b2765e9e0b026877529936e00dcbb4869e11','0xe833e5e0945655f98e0a069afd239b94c59c7c27712ec876284da309bb23b4ab',NULL,'코트',10000,14);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trans_log`
--

DROP TABLE IF EXISTS `trans_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trans_log` (
  `trans_log_id` bigint NOT NULL AUTO_INCREMENT,
  `clean` bigint NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`trans_log_id`),
  KEY `FKoeqc4r1fy7fdonodx1nvepmxt` (`user_id`),
  CONSTRAINT `FKoeqc4r1fy7fdonodx1nvepmxt` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trans_log`
--

LOCK TABLES `trans_log` WRITE;
/*!40000 ALTER TABLE `trans_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `trans_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `addr` varchar(255) DEFAULT NULL,
  `addr_detail` varchar(255) DEFAULT NULL,
  `addr_lat` double DEFAULT NULL,
  `addr_lng` double DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `ceo_email` varchar(255) DEFAULT NULL,
  `is_social` bit(1) NOT NULL,
  `is_withdrawn` bit(1) NOT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_type` int DEFAULT NULL,
  `wallet_addr` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,36000,NULL,_binary '\0',_binary '\0','선물을 고민하는 김팀장 70989','$2a$10$OTmcxsS7XaaQCTrq6jX0/enDuTDmlbxJucjHg6QJrQ6qGr4ljrxgq','user@user.com',0,'0xAa6eB6210fe9B2533b595f1a0BEb5aDCf9670F90'),(2,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,27000,NULL,_binary '\0',_binary '\0','빈둥거리는 테일러스위프트 89702','$2a$10$fr6ZnNa6zzCCALS9c6dZKOftdjgfpLQn3iT/Yynxy.MdnuvZMDzpm','user1@user.com',0,'0xD76B7C053D84B1420e172Ede0747669308E5320c'),(3,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,21000,NULL,_binary '\0',_binary '\0','벼락맞은 옆집 아저씨 51481','$2a$10$4caUId/D3y4g1lNXDXgdc.TA5bj7L7rCVfZ/zrbiOLDmWWEIM/2Lq','user2@user.com',0,'0x0544912a4b4E3170b642A8c6AAd7e2141099fA1f'),(4,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,54000,'ceo@ceo.com',_binary '\0',_binary '\0',NULL,'$2a$10$sGtmAQxI8wGXN1CWjfd0S.avpFPgfR6wOFU2xmu/.q9NQt58gGT2S',NULL,1,'0x7aD915e44D9E716a079C6aCe57BF3CA85505bdc4'),(5,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,0,'ceo1@ceo.com',_binary '\0',_binary '\0',NULL,'$2a$10$VcXBSP3xkVT1d/6qjnX0OOf.dpbh/Oe/UgZPB5eomBaSHY2BOqDJG',NULL,1,'0x96ad63A061b4eF9b2bd552293b833D033dC112CD'),(8,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,0,'ceo2@ceo.com',_binary '\0',_binary '\0',NULL,'$2a$10$c5sa19SkkTKALKHV0PqNtOSapnHEEWyHfsfcJ/zKRaHfSDuFpShT2',NULL,1,'0x0BD0915bCdc9ab92e0a646aAfDe9E551D78a3983'),(9,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,0,'ceo3@ceo.com',_binary '\0',_binary '\0',NULL,'$2a$10$MBouXt1FNa/DUOzXqhnsD.OSC1sV.XoDG0ZA/1fkMEk6TnApKU7Yi',NULL,1,'0xA389112e2F697A9E9101cc32CA4D8433c95005E0'),(10,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,8000,NULL,_binary '',_binary '\0','내일의 나를 믿는 영웅 39936',NULL,'jasminema@naver.com',0,'0x97dF95802f3c74301387414EA7D0fC60DEe62412'),(11,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,2000,'jasminema@naver.com',_binary '',_binary '\0',NULL,NULL,NULL,1,'0x8c2e952a0bF79f46c3312bD42AB500d4C7F5B4D6'),(12,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,0,'migon99@naver.com',_binary '',_binary '\0',NULL,NULL,NULL,1,'0x480a3B2DCefA8B59CD48ceE34C349fE47a8a2972'),(13,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,10000,NULL,_binary '\0',_binary '\0','523년 먹은 리오넬메시 67130','$2a$10$C6xCqH7.annVZBsIOSygB.Jb7O455b9QGMp.BcGlXCidNxIoi3cA.','engks4619@naver.com',0,'0xF19BbFcf3FEcF5e6fB98C89c68ad57018CF161CC'),(14,'서울 강남구 테헤란로 212 멀티캠퍼스','1402호',37.5013,127.0396,0,NULL,_binary '',_binary '\0','이상한 나라의 김탁구 9375',NULL,'hsw9703@nate.com',0,'0xc26FFF52DF5f63E881Bcf7F93BDc4FbF24712E1b');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_noti`
--

DROP TABLE IF EXISTS `user_noti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_noti` (
  `user_noti_id` bigint NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `date` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_noti_id`),
  KEY `FKdci2lvb56tjmcxrbuc59ybbmp` (`user_id`),
  CONSTRAINT `FKdci2lvb56tjmcxrbuc59ybbmp` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_noti`
--

LOCK TABLES `user_noti` WRITE;
/*!40000 ALTER TABLE `user_noti` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_noti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07 10:10:36
