import {LISTAR_TODOS_CLIENTES} from '../../constants/constants'

export default function clienteReducer(state = {result: [{}], isLoading: true}, action){
    switch(action.type){
        case LISTAR_TODOS_CLIENTES: {
            return {...state, result: action.data, isLoading: action.isLoading}
        }
        default:
            return state
    }
}