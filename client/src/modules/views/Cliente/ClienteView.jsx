import React from 'react'
import { Grid, Row, Col, Table } from "react-bootstrap";
import Carregando from '../../components/Loading/LoadingCarregandoSolicitacao'

export default function ClientView(props) {

    return (
        <div className="content">
            <Grid fluid>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Número de contato</th>
                            <th>Nome</th>
                            <th>Documento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.result.map(resp => {
                            if(!props.isLoading){
                                return (
                                    <tr key={resp.id}>
                                        <td>{resp.id}</td>
                                        <td>{resp.nickname}</td>
                                        <td>{resp.numero_contato}</td>
                                        <td>{resp.primeiro_nome} {resp.last_name}</td>
                                        <td>{resp.documento}</td>
                                    </tr>
                                )
                            }else{
                               return (
                                    <Carregando width={500}/>
                               )
                            }
                            
                        })}
                    </tbody>
                </Table>
            </Grid>
        </div>

    )

}