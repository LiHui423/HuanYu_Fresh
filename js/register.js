/*****检查用户名唯一性*********/
uname.onblur=function () {
    $.ajax({
        url: 'data/user/check_uname.php',
        data: {uname: this.value},
        success: function (result) {
            if (result.code === 201) {
                $(".input-wrapper .checkUname").css("display", "block");
                $(".input-wrapper>.ok").css("display", "none");
                $(".checkUname").html('用户名已被占用');
            } else if (result.code === 200) {
                $(".msg-field .input-wrapper .ok").css("display", "block");
                document.querySelector(".checkUname").className +=' success';
                $(".checkUname").css("display", "none");
            }else if(result.code===401){
                $(".input-wrapper .checkUname").css("display", "block");
                $(".input-wrapper>.ok").css("display", "none");
                $(".checkUname").html('用户名不能为空');
            }
        },
        error:function () {
            console.log("网络故障请检查");
        }
    })
};
upwd.onblur=function () {
    if(!this.value){
        $(".checkUpwd").css("display", "block");
        $(".checkUpwd").html('密码不能为空');
    }else{
        document.querySelector(".checkUpwd").className +=' success';
        $(".checkUpwd").css("display", "none");
        $(".password-field .input-wrapper .ok").css("display", "block");
    }
};
mobileAlias.onblur=function(){
    if(!this.value){
        $('.checkUphone').css("display", "block");
        $('.checkUphone').html("手机号不能为空");
    }else{
        document.querySelector(".checkUphone").className +=' success';
        $('.checkUphone').css('display','none');
        $(".phone-field .input-wrapper .ok").css("display", "block");
    }
};
/******注册按钮监听函数*********/
$('#save').click(function (e) {
    e.preventDefault();
    console.log('注册按钮被点击');
    var number=0;
    $('.input-wrapper').each(function () {
        if($(this).find('span').hasClass('success')){
            number++;
            //console.log(count);
        }
    });
    if(number=3){
        var uname=document.getElementById('uname').value;
        var upwd=document.getElementById('upwd').value;
        var phone=document.getElementById('mobileAlias').value;
        $.ajax({
                type: 'POST',
                url: 'data/user/register.php',
                data: {uname:uname,upwd:upwd,phone:phone},
                success: function(result){
                    if(result.code===200){
                            alert("注册成功，点击确定跳转至登录页面")
                            location.href = 'login.html';
                    }else {
                        alert('注册失败！错误消息：'+result.msg);
                    }
                },
                error:function () {
                    console.log("网络故障请检查");
                }
            }
        )
    }
});
























