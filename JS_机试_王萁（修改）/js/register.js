$(function () {
    //如果之前注册过，先拿到信息
    var registered = localStorage.getItem('register');
    var register;
    if (registered) {
        register = JSON.parse(registered);
    } else {
        register = [];
    }
    //是否符合报名条件
    var fine = true;
    $('.username').on("blur", function () {
            var username = $(this).val();
            // 检查用户名
            if (!/^(?=.*[A-Z])[A-Za-z0-9]{7}$/.test(username)) {
                alert("您输入的账号有误！");
                fine = false;
            } else {
                //如果之前系统中有数据
                if (register !== null) {
                    for (var i = 0; i < register.length; i++) {
                        if (register[i].username === username) {
                            fine = false; //用户名重复
                            alert("该账号已经被注册！");
                            break;
                        }
                    }
                }
            }
        }
    );
    // 检查密码
    $('.password').on("blur", function () {
        var password = $(this).val();
        if (!/^[1-9][0-9]{5}$/.test(password)) {
            alert("您输入的密码有误！");
            fine = false;
        }
    });
    //检查性别
    $('.sex').on("blur", function () {
        var sex = $(this).val();
        if (sex !== "男" && sex !== "女") {
            alert("您输入的性别有误！");
            fine = false;
        }
    });
    //检查留言
    $('.content').on("blur", function () {
        var content = $(".content").val();
        if(content === ""){
            content = "无";
        }
        if (content.length > 50) {
            alert("留言不得超过50字！");
            fine = false;
        }
    });
    //点击注册，将数据加入数组，将数组缓存，跳转到登录界面
    $('#register').click(function () {
        if(fine){
            var username = $(".username").val();
            var password = $(".password").val();
            var sex = $(".sex").val();
            var content = $(".content").val();
            register.push({username: username, password: password, sex: sex, content: content,picture: "images/tx5.jpg"});
            localStorage.setItem("register", JSON.stringify(register));
            window.location = 'login.html';
        }
    });
});