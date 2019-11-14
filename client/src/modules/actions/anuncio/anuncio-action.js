import {
    SALVAR_ANUNCIO,
    ATUALIZAR_ANUNCIO,
    LISTAR_TODOS_ANUNCIOS
} from '../../constants/anuncio/anuncio-constants'

/**
 * Criador por: Felipe Miguel dos Santos
 * 
 * @param {*Título do anúncio} titulo 
 * @param {*Valor de venda} preco 
 * @param {*Descrição do anúncio} descricao 
 */

export const anuncioAction = (titulo, preco, descricao) => ({
    type: SALVAR_ANUNCIO,
    payload: {
        titulo: titulo,
        preco: preco,
        descricao: descricao
    }
});