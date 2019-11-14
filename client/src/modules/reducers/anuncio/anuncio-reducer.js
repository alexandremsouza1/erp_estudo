import {
    SALVAR_ANUNCIO,
    ATUALIZAR_ANUNCIO,
    LISTAR_TODOS_ANUNCIOS
} from '../../constants/anuncio/anuncio-constants'

const anuncioReducer = (state = {}, action) => {
    switch(action.type){
        case SALVAR_ANUNCIO:
            return {...state, state}
    }
}
