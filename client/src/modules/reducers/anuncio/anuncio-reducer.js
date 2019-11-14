import {
    SALVAR_ANUNCIO,
    ATUALIZAR_ANUNCIO,
    LISTAR_TODOS_ANUNCIOS
} from '../../constants/anuncio/anuncio-constants'

/**
 * 
 * Criado por: Felipe Miguel dos Santos
 * 
 * @param {* Estado corrente} state 
 * @param {* Ações} action 
 * @version 0.0.1
 */

export const anuncioReducer = (state = {}, action) => {
    switch(action.type){
        case SALVAR_ANUNCIO:
            return state.push(action.payload);
         default:
             return state;   
    }
}
