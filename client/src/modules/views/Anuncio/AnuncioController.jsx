import React, {useEffect, useState} from 'react'
import AnuncioView from './AnuncioView';
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {LISTAR_TODOS_ANUNCIOS} from '../../constants/constants'

export default function AnuncioController() {

    const state = useSelector(store => store.anuncio)
    const dispatch = useDispatch()
    //const [anuncio, setAnuncio] = useState([])

    useState(()=>{
        axios.get('http://localhost:5000/anuncio').then(resp => {
           dispatch({type: LISTAR_TODOS_ANUNCIOS, data: resp.data, isLoading: false})
        }).catch(err => {console.log(err)})
    }, [])

        return(
            <div>
                <AnuncioView state={state} {...state}/>
            </div>
        );
    

}