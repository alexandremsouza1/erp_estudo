import React from 'react'
import '../../../assets/css/Global/style.css'
import { Row, Col } from "react-bootstrap"
import Panel from '../../components/Panel/Panel'
import UserCard from '../../components/UserCard/UserCard'
import imgParaPreparar from '../../../assets/img/delivery-box-icon128px.png'
import imgProntoParaEnviar from '../../../assets/img/delivery-truck-icon128px.png'
import imgEmTrasito from '../../../assets/img/truck-icon128px.png'


export default function VendasView() {

    return (
        <div className="content">
            <div >
                <div >
                    <Row>
                        <Col md={3}>
                            <UserCard 
                                name="Para preparar" 
                                userName="0 vendas"
                                avatar={imgParaPreparar}/>
                        </Col>

                        <Col md={3}>
                            <UserCard 
                                name="Pronto para enviar" 
                                userName="1 venda"
                                avatar={imgProntoParaEnviar}/>
                        </Col>

                        <Col md={3}>
                            <UserCard 
                                name="Em trânsito" 
                                userName="2 vendas"
                                avatar={imgEmTrasito}/>
                        </Col>

                        <Col md={3}>
                            <UserCard 
                                name="Concluídas"
                                userName="55 vendas"/>
                        </Col>
                    </Row>
                </div>
            </div>

            <Panel title="Título" content={
                <div>
                    <span>Conteúdo</span>
                </div>
            }></Panel>                    

        </div>
    )
}