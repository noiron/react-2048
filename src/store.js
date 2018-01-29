import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import board from './reducers';

export const store = createStore(
    board,
    devToolsEnhancer()
);
