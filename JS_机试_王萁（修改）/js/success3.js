$(function () {
    $("#button1").click(function (){
        window.location = 'register.html';
    });
    var register = JSON.parse(localStorage.getItem('register'));
    //之前保存的，当前登录用户的账号
    var currentName = localStorage.getItem('currentName');
    //当前登录用户的所有信息
    var currentUserAll;
    for (var i = 0; i < register.length; i++) {
        if (register[i].username === currentName) {
             currentUserAll = register[i];
             console.log(currentUserAll);
            $('.username').val(currentUserAll.username);
            $('.password').val(currentUserAll.password);
            $('.sex').val(currentUserAll.sex);
            $('.content').val(currentUserAll.content);
            $(".picture").attr("src", currentUserAll.picture);
        }
    }
    var  picture;
    $("#choose").change(function () {
        //网上查的
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                picture = e.target.result;
                $(".picture").attr("src", picture);
                if (currentUserAll) {
                    currentUserAll.picture = picture;
                    for (var i = 0; i < register.length; i++) {
                        if (register[i].username === currentUserAll.username) {
                            register[i].picture = picture;
                            break;
                        }
                    }
                }
                localStorage.setItem('register', JSON.stringify(register));
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    $("#bianji").click(function (){
        if($(this).text() === "编辑"){
            $(this).text("保存");
            $(".password, .sex, .content").prop('disabled', false);
        }else {
            $(this).text("编辑");
            var update = {username: $(".username").val(), password: $(".password").val(), sex: $(".sex").val(), content: $(".content").val(), picture:  $(".picture").attr("src")};
            updated(update);
            $(".username, .password, .sex, .content").prop('disabled', true);
        }
    });
    function updated(update) {
        for (var i = 0; i < register.length; i++) {
            if (register[i].username === update.username) {
                register[i] = update;
                break;
            }
        }
        localStorage.setItem("register", JSON.stringify(register));
    }
});