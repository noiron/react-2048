import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import undoable, { excludeAction } from 'redux-undo';

import game from './reducers';

const initialHistory = JSON.parse(localStorage.getItem('2048_game_state') || null);

const undoBoardReducer = undoable(game, {
    limit: 10,
    // ignoreInitialState: false,
    filter: excludeAction('INIT'),
})

export const store = createStore(
    undoBoardReducer,
    initialHistory,
    devToolsEnhancer()
);
