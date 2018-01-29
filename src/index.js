import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App, { setLocalStorageState } from './App';
import { store } from './store'; 
import registerServiceWorker from './registerServiceWorker';

store.subscribe(() => {
    setLocalStorageState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
