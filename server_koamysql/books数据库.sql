/*
 Navicat Premium Data Transfer

 Source Server         : mysql_books
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : localhost:3306
 Source Schema         : books

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001

 Date: 08/05/2024 23:44:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `ISBN` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bookname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `author` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `publishid` int(0) NULL DEFAULT NULL,
  `publishername` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `monthsalecount` int(0) NULL DEFAULT NULL,
  `bookpicname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `secondctgyid` int(0) NULL DEFAULT NULL,
  `thirdctgyid` int(0) NULL DEFAULT NULL,
  `originalprice` double(10, 2) NULL DEFAULT NULL,
  `discount` double(6, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`ISBN`) USING BTREE,
  INDEX `fk_secid`(`secondctgyid`) USING BTREE,
  INDEX `fk_thrdid`(`thirdctgyid`) USING BTREE,
  CONSTRAINT `fk_secid` FOREIGN KEY (`secondctgyid`) REFERENCES `secondctgy` (`secondctgyid`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_thrdid` FOREIGN KEY (`thirdctgyid`) REFERENCES `thirdctgy` (`thirdctgyid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES ('978-7-101', '童年(小学语文\"快乐读书吧\".五年级阅读,高尔基自传体三部曲之一', '高尔基', 1, '人民出版社', 7898, '1童年.png', 3, 13, 39.00, 0.98);
INSERT INTO `books` VALUES ('978-7-102', '童年(高尔基自传小说3部曲之一.北师大教授郑海凌依据俄文原版翻', '郑海凌', 1, '人民出版社', 7898, '2童年.png', 3, 13, 29.00, 0.98);
INSERT INTO `books` VALUES ('978-7-103', '童年(快乐读书吧六年级上册推荐阅读(中小学生阅读指导丛书)无障碍', '王珍', 1, '人民出版社', 13452, '3童年.png', 3, 13, 27.00, 0.97);
INSERT INTO `books` VALUES ('978-7-104', '童年(快乐读书吧 六年级上指定阅读语文 阅读丛书', '张海迪', 13, '陕西师范大学出版社', 23567, '4童年.png', 3, 13, 19.80, 0.90);
INSERT INTO `books` VALUES ('978-7-105', '(未删减版) 六年级上 任教版名著阅读课程书 教材推荐书目 ', '周毅', 1, '人民出版社', 23567, '5童年.png', 3, 13, 37.80, 0.88);
INSERT INTO `books` VALUES ('978-7-106', '（无障碍英语导读版快乐读书吧阅读丛书）六年级上', '张海迪', 1, '人民出版社', 19689, '6童年.png', 3, 13, 37.80, 0.88);
INSERT INTO `books` VALUES ('978-7-107', '六年级下.任教版名著阅读课程书 教材推荐书目人', '周毅', 1, '人民出版社', 7455, '7童年.png', 3, 13, 8.80, 0.98);
INSERT INTO `books` VALUES ('978-7-108', '童年 快乐读书吧六年级上册阅读(中学生课外指导书)插画无', '钟宏', 1, '人民出版社', 20873, '8童年.png', 3, 13, 37.80, 0.92);
INSERT INTO `books` VALUES ('978-7-109', '新版童年(中学生课外指导书)插画无', '吴蔡婷', 1, '人民出版社', 9458, '9童年.png', 3, 13, 49.80, 0.89);
INSERT INTO `books` VALUES ('978-7-201', '加量版漫画(幼儿园课外指导书)插画无', '海青', 1, '人民出版社', 9879, '6半小时漫画.png', 3, 15, 49.80, 0.89);
INSERT INTO `books` VALUES ('978-7-202', '趣味童年(幼儿园课外指导书)插画无', '周婷', 1, '人民出版社', 8898, '8皮皮鲁转.png', 3, 15, 43.80, 0.88);
INSERT INTO `books` VALUES ('978-7-203', '丛林漫画(幼儿园课外指导书)插画无', '汤姆森', 1, '人民出版社', 45689, '3汤姆历险记.png', 3, 15, 46.80, 0.89);
INSERT INTO `books` VALUES ('978-7-204', '趣味童年(幼儿园课外指导书)插画无', '余秋雨', 1, '人民出版社', 29459, '2小王子.png', 3, 13, 58.80, 0.92);
INSERT INTO `books` VALUES ('978-7-205', '瓦尔登湖:世界上最修心的地方', '梭罗', 1, '人民出版社', 15678, '瓦尔登湖.png', 5, 26, 46.80, 0.89);
INSERT INTO `books` VALUES ('978-7-206', '活着,得有点兴致', '汪曾祺', 10, '江苏凤凰文艺出版社', 78120, '活着,得有点兴致.png', 5, 26, 28.80, 0.89);
INSERT INTO `books` VALUES ('978-7-207', '紫图经典文库三岛由纪夫大集合(10册)', '三岛由纪夫', 12, '时代文艺出版社', 15678, '紫图经典文库.png', 5, 26, 36.80, 0.89);
INSERT INTO `books` VALUES ('978-7-208', '庄子说什么', '韩鹏杰', 12, '时代文艺出版社', 78909, '庄子说什么.png', 5, 26, 28.80, 0.88);
INSERT INTO `books` VALUES ('978-7-209', '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', '贾平凹', 12, '江苏凤凰文艺出版社', 13452, '人生从容.png', 5, 26, 9.89, 0.93);
INSERT INTO `books` VALUES ('978-7-210', '有本事-继<<无所谓>>后睽违三年,冯唐全新书', '冯唐', 6, '北京联合出版公司', 8765, '有本事.png', 5, 26, 34.00, 0.93);
INSERT INTO `books` VALUES ('978-7-211', '人生海海(敢死不是勇气,活着才需要勇气', '麦家', 12, '时代文艺出版社', 13452, '人生海海.png', 5, 27, 27.89, 0.89);
INSERT INTO `books` VALUES ('978-7-212', '云边有个小卖部', '张嘉佳', 12, '时代文艺出版社', 8765, '云边有个小卖部.png', 5, 27, 10.99, 0.93);
INSERT INTO `books` VALUES ('978-7-213', '追风筝的人', '卡麦得.胡塞尼', 12, '时代文艺出版社', 8198, '追风筝的人.png', 5, 27, 7.99, 0.90);
INSERT INTO `books` VALUES ('978-7-214', '白夜行', '韩鹏杰', 12, '时代文艺出版社', 68798, '白夜行.png', 5, 26, 28.80, 0.88);
INSERT INTO `books` VALUES ('978-7-215', '三体全集(全3册)', '刘慈欣', 4, '南海出版社', 8765, '三体全集.png', 5, 26, 9.89, 0.93);
INSERT INTO `books` VALUES ('978-7-216', '理想之城(全两册)', '若花燃燃', 4, '南海出版社', 13999, '理想之城.png', 5, 29, 7.99, 0.90);

-- ----------------------------
-- Table structure for evaluate
-- ----------------------------
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate`  (
  `evaluateid` int(0) NOT NULL,
  `content` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `evaluator` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '评价人',
  `isbn` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `headportrai` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '头像',
  `givealikenum` int(0) NOT NULL COMMENT '点赞数',
  `evaluatedegree` tinyint(1) NOT NULL COMMENT '好评，差评，中评',
  `pubdate` datetime(6) NULL DEFAULT NULL COMMENT '发表日期',
  `isanonymous` tinyint(1) NOT NULL COMMENT '是否为匿名用户',
  PRIMARY KEY (`evaluateid`) USING BTREE,
  INDEX `fk_evalid`(`evaluateid`) USING BTREE,
  INDEX `fk_isbn`(`isbn`) USING BTREE,
  CONSTRAINT `fk_isbn` FOREIGN KEY (`isbn`) REFERENCES `books` (`ISBN`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaluate
-- ----------------------------
INSERT INTO `evaluate` VALUES (1, '非常好的书，值得用有和细细品读', '张海林', '978-7-208', 'wangboyu.png', 300, 1, '2022-01-09 00:00:00.000000', 0);
INSERT INTO `evaluate` VALUES (2, '趣味性很强，给孩子看，非常不错的书', '陈红', '978-7-208', 'huangruguo.png', 270, 1, '2022-04-20 00:00:00.000000', 0);
INSERT INTO `evaluate` VALUES (3, '超棒，趣味性很强，给孩子看，非常不错的书', '匿名用户', '978-7-208', 'niming.png', 300, 3, '2022-05-05 00:00:00.000000', 1);
INSERT INTO `evaluate` VALUES (4, '其他不错就是发货有点慢', '何小可', '978-7-208', 'huangruguo.png', 2398, 2, '2022-03-02 00:00:00.000000', 0);
INSERT INTO `evaluate` VALUES (5, '讲解人生哲理的好书，透彻，推荐！', '陈琪', '978-7-206', 'huangruguo.png', 2598, 1, '2022-04-10 00:00:00.000000', 0);

-- ----------------------------
-- Table structure for firstctgy
-- ----------------------------
DROP TABLE IF EXISTS `firstctgy`;
CREATE TABLE `firstctgy`  (
  `firstctgyId` int(0) NOT NULL AUTO_INCREMENT,
  `firstctgyname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`firstctgyId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of firstctgy
-- ----------------------------
INSERT INTO `firstctgy` VALUES (1, '童书');
INSERT INTO `firstctgy` VALUES (2, '电子书');
INSERT INTO `firstctgy` VALUES (3, '女装');
INSERT INTO `firstctgy` VALUES (4, '食品');
INSERT INTO `firstctgy` VALUES (5, '男装');
INSERT INTO `firstctgy` VALUES (6, '数码相机');
INSERT INTO `firstctgy` VALUES (7, '创意文具');
INSERT INTO `firstctgy` VALUES (8, '医书');

-- ----------------------------
-- Table structure for historykeyword
-- ----------------------------
DROP TABLE IF EXISTS `historykeyword`;
CREATE TABLE `historykeyword`  (
  `historykeywordid` int(0) NOT NULL AUTO_INCREMENT,
  `historykeyword` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clickcount` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`historykeywordid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 84 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of historykeyword
-- ----------------------------
INSERT INTO `historykeyword` VALUES (73, '六年级上册', 4);
INSERT INTO `historykeyword` VALUES (74, '六年级上', 22);
INSERT INTO `historykeyword` VALUES (75, '六年友谊', 1);
INSERT INTO `historykeyword` VALUES (76, '六年级', 8);
INSERT INTO `historykeyword` VALUES (77, '童年', 1);
INSERT INTO `historykeyword` VALUES (78, '北师大教授', 1);
INSERT INTO `historykeyword` VALUES (79, '人生', 2);
INSERT INTO `historykeyword` VALUES (80, '人生从容', 3);
INSERT INTO `historykeyword` VALUES (81, '小学阅文', 3);
INSERT INTO `historykeyword` VALUES (82, '中小学生阅读', 1);
INSERT INTO `historykeyword` VALUES (83, '中小学生', 1);

-- ----------------------------
-- Table structure for keyword
-- ----------------------------
DROP TABLE IF EXISTS `keyword`;
CREATE TABLE `keyword`  (
  `keywordid` int(0) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`keywordid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of keyword
-- ----------------------------
INSERT INTO `keyword` VALUES (1, '童年');
INSERT INTO `keyword` VALUES (2, '小学阅文');
INSERT INTO `keyword` VALUES (3, '快乐读书吧');
INSERT INTO `keyword` VALUES (4, '北师大教授');
INSERT INTO `keyword` VALUES (5, '六年级上册');
INSERT INTO `keyword` VALUES (6, '六年级');
INSERT INTO `keyword` VALUES (7, '高尔基');
INSERT INTO `keyword` VALUES (8, '郑海凌');
INSERT INTO `keyword` VALUES (9, '中小学生阅读');
INSERT INTO `keyword` VALUES (10, '中小学生');
INSERT INTO `keyword` VALUES (11, '任教版');
INSERT INTO `keyword` VALUES (12, '六年级上');
INSERT INTO `keyword` VALUES (13, '六年级下');
INSERT INTO `keyword` VALUES (14, '五六');
INSERT INTO `keyword` VALUES (15, '六年友谊');
INSERT INTO `keyword` VALUES (16, '六年的苦练');
INSERT INTO `keyword` VALUES (17, '六六');
INSERT INTO `keyword` VALUES (18, '大六山');
INSERT INTO `keyword` VALUES (19, '英语导读');
INSERT INTO `keyword` VALUES (20, '中学生课外指导');
INSERT INTO `keyword` VALUES (21, '中学生');
INSERT INTO `keyword` VALUES (22, '加量版漫画');
INSERT INTO `keyword` VALUES (23, '漫画');
INSERT INTO `keyword` VALUES (24, '幼儿园');
INSERT INTO `keyword` VALUES (25, '丛林漫画');
INSERT INTO `keyword` VALUES (26, '活着');
INSERT INTO `keyword` VALUES (27, '人生');
INSERT INTO `keyword` VALUES (28, '人生从容');
INSERT INTO `keyword` VALUES (29, '人生海海');

-- ----------------------------
-- Table structure for orderdetail
-- ----------------------------
DROP TABLE IF EXISTS `orderdetail`;
CREATE TABLE `orderdetail`  (
  `orderdetailid` int(0) NOT NULL AUTO_INCREMENT COMMENT '订单详情id',
  `bookname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '图书名',
  `bookprice` double(10, 2) NOT NULL COMMENT '图书价格',
  `bookpicname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '图书图片名',
  `orderid` int(0) NOT NULL COMMENT '外键订单id',
  `purcharsenum` int(0) NOT NULL COMMENT '图书数量',
  PRIMARY KEY (`orderdetailid`) USING BTREE COMMENT '主键',
  INDEX `fk_orderid`(`orderid`) USING BTREE,
  CONSTRAINT `fk_orderid` FOREIGN KEY (`orderid`) REFERENCES `orderinfo` (`orderid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orderdetail
-- ----------------------------
INSERT INTO `orderdetail` VALUES (38, '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', 9.20, '人生从容.png', 21, 3);
INSERT INTO `orderdetail` VALUES (39, '三体全集(全3册)', 9.20, '三体全集.png', 21, 1);
INSERT INTO `orderdetail` VALUES (40, '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', 9.20, '人生从容.png', 22, 1);
INSERT INTO `orderdetail` VALUES (41, '三体全集(全3册)', 9.20, '三体全集.png', 22, 2);
INSERT INTO `orderdetail` VALUES (42, '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', 9.20, '人生从容.png', 23, 1);
INSERT INTO `orderdetail` VALUES (43, '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', 9.20, '人生从容.png', 24, 1);
INSERT INTO `orderdetail` VALUES (44, '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', 9.20, '人生从容.png', 25, 1);
INSERT INTO `orderdetail` VALUES (45, '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', 9.20, '人生从容.png', 26, 1);
INSERT INTO `orderdetail` VALUES (46, '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', 9.20, '人生从容.png', 27, 1);
INSERT INTO `orderdetail` VALUES (47, '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', 9.20, '人生从容.png', 28, 1);
INSERT INTO `orderdetail` VALUES (48, '有本事-继<<无所谓>>后睽违三年,冯唐全新书', 31.62, '有本事.png', 29, 1);
INSERT INTO `orderdetail` VALUES (49, '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', 9.20, '人生从容.png', 30, 1);
INSERT INTO `orderdetail` VALUES (50, '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', 9.20, '人生从容.png', 31, 1);
INSERT INTO `orderdetail` VALUES (51, '三体全集(全3册)', 9.20, '三体全集.png', 31, 1);

-- ----------------------------
-- Table structure for orderinfo
-- ----------------------------
DROP TABLE IF EXISTS `orderinfo`;
CREATE TABLE `orderinfo`  (
  `orderid` int(0) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `ordertime` datetime(0) NOT NULL COMMENT '订单时间',
  `customerid` int(0) NOT NULL COMMENT '顾客id',
  `orderstatus` tinyint(0) NOT NULL COMMENT '订单状态',
  PRIMARY KEY (`orderid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orderinfo
-- ----------------------------
INSERT INTO `orderinfo` VALUES (19, '2024-05-08 19:52:23', 62, 1);
INSERT INTO `orderinfo` VALUES (20, '2024-05-08 19:52:27', 62, 1);
INSERT INTO `orderinfo` VALUES (21, '2024-05-08 19:56:12', 62, -1);
INSERT INTO `orderinfo` VALUES (22, '2024-05-08 19:57:26', 62, -1);
INSERT INTO `orderinfo` VALUES (23, '2024-05-08 19:58:53', 62, -1);
INSERT INTO `orderinfo` VALUES (24, '2024-05-08 20:04:32', 62, -1);
INSERT INTO `orderinfo` VALUES (25, '2024-05-08 20:16:25', 62, -1);
INSERT INTO `orderinfo` VALUES (26, '2024-05-08 20:28:25', 62, -1);
INSERT INTO `orderinfo` VALUES (27, '2024-05-08 20:28:40', 62, -1);
INSERT INTO `orderinfo` VALUES (28, '2024-05-08 20:29:20', 62, -1);
INSERT INTO `orderinfo` VALUES (29, '2024-05-08 20:32:45', 62, -1);
INSERT INTO `orderinfo` VALUES (30, '2024-05-08 20:33:01', 62, -1);
INSERT INTO `orderinfo` VALUES (31, '2024-05-08 20:52:31', 62, -1);

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply`  (
  `replyid` int(0) NOT NULL AUTO_INCREMENT,
  `replycontent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `replydate` date NOT NULL,
  `evalid` int(0) NOT NULL,
  `replyor` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`replyid`) USING BTREE,
  INDEX `fk_evalid`(`evalid`) USING BTREE,
  CONSTRAINT `fk_evalid` FOREIGN KEY (`evalid`) REFERENCES `evaluate` (`evaluateid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO `reply` VALUES (4, '非常好', '2022-06-10', 1, 'admin');
INSERT INTO `reply` VALUES (5, '非常好啊', '2022-06-12', 1, 'admin');
INSERT INTO `reply` VALUES (6, '非常好的书', '2022-06-13', 1, 'admin');
INSERT INTO `reply` VALUES (7, '好不错的书', '2022-06-13', 1, 'admin');
INSERT INTO `reply` VALUES (8, '这书有点意思', '2024-05-06', 1, 'zhangsan');
INSERT INTO `reply` VALUES (9, '好想再读一遍', '2024-05-06', 1, 'zhangsan');
INSERT INTO `reply` VALUES (10, '是的', '2024-05-06', 2, 'zhangsan');
INSERT INTO `reply` VALUES (11, '11', '2024-05-06', 2, 'zhangsan');
INSERT INTO `reply` VALUES (12, '111', '2024-05-06', 1, 'zhangsan');
INSERT INTO `reply` VALUES (13, '111', '2024-05-06', 1, 'zhangsan');
INSERT INTO `reply` VALUES (14, '666', '2024-05-06', 1, 'zhangsan');
INSERT INTO `reply` VALUES (15, 'tyyy', '2024-05-06', 1, 'zhangsan');
INSERT INTO `reply` VALUES (16, '233', '2024-05-06', 4, 'zhangsan');
INSERT INTO `reply` VALUES (17, 'gfgdfg', '2024-05-06', 1, 'zhangsan');
INSERT INTO `reply` VALUES (18, 'sssssf', '2024-05-06', 1, 'zhangsan');
INSERT INTO `reply` VALUES (19, 'uiiii', '2024-05-06', 1, 'zhangsan');
INSERT INTO `reply` VALUES (20, '', '2024-05-06', 2, 'zhangsan');
INSERT INTO `reply` VALUES (21, '', '2024-05-06', 2, 'zhangsan');

-- ----------------------------
-- Table structure for secondctgy
-- ----------------------------
DROP TABLE IF EXISTS `secondctgy`;
CREATE TABLE `secondctgy`  (
  `secondctgyid` int(0) NOT NULL AUTO_INCREMENT,
  `secondname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `firstctgyId` int(0) NOT NULL,
  PRIMARY KEY (`secondctgyid`) USING BTREE,
  INDEX `fk_firstctgyid`(`firstctgyId`) USING BTREE,
  CONSTRAINT `fk_firstctgyid` FOREIGN KEY (`firstctgyId`) REFERENCES `firstctgy` (`firstctgyId`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of secondctgy
-- ----------------------------
INSERT INTO `secondctgy` VALUES (1, '0-2岁', 1);
INSERT INTO `secondctgy` VALUES (2, '3-6岁', 1);
INSERT INTO `secondctgy` VALUES (3, '7-10岁', 1);
INSERT INTO `secondctgy` VALUES (4, '11-14岁', 1);
INSERT INTO `secondctgy` VALUES (5, '文艺', 2);
INSERT INTO `secondctgy` VALUES (6, '人文社科', 2);
INSERT INTO `secondctgy` VALUES (7, '教育', 2);
INSERT INTO `secondctgy` VALUES (8, '弹性裤', 3);
INSERT INTO `secondctgy` VALUES (9, '裙子', 3);
INSERT INTO `secondctgy` VALUES (10, '包包', 3);
INSERT INTO `secondctgy` VALUES (11, '雪纺衫', 3);
INSERT INTO `secondctgy` VALUES (12, '面包', 4);
INSERT INTO `secondctgy` VALUES (13, '饼干', 4);
INSERT INTO `secondctgy` VALUES (14, '拌粉', 4);
INSERT INTO `secondctgy` VALUES (15, '热干面', 4);
INSERT INTO `secondctgy` VALUES (16, '白衬衫', 5);
INSERT INTO `secondctgy` VALUES (17, '西装', 5);
INSERT INTO `secondctgy` VALUES (18, '工装裤', 5);
INSERT INTO `secondctgy` VALUES (19, '手机', 6);
INSERT INTO `secondctgy` VALUES (20, '单反相机', 6);
INSERT INTO `secondctgy` VALUES (21, '台视机', 6);
INSERT INTO `secondctgy` VALUES (22, '笔记本电脑', 6);
INSERT INTO `secondctgy` VALUES (23, '橡皮', 7);
INSERT INTO `secondctgy` VALUES (24, '钢笔', 7);
INSERT INTO `secondctgy` VALUES (25, '文具盒', 7);
INSERT INTO `secondctgy` VALUES (26, '小书包', 7);
INSERT INTO `secondctgy` VALUES (27, '经典必看', 8);
INSERT INTO `secondctgy` VALUES (28, '帽子', 8);
INSERT INTO `secondctgy` VALUES (29, '童鞋', 8);

-- ----------------------------
-- Table structure for shopcart
-- ----------------------------
DROP TABLE IF EXISTS `shopcart`;
CREATE TABLE `shopcart`  (
  `shopcartid` int(0) NOT NULL AUTO_INCREMENT,
  `bookisbn` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bookname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bookpicname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bookprice` double NOT NULL,
  `userid` int(0) NOT NULL,
  `purcharsenum` int(0) NULL DEFAULT 0,
  PRIMARY KEY (`shopcartid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 181 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shopcart
-- ----------------------------
INSERT INTO `shopcart` VALUES (153, '978-7-209', '人生从容(在众声喧哗中保持从容(贾凭凹70岁)', '人生从容.png', 9.2, 1, 1);

-- ----------------------------
-- Table structure for thirdctgy
-- ----------------------------
DROP TABLE IF EXISTS `thirdctgy`;
CREATE TABLE `thirdctgy`  (
  `thirdctgyid` int(0) NOT NULL AUTO_INCREMENT,
  `thirdctgyname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `secctgyid` int(0) NULL DEFAULT NULL,
  PRIMARY KEY (`thirdctgyid`) USING BTREE,
  INDEX `fk_secctgyid`(`secctgyid`) USING BTREE,
  CONSTRAINT `fk_secctgyid` FOREIGN KEY (`secctgyid`) REFERENCES `secondctgy` (`secondctgyid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of thirdctgy
-- ----------------------------
INSERT INTO `thirdctgy` VALUES (1, '图画故事', 1);
INSERT INTO `thirdctgy` VALUES (2, '认知', 1);
INSERT INTO `thirdctgy` VALUES (3, '益智游戏', 1);
INSERT INTO `thirdctgy` VALUES (4, '纸板书', 1);
INSERT INTO `thirdctgy` VALUES (5, '艺术课堂', 1);
INSERT INTO `thirdctgy` VALUES (6, '入园准备', 1);
INSERT INTO `thirdctgy` VALUES (7, '绘本', 2);
INSERT INTO `thirdctgy` VALUES (8, '科普百科', 2);
INSERT INTO `thirdctgy` VALUES (9, '少儿英语', 2);
INSERT INTO `thirdctgy` VALUES (10, '乐高学习', 2);
INSERT INTO `thirdctgy` VALUES (11, '入学准备', 2);
INSERT INTO `thirdctgy` VALUES (12, '文学', 3);
INSERT INTO `thirdctgy` VALUES (13, '科普百科', 3);
INSERT INTO `thirdctgy` VALUES (14, '卡通动漫', 3);
INSERT INTO `thirdctgy` VALUES (15, '童话', 3);
INSERT INTO `thirdctgy` VALUES (16, '少儿英语', 3);
INSERT INTO `thirdctgy` VALUES (17, '励志', 4);
INSERT INTO `thirdctgy` VALUES (18, '地理', 4);
INSERT INTO `thirdctgy` VALUES (19, '政治', 4);
INSERT INTO `thirdctgy` VALUES (20, '趣味幽默', 4);
INSERT INTO `thirdctgy` VALUES (21, '少儿英语', 4);
INSERT INTO `thirdctgy` VALUES (22, '益智游戏', 4);
INSERT INTO `thirdctgy` VALUES (23, '艺术课堂', 4);
INSERT INTO `thirdctgy` VALUES (24, '游戏/手工', 4);
INSERT INTO `thirdctgy` VALUES (25, '绘画', 4);
INSERT INTO `thirdctgy` VALUES (26, '小说', 5);
INSERT INTO `thirdctgy` VALUES (27, '哲理文学', 5);
INSERT INTO `thirdctgy` VALUES (28, '传记', 5);
INSERT INTO `thirdctgy` VALUES (29, '青春文学', 5);
INSERT INTO `thirdctgy` VALUES (30, '动漫/幽默', 5);
INSERT INTO `thirdctgy` VALUES (31, '艺术', 5);
INSERT INTO `thirdctgy` VALUES (32, '古籍', 5);
INSERT INTO `thirdctgy` VALUES (33, '法律', 5);
INSERT INTO `thirdctgy` VALUES (34, '经济', 5);
INSERT INTO `thirdctgy` VALUES (35, '宗教哲学', 6);
INSERT INTO `thirdctgy` VALUES (36, '历史', 6);
INSERT INTO `thirdctgy` VALUES (37, '传记', 6);
INSERT INTO `thirdctgy` VALUES (38, '教育', 6);
INSERT INTO `thirdctgy` VALUES (39, '社会科学', 6);
INSERT INTO `thirdctgy` VALUES (40, '艺术', 6);
INSERT INTO `thirdctgy` VALUES (41, '工具书', 6);
INSERT INTO `thirdctgy` VALUES (42, '教师用书', 6);
INSERT INTO `thirdctgy` VALUES (43, '考研', 6);
INSERT INTO `thirdctgy` VALUES (44, '公务员', 6);
INSERT INTO `thirdctgy` VALUES (45, '图书100', 7);
INSERT INTO `thirdctgy` VALUES (46, '裙子', 3);
INSERT INTO `thirdctgy` VALUES (47, '包包', 3);
INSERT INTO `thirdctgy` VALUES (48, '雪纺衫', 3);
INSERT INTO `thirdctgy` VALUES (49, '太空面包', 4);
INSERT INTO `thirdctgy` VALUES (50, '小熊饼干', 4);
INSERT INTO `thirdctgy` VALUES (51, '南昌拌粉', 4);
INSERT INTO `thirdctgy` VALUES (52, '热干面', 4);
INSERT INTO `thirdctgy` VALUES (53, '白衬衫', 5);
INSERT INTO `thirdctgy` VALUES (54, '西装', 5);
INSERT INTO `thirdctgy` VALUES (55, '工装裤', 5);
INSERT INTO `thirdctgy` VALUES (56, '手机', 6);
INSERT INTO `thirdctgy` VALUES (57, '单反相机', 6);
INSERT INTO `thirdctgy` VALUES (58, '台视机', 6);
INSERT INTO `thirdctgy` VALUES (59, '笔记本电脑', 6);
INSERT INTO `thirdctgy` VALUES (60, '橡皮', 7);
INSERT INTO `thirdctgy` VALUES (61, '钢笔', 7);
INSERT INTO `thirdctgy` VALUES (62, '文具盒', 7);
INSERT INTO `thirdctgy` VALUES (63, '小书包', 7);
INSERT INTO `thirdctgy` VALUES (64, '雪花短袖', 8);
INSERT INTO `thirdctgy` VALUES (65, '雪纺帽', 8);
INSERT INTO `thirdctgy` VALUES (66, '平跟鞋', 8);
INSERT INTO `thirdctgy` VALUES (67, '裙子', 11);
INSERT INTO `thirdctgy` VALUES (68, '包包', 11);
INSERT INTO `thirdctgy` VALUES (69, '雪纺衫', 13);
INSERT INTO `thirdctgy` VALUES (70, '太空面包', 14);
INSERT INTO `thirdctgy` VALUES (71, '小熊饼干', 14);
INSERT INTO `thirdctgy` VALUES (72, '南昌拌粉', 14);
INSERT INTO `thirdctgy` VALUES (73, '热干面', 13);
INSERT INTO `thirdctgy` VALUES (74, '白衬衫', 18);
INSERT INTO `thirdctgy` VALUES (75, '西装', 19);
INSERT INTO `thirdctgy` VALUES (76, '工装裤', 20);
INSERT INTO `thirdctgy` VALUES (77, '手机', 18);
INSERT INTO `thirdctgy` VALUES (78, '单反相机', 26);
INSERT INTO `thirdctgy` VALUES (79, '台视机', 26);
INSERT INTO `thirdctgy` VALUES (80, '笔记本电脑', 26);
INSERT INTO `thirdctgy` VALUES (81, '橡皮', 26);
INSERT INTO `thirdctgy` VALUES (88, '钢笔', 26);
INSERT INTO `thirdctgy` VALUES (89, '文具盒', 26);
INSERT INTO `thirdctgy` VALUES (90, '论语', 26);
INSERT INTO `thirdctgy` VALUES (91, '三字经', 26);
INSERT INTO `thirdctgy` VALUES (92, '黄帝内经', 27);
INSERT INTO `thirdctgy` VALUES (93, '神农本草经', 27);
INSERT INTO `thirdctgy` VALUES (94, '伤寒论', 27);
INSERT INTO `thirdctgy` VALUES (95, '金匮要略', 27);
INSERT INTO `thirdctgy` VALUES (96, '肘后备急方', 27);
INSERT INTO `thirdctgy` VALUES (97, '难经', 27);
INSERT INTO `thirdctgy` VALUES (98, '针炙甲已经', 27);
INSERT INTO `thirdctgy` VALUES (99, '针炙大成', 27);
INSERT INTO `thirdctgy` VALUES (100, '千金要方', 27);
INSERT INTO `thirdctgy` VALUES (101, '傅青主女科', 27);
INSERT INTO `thirdctgy` VALUES (102, '脉经', 27);
INSERT INTO `thirdctgy` VALUES (103, '濒湖脉学', 27);
INSERT INTO `thirdctgy` VALUES (104, '袜子', 18);
INSERT INTO `thirdctgy` VALUES (105, '皮鞋', 18);
INSERT INTO `thirdctgy` VALUES (106, '劲霸男装', 18);

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `userid` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '没有填写地址',
  `valid` tinyint(0) NULL DEFAULT 1,
  `birth` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`userid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 63 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES (1, 'zhangsan', '1234', '广州', 1, '1999-09-09 09:09:09');
INSERT INTO `userinfo` VALUES (2, '李四', '1234', '湖北武汉', 1, '2001-01-01 01:01:01');
INSERT INTO `userinfo` VALUES (3, '中科to', '321', '江西南昌市青山湖区', 1, '1901-11-01 08:02:11');
INSERT INTO `userinfo` VALUES (4, '李one', '1234', '广州', 1, '1981-09-23 11:09:41');
INSERT INTO `userinfo` VALUES (5, '王二', '1234', '没有填写地址', 1, NULL);
INSERT INTO `userinfo` VALUES (6, '小七', '1234', '东莞', 1, NULL);
INSERT INTO `userinfo` VALUES (7, '丽影', '1234', '上海', 1, '2005-10-28 12:34:21');
INSERT INTO `userinfo` VALUES (8, '小晴', '1234', '重庆', 1, '2004-10-28 12:34:21');
INSERT INTO `userinfo` VALUES (9, '莫菲', '1234', '广州', 1, NULL);
INSERT INTO `userinfo` VALUES (10, '然然', '889', '广州', 1, '1996-07-19 21:23:59');
INSERT INTO `userinfo` VALUES (12, '欣欣', '889', '西安', 1, NULL);
INSERT INTO `userinfo` VALUES (60, '李四', '1234', '没有填写地址', 1, NULL);
INSERT INTO `userinfo` VALUES (61, '李小', '1234', '南昌', 1, NULL);
INSERT INTO `userinfo` VALUES (62, 'admin', '1234', '没有填写地址', 1, NULL);

SET FOREIGN_KEY_CHECKS = 1;
