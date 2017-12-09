<?php
header("Content-Type: application/json;charset=UTF-8");
require_once("../init.php");
$output = [];

//查询广告轮播图片
$sql="SELECT cid,img,title,href FROM fresh_index_carousel";
$result=mysqli_query($conn,$sql);
$output['carouselItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

//查询爆款推荐商品信息
$sql="SELECT * FROM fresh_index_product WHERE seq_recommended=1";
$result=mysqli_query($conn,$sql);
$output['recommended']=mysqli_fetch_all($result,MYSQLI_ASSOC);

//查询好物优选商品信息
$sql="SELECT * FROM fresh_index_product WHERE seq_selected=1";
$result=mysqli_query($conn,$sql);
$output['selected']=mysqli_fetch_all($result,MYSQLI_ASSOC);

//查询新鲜水果商品信息
$sql="SELECT * FROM fresh_index_product WHERE seq_fruit=1";
$result=mysqli_query($conn,$sql);
$output['fruit']=mysqli_fetch_all($result,MYSQLI_ASSOC);

//查询海鲜水产商品信息
$sql="SELECT * FROM fresh_index_product WHERE seq_seafood=1";
$result=mysqli_query($conn,$sql);
$output['seafood']=mysqli_fetch_all($result,MYSQLI_ASSOC);

//查询精选肉类商品信息
$sql="SELECT * FROM fresh_index_product WHERE seq_meat=1";
$result=mysqli_query($conn,$sql);
$output['meat']=mysqli_fetch_all($result,MYSQLI_ASSOC);

//查询家禽蛋类商品信息
$sql="SELECT * FROM fresh_index_product WHERE seq_eggs=1";
$result=mysqli_query($conn,$sql);
$output['eggs']=mysqli_fetch_all($result,MYSQLI_ASSOC);

//查询快手料理商品信息
$sql="SELECT * FROM fresh_index_product WHERE seq_fastfood=1";
$result=mysqli_query($conn,$sql);
$output['fastfood']=mysqli_fetch_all($result,MYSQLI_ASSOC);


echo json_encode($output);