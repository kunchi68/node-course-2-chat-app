jQuery('#todo_login').on('submit', function (e) {
    e.preventDefault();

    var formData = $("#todo_login").serializeArray();
    var json = {};
    
    $.each(formData, function() {
        json[this.name] = this.value || '';
    });

    //alert(JSON.stringify(json));
   
    $.ajax({
        type: "POST",
        url: "/users/login",
        data: JSON.stringify(json),
        success: function() {},
        dataType: "json",
        contentType: "application/json"
    }).done(function() {
        window.location.href = "/todo_main.html";
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert("Login in failed!!!");
    });
});
