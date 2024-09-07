$(function () {

    $("#button1").click(function (){
        window.location = 'register.html';
    });
    //先清空，再加入数据
    var table = $('table');
    $('table tr:not(:first)').remove();
    var register = JSON.parse(localStorage.getItem('register'));
    //循环，往表格中添加数据
    register.forEach(function (user) {
        var tr= $('<tr></tr>');
        tr.append('<td><input type="text" value="' + user.username + '" disabled="disabled" class="username"></td>');
        tr.append('<td><input type="text" value="' + user.password + '" disabled="disabled" class="password"></td>');
        tr.append('<td><input type="text" value="' + user.sex + '" disabled="disabled" class="sex"></td>');
        tr.append('<td><input type="text" value="' + user.content + '" disabled="disabled" class="content"></td>');
        tr.append('<td><button class="delete">删除</button><button class="bianji">编辑</button><button class="store" style="display: none;">保存</button></td>');
        table.append(tr);
    });
    //点击编辑按钮，隐藏编辑和删除按钮，展示保存按钮
    //更改输入框状态为可更改
    $(".bianji").click(function () {
        if ($(this).text() === "编辑") {
            $(this).parents("tr").children().eq(1).children('input').prop('disabled', false);
            $(this).parents("tr").children().eq(2).children('input').prop('disabled', false);
            $(this).parents("tr").children().eq(3).children('input').prop('disabled', false);
            $(this).hide();
            $(this).siblings('.delete').hide();
            $(this).siblings('.store').show();
        }
    });
    //点击保存按钮，展示编辑和删除按钮
    //更改输入框状态为不可更改
        $(".store").click(function () {
                $(this).hide();
                $('.delete, .bianji').show();
                //更新缓存中的数组数据
            var update = {
                username: $(this).parents("tr").children().eq(0).children('input').val(),
                password: $(this).parents("tr").children().eq(1).children('input').val(),
                sex: $(this).parents("tr").children().eq(2).children('input').val(),
                content: $(this).parents("tr").children().eq(3).children('input').val()
            };
            updated(update);
            //更改输入框状态
            $(this).parents("tr").children().eq(1).children('input').prop('disabled', true);
            $(this).parents("tr").children().eq(2).children('input').prop('disabled', true);
            $(this).parents("tr").children().eq(3).children('input').prop('disabled', true);
        });
    $(".delete").click(function () {
        //当前点击删除这行的账号
        var userNow = $(this).parents("tr").children().eq(0).children('input').val();
        for (var i = 0;i < register.length;i++){
            if(userNow === register[i].username){
                //删除此行
                register.splice(i, 1);
            }
        }
        //更新缓存数组，删掉表格当前删除这行
        localStorage.setItem("register", JSON.stringify(register));
        $(this).parents("tr").remove();
    });
    //更新数组信息
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