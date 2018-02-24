import Game from '../game';

class AI {
    constructor(matrix, player, depth, alpha, beta) {
        this.matrix = matrix;
        this.game = new Game({ matrix });
    }

    eval() {
        // TODO:先直接用空格的数量来评分
        return this.game.getEmptyCoordinates().length;
    }

    search() {
        const allMoves = ['left', 'right', 'up', 'down'];
        // TODO: 随机返回一个方向
        const move = allMoves[Math.floor(Math.random() * 4)];
        return {
            move
        };
    }

}

export default AI;