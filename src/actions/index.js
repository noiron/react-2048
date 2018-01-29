import * as actionTypes from './actionTypes';

const actionCreator = type => ({ type });

export const moveLeft = () => actionCreator(actionTypes.MOVE_LEFT);
export const moveRight = () => actionCreator(actionTypes.MOVE_RIGHT);
export const moveUp = () => actionCreator(actionTypes.MOVE_UP);
export const moveDown = () => actionCreator(actionTypes.MOVE_DOWN);

export const init = (payload = null) => ({
    type: actionTypes.INIT,
    payload
});