import React, {useEffect} from "react";
import axios from 'axios'
import { LISTAR_TODOS_ANUNCIOS } from '../../constants/constants'
import {useDispatch} from 'react-redux'
import {DOMAIN} from '../../constants/constants'

/**
 * Criador por: @author Felipe M. Santos
 */

export default function CallApiAnuncio(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(`${DOMAIN}/anuncio`).then(resp => {
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: resp.data, isLoading: false })
        }).catch(err => { console.log(err) })
    }, [])

    return(
        <div></div>
    )
}