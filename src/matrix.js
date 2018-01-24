export default class Matrix {
    constructor({ mat, isMoved, score }) {
        this.mat = mat;
        this.isMoved = isMoved || false;
        this.score = score || 0;

        this.addRandomNumToMatrix();
        this.addRandomNumToMatrix();
    }

    /**
     * 获取空白格子的坐标
     */
    getEmptyCoordinates = () => {
        const { mat } = this;
        const coordinates = [];

        mat.forEach((row, i) => {
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

    checkGameOver = matrix => {};

    addRandomNumToMatrix = () => {
        const emptyCoords = this.getEmptyCoordinates();
        if (emptyCoords.length === 0) {
            return;
        }

        const [row, col] = this.getRandom(emptyCoords);
        const newMatrix = this.mat;
        newMatrix[row][col] = this.getRandom([2, 4]);
    };

    rotateRight = () => {
        const { mat } = this;
        const newMatrix = [];
        const len = mat.length;

        for (let i = 0; i < len; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < len; j++) {
                // 矩阵第 x 行经向右旋转，变成新矩阵的 len - 1 - x 列
                newMatrix[i][j] = mat[len - 1 - j][i];
            }
        }
        this.mat = newMatrix;
    };

    rotateLeft = () => {
        const { mat } = this;
        const newMatrix = [];
        const len = mat.length;

        for (let i = 0; i < len; i++) {
            newMatrix[i] = [];
            for (let j = 0; j < len; j++) {
                newMatrix[i][j] = mat[j][len - 1 - i];
            }
        }
        this.mat = newMatrix;
    };

    shiftRight = () => {
        const { mat } = this;
        const newMatrix = mat.map(row => {
            const newRow = [];
            row.forEach(v => {
                if (v === 0) newRow.unshift(0);
                else newRow.push(v);
            });
            return newRow;
        });
        this.mat = newMatrix;
    };

    shiftLeft = () => {
        const { mat } = this;
        const newMatrix = mat.map(row => {
            const newRow = [];
            row.reverse().forEach(v => {
                if (v === 0) newRow.push(0);
                else newRow.unshift(v);
            });
            return newRow;
        });
        this.mat = newMatrix;
    };

    combineNumToLeft = () => {
        const { mat } = this;

        mat.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value > 0 && value === mat[i][j + 1]) {
                    mat[i][j] *= 2;
                    mat[i][j + 1] = 0;
                    this.score += mat[i][j];
                } else if (value === 0 && mat[i][j + 1] > 0) {
                    mat[i][j] = mat[i][j + 1];
                    mat[i][j + 1] = 0;
                }
            })
        })
    };

    combineNumToRight = () => {
        const { mat } = this;
        const len = mat.length;

        mat.forEach((row, i) => {
            for (let j = len - 1; j >= 0; j--) {
                const value = mat[i][j];
                if (value > 0 && value === mat[i][j - 1]) {
                    mat[i][j] *= 2;
                    mat[i][j - 1] = 0;
                    this.score += mat[i][j];
                } else if (value === 0 && mat[i][j - 1] > 0) {
                    mat[i][j] = mat[i][j - 1];
                    mat[i][j - 1] = 0;
                }
            }
        })
    };

    move = callback => {
        const prevMatrix = JSON.parse(JSON.stringify(this.mat));

        callback();
        
        if (this.isBoardMoved(prevMatrix, this.mat)) {
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
}
