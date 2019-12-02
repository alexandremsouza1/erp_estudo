import React from 'react'
import '../../../assets/css/Global/style.css'
import Card from "../../components/Card/Card"
import { Row, Col } from "react-bootstrap"

export default function VendasView() {

    return (
        <div className="content">
            <div >
                <div >
                    <Row>
                        <Col md={3}>
                            <Card content={
                                <div className="sc-dashboard__column">
                                    <div className="sc-dashboard__column-header">
                                        <p className="sc-dashboard__column-title">Para preparar</p>
                                        <p className="sc-dashboard__column-description">0 vendas</p>
                                    </div>
                                </div>
                            }></Card>
                        </Col>

                        <Col md={3}>
                            <Card content={
                                <div className="sc-dashboard__column">
                                    <div className="sc-dashboard__column-header">
                                        <p className="sc-dashboard__column-title">Pronto para enviar</p>
                                        <p className="sc-dashboard__column-description">1 venda</p>
                                    </div>
                                </div>
                            }></Card>
                        </Col>

                        <Col md={3}>
                            <Card content={
                                <div className="sc-dashboard__column">
                                    <div className="sc-dashboard__column-header">
                                        <p className="sc-dashboard__column-title">Em trânsito</p>
                                        <p className="sc-dashboard__column-description">2 vendas</p>
                                    </div>
                                </div>
                            }></Card>
                        </Col>

                        <Col md={3}>
                            <Card content={
                                <div className="sc-dashboard__column">
                                    <div className="sc-dashboard__column-header">
                                        <p className="sc-dashboard__column-title">Concluídas</p>
                                        <p className="sc-dashboard__column-description">55 vendas</p>
                                    </div>
                                </div>
                            }></Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}