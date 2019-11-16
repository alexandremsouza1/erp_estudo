import {createStore} from 'redux';
import {rootReducer} from './modules/reducers/anuncio/anuncio-combine-reducer'

/**
 * Criado por:
 * @name Felipe Miguel dos Santos
 * 
 */

export const store = createStore(rootReducer);

store.subscribe(() => {
    console.log("Store foi modificada: ", store.getState())
});