var mytoken;
var form_file = "todo_forms.html";

jQuery('#link_register').show();
jQuery('#link_login').hide();
jQuery('#link_logout').hide();

var div_main = jQuery("#div_main");
var div_content = jQuery("#div_content");
div_main.load(form_file + " #form_login", load_login_form);

jQuery('#link_logout').on('click', function (e) {
    e.preventDefault();
    
    $.ajax({
        type: "DELETE",
        url: "/users/me/token",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        headers: {'x-auth': mytoken},
        success: function() {
            jQuery('#link_register').show();
            jQuery('#link_login').hide();
            jQuery('#link_logout').hide();
            alert("Logout successfully!!!");
        }
    }).done(function() {
        div_main.load(form_file + " #form_login", load_login_form);
        div_content.empty();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Logout failed!!!");
        div_main.load(form_file + " #form_login", load_login_form);
        div_content.empty();
    });
});

jQuery('#link_register').on('click', function(e) {
    e.preventDefault();

    jQuery('#link_register').hide();
    jQuery('#link_login').show();
    jQuery('#link_logout').hide();

    div_main.load(form_file + " #form_register", load_register_form);
});

jQuery('#link_login').on('click', function(e) {
    e.preventDefault();

    jQuery('#link_register').show();
    jQuery('#link_login').hide();
    jQuery('#link_logout').hide();

    div_main.load(form_file + " #form_login", load_login_form);
});

function load_login_form() {
    var form = $('#form_login');
    form.on('submit', function (e) {
        e.preventDefault();
    
        var formData = form.serializeArray();
        var json = {};
        
        $.each(formData, function() {
            json[this.name] = this.value || '';
        });
    
        //alert(JSON.stringify(json));
    
        $.ajax({
            type: "POST",
            url: "/users/login",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: JSON.stringify(json),
            success: function(output, status, xhr) {
                mytoken = xhr.getResponseHeader('x-auth');
                //alert(xhr.getAllResponseHeaders());
                //alert("document cookies:" + document.cookie);
                //alert("jQuery cookies:" + $.cookie("x-auth"));
                jQuery('#link_register').hide();
                jQuery('#link_login').hide();
                jQuery('#link_logout').show();
                alert("Login successfully!");
            },
            dataType: "json",
            contentType: "application/json"
        }).done(function() {
            //window.location.href = "/todo_main.html";
            div_main.load(form_file + " #form_new_todo", load_new_todo_form);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Login failed!!!");
        });
    });
}

function load_register_form() {
    var form = $('#form_register');
    form.on('submit', function (e) {
        e.preventDefault();
    
        var formData = form.serializeArray();
        var json = {};
        $.each(formData, function() {
            json[this.name] = this.value || '';
        });
        //alert(JSON.stringify(json));
    
        if (json['password'] != json['password-repeat']) {
            alert("Repeat password is inconsist!!");
            return;
        }
    
        $.ajax({
            type: "POST",
            url: "/users",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            data: JSON.stringify(json),
            contentType: "application/json",
            success: function(output, status, xhr) {
                mytoken = xhr.getResponseHeader('x-auth');
                jQuery('#link_register').hide();
                jQuery('#link_login').hide();
                jQuery('#link_logout').show();
                alert("Register successfully!!!");
            },
            dataType: "json",
            contentType: "application/json"
        }).done(function() {
            div_main.load(form_file + " #form_new_todo", load_new_todo_form);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Register failed!!!");
        });
    });
}

function add_todo_delete_event() {
    $("#div_content > table > tr > td > #todo_delete").on('click', function(e) {
        e.preventDefault();

        var tdData = $(this).closest("tr").children();
        var id = $(tdData[0]).text();
        var isDelete = confirm("Do you want to delete this todo item?");
        if (!isDelete) return;

        $.ajax({
            type: "DELETE",
            url: `/todos/${id}`,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            headers: {'x-auth': mytoken},
            success: function(output, status, xhr) {
                alert("Delete todo item successfully!");
            },
        }).done(function() {
            load_todo_list();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Delete todo item failed!!!");
            load_todo_list();
        });
    });
    
}

function add_todo_update_event() {
    $("#div_content > table > tr > td > #todo_update").on('click', function(e) {
        e.preventDefault();

        var tdData = $(this).closest("tr").children();
        var id = $(tdData[0]).text();
        var json = {};
        json['text'] = $(tdData[1]).text();
        json['completed'] = $(tdData[2]).find("input:checkbox").is(':checked');
        //alert(JSON.stringify(json));

        $.ajax({
            type: "PATCH",
            url: `/todos/${id}`,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            headers: {'x-auth': mytoken},
            data: JSON.stringify(json),
            success: function(output, status, xhr) {
                alert("Update todo item successfully!");
            },
            dataType: "json",
            contentType: "application/json"
        }).done(function() {
            load_todo_list();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Update todo item failed!!!");
            load_todo_list();
        });
    });
    
}

function load_todo_list() {
    $.ajax({
        type: "GET",
        url: "/todos",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        headers: {'x-auth': mytoken},
        success: function(output, status, xhr) {
            //alert("Get todo list successfully!");
        }
    }).done(function(data) {
        var template = jQuery('#todo-item-template').html();
        div_content.empty();
        var table = $('<table>').addClass('table table-bordered');
        table.append('<tr><th>Todo item</th><th>Completed</th><th>Completed time</th><th>Operations</th></tr>')
        $.each(data['todos'], function() {
            //alert(JSON.stringify(this));
            var completedStr = '';
            var formattedTime = '';
            if (this['completedAt']) formattedTime = moment(this['completedAt']).format('h:mm a');
            if (this['completed']) completedStr = 'checked';
            var html = Mustache.render(template, {
                id: this['_id'],
                text: this['text'],
                completed: completedStr,
                completedAt: formattedTime
            });
            table.append(html);
        });
        div_content.append(table);
        add_todo_update_event();
        add_todo_delete_event();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Get todo list failed!!!");
    });
}

function load_new_todo_form() {
    load_todo_list();

    var form = $('#form_new_todo');    
    form.on('submit', function (e) {
        e.preventDefault();

        var formData = form.serializeArray();
        var json = {};
        
        $.each(formData, function() {
            if (this.name == "todo_item") {
                json["text"] = this.value || '';
            }
        });
    
        //alert(JSON.stringify(json));

        $.ajax({
            type: "POST",
            url: "/todos",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            headers: {'x-auth': mytoken},
            data: JSON.stringify(json),
            success: function(output, status, xhr) {
                alert("New todo item is added successfully!");
            },
            dataType: "json",
            contentType: "application/json"
        }).done(function() {
            load_todo_list();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Add new todo item failed!!!");
        });

    });
}


