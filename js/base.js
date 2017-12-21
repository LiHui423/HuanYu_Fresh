/***************异步加载头部和尾部***************/
/*$('.header').load('header.html',function(){*/
$.ajax({
    url:'data/user/session_data.php',
    success:function(result){
        //console.log(result);
        if(result.uname){
            $('#reg-bar-node').html('<div>&nbsp;欢迎:'+result.uname+'<a href="logout.html" title="退出登陆">&nbsp;&nbsp;退出</a>');
            $('[href="logout.html"]').click(function(e){
                e.preventDefault();
                $.ajax({
                    url:'data/user/logout.php',
                    success:function(result){
                        if(result.code===200){
                            alert('退出成功,点击确定重新返回登陆页面');
                            location.href='login.html';
                        }else{
                            alert('登录退出失败！原因：'+result.msg);
                        }
                    }
                });
            });
        }

    }
});
/*});*/
$('.footer').load('footer.html');