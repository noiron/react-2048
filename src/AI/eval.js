export function log2(x) {
    return Math.log(x) / Math.log(2);
}

function monotonicity(matrix) {
    // 记录四个方向上的分数
    const totals = [0, 0, 0, 0];

    // 左/右方向
    for (let i = 0; i < 4; i++) {   // 依次计算四行

        // current 和 next 都是用于标记第几列
        let current = 0;
        let next = current + 1;

        while (next < 4) {
            while (next < 4 && !matrix[i][next]) {
                next++;
            }
            if (next >= 4) { next--; }

            // 此时的 next = 4，或位置 [i, next] 是该行大于零的列上第一个有数的位置
            const currentValue = matrix[i][current] ? log2(matrix[i][current]) : 0;
            const nextValue = matrix[i][next] ? log2(matrix[i][next]) : 0; 

            if (currentValue > nextValue) {
                totals[0] += nextValue - currentValue;
            } else if (nextValue > currentValue) {
                totals[1] += currentValue - nextValue;
            }
            current = next;
            next++;
        }
    }


    // 上/下方向
    for (let j = 0; j < 4; j++) {
        // current 和 next 都是用于标记第几列
        let current = 0;
        let next = current + 1;
        
        while (next < 4) {
            while (next < 4 && !matrix[next][j]) {
                next++;
            }
            if (next >= 4) {
                next--;
            }
        
            const currentValue = matrix[current][j] ? log2(matrix[current][j]) : 0;
            const nextValue = matrix[next][j] ? log2(matrix[next][j]) : 0;
        
            if (currentValue > nextValue) {
                totals[2] += nextValue - currentValue;
            } else if (nextValue > currentValue) {
                totals[3] += currentValue - nextValue;
            }
            current = next;
            next++;
        }
    }

    // console.log(totals);

    return Math.max(totals[0], totals[1]) + Math.max(totals[2], totals[3]);
}


function edgePoint(matrix) {
    const v = 10;   // 四个顶点的分值
    const e = 2;    // 边的分值
    const o = 0;    // 中央的分值

    const bonus = [
        [100, 10, e, v],
        [10, o, o, e],
        [e, o, o, e],
        [v, e, e, v],
    ]

    // const bonus = [
    //     [10,8,7,6.5],
    //     [.5,.7,1,3],
    //     [-.5,-1.5,-1.8,-2],
    //     [-3.8,-3.7,-3.5,-3]
    // ];

    let result = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const value = matrix[i][j] > 0 ? log2(matrix[i][j]) : 0;
            result +=  value * bonus[i][j];
        }
    }
    return result;
}