import React, { useState } from "react";
import { Grid, Row, Col, Table, Navbar, Form, Badge, FormControl, Modal } from "react-bootstrap";
import Card from "modules/components/Card/Card.jsx";
import Button from "modules/components/CustomButton/CustomButton.jsx";
import LoadingCarregandoSolicitacao from "modules/components/Loading/LoadingCarregandoSolicitacao"
import iconSearch from '../../../assets/img/Zoom-icon24px.png'
import '../../../assets/css/Global/style.css';

export default function TableList(props) {

  const [showModal, setShowModal] = useState(false)
  const [dadosAnuncio, setDadosAnuncio] = useState({})

  if (!props.isLoading) {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={props.title}
                category="Anúncios Ativos"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <Navbar bg="light" expand="lg">
                      <Form inline>
                        <FormControl type="text" placeholder="Buscar por título" className="mr-sm-2" style={{ 'width': '500px' }} />
                        <Button round ><img src={iconSearch} alt='search'></img></Button>
                      </Form>
                    </Navbar>

                    <Table striped hover>
                      <tbody>
                        {props.result.map(prop => {
                          return (
                            <tr key={prop.id}>
                              <td><img src={prop.foto_principal} alt='fotoPrincipal' height='100' width='80' /></td>
                              <td>
                                <a href={prop.link_anuncio} rel="noopener noreferrer" target='_blank'>{prop.titulo}</a>
                                <br />#{prop.id}
                                <br></br>
                                <Badge variant="warning">
                                  <b>Status: {prop.status === 'active' ? 'Ativo' : 'Inativo'}</b>
                                </Badge>
                              </td>

                              <td>
                                <Badge>R$: {prop.preco}</Badge>
                                <br />
                                <Badge>{prop.visualizacao} Visitas</Badge>
                                <br />
                                Estoque total: {prop.estoque_total}
                              </td>

                              <td>
                                <Button bsStyle="info" pullRight fill onClick={() => {
                                  setDadosAnuncio(prop)
                                  setShowModal(true)
                                }}>
                                  <i className='fa fa-edit'></i>
                                  Editar
                                 </Button>
                              </td>
                            </tr>
                          )
                        }
                        )}
                      </tbody>
                    </Table>
                  </>
                }
              />
            </Col>
          </Row>
        </Grid>


        {showModal && 
        
        <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="width_modal" >
          <Modal.Header closeButton >
            <Modal.Title>{dadosAnuncio.titulo}</Modal.Title>
          </Modal.Header>

          <Modal.Body >
            <Form inline>
              <FormControl type="text" placeholder="Título" className="mr-sm-2" style={{ 'width': '500px' }} value={dadosAnuncio.titulo}/>
            </Form>

          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Fechar
            </Button>
            <Button variant="primary" onClick={() => setShowModal(false)}>
              Salvar
            </Button>
          </Modal.Footer>

        </Modal>}

      </div>
    );
  } else {
    return (
      <>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title={props.title}
                  category="Anúncios Ativos"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <LoadingCarregandoSolicitacao width={450} />
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>



      </>
    )
  }
}



