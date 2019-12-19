exports = module.exports = io => {
    var rooms = [
        {
            clients_count: 0,
            max_clients: 2,
            clients_list: [],
            name: 'BS#1'
        }, {
            clients_count: 0,
            max_clients: 2,
            clients_list: [],
            name: 'BS#2'
        }, {
            clients_count: 0,
            max_clients: 2,
            clients_list: [],
            name: 'BS#3'
        }, {
            clients_count: 0,
            max_clients: 2,
            clients_list: [],
            name: 'BS#4'
        }, {
            clients_count: 0,
            max_clients: 2,
            clients_list: [],
            name: 'BS#5'
        }];

    io.on('connection', client => {
        client.emit('loadRooms', {rooms,clientId:client.id});

        client.on('roomJoined', roomId => {
            rooms.forEach(r => {
                if (r.name === roomId) {
                    r.clients_count++;
                    r.clients_list.push(client.id);
                    io.sockets.emit('loadRooms', {rooms});
                }
            });
        });

        client.on('roomLeft', d => {
            rooms.forEach(r => {
                if (r.name === d.roomId){
                    r.clients_count--;
                    let idx = r.clients_list.indexOf(d.clientId);
                    r.clients_list.splice(idx,1);
                    io.sockets.emit('loadRooms', {rooms});
                }
            })
        });

        client.on('disconnect', () => {
            let found = rooms.find(r => {
                return r.clients_list.find(c => c === client.id);
            });
            if (found){
                found.clients_count--;
                let idx = found.clients_list.indexOf(client.id);
                found.clients_list.splice(idx,1);
                io.sockets.emit('loadRooms', {rooms, clientId: null});
            }
        })

    });


};
