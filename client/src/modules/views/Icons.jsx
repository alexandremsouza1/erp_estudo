import React, { useState } from "react"
import { Grid, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'
import Card from "../components/Card/Card"
import axios from 'axios'
import {
  LISTAR_TODOS_ANUNCIOS
} from '../constants/constants'


export default function Icons() {

  const anuncios = useSelector(state => state.anuncio)
  const dispatch = useDispatch()
  
  useState(async () => {
    await axios.get('http://localhost:5000/anuncio').then(resp => {
      dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: resp.data })
    })
  }, [])


  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title=""
              content={
                <div>
                  {anuncios.result.map(resp => {
                    return(
                      <h3>Título: {resp.titulo}</h3>
                    )
                  })}
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}


