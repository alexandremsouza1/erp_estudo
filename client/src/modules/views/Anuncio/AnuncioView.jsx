import React, { useState } from "react";
import { Grid, Row, Col, Table, Navbar, Form, Badge, FormControl, Modal } from "react-bootstrap";
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
  const [api, setApi] = useState({})
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
                      <div>
                        <RadioButton
                          option="1"
                          name="radio"
                          label="Ativos"
                          onChange={() => { setOnCheck('1') }}
                          checked={onCheck} />
                        <RadioButton
                          option="2"
                          name="radio"
                          label="Inativos"
                          onChange={() => { setOnCheck('2') }}
                          checked={onchange} />
                      </div>
                    </Navbar>

                    {props.result.map(prop => {
                      if (prop.status === (onCheck === '1' ? 'active' : 'paused')) {
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
                                  <a style={{ "fontSize": "14px" }} href={prop.link_anuncio} rel="noopener noreferrer" target='_blank' full_base="1">#{prop.id}</a>
                                  <span className="badge badge-primary" style={{ "fontSize": "12px" }}>{prop.totalVariacoes} Variações</span>
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
                                  setApi(prop)
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
        {console.log(api.titulo)}
        {showModal &&
          <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="width_modal" >
            <Modal.Header closeButton >
              <Modal.Title>Modificar Anúncio</Modal.Title>
            </Modal.Header>

            <Modal.Body sytle={{ "width": "100px" }}>

              <Form>
                <div style={{ "marginLeft": "10px" }}>
                  <FormInput ncols={["col-md-4"]} label="Título" style={{ "width": "500px" }} />
                </div>

                <div className="mb-3">
                  <RadioButton
                    option="1"
                    name="radio"
                    label="Novo"
                    onChange={() => { setOnCheck('1') }}
                    checked={onCheck} />
                  <RadioButton
                    option="2"
                    name="radio"
                    label="Usado"
                    onChange={() => { setOnCheck('2') }}
                    checked={onchange} />
                </div>
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


