import React, { useState } from "react";
import { Grid, Row, Col, Navbar, Form, FormControl} from "react-bootstrap";
import Card from "modules/components/Card/Card.jsx";
import ButtonB from "modules/components/CustomButton/CustomButton.jsx";
import LoadingCarregandoSolicitacao from "modules/components/Loading/LoadingCarregandoSolicitacao"
import iconSearch from '../../../assets/img/Zoom-icon24px.png'
import '../../../assets/css/Global/style.css';
import EditarAnuncio from './EditarAnuncio'
import { Button, Dropdown, Icon} from 'semantic-ui-react'
import ButtonUI from '@material-ui/core/Button';
import AlterarPreco from '../Anuncio/AlterarPreco'
import GerenciarVariacoes from '../Anuncio/GerenciarVariacoes'
import PerguntasAnuncio from '../Anuncio/PerguntasAnuncio'
import MudarStatus from '../Anuncio/MudarStatus'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlUI from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';

export default function AnuncioView(props) {
  document.title = "Anúncios"

  const [showModal, setShowModal] = useState(false)
  const [anuncio, setAnuncio] = useState({})
  const [isActive, setIsActive] = useState('active')
  const [isSelectedEstadoProduto, setIsSelectedEstadoProduto] = useState('novo')
  const [isSelectedFrete, setIsSelectedFrete] = useState(props.freteGratis)
  const [isShowVariationManager, setIsShowVariationManager] = useState(false)
  const [isShowPerguntas, setIsShowPerguntas] = useState(false)

  const handleChangeIsActive = (e) => {
    setIsActive(e.target.value)
  };

  const handleChangeIsSelectedEstadoProdutoNovo = () => {
    setIsSelectedEstadoProduto('novo')
  }
  const handleChangeIsSelectedEstadoProdutoUsado = () => {
    setIsSelectedEstadoProduto('usado')
  }

  function handleChangeSelectedFreteGratis() {
    setIsSelectedFrete(props.freteGratis)
  }

  function handleChangeSelectedFretePorContaDoComprador() {
    setIsSelectedFrete('')
  }

  const options = [
    { key: 'porcentagem', text: '%', value: 'porcentagem' },
    { key: 'real', text: 'R$', value: 'real' }
  ]

  /**
   * <FormControl componentClass="select" onChange={handleChangeIsActive}>
                                <option value="active">Ativos</option>
                                <option value="paused">Pausados</option>
                            </FormControl>
   */

  if (!props.isLoading) {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              
               
                  <>
                    <Navbar bg="light" expand="lg">
                      <Form inline>
                        <div>
                            <FormControlUI style={{marginRight: '15px', width: '100px'}}>
                              <InputLabel>Status</InputLabel>
                              <Select
                                value={isActive}
                                onChange={handleChangeIsActive}>
                                <MenuItem value="active">Ativos</MenuItem>
                                <MenuItem value="paused">Pausados</MenuItem>
                              </Select>
                            </FormControlUI>

                            <FormControl type="text" placeholder="Buscar por título" className="mr-sm-2" style={{ 'width': '500px' }} />
                           
                            <ButtonUI
                                  variant="contained"
                                  style={{margin: '0 10px 0', height: '40px'}}
                                  color="default"
                                  startIcon={<SearchIcon />}>
                                  Listar
                          </ButtonUI>
                              <br></br>
                          </div> 
                      </Form>
                      <br></br>
                    </Navbar>

                    {props.result.map((prop, key) => {
                      if (prop.status === isActive) {
                        return (
                          <div className="panel panel-primary" key={key}>
                            <div className="panel-heading" style={{backgroundColor: '#4682B4'}}>
                              <h3 className="panel-title">
                                 #{prop.id} - {prop.titulo}
                              </h3>
                            </div>

                            <div className="panel-body" style={{ "minHeight": "142px" }}>

                              <div className="col-md-2 col-xs-12 text-center">
                                <img src={prop.foto_principal} alt='fotoPrincipal' height='100' width='80' />

                              </div>

                              <div className="col-md-5 col-xs-12 text-center-xs">
                                
                                <font size="4pt">
                                  <a href={prop.link_anuncio} rel="noopener noreferrer" target='_blank'>{prop.titulo}</a>
                                </font>

                                <p style={{ "fontSize": "15px" }}>Mercado Envios {prop.freteGratis} - R$ {prop.custoFreteGratis.toLocaleString("pt-BR")} por envio</p>
                                <p>
                                  <span style={{ "fontSize": "12px" }} className="badge">{prop.quantidadeVendido} Vendidos</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-success">{prop.visualizacao} visitas</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-success">{prop.tipoAnuncio}</span>
                                  <span style={{ "fontSize": "12px" }} className="badge badge-danger" >{prop.sub_status}</span>
                                  <span className="badge badge-primary" style={{ "fontSize": "12px"}}>{prop.totalVariacoes} Variações </span>
                                </p>

                              </div>

                              <div className="col-md-3 col-xs-6 text-center-xs">

                                <font size="3">
                                  <b>
                                    <a style={{ "color": "blue" }}>
                                      R$ {prop.preco.toFixed(2).toLocaleString("pt-BR")}{' '}
                                    </a>
                                  </b>
                                </font>
                                <font size="3"> x {prop.estoque_total} disponíveis</font>

                                <br />
                                <span className="text-danger" style={{ "fontSize": "12px" }}>Tarifa R$ -{prop.tarifa.toFixed(2).toLocaleString("pt-BR")}</span>
                                <br />
                                <span className="text-danger" style={{ "fontSize": "12px" }}>Envio R$ -{prop.custoFreteGratis.toLocaleString("pt-BR")}</span>
                                <br />
                                <span className="badge badge-info" style={{ "fontSize": "12px" }}>Líquido R$ {prop.liquido.toFixed(2).toLocaleString("pt-BR")}</span>
                              </div>

                              {/*Botão de modificar anúncio*/}
                              <div className="col-md-2 text-center-xs">
                                <Button icon labelPosition='left' style={{ 'fontSize': '12px' }} 
                                  onClick={() => {
                                  setShowModal(true)
                                  setAnuncio(prop)
                                }}> Modificar
  
                                <Icon name='edit' />
                                </Button>

                                {/* Botão para editar pequenas alterações*/}
                                <Dropdown
                                  text='Ajuste'
                                  icon='bars'
                                  floating
                                  labeled
                                  button
                                  className='icon'
                                  style={{ 'fontSize': '12px' }}
                                >
                                  {/* Alterar preço */}
                                  <Dropdown.Menu>
                                    <Dropdown.Header icon='cog' content='Configurações' />
                             
                                  {prop.status === 'active' && 
                                  <>
                                    <Dropdown.Item>
                                      <a onClick={() => {
                                        props.setIsShowEditPrice(true)
                                        setAnuncio(prop)}}>
                                          <Dropdown.Item>
                                              Alterar preço
                                          </Dropdown.Item>
                                      </a>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                      <a onClick={() => {
                                        setIsShowVariationManager(true) 
                                        setAnuncio(prop)}}>
                                          <Dropdown.Item>
                                              Gerenciar variações
                                          </Dropdown.Item>
                                      </a>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                      <a onClick={() => {
                                        setIsShowPerguntas(true)
                                        setAnuncio(prop)}}>
                                          <Dropdown.Item>
                                              Visualizar perguntas
                                          </Dropdown.Item>
                                      </a>
                                    </Dropdown.Item>  
                                    <Dropdown.Item>
                                          <a onClick={() => {
                                            props.setIsShowConfirmPauseProduct(true)
                                            setAnuncio(prop)}}>
                                              <Dropdown.Item>
                                                  Pausar
                                              </Dropdown.Item>
                                          </a>
                                    </Dropdown.Item>

                                    <Dropdown.Item>Finalizar</Dropdown.Item>
                                    <Dropdown.Item>Replicar anúncio</Dropdown.Item>

                                   </>
                                    }
                                    {prop.status === 'paused' && 
                                      <Dropdown.Item>
                                        <a onClick={() => {
                                          props.setIsShowConfirmPauseProduct(true)
                                          setAnuncio(prop)}}>
                                        Reativar
                                        </a>
                                      </Dropdown.Item>
                                    }
  
                                  </Dropdown.Menu>
                                </Dropdown>

                              </div>
                            </div>
                          </div>
                        )
                      }
                    }
                    )}
                  </>
                
              
            </Col>
          </Row>
        </Grid>

        { /*MODAL*/}
        {isShowVariationManager && 
          <GerenciarVariacoes  
            {...anuncio} 
            isShowVariationManager={isShowVariationManager} 
            setIsShowVariationManager={setIsShowVariationManager}
            updateAvailableQuantity={props.updateAvailableQuantity}
          />}

        {isShowPerguntas &&
          <PerguntasAnuncio {...anuncio}
                            isShowPerguntas={isShowPerguntas} 
                            setIsShowPerguntas={setIsShowPerguntas}
        />}

        {props.isShowEditPrice && 
          <AlterarPreco options={options} 
                        propsAnuncio={anuncio}
                        {...anuncio} 
                        updateAnuncioPrice={props.updateAnuncioPrice}
                        isShowEditPrice={props.isShowEditPrice}
                        setIsShowEditPrice={props.setIsShowEditPrice}
                        loadingButton={props.loadingButton}
                        setLoadingButton={props.setLoadingButton}
                        disabledButton={props.disabledButton}
                        setDisabledButton={props.setDisabledButton}/>
        }
              
        {showModal &&
          <EditarAnuncio
            {...anuncio}
            setShowModal={setShowModal}
            showModal={showModal}
            isSelectedEstadoProduto={isSelectedEstadoProduto}
            handleChangeIsSelectedEstadoProdutoNovo={handleChangeIsSelectedEstadoProdutoNovo}
            handleChangeIsSelectedEstadoProdutoUsado={handleChangeIsSelectedEstadoProdutoUsado}
            isSelectedFrete={isSelectedFrete}
            handleChangeSelectedFreteGratis={handleChangeSelectedFreteGratis}
            handleChangeSelectedFretePorContaDoComprador={handleChangeSelectedFretePorContaDoComprador}
            freteGratis={props.freteGratis} />}

        {props.isShowConfirmPauseProduct && 
          <MudarStatus 
            isShowConfirmPauseProduct={props.isShowConfirmPauseProduct}
            setIsShowConfirmPauseProduct={props.setIsShowConfirmPauseProduct}
            loadingButton={props.loadingButton}
            setLoadingButton={props.setLoadingButton}
            disabledButton={props.disabledButton}
            setDisabledButton={props.setDisabledButton}
            {...anuncio}
            updateStatus={props.updateStatus}
          />}    

      </div>
    );
  } else {
    return (
      <>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                  <LoadingCarregandoSolicitacao width={450} />
              </Col>
            </Row>
          </Grid>
        </div>
      </>
    )
  }
}


