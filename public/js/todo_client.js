var mytoken;
jQuery('#btn_logout').hide();
jQuery('#form_register').hide();

jQuery('#link_register').on('click', function(e) {
    e.preventDefault();

    jQuery('#form_login').hide();
    jQuery('#form_register').show();
});

jQuery('#link_login').on('click', function(e) {
    e.preventDefault();

    jQuery('#form_login').show();
    jQuery('#form_register').hide();
});

jQuery('#form_register').on('submit', function (e) {
    e.preventDefault();

    var formData = $("#form_register").serializeArray();
    var json = {};
    $.each(formData, function() {
        json[this.name] = this.value || '';
    });
    alert(JSON.stringify(json));

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
        },
        dataType: "json",
        contentType: "application/json"
    }).done(function() {
        alert("Register successfully!!!");
        jQuery('#btn_logout').show();
        //window.location.href = "/todo_main.html";
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Register failed!!!");
    });

});

jQuery('#form_login').on('submit', function (e) {
    e.preventDefault();

    var formData = $("#form_login").serializeArray();
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
        //success: function(output, status, xhr) {alert("cookies:" + xhr.getResponseHeader('Set-Cookie'));},
        success: function(output, status, xhr) {
            mytoken = xhr.getResponseHeader('x-auth');
            //mytoken = xhr.getAllResponseHeaders();
            //alert(mytoken);
            //alert("document cookies:" + document.cookie);
            //alert("jQuery cookies:" + $.cookie("x-auth"));
        },
        dataType: "json",
        contentType: "application/json"
    }).done(function() {
        jQuery('#btn_logout').show();
        //window.location.href = "/todo_main.html";
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Login failed!!!");
    });
});

jQuery('#btn_logout').on('click', function (e) {
    e.preventDefault();
    alert(mytoken);
    
    $.ajax({
        type: "DELETE",
        url: "/users/me/token",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        headers: {'x-auth': mytoken},
        success: function() {},
    }).done(function() {
        alert("Logout successfully!!!");
        //window.location.href = "/todo_login.html";
        jQuery('#btn_logout').hide();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Logout failed!!!");
    });
});
