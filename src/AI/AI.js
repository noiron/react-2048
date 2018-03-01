import Game from '../game';
import * as _ from 'lodash';

const allMoves = ['left', 'right', 'up', 'down'];

class AI {
    constructor(matrix, type, depth, alpha, beta) {
        this.matrix = matrix;
        this.game = new Game({ matrix });
        this.type = type || 'PLAYER';

        this.depth = depth || 0;
        // this.alpha = alpha || -Infinity;
        // this.beta = beta || Infinity;
    }

    // 对当前局面的一个打分
    eval = () => {
        // TODO: 先直接用空格的数量来评分
        return this.game.getEmptyCoordinates().length;
    }

    search() {
        const possibleMoves = this.getPossibleMoves();

        // 随机返回一个方向
        // const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

        // 到达给定的深度，直接使用 eval() 函数进行打分
        if (this.depth >= 5) {
            return {
                score: this.eval()
            }
        }

        if (this.game.gameOver) {
            return {
                score: 0
            }
        }

        // type = 'PLAYER', max 节点
        if (this.type === 'PLAYER') {
            let maxScore = 0;
            let currentDirection = null;

            for (let i = 0; i < possibleMoves.length; i++) {
                const dir = possibleMoves[i];
                // 复制一个 game 对象
                const newGame = new Game({ matrix: _.cloneDeep(this.matrix )});
                // 将新建的 game 向给定的方向移动
                newGame.moveDirection(dir);

                // 利用移动以后的 game 对象生成一个 ai 对象
                const newAI = new AI(_.cloneDeep(newGame.matrix), 'COMPUTER', this.depth + 1);

                const childScore = newAI.search().score;

                if (childScore > maxScore) {
                    maxScore = childScore;
                    currentDirection = dir;
                }
            }

            return {
                score: maxScore,
                move: currentDirection,
            }
        } 
        
        // type === 'COMPUTER', min 节点
        else if (this.type === 'COMPUTER') {
            let minScore = 1000;
            let currentPos = null;

            const possiblePositions = this.game.getEmptyCoordinates();

            if (possiblePositions.length > 0) {
                for (let i = 0; i < possiblePositions.length; i++) {
                    const pos = possiblePositions[i];
                    // 复制一个 game 对象
                    const newGame = new Game({ matrix: _.cloneDeep(this.matrix )});

                    // 向 game 对象的给定位置添加一个数字
                    newGame.addNumToPos(pos[0], pos[1], 2);

                    // 利用添加了一个新的数字之后 game 对象生成一个 ai 对象
                    const newAI = new AI(_.cloneDeep(newGame.matrix), 'PLAYER', this.depth + 1);

                    const childScore = newAI.search().score;

                    if (childScore < minScore) {
                        minScore = childScore;
                        currentPos = pos;
                    }
                }
            } else {
                minScore = 0;
            }

            return {
                score: minScore,
                move: null,
            }
        }
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

// /** 
//  * 用两个不同的状态表示当前由谁进行操作
//  * 'MOVE' 表示由 ai 模拟的移动操作
//  * 'ADD' 表示向棋盘上添加数字的操作
// */
// function changeTurn(player) {
//     return player === 'MOVE' ? 'ADD' : 'MOVE';
// }
