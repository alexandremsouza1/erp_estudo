import {createStore} from 'redux';
import {Reducers} from './modules/reducers'

/**
 * Criado por:
 * @name Felipe Miguel dos Santos
 * 
 */

export const store = createStore(Reducers);

store.subscribe(() => {
    console.log("Store foi modificada: ", store.getState())
});