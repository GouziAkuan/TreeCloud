/*
 Navicat Premium Dump SQL

 Source Server         : akuan
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : treecloud

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 16/09/2024 14:31:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES (1, 'admin', 'TreeCloud', '$2b$10$eJXFrrNr4B1sgmm/B6W.YuE4KJDoZAaFi0itKfV0xS09O9p7xfyyi', '2024-08-24 18:42:24.110509', '2024-08-24 18:42:24.110509');

-- ----------------------------
-- Table structure for adoptions
-- ----------------------------
DROP TABLE IF EXISTS `adoptions`;
CREATE TABLE `adoptions`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `adoption_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tree_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `wish` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `adopted_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_id` int UNSIGNED NULL DEFAULT NULL,
  `tree_id` int UNSIGNED NULL DEFAULT NULL,
  `type_id` int UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_c78ea086089090f0885ac31e7b`(`adoption_id` ASC) USING BTREE,
  INDEX `FK_f81edbad0eff59ae0c9883b08dd`(`user_id` ASC) USING BTREE,
  INDEX `FK_5afb0745257feaaaca98fca786f`(`tree_id` ASC) USING BTREE,
  INDEX `FK_3c9402e0a6bcd249f1d185ed960`(`type_id` ASC) USING BTREE,
  CONSTRAINT `FK_3c9402e0a6bcd249f1d185ed960` FOREIGN KEY (`type_id`) REFERENCES `tree_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_5afb0745257feaaaca98fca786f` FOREIGN KEY (`tree_id`) REFERENCES `trees` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_f81edbad0eff59ae0c9883b08dd` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of adoptions
-- ----------------------------
INSERT INTO `adoptions` VALUES (26, '202409031902591', 'adssa', '亲情纪念树', '向下扎根,向上生长,初心不改，未来可期!', '2024-09-11 19:02:59.922988', '2024-09-11 19:03:30.000000', 4, 214, 56);
INSERT INTO `adoptions` VALUES (27, '202409061512222', '3123', '爱情纪念树', '向下扎根,向上生长,初心不改，未来可期!', '2024-09-14 15:12:22.942018', '2024-09-14 15:12:22.942018', 4, 215, 56);

-- ----------------------------
-- Table structure for tree_images
-- ----------------------------
DROP TABLE IF EXISTS `tree_images`;
CREATE TABLE `tree_images`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `detailImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `tree_id` int UNSIGNED NULL DEFAULT NULL,
  `type_id` int UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_3432df02770ab99f91cc881cd7e`(`tree_id` ASC) USING BTREE,
  INDEX `FK_79bf9f531baccb5e0ae92e4a8db`(`type_id` ASC) USING BTREE,
  CONSTRAINT `FK_3432df02770ab99f91cc881cd7e` FOREIGN KEY (`tree_id`) REFERENCES `trees` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_79bf9f531baccb5e0ae92e4a8db` FOREIGN KEY (`type_id`) REFERENCES `tree_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 311 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tree_images
-- ----------------------------
INSERT INTO `tree_images` VALUES (282, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 215, 56);
INSERT INTO `tree_images` VALUES (283, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 216, 56);
INSERT INTO `tree_images` VALUES (284, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 217, 56);
INSERT INTO `tree_images` VALUES (285, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 218, 56);
INSERT INTO `tree_images` VALUES (286, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 219, 56);
INSERT INTO `tree_images` VALUES (287, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 220, 56);
INSERT INTO `tree_images` VALUES (288, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 221, 56);
INSERT INTO `tree_images` VALUES (289, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 222, 56);
INSERT INTO `tree_images` VALUES (290, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 223, 56);
INSERT INTO `tree_images` VALUES (291, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 224, 56);
INSERT INTO `tree_images` VALUES (292, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 18:02:07.644487', '2024-09-11 18:02:07.644487', 225, 56);
INSERT INTO `tree_images` VALUES (294, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:00:42.231719', '2024-09-11 19:00:42.231719', 227, 57);
INSERT INTO `tree_images` VALUES (295, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:00:42.231719', '2024-09-11 19:00:42.231719', 228, 57);
INSERT INTO `tree_images` VALUES (296, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:00:42.231719', '2024-09-11 19:00:42.231719', 229, 57);
INSERT INTO `tree_images` VALUES (297, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:00:42.231719', '2024-09-11 19:00:42.231719', 230, 57);
INSERT INTO `tree_images` VALUES (298, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:00:42.231719', '2024-09-11 19:00:42.231719', 231, 57);
INSERT INTO `tree_images` VALUES (299, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:00:42.231719', '2024-09-11 19:00:42.231719', 232, 57);
INSERT INTO `tree_images` VALUES (300, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:00:42.231719', '2024-09-11 19:00:42.231719', 233, 57);
INSERT INTO `tree_images` VALUES (301, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:00:42.231719', '2024-09-11 19:00:42.231719', 234, 57);
INSERT INTO `tree_images` VALUES (302, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:00:42.231719', '2024-09-11 19:00:42.231719', 235, 57);
INSERT INTO `tree_images` VALUES (303, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:00:42.231719', '2024-09-11 19:00:42.231719', 236, 57);
INSERT INTO `tree_images` VALUES (304, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:01:11.885501', '2024-09-11 19:01:11.885501', 237, 57);
INSERT INTO `tree_images` VALUES (306, 'http://127.0.0.1:8080/static/56edea13-22ec-41cf-a70e-6590420ce6ee.png', '2024-09-11 19:01:44.093810', '2024-09-11 19:01:44.093810', 213, 57);
INSERT INTO `tree_images` VALUES (308, 'http://127.0.0.1:8080/static/mrtree.png', '2024-09-11 19:02:31.983163', '2024-09-11 19:02:31.983163', 239, 56);
INSERT INTO `tree_images` VALUES (309, 'http://127.0.0.1:8080/static/2aa279ad-d2cf-4a63-8ddf-f936645a4141.png', '2024-09-11 19:03:30.700827', '2024-09-11 19:03:30.700827', 214, 56);
INSERT INTO `tree_images` VALUES (310, 'http://127.0.0.1:8080/static/10f6f85b-4745-4145-841a-aaa9634e5204.png', '2024-09-11 19:03:30.700827', '2024-09-11 19:03:30.700827', 214, 56);

-- ----------------------------
-- Table structure for tree_type
-- ----------------------------
DROP TABLE IF EXISTS `tree_type`;
CREATE TABLE `tree_type`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `scientific_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `common_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `total` int NOT NULL,
  `remaining` int NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_7a05d9ecf95cb260c02ec44e2b`(`scientific_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tree_type
-- ----------------------------
INSERT INTO `tree_type` VALUES (56, 'http://127.0.0.1:8080/static/eee5f2ea-5807-445f-9518-ac2f6b354528.jpg', '樟', '香樟、芳樟', '产南方及西南各省区。常生于山坡或沟谷中，但常有栽培的。越南、朝鲜、日本也有分布，其他各国常有引种栽培。\n木材及根、枝、叶可提取樟脑和樟油，樟脑和樟油供医药及香料工业用。果核含脂肪，含油量约40％，油供工业用。根、果、枝和叶入药，有祛风散寒、强心镇痉和杀虫等功能。木材又为造船、橱箱和建筑等用材。', 13, 11, '2024-09-11 18:02:07.421874', '2024-09-14 15:12:22.000000');
INSERT INTO `tree_type` VALUES (57, 'http://127.0.0.1:8080/static/540970d5-6ab8-421d-9b91-c27875a002c1.jpg', '秋枫', '万年青树、赤木', '产于陕西、江苏、安徽、浙江、江西、福建、台湾、河南、湖北、湖南、广东、海南、广西、四川、贵州、云南等省区。木材红褐色，心材与边材区别不甚明显，结构细，质重、坚韧耐用、耐腐、耐水湿，气干比重0.69，可供建筑、桥梁、车辆、造船、矿柱、枕木等用。果肉可酿酒。种子含油量30-54%，供食用，也可作润滑油。树皮可提取红色染料。叶可作绿肥，也可治无名肿毒。根有祛风消肿作用，主治风湿骨痛、痢疾等。', 12, 12, '2024-09-11 19:00:42.029462', '2024-09-11 19:01:29.000000');

-- ----------------------------
-- Table structure for trees
-- ----------------------------
DROP TABLE IF EXISTS `trees`;
CREATE TABLE `trees`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `isAdopted` tinyint NOT NULL DEFAULT 0,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `type_id` int UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_d2658435e2ce0d5f42bfd0157d8`(`type_id` ASC) USING BTREE,
  CONSTRAINT `FK_d2658435e2ce0d5f42bfd0157d8` FOREIGN KEY (`type_id`) REFERENCES `tree_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 240 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of trees
-- ----------------------------
INSERT INTO `trees` VALUES (213, 0, '2024-09-11 18:02:07.457233', '2024-09-11 19:01:29.000000', 57);
INSERT INTO `trees` VALUES (214, 1, '2024-09-11 18:02:07.471287', '2024-09-11 19:02:59.000000', 56);
INSERT INTO `trees` VALUES (215, 1, '2024-09-11 18:02:07.482944', '2024-09-14 15:12:22.000000', 56);
INSERT INTO `trees` VALUES (216, 0, '2024-09-11 18:02:07.501046', '2024-09-11 18:02:07.501046', 56);
INSERT INTO `trees` VALUES (217, 0, '2024-09-11 18:02:07.513839', '2024-09-11 18:02:07.513839', 56);
INSERT INTO `trees` VALUES (218, 0, '2024-09-11 18:02:07.532916', '2024-09-11 18:02:07.532916', 56);
INSERT INTO `trees` VALUES (219, 0, '2024-09-11 18:02:07.552702', '2024-09-11 18:02:07.552702', 56);
INSERT INTO `trees` VALUES (220, 0, '2024-09-11 18:02:07.558183', '2024-09-11 18:02:07.558183', 56);
INSERT INTO `trees` VALUES (221, 0, '2024-09-11 18:02:07.577073', '2024-09-11 18:02:07.577073', 56);
INSERT INTO `trees` VALUES (222, 0, '2024-09-11 18:02:07.595670', '2024-09-11 18:02:07.595670', 56);
INSERT INTO `trees` VALUES (223, 0, '2024-09-11 18:02:07.607862', '2024-09-11 18:02:07.607862', 56);
INSERT INTO `trees` VALUES (224, 0, '2024-09-11 18:02:07.628462', '2024-09-11 18:02:07.628462', 56);
INSERT INTO `trees` VALUES (225, 0, '2024-09-11 18:02:07.635448', '2024-09-11 18:02:07.635448', 56);
INSERT INTO `trees` VALUES (227, 0, '2024-09-11 19:00:42.094397', '2024-09-11 19:00:42.094397', 57);
INSERT INTO `trees` VALUES (228, 0, '2024-09-11 19:00:42.107683', '2024-09-11 19:00:42.107683', 57);
INSERT INTO `trees` VALUES (229, 0, '2024-09-11 19:00:42.115953', '2024-09-11 19:00:42.115953', 57);
INSERT INTO `trees` VALUES (230, 0, '2024-09-11 19:00:42.135352', '2024-09-11 19:00:42.135352', 57);
INSERT INTO `trees` VALUES (231, 0, '2024-09-11 19:00:42.141620', '2024-09-11 19:00:42.141620', 57);
INSERT INTO `trees` VALUES (232, 0, '2024-09-11 19:00:42.156066', '2024-09-11 19:00:42.156066', 57);
INSERT INTO `trees` VALUES (233, 0, '2024-09-11 19:00:42.169230', '2024-09-11 19:00:42.169230', 57);
INSERT INTO `trees` VALUES (234, 0, '2024-09-11 19:00:42.186972', '2024-09-11 19:00:42.186972', 57);
INSERT INTO `trees` VALUES (235, 0, '2024-09-11 19:00:42.193685', '2024-09-11 19:00:42.193685', 57);
INSERT INTO `trees` VALUES (236, 0, '2024-09-11 19:00:42.207052', '2024-09-11 19:00:42.207052', 57);
INSERT INTO `trees` VALUES (237, 0, '2024-09-11 19:01:11.870316', '2024-09-11 19:01:11.870316', 57);
INSERT INTO `trees` VALUES (239, 0, '2024-09-11 19:02:31.969900', '2024-09-11 19:02:31.969900', 56);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_a000cca60bcf04454e72769949`(`phone` ASC) USING BTREE,
  UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71`(`username` ASC) USING BTREE,
  UNIQUE INDEX `IDX_4d58d0f5c84471b6b66d497123`(`phone` ASC, `username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (4, 'user', 'http://127.0.0.1:8080/static/mrtx.png', '18836477658', '狗子是阿宽的球迷', '$2b$10$fvHsXaa.LYUcthVPVPeGPePCiuSbCFi92YIAQaUjilejN.yL1w0di', '2024-09-08 16:55:01.184167', '2024-09-08 16:55:01.184167');

SET FOREIGN_KEY_CHECKS = 1;
