import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import ControlleEstoqueView from './ControlleEstoqueView'
import {
  LISTAR_TODOS_ANUNCIOS
} from '../../constants/constants'


export default function Icons() {

  const anuncios = useSelector(state => state.anuncio)
  const dispatch = useDispatch()
  document.title = "Controle de Estoque"
  
  useEffect(() => {
     axios.get('http://localhost:5000/anuncio').then(resp => {
      dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: resp.data })
    })
  }, [])


  return (
    <ControlleEstoqueView></ControlleEstoqueView>
  );
}


