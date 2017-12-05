/************加载广告轮播*************/
$.ajax({
    url:'data/product/index.php',
    type:"GET",
    success:function(data){
        //console.log(data.carouselItems);
        var adHtml = '';
        var indicatorHtml = '';
        for (var i = 0; i < data.carouselItems.length; i++) {
            var c = data.carouselItems[i];
            adHtml += `
					<li ${i>0?'style="display:none;"':''}>
						<a href="${c.href}"><img src="${c.img}"></a>
					</li>
					`;
            indicatorHtml += `
						<a class="${i === 0 ? 'current' : ''}" >
							<em></em>
						</a>
					`;
        }
        $(".banner-wrapper .banner").html(adHtml);
        $(".banner-nav").html(indicatorHtml);
        $(".banner-wrapper").ckSlide({
            autoPlay: true,//默认为不自动播放，需要时请以此设置
            dir: 'y',//默认效果淡隐淡出，x为水平移动，y 为垂直滚动
            interval: 2000//默认间隔2000毫秒
        })
    }
});


function getTotalTop(elem){
    var sum=0;
    do{
        sum+=elem.offsetTop;
        elem=elem.offsetParent;
    }while(elem);
    return sum;
}
(()=>{
    /***************异步加载头部和尾部***************/
    $('.header').load('header.html',function(){
        $.ajax({
            url:'data/user/session_data.php',
            success:function(result){
                //console.log(result);
                if(result.uname){
                    $('#reg-bar-node').html('<div>&nbsp;欢迎:'+result.uname+'<a href="logout.html" title="退出登陆">退出</a><b>|</b></div><div><a href="uc_basic.html" title="用户中心">用户中心</a></div>');
                    $('[href="logout.html"]').click(function(e){
                        e.preventDefault();
                        $.ajax({
                            url:'data/user/logout.php',
                            success:function(result){
                                if(result.code===200){
                                    alertMsg('<h4>退出成功</h4>点击确定重新返回登陆页面');
                                    $('#alertMsg').on('click','#alertMsg_btn1 cite',function(e){
                                        e.preventDefault();
                                        location.href='login.html';
                                    })
                                }else{
                                    alertMsg('登录退出失败！原因：'+result.msg);
                                }
                            }
                        });
                    });
                }

            }
        })
    });
    $('.footer').load('footer.html');
/*********************加载楼层内容************************/
    $.ajax({
        url:'data/product/index.php',
        type:'GET',
        success:function(data){
            /**爆款推荐商品**/
            var recommend='';
            for(reProduct of data.recommended){
                //console.log(reProduct);
                recommend+=`
                    <i class="line line1"></i>
                    <i class="line line2"></i>
                    <i class="line line3"></i>
                    <i class="line line4"></i>
                `;
                recommend+=`
                    <li class="commodity">
                        <div class="commodity-wrap">
                            <a href="#" class="imgBox" title="${reProduct.title}">
                            	<img class="commodity-img lazy-loading" src="${reProduct.pic}" width="210" height="210">
                            </a>
                            <div class="commodity-intro">
                            	<p>
                            		<a href="#" title="${reProduct.title}">${reProduct.title}</a>
                            	</p>
                            	<div class="price-wrapper">
                            		<span class="price now-price">
                            			<i>¥</i>
                            			<em class="price-number">${parseInt(reProduct.price_onsale)}</em>
                            			<em class="price-last">${reProduct.price_onsale.slice(-3)}</em>
                            		</span>
                            		<del class="price-high last-price">
                            			<i>¥</i>
                            			<em class="price-number">${reProduct.price_normal}</em>
                            		</del>
                            	</div>
                            </div>
                        </div>
                    </li>
                `;
            }
            $("#recommend").html(recommend);
            /**好物优选商品**/
            var selected='';
            for(seProduct of data.selected){
                //console.log(seProduct);
                selected+=`
                    <li class="commodity">
        				<a href="#" class="imgBox" title="${seProduct.title}">
        					<img src="${seProduct.pic}" class="commodity-img lazy-loading" width="190" height="190">
        				</a>
        				<div class="commodity-intro">
        					<p>
        						<a href="#" title="${seProduct.title}">${seProduct.title}</a>
        					</p>
        					<div class="price-wrapper">
								<span class="price now-price">
									<i>¥</i>
									<em class="price-number">${parseInt(seProduct.price_onsale)}</em>
									<em class="price-last">${seProduct.price_onsale.slice(-3)}</em>
								</span>
								<del class="price-high last-price">
									<i>¥</i>
									<em class="price-number">${seProduct.price_normal}</em>
								</del>
							</div>
        				</div>
        			</li>
                `;
            }
            $("#selected").html(selected);
            /**新鲜水果商品**/
            var fruitBig='';
            var fruit='';
            for(frProduct of data.fruit){
                if(frProduct.details){
                    fruitBig+=`
                        <li class="commodity">
        				<a href="#" class="imgBox imgBox2">
        					<img src="${frProduct.pic}" width="250" height="250" class="lazy-loading">
        				</a>
        				<div class="commodity-intro wordBox">
        					<a href="#">
        						<p class="name">${frProduct.title}</p>
        						<p class="desc">${frProduct.details}</p>
        					</a>
        					<span class="price now-price">
        						<i>¥</i>
        						<em class="price-number">${parseInt(frProduct.price_onsale)}</em>
        						<em class="price-last">${frProduct.price_onsale.slice(-3)}</em>
        					</span>
        					<del class=" price-high last-price">
        						<i>¥</i>
        						<em class="price-number">${frProduct.price_normal}</em>
        					</del>
        					<a href="#" class="entryBtn">立即抢购</a>
        				</div>
        			</li>
                    `;
                }else{
                    fruit+=`
                        <li class="commodity">
						<a class="imgBox" href="#">
							<img class="commodity-img lazy-loading" width="190" height="190" src="${frProduct.pic}">
						</a>
						<div class="commodity-intro">
							<p>
								<a href="#">${frProduct.title}</a>
							</p>
							<div class="price-wrapper">
								<span class="price now-price">
									<i>¥</i>
									<em class="price-number">${parseInt(frProduct.price_onsale)}</em>
									<em class="price-last">${frProduct.price_onsale.slice(-3)}</em>
								</span>
								<del class="price-high last-price">
									<i>¥</i>
									<em class="price-number">${frProduct.price_normal}</em>
								</del>
							</div>
						</div>
					</li>
                    `;
                }

            }
            $("#fruitBig").html(fruitBig);
            $("#fruit").html(fruit);
            /**海鲜水产商品**/
            var seafoodBig='';
            var seafood='';
            for(seProduct of data.seafood){
                if(seProduct.details){
                    seafoodBig+=`
                        <li class="commodity">
        				<a href="#" class="imgBox imgBox2">
        					<img src="${seProduct.pic}" width="250" height="250" class="lazy-loading">
        				</a>
        				<div class="commodity-intro wordBox">
        					<a href="#">
        						<p class="name">${seProduct.title}</p>
        						<p class="desc">${seProduct.details}</p>
        					</a>
        					<span class="price now-price">
        						<i>¥</i>
        						<em class="price-number">${parseInt(seProduct.price_onsale)}</em>
        						<em class="price-last">${seProduct.price_onsale.slice(-3)}</em>
        					</span>
        					<del class=" price-high last-price">
        						<i>¥</i>
        						<em class="price-number">${seProduct.price_normal}</em>
        					</del>
        					<a href="#" class="entryBtn">立即抢购</a>
        				</div>
        			</li>
                    `;
                }else{
                    seafood+=`
                        <li class="commodity">
						<a class="imgBox" href="#">
							<img class="commodity-img lazy-loading" width="190" height="190" src="${seProduct.pic}">
						</a>
						<div class="commodity-intro">
							<p>
								<a href="#">${seProduct.title}</a>
							</p>
							<div class="price-wrapper">
								<span class="price now-price">
									<i>¥</i>
									<em class="price-number">${parseInt(seProduct.price_onsale)}</em>
									<em class="price-last">${seProduct.price_onsale.slice(-3)}</em>
								</span>
								<del class="price-high last-price">
									<i>¥</i>
									<em class="price-number">${seProduct.price_normal}</em>
								</del>
							</div>
						</div>
					</li>
                    `;
                }

            }
            $("#seafoodBig").html(seafoodBig);
            $("#seafood").html(seafood);
            /**精选肉类商品**/
            var meatBig='';
            var meat='';
            for(meProduct of data.meat){
                if(meProduct.details){
                    meatBig+=`
                        <li class="commodity">
        				<a href="#" class="imgBox imgBox2">
        					<img src="${meProduct.pic}" width="250" height="250" class="lazy-loading">
        				</a>
        				<div class="commodity-intro wordBox">
        					<a href="#">
        						<p class="name">${meProduct.title}</p>
        						<p class="desc">${meProduct.details}</p>
        					</a>
        					<span class="price now-price">
        						<i>¥</i>
        						<em class="price-number">${parseInt(meProduct.price_onsale)}</em>
        						<em class="price-last">${meProduct.price_onsale.slice(-3)}</em>
        					</span>
        					<del class=" price-high last-price">
        						<i>¥</i>
        						<em class="price-number">${meProduct.price_normal}</em>
        					</del>
        					<a href="#" class="entryBtn">立即抢购</a>
        				</div>
        			</li>
                    `;
                }else{
                    meat+=`
                        <li class="commodity">
						<a class="imgBox" href="#">
							<img class="commodity-img lazy-loading" width="190" height="190" src="${meProduct.pic}">
						</a>
						<div class="commodity-intro">
							<p>
								<a href="#">${meProduct.title}</a>
							</p>
							<div class="price-wrapper">
								<span class="price now-price">
									<i>¥</i>
									<em class="price-number">${parseInt(meProduct.price_onsale)}</em>
									<em class="price-last">${meProduct.price_onsale.slice(-3)}</em>
								</span>
								<del class="price-high last-price">
									<i>¥</i>
									<em class="price-number">${meProduct.price_normal}</em>
								</del>
							</div>
						</div>
					</li>
                    `;
                }

            }
            $("#meatBig").html(meatBig);
            $("#meat").html(meat);
            /**家禽蛋类商品**/
            var eggsBig='';
            var eggs='';
            for(egProduct of data.eggs){
                if(egProduct.details){
                    eggsBig+=`
                        <li class="commodity">
        				<a href="#" class="imgBox imgBox2">
        					<img src="${egProduct.pic}" width="250" height="250" class="lazy-loading">
        				</a>
        				<div class="commodity-intro wordBox">
        					<a href="#">
        						<p class="name">${egProduct.title}</p>
        						<p class="desc">${egProduct.details}</p>
        					</a>
        					<span class="price now-price">
        						<i>¥</i>
        						<em class="price-number">${parseInt(egProduct.price_onsale)}</em>
        						<em class="price-last">${egProduct.price_onsale.slice(-3)}</em>
        					</span>
        					<del class=" price-high last-price">
        						<i>¥</i>
        						<em class="price-number">${egProduct.price_normal}</em>
        					</del>
        					<a href="#" class="entryBtn">立即抢购</a>
        				</div>
        			</li>
                    `;
                }else{
                    eggs+=`
                        <li class="commodity">
						<a class="imgBox" href="#">
							<img class="commodity-img lazy-loading" width="190" height="190" src="${egProduct.pic}">
						</a>
						<div class="commodity-intro">
							<p>
								<a href="#">${egProduct.title}</a>
							</p>
							<div class="price-wrapper">
								<span class="price now-price">
									<i>¥</i>
									<em class="price-number">${parseInt(egProduct.price_onsale)}</em>
									<em class="price-last">${egProduct.price_onsale.slice(-3)}</em>
								</span>
								<del class="price-high last-price">
									<i>¥</i>
									<em class="price-number">${egProduct.price_normal}</em>
								</del>
							</div>
						</div>
					</li>
                    `;
                }

            }
            $("#eggsBig").html(eggsBig);
            $("#eggs").html(eggs);
            /**快手料理商品**/
            var fastfoodBig='';
            var fastfood='';
            for(faProduct of data.fastfood){
                if(faProduct.details){
                    fastfoodBig+=`
                        <li class="commodity">
        				<a href="#" class="imgBox imgBox2">
        					<img src="${faProduct.pic}" width="250" height="250" class="lazy-loading">
        				</a>
        				<div class="commodity-intro wordBox">
        					<a href="#">
        						<p class="name">${faProduct.title}</p>
        						<p class="desc">${faProduct.details}</p>
        					</a>
        					<span class="price now-price">
        						<i>¥</i>
        						<em class="price-number">${parseInt(faProduct.price_onsale)}</em>
        						<em class="price-last">${faProduct.price_onsale.slice(-3)}</em>
        					</span>
        					<del class=" price-high last-price">
        						<i>¥</i>
        						<em class="price-number">${faProduct.price_normal}</em>
        					</del>
        					<a href="#" class="entryBtn">立即抢购</a>
        				</div>
        			</li>
                    `;
                }else{
                    fastfood+=`
                        <li class="commodity">
						<a class="imgBox" href="#">
							<img class="commodity-img lazy-loading" width="190" height="190" src="${faProduct.pic}">
						</a>
						<div class="commodity-intro">
							<p>
								<a href="#">${faProduct.title}</a>
							</p>
							<div class="price-wrapper">
								<span class="price now-price">
									<i>¥</i>
									<em class="price-number">${parseInt(faProduct.price_onsale)}</em>
									<em class="price-last">${faProduct.price_onsale.slice(-3)}</em>
								</span>
								<del class="price-high last-price">
									<i>¥</i>
									<em class="price-number">${faProduct.price_normal}</em>
								</del>
							</div>
						</div>
					</li>
                    `;
                }

            }
            $("#fastfoodBig").html(fastfoodBig);
            $("#fastfood").html(fastfood);
        },
        error:function(){
            console.log("网络故障请检查");
        }
    });


/*****************加载左侧电梯***********************/
    //获得id为f1的元素距页面顶部的总距离totalTop
    var f1TotalTop=getTotalTop(document.getElementById("f1"));
    //查找id为lift的div保存在变量lift中
    var lift=document.getElementById("lift");
    //为window添加滚动事件监听
    window.addEventListener("scroll",() => {
        var scrollTop=document.body.scrollTop||
                    document.documentElement.scrollTop;
            lift.style.display=
                (f1TotalTop<=scrollTop+innerHeight/2?"block":"none");



        //只有电梯按钮显示时，才用判断按钮的亮和灭
        if(lift.style.display=="block"){
            var FHEIGHT=699;
            //找到class为main-floor的每个楼层元素，保存在变量fs中
            var fs=document.querySelectorAll(".main-floor")
            //遍历每个楼层
            for(var i=0;i<fs.length;i++){
                //获得当前楼层距body顶部的总距离totalTop
                var totalTop=getTotalTop(fs[i]);
                //计算楼层亮灯区域的开始位置
                var start=totalTop-innerHeight/2;
                var end=start+FHEIGHT;
                //如果scrollTop>=start且scrollTop<end
                if(scrollTop>=start&&scrollTop<end)
                    break;//就退出循环
            }
            //在lift下找到class为hover的li，将其hover移除
            var currLi=lift.querySelector(".hover")
            if(currLi){
                currLi.classList.remove("hover")
                //设置lift下第i个li的class增加一个hover
                lift.querySelector(`li:nth-child(${i+2})`).className+=" hover";
            }

        }
    });
    //在lift下找class为float-bar下的class为floor-nav的所有p保存在as中
    var as=lift.querySelectorAll(".float-bar .floor-nav")
    for(let i=0;i<as.length;i++){
        as[i].onclick=function(){
            //查找id为fi的元素
            var fi=document.getElementById("f"+(i+1));
            //获得fi距body顶部的总距离（fi）；
            var totalTop=getTotalTop(fi);
            //让window滚动到totalTop
            //window.scrollTo(0,totalTop-70);
            $("html,body").stop(true).animate({
                //非css标准属性，jquery中独有
                scrollTop:totalTop-70
            },500);
        }
    }
    /*********全部商品分类鼠标悬停效果************/
    $(".ng-sort").mouseover(function() {
        $(".ng-sort-list-box").css("display", "block");
    });
    $(".ng-sort").mouseout(function(){
        $(".ng-sort-list-box").css("display","none");
    });

    /****************头部箭头鼠标悬停效果***********************/

})();