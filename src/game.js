export const initState = {
    matrix: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    score: 0,
    highScore: 0,
    gameOver: false,
};

export default class Game {
    constructor({ matrix, score, highScore, gameOver }) {
        this.matrix = JSON.parse(JSON.stringify(matrix));
        this.score = score || 0;
        this.highScore = highScore || 0;
        this.gameOver = gameOver || false;

        // 游戏处于空白状态时，随机加入初始数字
        if (JSON.stringify(matrix) === JSON.stringify(initState.matrix)) {
            this.addInitNums();
        }
    }

    /**
     * 获取空白格子的坐标
     */
    getEmptyCoordinates = () => {
        const { matrix } = this;
        const coordinates = [];

        matrix.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value === 0) {
                    coordinates.push([i, j]);
                }
            });
        });

        return coordinates;
    };

    getRandom = arr => {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    isBoardMoved = (preMatrix, newMatrix) => {
        return JSON.stringify(preMatrix) !== JSON.stringify(newMatrix);
    };

    /**
     * 检查任一数字周围是否有相同的数字
     * 还需额外检查是否还有空格，以判断游戏是否结束
     */
    checkGameOver = () => {
        const { matrix } = this;
        let len = matrix.length;

        function getNeighbors(i, j) {
            const neighbors = [];
            // if (i - 1 >= 0) neighbors.push(matrix[i - 1][j]);  // 左侧
            // if (j - 1 >= 0) neighbors.push(matrix[i][j - 1]);  // 上侧
            if (i + 1 < len) neighbors.push(matrix[i + 1][j]);  // 右侧
            if (j + 1 < len) neighbors.push(matrix[i][j + 1]);  // 下侧
            return neighbors;
        }

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                const neighbors = getNeighbors(i, j);
                if (neighbors.includes(matrix[i][j])) {
                    return false;
                }
            }
        }
        return true;
    };

    addRandomNumToMatrix = () => {
        const emptyCoords = this.getEmptyCoordinates();
        if (emptyCoords.length === 0) {
            return;
        }

        const [row, col] = this.getRandom(emptyCoords);
        const newMatrix = copyMatrix(this.matrix);
        newMatrix[row][col] = this.getRandom([2, 4]);

        this.matrix = newMatrix;
        return newMatrix;
    };

    addInitNums = (quanity = 2) => {
        [...Array(2)].forEach(a => {
            this.addRandomNumToMatrix();
        })
        return {
            matrix: copyMatrix(this.matrix)
        }
    }

    rotateRight = () => {
        const { matrix } = this;
        const newMatrix = [];
        const len = matrix.length;

        for (let i = 0; i < len; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < len; j++) {
                // 矩阵第 x 行经向右旋转，变成新矩阵的 len - 1 - x 列
                newMatrix[i][j] = matrix[len - 1 - j][i];
            }
        }
        this.matrix = newMatrix;
    };

    rotateLeft = () => {
        const { matrix } = this;
        const newMatrix = [];
        const len = matrix.length;

        for (let i = 0; i < len; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < len; j++) {
                newMatrix[i][j] = matrix[j][len - 1 - i];
            }
        }
        this.matrix = newMatrix;
    };

    shiftRight = () => {
        const { matrix } = this;
        const newMatrix = matrix.map(row => {
            const newRow = [];
            row.forEach(v => {
                if (v === 0) newRow.unshift(0);
                else newRow.push(v);
            });
            return newRow;
        });
        this.matrix = newMatrix;
    };

    shiftLeft = () => {
        const { matrix } = this;
        const newMatrix = matrix.map(row => {
            const newRow = [];
            [...row].reverse().forEach(v => {
                if (v === 0) newRow.push(0);
                else newRow.unshift(v);
            });
            return newRow;
        });
        this.matrix = newMatrix;
    };

    combineNumToLeft = () => {
        const { matrix } = this;

        matrix.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value > 0 && value === matrix[i][j + 1]) {
                    matrix[i][j] *= 2;
                    matrix[i][j + 1] = 0;
                    this.score += matrix[i][j];
                    if (this.score > this.highScore) this.highScore = this.score;
                } else if (value === 0 && matrix[i][j + 1] > 0) {
                    matrix[i][j] = matrix[i][j + 1];
                    matrix[i][j + 1] = 0;
                }
            })
        })
    };

    combineNumToRight = () => {
        const { matrix } = this;
        const len = matrix.length;

        matrix.forEach((row, i) => {
            for (let j = len - 1; j >= 0; j--) {
                const value = matrix[i][j];
                if (value > 0 && value === matrix[i][j - 1]) {
                    matrix[i][j] *= 2;
                    matrix[i][j - 1] = 0;
                    this.score += matrix[i][j];
                    if (this.score > this.highScore) this.highScore = this.score;
                } else if (value === 0 && matrix[i][j - 1] > 0) {
                    matrix[i][j] = matrix[i][j - 1];
                    matrix[i][j - 1] = 0;
                }
            }
        })
    };

    move = callback => {
        const prevMatrix = JSON.parse(JSON.stringify(this.matrix));

        callback();
        
        if (this.isBoardMoved(prevMatrix, this.matrix)) {
            this.addRandomNumToMatrix();
        }

        if (this.getEmptyCoordinates().length === 0) {
            if (this.checkGameOver()) {
                console.log('game over!!!');
                this.gameOver = true;
            }
        }

        const matrix = copyMatrix(this.matrix);
        const { score, gameOver, highScore } = this;

        return {
            matrix,
            score,
            gameOver,
            highScore,
        }
    };

    moveUp = () => {
        return this.move(() => {
            this.rotateRight();
            this.shiftRight();
            this.combineNumToRight();           
            this.rotateLeft();
        });
    };

    moveDown = () => {
        return this.move(() => {
            this.rotateLeft();
            this.shiftRight();
            this.combineNumToRight();
            this.rotateRight();
        });
    };

    moveLeft = () => {
        return this.move(() => {
            this.shiftLeft();
            this.combineNumToLeft();
        });
    };

    moveRight = () => {
        return this.move(() => {
            this.shiftRight();
            this.combineNumToRight();
        });
    };

    _reset = () => {
        const { matrix, score } = initState;
        this.matrix = JSON.parse(JSON.stringify(matrix));
        this.score = score;
        this.addInitNums();
        return {
            matrix: copyMatrix(this.matrix),
            score: 0
        };
    }
}


function copyMatrix(matrix) {
    return JSON.parse(JSON.stringify(matrix));
}
