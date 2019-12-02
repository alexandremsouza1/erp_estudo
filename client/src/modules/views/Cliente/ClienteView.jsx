import React from 'react'
import { Grid, Row, Col } from "react-bootstrap";
import Carregando from '../../components/Loading/LoadingCarregandoSolicitacao'
import { Card } from "modules/components/Card/Card.jsx";
import imgWhatsapp from '../../../assets/img/WhatsApp-icon.png'
import userAvatar from '../../../assets/img/useravatar.png'
import Panel from '../../components/Panel/Panel'

export default function ClientView(props) {
    return (
        <div className="content">
            <Grid fluid>
                {props.result.map(resp => {
                    if (!props.isLoading) {
                        return (
                            <>

                                <Panel
                                    title={<>{resp.primeiro_nome} {resp.last_name}</>}
                                    content={

                                        <Row>

                                            <Col lg={4} style={{"width": "75px"}}>
                                                <img src={userAvatar} alt='avatar' height='55' width='55' ></img><br></br>
                                            </Col>

                                            <Col lg={6}>
                                                <b>Whatsapp: </b>
                                                <a href={resp.numero_contato === 'Não informado' ? null : resp.numero_contato} target='_blank' rel="noopener noreferrer">{resp.numero_contato}</a>
                                                <img src={imgWhatsapp} alt='zap'></img><br></br>
                                                <b>Usuario: </b>{resp.nickname}<br></br>
                                                <b>Documento: </b>{resp.tipo_documento} {resp.documento}<br></br>
                                            </Col>

                                            <Col lg={2} style={{"width": "300px"}}>
                                                <b>Cidade: </b>{resp.cidade}<br></br>
                                                <b>Estado: </b>{resp.estado}<br></br>
                                            </Col>
                                        </Row>


                                    }></Panel>
                            </>
                        )
                    } else {
                        return (
                            <div key={resp.id}>
                                <Carregando width={500} />
                            </div>
                        )
                    }
                })}
            </Grid>
        </div>
    )
}