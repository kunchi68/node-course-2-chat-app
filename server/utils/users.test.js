const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'ROOM A'
        }, {
            id: '2',
            name: 'Jen',
            room: 'ROOM B'
        }, {
            id: '3',
            name: 'Julie',
            room: 'ROOM A'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Quincy',
            room: 'ROOM A'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });
    
    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    });

    it('should return names for room A', () => {
        var userList = users.getUserList('ROOM A');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for room B', () => {
        var userList = users.getUserList('ROOM B');

        expect(userList).toEqual(['Jen']);
    });

    it('should return all unique room anme', () => {
        var roomList = users.getRoomList();

        expect(roomList).toEqual(['ROOM A', 'ROOM B']);
    });
});