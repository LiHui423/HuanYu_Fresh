<?php
header("Content-Type: application/json;charset=UTF-8");
require_once("../init.php");
$output = [];

//查询广告轮播图片
$sql="SELECT cid,img,title,href FROM fresh_index_carousel";
$result=mysqli_query($conn,$sql);
$output['carouselItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

//查询爆款推荐商品信息
$sql="SELECT * FROM fresh_index_product";
$result=mysqli_query($conn,$sql);
$output['recommended']=mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($output);