$(function () {
    //将管理员信息加入系统
    var guanli = {username: "SeiryoQ", password: '123456'};
    localStorage.setItem('guanli', JSON.stringify(guanli));
    //查看缓存中是否有注册用户信息
    var registered = localStorage.getItem('register');
    var register;
    if (registered) {
        register = JSON.parse(registered);
    } else {
        register = [];
    }
    $('.username').on("blur", function () {
        var username = $(this).val();
        if (!/^(?=.*[A-Z])[A-Za-z0-9]{7}$/.test(username)) {
            alert("您输入的账号有误！");
        }
    });

    $('.password').on("blur", function () {
        var password = $(this).val();
        if (!/^[1-9][0-9]{5}$/.test(password)) {
            alert("您输入的密码有误！");
        }
    });

    $('#login').click(function () {
        //管理员登录
        var username = $('.username').val();
        var password = $('.password').val();
        if (username === guanli.username && password === guanli.password) {
            window.location = 'success2.html';
        }
        //普通用户登录
        var exist = false;
        //检查原先是否注册过
        for (var i = 0; i < register.length; i++) {
            if (register[i].username === username && register[i].password === password) {
                exist = true;//注册过，记住一下当前登陆的账号，没有头像设置头像，有头像更新一下
                if(register[i].picture){
                    localStorage.setItem('currentName', username);
                    localStorage.setItem("register", JSON.stringify(register));
                    window.location = 'success3.html';
                }else {
                    register[i].picture = "images/tx1.jpg";
                    localStorage.setItem('currentName', username);
                    localStorage.setItem("register", JSON.stringify(register));
                    window.location = 'success3.html';
                }
                if(!exist){
                    alert("账号或者密码不正确！");
                }
                break;
            }

        }

    });
});