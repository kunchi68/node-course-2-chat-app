var mytoken;
var form_file = "todo_forms.html";

jQuery('#link_register').show();
jQuery('#link_login').hide();
jQuery('#link_logout').hide();

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
            //window.location.href = "/todo_main.html";
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Register failed!!!");
        });
    
    });
}


var div_main = jQuery("#div_main");
div_main.load(form_file + " #form_login", load_login_form);

jQuery('#link_logout').on('click', function (e) {
    e.preventDefault();
    //alert(mytoken);
    
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
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Logout failed!!!");
        div_main.load(form_file + " #form_login", load_login_form);
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