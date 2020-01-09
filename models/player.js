let Board = require('./board');

module.exports = class Player {
    constructor(name) {
        let b = new Board();
        let guess_b = new Board();

        this.isReady = false;
        this.boats = 8;
        this.boats_found = 0;
        this.failed_attempts = 0;
        this.name = name;
        this.grid = b.grid;
        this.guess_grid = guess_b.grid;
        this.grid_size = {cols:8,rows:8};
    }
};