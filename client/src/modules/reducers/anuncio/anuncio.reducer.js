import {
    LISTAR_TODOS_ANUNCIOS
} from '../../constants/constants'

/**
 * 
 * created by: @author Felipe Miguel dos Santos
 * 
 * @param {* Estado corrente} state 
 * @param {* Ações} action 
 * @version 0.0.1
 */


function anuncioReducer(state = {result: [{}], isLoading: true}, action){
    switch(action.type){
        case LISTAR_TODOS_ANUNCIOS:
            return {...state, result: action.data, isLoading: action.isLoading}
         default:
             return state;   
    }
}

export default anuncioReducer
