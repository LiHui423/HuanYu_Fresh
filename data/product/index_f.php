<?php
header("Content-Type: application/json;charset=UTF-8");
require_once("../init.php");
$output = [];
$sql="SELECT cid,img,title,href FROM fresh_index_carousel";
$result=mysqli_query($conn,$sql);
$output['carouselItems'] = mysqli_fetch_all($result, MYSQLI_ASSOC);

echo json_encode($output);