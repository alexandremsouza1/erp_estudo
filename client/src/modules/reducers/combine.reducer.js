import {combineReducers} from 'redux';
import anuncioReducer from './anuncio/anuncio.reducer';
import clienteReducer from './cliente/cliente.reducer';
import dashboardReducer from './dashboard/dashboard.reducer'

/**
 * Criado por: 
 * @name Felipe Miguel dos Santos
 * @version 0.0.1
 */

export const reducers = combineReducers({
    anuncio: anuncioReducer,
    cliente: clienteReducer,
    dashboard: dashboardReducer
});
