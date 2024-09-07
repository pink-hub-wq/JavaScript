$(function (){
    load();
    $("#title").keydown(function(e){
        if(e.keyCode == 13){
            if($(this).val() !== null){
                var data = getData();
                data.push({title:$(this).val(),done:false});
                inData(data);
                load();
                $(this).val("");
            }
        }
    });
    function inData(data){
        localStorage.setItem("todolist",JSON.stringify(data));
    }
    function load(){
        $("ul,ol").empty();
        var data = getData();
        $.each(data,function (i,e){
            var check = "";
            if(e.done){
                check = "checked";
            } else {
                check = "";
            }
            if(e.done){
                $("ul").append("<li><input type='checkbox' "+ check + "><p>" + e.title + "</p><a href='javascript: ;' id="+ i +"></a></li>");
            }else {
                $("ol").append("<li><input type='checkbox' "+ check + "><p>" + e.title + "</p><a href='javascript: ;' id="+ i +"></a></li>");
            }
        });
        $("#todocount").html($("ol li").length);
        $("#donecount").html($("ul li").length);
    }
    function getData(){
        var data = localStorage.getItem("todolist");
        if(data !== null){
            return JSON.parse(data);
        }else {
            return [];
        }
    }
    $("ul,ol").on("click","input",function (){
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        inData(data);
        load();
    });
    $("ul,ol").on("click","a",function (){
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index,1);
        inData(data);
        load();
    });
});