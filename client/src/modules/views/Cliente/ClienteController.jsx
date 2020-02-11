import React from 'react'
import { useSelector } from 'react-redux'
import ClientView from '../Cliente/ClienteView'
import { Dimmer, Loader } from 'semantic-ui-react'
//import axios from 'axios'
import { CARREGANDO_AGUARDE } from '../../constants/constants'


export default function ClientController() {


    const store = useSelector(store => store.cliente)

    document.title = "Clientes"


    return (
        <Dimmer.Dimmable dimmer={store.isLoading}>
            <Dimmer active={store.isLoading} inverted>
                <Loader>{CARREGANDO_AGUARDE}</Loader>
            </Dimmer>
            <ClientView result={store.result}  />
        </Dimmer.Dimmable>
        
    )
}