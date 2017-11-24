
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

/*******************加载广告轮播*****************/
    $.ajax({
        url:'data/product/index.php',
        type:"GET",
        success:function(data){
            console.log(data);
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
                    <li class="${i === 0 ? 'current' : ''}"><em>${i + 1}</em></li>
                `;
            }
            $(".banner-wrapper .banner").html(adHtml);
            $(".banner-nav-wrapper .banner-nav .page-item").html(indicatorHtml);
            $(".banner-wrapper").ckSlide({
                autoPlay: true,//默认为不自动播放，需要时请以此设置
                dir: 'x',//默认效果淡隐淡出，x为水平移动，y 为垂直滚动
                interval: 3000//默认间隔2000毫秒
            })

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
})();