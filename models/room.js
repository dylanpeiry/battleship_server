module.exports = class Room {
    constructor(io,name) {
        this.io = io;
        this.clients_count = 0;
        this.max_clients = 2;
        this.clients_list = [];
        this.name = name;
    }

};