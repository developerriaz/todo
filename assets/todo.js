
var editmode = document.getElementById("editMode");
var editTitle = document.getElementById("editTitle");
var editDetail = document.getElementById("editDetail");
var btnUpdate = document.getElementById("btnUpdate");

function Todo(id,title,descritpion,status,timestamp){
    this.id = id;
    this.title = title;
    this.descritpion = descritpion;
    this.status = status;
    this.timestamp = timestamp;

    //visible items
    this.li = null;
    this.checkbox = null;
    this.label = null;
    this.clickable = null
    this.todo = null;

    this.delete = function(task){
        //ajax in-demand
    };
    this.render = function(_task){
        var list = document.getElementById("list");

        var li = document.createElement("li");
        li.setAttribute("id",this.id);

        var span = document.createElement("span");
        span.setAttribute("class","layout");

        this.checkbox = document.createElement("input");
        this.checkbox.setAttribute("type", "checkbox");
        this.checkbox.checked = (Number.parseInt(this.status) != 0) ? true : false;
        li.style.textDecoration = (status == 1) ? "line-through white" : "underline white";
        this.checkbox.oninput = function(d){
            console.log(d.target.checked);
            status = (d.target.checked) ? 1 : 0;
            li.style.textDecoration = (status == 1) ? "line-through white" : "underline white";
            $.ajax({
                async:true,
                url: "./assets/updateTodo.php",
                method: "GET",
                cache:false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: "todoID="+id+"&newTitle="+title+"&newDetail="+descritpion+"&newStatus="+status,
                processData:false,
                beforeSend:function(){
                    console.log("BeforeSend::");
                },
                success: function(d){
                    console.log("Success with "+d);
                },
                error: function(e){
                    console.log(e);
                },
                complete: function(){
                    console.log("I am done!");
                }
            });
        };

        this.label = document.createElement("label");
        this.label.innerHTML = this.title;
        this.label.onclick = function(){

            console.log("Values =>title::"+title+" AND description::"+descritpion)
            editTitle.value = title;
            editDetail.value = descritpion;
            editmode.style.visibility = "visible";

            btnUpdate.onclick = function(){
                status = Number.parseInt(status);
                $.ajax({
                    async:true,
                    url: "./assets/updateTodo.php",
                    method: "GET",
                    cache:false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    data: "todoID="+id+"&newTitle="+editTitle.value+"&newDetail="+editDetail.value+"&newStatus="+status,
                    processData:false,
                    beforeSend:function(){
                        console.log("BeforeSend::");
                    },
                    success: function(d){
                        //label.innerText = editTitle.value;
                        console.log("Success with "+d);
                        $("#list").empty();
                        getTodos();
                        $("#btnClose").click();
                        
                    },
                    error: function(e){
                        console.log(e);
                    },
                    complete: function(){
                        console.log("I am done!");
                    }
                });
            };
        };

        this.clickable = document.createElement("img");
        this.clickable.setAttribute("src","./img/delete-sign.png");
        this.clickable.onclick = function(){
            console.log(title);

            $.ajax({
                async:true,
                url: "./assets/deleteTodo.php",
                method: "GET",
                cache:false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                data: "todoID="+id,
                processData:false,
                beforeSend:function(){
                    console.log("attempt::deleting item");
                },
                success: function(d){
                    console.log("Success with "+d);
                    $("#"+id).remove();
                    $("#list").empty();
                    getTodos();
                },
                error: function(e){
                    console.log(e);
                }
            });
        };

        span.appendChild(this.checkbox);
        span.appendChild(this.label);
        span.appendChild(this.clickable);

        li.appendChild(span);
        list.appendChild(li);
    };
    this.update = (title,status,description)=>{
        this.checkbox.checked = (Number.parseInt(status) != 0) ? true : false;
        this.label.innerText = title;
        this.description = description;
    }
}