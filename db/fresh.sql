SET NAMES UTF8;
DROP DATABASE IF EXISTS fresh;
CREATE DATABASE fresh CHARSET=UTF8;


/**用户信息**/
CREATE TABLE fresh_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  phone VARCHAR(16),

  avatar VARCHAR(128),        #头像图片路径
  user_name VARCHAR(32),      #用户名，如王小明
  gender INT                  #性别  0-女  1-男
);

/**收货地址信息**/
CREATE TABLE fresh_receiver_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,                #用户编号
  receiver VARCHAR(16),       #接收人姓名
  province VARCHAR(16),       #省
  city VARCHAR(16),           #市
  county VARCHAR(16),         #县
  address VARCHAR(128),       #详细地址
  cellphone VARCHAR(16),      #手机
  fixedphone VARCHAR(16),     #固定电话
  postcode CHAR(6),           #邮编
  tag VARCHAR(16),            #标签名

  is_default BOOLEAN          #是否为当前用户的默认收货地址
);

/**购物车条目**/
CREATE TABLE fresh_shoppingcart_item(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,      #用户编号
  product_id INT,   #商品编号
  count INT,        #购买数量
  is_checked BOOLEAN #是否已勾选，确定购买
);

/**用户订单**/
CREATE TABLE fresh_order(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  address_id INT,
  status INT,             #订单状态  1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消
  order_time BIGINT,      #下单时间
  pay_time BIGINT,        #付款时间
  deliver_time BIGINT,    #发货时间
  received_time BIGINT    #签收时间
)AUTO_INCREMENT=10000000;

/**用户订单**/
CREATE TABLE fresh_order_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,           #订单编号
  product_id INT,         #产品编号
  count INT               #购买数量
);

/****首页轮播广告商品****/
CREATE TABLE fresh_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),
  title VARCHAR(64),
  href VARCHAR(128)
);

/****首页商品****/
CREATE TABLE fresh_index_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),
  details VARCHAR(128),
  pic VARCHAR(128),
  price_normal DECIMAL(10,2),
  href VARCHAR(128),
  seq_recommended TINYINT,
  seq_selected TINYINT,
  seq_top_sale TINYINT,
  seq_fruit TINYINT,
  seq_seafood TINYINT,
  seq_meat TINYINT,
  seq_eggs TINYINT,
  seq_fastfood TINYINT,
  price_onsale DECIMAL(10,2),
);
/*生鲜商品所属类别家族*/
CREATE TABLE fresh_goods_family(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  fname VARCHAR(32)
);
/*生鲜商品列表*/
CREATE TABLE fresh_goods(
  gid INT PRIMARY KEY AUTO_INCREMENT,
  family_id INT,              #所属类别家族编号
  title VARCHAR(128),         #主标题
  subtitle VARCHAR(128),      #副标题
  price_normal DECIMAL(10,2), #商品价格
  price_onsale DECIMAL(10,2), #促销价格l
  promise VARCHAR(64),        #服务承诺
  mea VARCHAR(64),            #计量单位

  gname VARCHAR(32),          #商品名称
  details VARCHAR(1024),      #产品详细说明

  shelf_time BIGINT,          #上架时间
  sold_count INT,             #已售出的数量
  is_onsale BOOLEAN           #是否促销中
  );

/*生鲜商品图片*/
CREATE TABLE fresh_goods_pic(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  goods_id INT,              #生鲜商品编号
  sm VARCHAR(128),            #小图片路径
  md VARCHAR(128),            #中图片路径
  lg VARCHAR(128)             #大图片路径
);






/*******************/
/******数据导入******/
/*******************/

/**用户信息**/
INSERT INTO fresh_user VALUES
(NULL, 'dingding', '123456', 'ding@qq.com', '13501234567', 'img/avatar/default.png', '丁伟', '1'),
(NULL, 'dangdang', '123456', 'dang@qq.com', '13501234568', 'img/avatar/default.png', '林当', '1'),
(NULL, 'doudou', '123456', 'dou@qq.com', '13501234569', 'img/avatar/default.png', '窦志强', '1'),
(NULL, 'yaya', '123456', 'ya@qq.com', '13501234560', 'img/avatar/default.png', '秦小雅', '0');

/****首页轮播广告商品****/
INSERT INTO fresh_index_carousel VALUES
(NULL, 'img_fresh/carousel/151141943187265032.jpg','轮播广告商品1','product_details.html?lid=28'),
(NULL, 'img_fresh/carousel/151142251030207861.jpg','轮播广告商品2','product_details.html?lid=19'),
(NULL, 'img_fresh/carousel/151091085627436074.jpg','轮播广告商品3','lookforward.html');


/******************生鲜类别家族*****************/
INSERT INTO fresh_goods_family VALUES
(NULL,'新鲜水果fruit'),
(NULL,'海鲜水产seafood'),
(NULL,'精选肉类meat'),
(NULL,'家禽蛋类poultry&eggs'),
(NULL,'快手料理fastfood');

/**********首页生鲜商品************/
/*INSERT INTO fresh_index_product VALUES
(NULL,'【苏宁生鲜】民维大牧汗精制肥牛片220g 牛羊肉 火锅食材 精选肉类 肥牛卷','','img_fresh/0010128947-000000000602726171_1.jpg',32.9,'#',1,1,0,0,0,0,0,0,18.9),
(NULL,'【苏宁生鲜】山东栖霞优质红富士8个果径80mm以上 新鲜水果','','img_fresh/0010128947-000000000781465665_1.jpg',29.8,'#',1,0,0,0,0,0,0,0,22.8),
(NULL,'【苏宁生鲜】秘鲁蓝莓1盒(约125g/盒) 新鲜水果','','img_fresh/0010128947-000000000688383639_1.jpg',25.8,'#',1,0,1,0,0,0,0,0,10.9),
(NULL,'【苏宁生鲜】 澳洲谷饲小公牛牡蛎牛排200g(3片) 牛排 精选肉类','全球精选 嫩香多汁','img_fresh/0010128947-000000000602430910_1.jpg',48.00,'#',1,1,0,0,0,1,0,0,25.9),
(NULL,'【苏宁生鲜】 四川安岳黄柠檬8个约75g/个新 新鲜水果','全球精选 嫩香多汁','img_fresh/0010128947-000000000602430731_1.jpg',21.90,'#',1,1,0,0,0,0,0,0,11.5),
(NULL,'【苏宁生鲜】云南蒙自石榴4个225g以上/个 新鲜水果','','img_fresh/0010128947-000000000673274822_1.jpg',19.90,'#',0,1,0,0,0,0,0,0,15.8),
(NULL,'【苏宁生鲜】 深海大虾200g 海鲜水产','','img_fresh/0010128947-000000000602434286_1.jpg',29.90,'#',0,1,0,0,0,0,0,0,23.6),
(NULL,'【苏宁生鲜】 澳洲谷饲肥牛卷250g 牛肉 精选肉类 火锅食材','','img_fresh/0010128947-000000000602430913_1.jpg',29.80,'#',0,1,0,0,0,1,0,0,22.8),
(NULL,'【苏宁生鲜】澳洲精选S级 牛腩块500g*2 牛肉 精选肉类','胸腹部位精切 肥瘦比约3:7','img_fresh/0010128947-000000000602430871_1.jpg',96.00,'#',0,1,1,0,0,1,0,0,62.5),
(NULL,'【苏宁生鲜】 越南草虾仁（黑虎虾）（中）200g/包海鲜水产','','img_fresh/0010128947-000000000602430967_1.jpg',45.00,'#',0,1,0,0,0,1,0,0,30.00),
(NULL,'【苏宁生鲜】 恒都澳洲牛腱子1kg 牛肉 精选肉类','','img_fresh/0010128947-000000000614167325_1.jpg',0.00,'#',0,0,1,0,0,0,0,0,84.60),
(NULL,'【苏宁生鲜】Zespri佳沛新西兰阳光金奇异果6个114-134g/个 进口猕猴桃 新鲜水果','','img_fresh/0010128947-000000000618401817_1.jpg',0.00,'#',0,0,1,0,0,0,0,0,52.80),
(NULL,'【苏宁生鲜】 Joyfish酸菜巴沙鱼片300g(鱼200g+酸菜100g)海鲜水产','知名品牌,品质优选','img_fresh/0010128947-000000000602729277_1.jpg',19.80,'#',0,0,1,0,1,0,0,0,13.50),
(NULL,'【苏宁生鲜】安井手抓饼（葱香）2250g 方便速食','品质优选 料理方便','img_fresh/0010128947-000000000602724980_1.jpg',0.00,'#',0,0,1,0,0,0,0,1,29.90),
(NULL,'【苏宁生鲜】新疆红提1kg','阿克苏来的脆红提，一口一颗真是甜！','img_fresh/0010128947-000000000713480284_1.jpg',21.80,'#',0,0,0,1,0,0,0,0,18.90),
(NULL,'【苏宁生鲜】Zespri佳沛新西兰绿奇异果3.3kg原箱(22-25个) 进口猕猴桃 新鲜水果','甜蜜多汁新鲜上市','img_fresh/0010128947-000000000622127602_1.jpg',168.00,'#',0,0,0,1,0,0,0,0,131.50),
(NULL,'【苏宁生鲜】山东栖霞优质红富士12个果径80mm以上 新鲜水果','','img_fresh/0010128947-000000000781465661_1.jpg',43.80,'#',0,0,0,1,0,0,0,0,34.50),
(NULL,'【苏宁生鲜】Zespri佳沛新西兰阳光金奇异果2个92-114g/个 进口猕猴桃 新 新鲜水果','','img_fresh/0010128947-000000000618401816_1.jpg',20.80,'#',0,0,0,1,0,0,0,0,13.60),
(NULL,'【苏宁生鲜】吉林长白山菇娘果500g新鲜水果','','img_fresh/0010128947-000000000640092119_1.jpg',53.90,'#',0,0,0,1,0,0,0,0,14.90),
(NULL,'【苏宁生鲜】山东丰水梨4个300g以上/个 新鲜水果 国产','','img_fresh/0010128947-000000000667220896_1.jpg',15.90,'#',0,0,0,1,0,0,0,0,14.90),
(NULL,'【苏宁生鲜】海南青柠檬4个75g以上/个新 新鲜水果','','img_fresh/0010128947-000000000626399280_1.jpg',12.80,'#',0,0,0,1,0,0,0,0,4.90),
(NULL,'【苏宁生鲜】章鱼足 270g海鲜水产','新鲜直达 整条完整切割','img_fresh/0010128947-000000000602434420_1.jpg',25.00,'#',0,0,0,0,1,0,0,0,12.80),
(NULL,'【苏宁生鲜】 东海带鱼段 （250g/包）海鲜水产','','img_fresh/0010128947-000000000602430695_1.jpg',16.00,'#',0,0,0,0,1,0,0,0,6.90),
(NULL,'【苏宁生鲜】 阿拉斯加黄金鲽(整鱼)280g海鲜水产','','img_fresh/0010128947-000000000602434301_1.jpg',0.00,'#',0,0,0,0,1,0,0,0,8.80),
(NULL,'【苏宁生鲜】 原膳南美白虾仁（小）250g海鲜水产','','img_fresh/0010128947-000000000602434243_1.jpg',32.00,'#',0,0,0,0,1,0,0,0,21.90),
(NULL,'【苏宁生鲜】福泽即食海蜇丝150g海鲜水产','','img_fresh/0010128947-000000000602725022_1.jpg',6.90,'#',0,0,0,0,1,0,0,0,4.60),
(NULL,'【苏宁生鲜】厄瓜多尔白虾300g(60-70只/kg)','','img_fresh/0010128947-000000000736914666_1.jpg',35.00,'#',0,0,0,0,1,0,0,0,29.90),
(NULL,'【苏宁生鲜】广西北海墨鱼仔 250g海鲜水产','','img_fresh/0010128947-000000000602434383_1.jpg',29.90,'#',0,0,0,0,1,0,0,0,18.90),
(NULL,'【苏宁生鲜】恒都有机牛腱子500g 牛肉 精选肉类','','img_fresh/0010128947-000000000615430445_1.jpg',68.00,'#',0,0,0,0,0,1,0,0,43.50),
(NULL,'【苏宁生鲜】 澳洲谷饲小公牛嫩肩牛排200g(2片) 牛排 精选肉类','','img_fresh/0010128947-000000000602430909_1.jpg',48.00,'#',0,0,0,0,0,1,0,0,28.90),
(NULL,'【苏宁生鲜】恒都澳洲牛腩块500g 牛肉 精选肉类','','img_fresh/0010128947-000000000614167329_1.jpg',45.00,'#',0,0,0,0,0,1,0,0,30.00),
(NULL,'【苏宁生鲜】 乌拉圭牛尾切片500g 牛肉 精选肉类','','img_fresh/0010128947-000000000602724921_1.jpg',49.80,'#',0,0,0,0,0,1,0,0,45.90),
(NULL,'【苏宁生鲜】 丹麦皇冠天然谷饲猪肋排400g 猪肉 精选肉类','','img_fresh/0010128947-000000000602724915_1.jpg',38.00,'#',0,0,0,0,0,1,0,0,27.6),
(NULL,'【苏宁生鲜】 优质上腿鸡肉(细嫩去骨)200g 鸡腿 安心禽蛋','谷物喂养 自然风味 放心品质','img_fresh/0010128947-000000000602430707_1.jpg',9.90,'#',0,0,0,0,0,0,1,0,6.50),
(NULL,'【苏宁生鲜】优形蒸鸡胸切片(黑胡椒味)(女神 款)150g即食鸡胸肉 低脂鸡胸肉 健身食材 方便速食','方便肉食 鲜美可口','img_fresh/0010128947-000000000632075996_1.jpg',15.80,'#',0,0,0,0,0,0,1,0,8.80),
(NULL,'【苏宁生鲜】 美国大王鸽400g 鸽子 安心禽蛋','','img_fresh/0010128947-000000000602430957_1.jpg',52.80,'#',0,0,0,0,0,0,1,0,32.6),
(NULL,'【苏宁生鲜】 苏北盐城草鸡蛋620g(15枚) 安心禽蛋','','img_fresh/0010128947-000000000602430996_1.jpg',22.60,'#',0,0,0,0,0,0,1,0,14.80),
(NULL,'【苏宁生鲜】 优质精选西餐鸭胸200g 安心禽蛋','','img_fresh/0010128947-000000000602430708_1.jpg',9.90,'#',0,0,0,0,0,0,1,0,5.50),
(NULL,'【苏宁生鲜】太阳谷鸡翅中500g 安心禽蛋','','img_fresh/0010128947-000000000626199450_1.jpg',45.00,'#',0,0,0,0,0,0,1,0,31.60),
(NULL,'【苏宁生鲜】草原兴发绿鸟鸡翅根500g 安心禽蛋','','img_fresh/0010128947-000000000602726300_1.jpg',18.90,'#',0,0,0,0,0,0,1,0,13.50),
(NULL,'【苏宁生鲜】 苏北农家土鸡蛋10枚 安心禽蛋','','img_fresh/0010128947-000000000602430995_1.jpg',15.50,'#',0,0,0,0,0,0,1,0,10.50),
(NULL,'【苏宁生鲜】湾仔码头香菇蔬菜大包390g 包子 包子 方便速食','面皮松软 菜香浓郁','img_fresh/0010128947-000000000602726257_1.jpg',13.90,'#',0,0,0,0,0,0,0,1,12.60),
(NULL,'【苏宁生鲜】 思念手打天下三鲜水饺495g 饺子 饺子 方便速食','','img_fresh/0010128947-000000000602731435_1.jpg',21.90,'#',0,0,0,0,0,0,0,1,15.60),
(NULL,'【苏宁生鲜】 桂冠鱼丸110g 方便速食 火锅食材','','img_fresh/0010128947-000000000602731500_1.jpg',10.50,'#',0,0,0,0,0,0,0,1,8.50),
(NULL,'【苏宁生鲜】 避风塘虾饺150g 饺子 方便速食','','img_fresh/0010128947-000000000602793249_1.jpg',22.80,'#',0,0,0,0,0,0,0,1,21.50),
(NULL,'【苏宁生鲜】 思念手打天下猪肉白菜水饺495g 饺子 方便速食','','img_fresh/0010128947-000000000602731448_1.jpg',16.90,'#',0,0,0,0,0,0,0,1,12.90),
(NULL,'【苏宁生鲜】 湾仔码头一品奶黄包350g 包子 包子 方便速食','','img_fresh/0010128947-000000000602793246_1.jpg',13.90,'#',0,0,0,0,0,0,0,1,11.90),
(NULL,'【苏宁生鲜】太阳谷藤椒鸡排500g 方便速食','','img_fresh/0010128947-000000000602731551_1.jpg',28.90,'#',0,0,0,0,0,0,0,1,18.50),
(NULL,'【苏宁生鲜】百香果200g 新鲜水果 国产','','img_fresh/0010128947-000000000619666061_1.jpg',0.00,'#',0,0,0,1,0,0,0,0,5.60);
























