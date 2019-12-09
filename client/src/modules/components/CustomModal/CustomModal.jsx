import React from 'react'
import {Row, Col, FormControl, Modal } from "react-bootstrap";
import Button from "modules/components/CustomButton/CustomButton.jsx";
import FormInput from '../../components/FormInput/FormInput'

export default function CustomModal(props) {
    return (
        <Modal show={props.showModal} onHide={() => props.setShowModal(false)} dialogClassName="width_modal" >
            <Modal.Header closeButton >
                <Modal.Title>Modificar Anúncio</Modal.Title>
            </Modal.Header>

            <Modal.Body sytle={{ "width": "100px" }}>

                <div style={{ "marginLeft": "10px", "backgroundColor": "blue" }}>

                </div>

                <Row>
                    <Col md={10}>
                        <FormInput label="Título" value={props.titulo} style={{ "color": "blue" }} disabled={true} />
                    </Col>
                    <Col md={2}>
                        <FormInput label="Preço" value={props.preco.toLocaleString("pt-BR")} style={{ "color": "blue" }} />
                    </Col>
                </Row>

                <Row>
                    <Col md={5}>
                        <label>Tipo de Anúncio</label>
                        <FormControl componentClass='select'>
                            <option value='classico'>{props.tipoAnuncio_id === 'gold_special' ? props.tipoAnuncio : 'Clássico - Exposição alta'}</option>
                            <option value='premium'>{props.tipoAnuncio_id === 'gold_pro' ? props.tipoAnuncio : 'Premium - Exposição máxima'}</option>
                        </FormControl>
                    </Col>
                    <Col md={7}>
                        <FormInput label="Link Vídeo YouTube" value={props.video_id} style={{ "color": "blue" }} placeholder="Informe aqui o link do YouTube" />
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <FormInput label="Descrição somente texto" value={props.description} style={{ "color": "blue" }} componentClass="textarea" rows="15" />
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <FormInput label="Garantia" value={""} style={{ "color": "blue" }} componentClass="textarea" rows="4" />
                    </Col>
                </Row>

            </Modal.Body>

            <Modal.Footer>
                <Button bsStyle="primary" fill onClick={() => props.setShowModal(false)}>
                    Salvar
                </Button>

                <Button onClick={() => props.setShowModal(false)} bsStyle="danger" fill>
                    Fechar
                </Button>
            </Modal.Footer>

        </Modal>
    )
}