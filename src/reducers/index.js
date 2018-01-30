import Game, { initState } from '../game';
import * as actionTypes from '../actions/actionTypes';

export default function gameReducer(state = initState, action) {
    const game = new Game(state);

    switch (action.type) {
        case actionTypes.INIT: {
            if (action.payload) {
                return { ...state, ...action.payload }
            }
            const matrix = game.matrix;
            return { ...state, matrix };            
        }

        case actionTypes.MOVE_LEFT: {
            const result = game.moveLeft();
            return { ...state, ...result };
        }

        case actionTypes.MOVE_RIGHT: {
            const result = game.moveRight();
            return { ...state, ...result };
        }

        case actionTypes.MOVE_UP: {
            const result = game.moveUp();
            return { ...state, ...result };
        }

        case actionTypes.MOVE_DOWN: {
            const result = game.moveDown();
            return { ...state, ...result };
        }

        case actionTypes.RESET: {
            const result = game._reset();
            return { ...state, ...result };
        }

        default:
            return state;
    }
}