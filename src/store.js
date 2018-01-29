import { createStore } from 'redux';
import board from './reducers';

export const store = createStore(board);
