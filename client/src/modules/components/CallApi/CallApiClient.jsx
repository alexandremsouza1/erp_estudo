import React, {useEffect} from "react";
import axios from 'axios'
import { LISTAR_TODOS_CLIENTES } from '../../constants/constants'
import {useDispatch} from 'react-redux'
import {DOMAIN} from '../../constants/constants'

export default function CallApiClient(prosp){
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(`${DOMAIN}/clientes`).then(resp => {
           dispatch({type: LISTAR_TODOS_CLIENTES, data: resp.data, isLoading: false})
        }).catch(err => err)
    }, [])

    return(<div></div>)
}