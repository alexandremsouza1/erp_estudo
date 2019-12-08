import React, { useState } from "react";
import { Grid, Row, Col, Navbar, Form, FormControl, Modal } from "react-bootstrap";
import Card from "modules/components/Card/Card.jsx";
import Button from "modules/components/CustomButton/CustomButton.jsx";
import LoadingCarregandoSolicitacao from "modules/components/Loading/LoadingCarregandoSolicitacao"
import iconSearch from '../../../assets/img/Zoom-icon24px.png'
import '../../../assets/css/Global/style.css';
import RadioButton from '../../components/CustomRadio/CustomRadio'
import FormInput from '../../components/FormInput/FormInput'

export default function AnuncioView(props) {
  document.title = "Anúncios"

  const [showModal, setShowModal] = useState(false)
  const [anuncio, setAnuncio] = useState({})
  const [onCheck, setOnCheck] = useState('1')

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
                      <div className="form-group">
                        <div className="col-sm-2">
                            <RadioButton
                              option="1"
                              name="radio"
                              label="Ativos"
                              onChange={() => { setOnCheck('1') }}
                              checked={onCheck} />
                        </div>
                        <div className="col-sm-10">
                          <RadioButton
                            option="2"
                            name="radio"
                            label="Inativos"
                            onChange={() => { setOnCheck('2') }}
                            checked={onchange} />
                        </div>
                      </div>
                    </Navbar>

                    {props.result.map(prop => {
                      if (prop.status === "paused") {
                        return (
                          <div className="panel panel-primary">
                            <div className="panel-heading">
                              <h3 className="panel-title">
                                {prop.titulo}
                              </h3>
                            </div>
                            <div className="panel-body" style={{ "min-height": "142px" }}>
                              <div className="col-md-2 col-xs-12 text-center" style={{ "padding-left": "0px;" }}>
                                <img src={prop.foto_principal} alt='fotoPrincipal' height='100' width='80' />
                              </div>
                              <div className="col-md-5 col-xs-12 text-center-xs">
                                <font size="4pt">
                                  <a href={prop.link_anuncio} rel="noopener noreferrer" target='_blank'>{prop.titulo}</a>
                                </font>
                                <p>
                                  <i className="fa fa-tag text-primary"></i>
                                  <i className="fa fa-star text-primary"></i>
                                  <i className="fa fa-shopping-cart text-primary"></i>
                                  <a style={{ "fontSize": "14px", "marginLeft": "5px" }} rel="noopener noreferrer" target='_blank' full_base="1">#{prop.id}</a>
                                  <span className="badge badge-primary" style={{ "fontSize": "12px", "marginLeft": "5px" }}>{prop.totalVariacoes} Variações</span>
                                </p>
                                <p style={{ "fontSize": "15px" }}>Mercado Envios {prop.freteGratis} - R$ {prop.custoFreteGratis.toLocaleString("pt-BR")} por envio</p>
                                <p>
                                  <span style={{ "fontSize": "12px" }} className="badge">{prop.quantidadeVendido} Vendidos</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-success">{prop.visualizacao} visitas</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-success">{prop.tipoAnuncio}</span>
                                </p>
                              </div>
                              <div className="col-md-3 col-xs-6 text-center-xs">
                                <font size="3">
                                  <b>
                                    <a style={{ "color": "red" }}>
                                      R$ {prop.preco.toLocaleString("pt-BR")}{' '}
                                    </a>
                                  </b>
                                </font>
                                <font size="3">
                                  x {prop.estoque_total} disponíveis
                              </font>
                                <br />
                                <span className="text-danger" style={{ "fontSize": "12px" }}>Tarifa R$ {prop.tarifa.toLocaleString("pt-BR")}</span>
                                <br />
                                <span className="text-danger" style={{ "fontSize": "12px" }}>Custo Fixo R$ {prop.custoFreteGratis.toLocaleString("pt-BR")}</span>
                                <br />
                                <span className="badge badge-info" style={{ "fontSize": "12px" }}>Líquido R$ {prop.liquido.toLocaleString("pt-BR")}</span>
                              </div>
                              <div className="col-md-2 col-xs-6 text-center-xs">
                                <a className="btn btn-sm btn-flat btn-primary btn-rad" onClick={() => {
                                  setShowModal(true)
                                  setAnuncio(prop)
                                }}> Modificar</a>
                                <div className="btn-group">
                                  <button data-toggle="dropdown" type="button" className="btn btn-sm btn-flat btn-primary btn-rad dropdown-toggle">
                                    <i className="fa fa-cog"></i>
                                    <span className="caret"></span>
                                  </button>
                                  <ul role="menu" className="dropdown-menu dropdown-menu-right">
                                    <li>
                                      <a>Gerenciar Imagens</a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    }
                    )}
                  </>
                }
              />
            </Col>
          </Row>
        </Grid>

        { /*MODAL*/}
        {showModal &&
          <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="width_modal" >
            <Modal.Header closeButton >
              <Modal.Title>Modificar Anúncio</Modal.Title>
            </Modal.Header>

            <Modal.Body sytle={{ "width": "100px" }}>


              <div style={{ "marginLeft": "10px", "backgroundColor": "blue" }}>

              </div>

              <Row>
                <Col md={10}>
                  <FormInput label="Título" value={anuncio.titulo} style={{ "color": "blue" }} disabled="true" />
                </Col>
                <Col md={2}>
                  <FormInput label="Preço" value={anuncio.preco.toLocaleString("pt-BR")} style={{ "color": "blue" }} />
                </Col>
              </Row>

              <Row>
                <Col md={5}>
                  <FormInput label="Tipo de Anúncio" value={anuncio.tipoAnuncio} style={{ "color": "blue" }} />
                </Col>
                <Col md={7}>
                  <FormInput label="Link Vídeo YouTube" value={""} style={{ "color": "blue" }} placeholder="Informe aqui o link do YouTube" />
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormInput label="Descrição somente texto" value={anuncio.description} style={{ "color": "blue" }} componentClass="textarea" rows="15" />
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <FormInput label="Garantia" value={""} style={{ "color": "blue" }} componentClass="textarea" rows="4" />
                </Col>
              </Row>

            </Modal.Body>

            <Modal.Footer>
              <Button onClick={() => setShowModal(false)} bsStyle="primary" fill>
                Fechar
            </Button>
              <Button bsStyle="primary" fill onClick={() => setShowModal(false)}>
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


