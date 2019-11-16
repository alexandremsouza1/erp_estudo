import {combineReducers} from 'redux';
import {anuncioReducer} from './anuncio-reducer';

/**
 * Criado por: 
 * @name Felipe Miguel dos Santos
 * @version 0.0.1
 */

export const rootReducer = combineReducers({
    dados: anuncioReducer
});