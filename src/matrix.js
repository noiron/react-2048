const initState = {
    grids: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    isMoved: false,
    score: 0
};

export default class Matrix {
    constructor({ grids, isMoved, score }) {
        this.grids = JSON.parse(JSON.stringify(grids));
        this.isMoved = isMoved || false;
        this.score = score || 0;

        // 游戏处于空白状态时，随机加入初始数字
        if (JSON.stringify(grids) === JSON.stringify(initState.grids)) {
            this.addInitNums();
        }
    }

    /**
     * 获取空白格子的坐标
     */
    getEmptyCoordinates = () => {
        const { grids } = this;
        const coordinates = [];

        grids.forEach((row, i) => {
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

    isBoardMoved = (preGrids, newGrids) => {
        return JSON.stringify(preGrids) !== JSON.stringify(newGrids);
    };

    checkGameOver = matrix => {};

    addRandomNumToMatrix = () => {
        const emptyCoords = this.getEmptyCoordinates();
        if (emptyCoords.length === 0) {
            return;
        }

        const [row, col] = this.getRandom(emptyCoords);
        const newGrids = this.grids;
        newGrids[row][col] = this.getRandom([2, 4]);
    };

    addInitNums = (quanity = 2) => {
        [...Array(2)].forEach(a => {
            this.addRandomNumToMatrix();
        })
    }

    rotateRight = () => {
        const { grids } = this;
        const newGrids = [];
        const len = grids.length;

        for (let i = 0; i < len; i++) {
            newGrids[i] = [];
            for (let j = 0; j < len; j++) {
                // 矩阵第 x 行经向右旋转，变成新矩阵的 len - 1 - x 列
                newGrids[i][j] = grids[len - 1 - j][i];
            }
        }
        this.grids = newGrids;
    };

    rotateLeft = () => {
        const { grids } = this;
        const newGrids = [];
        const len = grids.length;

        for (let i = 0; i < len; i++) {
            newGrids[i] = [];
            for (let j = 0; j < len; j++) {
                newGrids[i][j] = grids[j][len - 1 - i];
            }
        }
        this.grids = newGrids;
    };

    shiftRight = () => {
        const { grids } = this;
        const newGrids = grids.map(row => {
            const newRow = [];
            row.forEach(v => {
                if (v === 0) newRow.unshift(0);
                else newRow.push(v);
            });
            return newRow;
        });
        this.grids = newGrids;
    };

    shiftLeft = () => {
        const { grids } = this;
        const newGrids = grids.map(row => {
            const newRow = [];
            [...row].reverse().forEach(v => {
                if (v === 0) newRow.push(0);
                else newRow.unshift(v);
            });
            return newRow;
        });
        this.grids = newGrids;
    };

    combineNumToLeft = () => {
        const { grids } = this;

        grids.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value > 0 && value === grids[i][j + 1]) {
                    grids[i][j] *= 2;
                    grids[i][j + 1] = 0;
                    this.score += grids[i][j];
                } else if (value === 0 && grids[i][j + 1] > 0) {
                    grids[i][j] = grids[i][j + 1];
                    grids[i][j + 1] = 0;
                }
            })
        })
    };

    combineNumToRight = () => {
        const { grids } = this;
        const len = grids.length;

        grids.forEach((row, i) => {
            for (let j = len - 1; j >= 0; j--) {
                const value = grids[i][j];
                if (value > 0 && value === grids[i][j - 1]) {
                    grids[i][j] *= 2;
                    grids[i][j - 1] = 0;
                    this.score += grids[i][j];
                } else if (value === 0 && grids[i][j - 1] > 0) {
                    grids[i][j] = grids[i][j - 1];
                    grids[i][j - 1] = 0;
                }
            }
        })
    };

    move = callback => {
        const prevGrids = JSON.parse(JSON.stringify(this.grids));

        callback();
        
        if (this.isBoardMoved(prevGrids, this.grids)) {
            this.addRandomNumToMatrix();
        }
    };

    moveUp = () => {
        this.move(() => {
            this.rotateRight();
            this.shiftRight();
            this.combineNumToRight();           
            this.rotateLeft();
        });
    };

    moveDown = () => {
        this.move(() => {
            this.rotateLeft();
            this.shiftRight();
            this.combineNumToRight();
            this.rotateRight();
        });
    };

    moveLeft = () => {
        this.move(() => {
            this.shiftLeft();
            this.combineNumToLeft();
        });
    };

    moveRight = () => {
        this.move(() => {
            this.shiftRight();
            this.combineNumToRight();
        });
    };

    _reset = () => {
        const { grids, isMoved, score } = initState;
        this.grids = JSON.parse(JSON.stringify(grids));
        this.isMoved = isMoved;
        this.score = score;
        this.addInitNums();
        return this;
    }
}
