import React from 'react';
import BloqueioView from './BloqueioView'

export default class BloqueioController extends React.Component {
    constructor(props){
        super(props)

        document.title = "Bloqueios"
    }
    render () {
        return (
            <>
                <BloqueioView/>
            </>
        )
    }
}