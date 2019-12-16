import React from 'react'
import { useSelector } from 'react-redux'
import ClientView from '../Cliente/ClienteView'
import { Dimmer, Segment, Loader } from 'semantic-ui-react'
//import axios from 'axios'
import { CARREGANDO_AGUARDE } from '../../constants/constants'


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

    isLoading={store.isLoading}

    */

    return (
        <Dimmer.Dimmable as={Segment} dimmer={store.isLoading}>
            <Dimmer active={store.isLoading} inverted>
                <Loader>{CARREGANDO_AGUARDE}</Loader>
            </Dimmer>
            <ClientView result={store.result}  />
        </Dimmer.Dimmable>
        
    )
}