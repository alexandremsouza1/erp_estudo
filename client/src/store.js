import {createStore} from 'redux';
import {Reducers} from './modules/reducers'

export const store = createStore(Reducers);

store.subscribe(() => {
    console.log("Store foi modificada: ", store.getState())
});