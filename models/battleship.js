let Player = require('./player');
module.exports = class Battleship {
    constructor(name_p1, name_p2){
        this.game_time = null;
        this.timer = 0;
        this.timeout = false;
        this.round = 1;
        this.state = 1;
        this.message = null;
        this.player_setup = null;
        this.player1 = new Player(name_p1);
        this.player2 = new Player(name_p2);
    }
};

