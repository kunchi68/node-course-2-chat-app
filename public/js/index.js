var socket = io();

socket.on('connect', function() {
    console.log('Connect to index.js');
});

socket.on('disconnect', function() {
    console.log('Disconnect from index.js');
});

var roomList = jQuery('#room-list');
roomList.on('click', function (e) {
    socket.emit('getRoomList',{} ,function() {
    });

});

socket.on('roomList', function(rooms) {
    //console.log('Room list:', rooms);
    roomList.html('<option></option>');
    for (var i in rooms) {
        roomList.append(jQuery('<option></option>').text(rooms[i]));
    }
});