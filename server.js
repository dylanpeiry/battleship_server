let Battleship = require('./models/battleship');

exports = module.exports = io => {
    let client1Ready = false;
    let client2Ready = false;
    var rooms = [
        {
            clients_count: 0,
            max_clients: 2,
            clients_list: [],
            name: 'BS1'
        }, {
            clients_count: 0,
            max_clients: 2,
            clients_list: [],
            name: 'BS2'
        }, {
            clients_count: 0,
            max_clients: 2,
            clients_list: [],
            name: 'BS3'
        }, {
            clients_count: 0,
            max_clients: 2,
            clients_list: [],
            name: 'BS4'
        }, {
            clients_count: 0,
            max_clients: 2,
            clients_list: [],
            name: 'BS5'
        }];

    io.on('connection', client => {
        client.emit('loadRooms', {rooms, clientId: client.id});

        client.on('roomJoined', roomId => {
            rooms.forEach(r => {
                if (r.name === roomId) {
                    r.clients_count++;
                    r.clients_list.push(client.id);
                    client.join(r.name);
                    io.sockets.emit('loadRooms', {rooms});
                }
                if (r.clients_count === 2) {
                    io.sockets.in(r.name).emit('roomFull', {roomId: r.name, clientId: client.id});
                }

            });
        });

        client.on('roomLeft', d => {
            rooms.forEach(r => {
                if (r.name === d.roomId) {
                    r.clients_count--;
                    let idx = r.clients_list.indexOf(d.clientId);
                    r.clients_list.splice(idx, 1);
                    io.sockets.emit('loadRooms', {rooms});
                    client.leave(r.name, null);
                }
            })
        });

        client.on('playerToggleGameReady', d => {
            if (d.player_number === 1)
                client1Ready = !client1Ready;
            else
                client2Ready = !client2Ready;
            io.sockets.emit('playerToggleGameReady', d);

            if (client1Ready && client2Ready)
                io.sockets.emit('startTheGame');
        });

        client.on('loadRooms', () => {
            client.emit('loadRooms', {rooms, clientId: client.id});
        });

        client.on('disconnect', () => {
            let found = rooms.find(r => {
                return r.clients_list.find(c => c === client.id);
            });
            if (found) {
                found.clients_count--;
                let idx = found.clients_list.indexOf(client.id);
                found.clients_list.splice(idx, 1);
                io.sockets.emit('loadRooms', {rooms, clientId: null});
                client.leave(found.name, null);
            }
        })

    });


};
