import React from 'react'
import {useSelector} from 'react-redux'
import ClientView from '../Cliente/ClienteView'
//import axios from 'axios'
//import { LISTAR_TODOS_CLIENTES } from '../../constants/constants'


export default function ClientController() {


    const store = useSelector(store => store.cliente)

    document.title = "Clientes"

    /*
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('http://localhost:5000/clientes').then(resp => {
           dispatch({type: LISTAR_TODOS_CLIENTES, data: resp.data, isLoading: false})
        }).catch(err => err)
    }, [])
    */

    return (
        <ClientView result={store.result} isLoading={store.isLoading} />
    )
}