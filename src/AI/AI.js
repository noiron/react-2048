import Game from '../game';

const allMoves = ['left', 'right', 'up', 'down'];

class AI {
    constructor(matrix, player, depth, alpha, beta) {
        this.matrix = matrix;
        this.game = new Game({ matrix });

        this.depth = depth || 0;
        this.alpha = alpha || -Infinity;
        this.beta = beta || Infinity;
    }

    eval = () => {
        // TODO:先直接用空格的数量来评分
        return this.game.getEmptyCoordinates().length;
    }

    search() {
        const possibleMoves = this.getPossibleMoves();
        // 随机返回一个方向
        const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

        return {
            move
        };
    }

    // 从四个方向中选取能够造成局面变化的方向
    getPossibleMoves = () => {
        const possibleMoves = [];
        for (let i = 0; i < allMoves.length; i++) {
            const game = new Game({ matrix: this.matrix });
            const dir = allMoves[i];
            game.moveDirection(dir);
            const moved = game.isBoardMoved(this.matrix, game.matrix);
            if (moved) {
                possibleMoves.push(dir);
            }
        }

        return possibleMoves;
    }

}

export default AI;
