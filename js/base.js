/*异步加载页头和页尾*/
$('.header').load('header.html',function(){
   $.ajax({
       url:'data/user/session_data.php',
       success:function(result){
           console.log(result);
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