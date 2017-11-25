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
  price DECIMAL(10,2),
  href VARCHAR(128),
  seq_recommended TINYINT,
  seq_new_arrival TINYINT,
  seq_top_sale TINYINT
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
(NULL, 'img_fresh/carousel/151090204408737457.jpg','轮播广告商品1','product_details.html?lid=28'),
(NULL, 'img_fresh/carousel/151091065335811592.jpg','轮播广告商品2','product_details.html?lid=19'),
(NULL, 'img_fresh/carousel/151091085627436074.jpg','轮播广告商品3','lookforward.html');


/******************生鲜类别家族*****************/
INSERT INTO fresh_goods_family VALUES
(NULL,'新鲜水果fruit'),
(NULL,'海鲜水产seafood'),
(NULL,'精选肉类meat'),
(NULL,'家禽蛋类poultry&eggs'),
(NULL,'快手料理fastfood');

/**********生鲜具体商品************/


