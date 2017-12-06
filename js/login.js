/**用户名和密码的非空验证**/
$("#uname").blur(function () {
    if(!this.value){
        $(".login-error").css("display","block");
        $(".login-error>span").text("用户名不能为空");
        return false;
    }
});
$("#upwd").blur(function () {
    if(!this.value){
        $(".login-error").css("display","block");
        $(".login-error>span").text("密码不能为空");
        return false;
    }
});
$('#submit').click(function () {
    var uname = $('#uname').value;
    var upwd = $('#upwd').value;
    $.ajax({
        type: 'POST',
        url: 'data/user/login.php',
        data: {uname:uname,upwd:upwd},
        success: function (result) {
            if (result.code === 200) {              //登录成功
                location.href = 'index.html';
            } else if (result.code === 201) {       //登录失败
                $(".login-error").css("display","block");
                $(".login-error>span").text("登录失败！用户名或密码输入有误。");
            } else {
                $(".login-error").css("display","block");
                $(".login-error>span").text("登录失败！原因"+result.msg);
            }
        },
        error:function () {
            console.log("网络故障");
        }
    });
});