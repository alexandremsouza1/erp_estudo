import React from 'react'
import { Button, Modal, Header, Icon, Table } from 'semantic-ui-react'
import EditarVariacao from './EditarVariacao'
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import ButtonUI from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { DialogActions } from '@material-ui/core';


export default class GerenciarVariacoes extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isShowEditarAnuncio: false,
      attributeCombinations: {},
      imageVariation: [],
      imagesAnuncio: [],
      vart : '',
      json: {}
    }
  }

  setProps = (attr) => {
    this.setState({
      isShowEditarAnuncio: true,
      attributeCombinations: attr
    })
  }

  setImageVariation = (imageVariation) => {
    this.setState({
      imageVariation: imageVariation
    })
  }

  getImageVariation = (json, variation) => {
    let urls = []
    json.pictures.map(image => {
      variation.picture_ids.map(picture_ids => {
        if (picture_ids === image.id) {
          urls.push(image.url)
        }
      })
    })

    this.setState({
      imageVariation: urls,
      imagesAnuncio: json.pictures
    })
  }

  setPropsEditAnuncio = (variation, attr, json) => {
    this.setProps(attr)
    this.getImageVariation(json, variation)
    this.setState({
      vart : variation,
      json: json
    })
  }

  handleChangeInputAvailableQuantity = (event) => {
    this.setState({ availableQuantity: event.target.value })
  }

  updateAvailableQuantity = (itemId, id, availableQuantity) => {
    this.props.updateAvailableQuantity(itemId, id, availableQuantity)
    this.props.setIsShowVariationManager(false)
  }

  closeModalEditVariacao = (close) => {
    this.setState({ isShowEditarAnuncio: close })
  }


  render() {
    return (
      <div>
        <Modal open={this.props.isShowVariationManager} style={{
          position: 'relative',
          width: '70%',
          marginBottom: '5%',
          marginLeft: '50%',
          marginRight: '50%',
          margin: '70px 0 0'
        }}
          closeOnDimmerClick={false} >

          <Header icon='edit' content={

            <div>Gerenciar Variações
          <IconButton style={{ paddingLeft: '10px', marginLeft: '630px' }} onClick={() => this.props.setIsShowVariationManager(false)}>
                <CancelIcon />
              </IconButton>
            </div>}

            style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

          <Modal.Content>
            <p>
              {this.props.titulo}{' | '}
              <font size="3">
                <b>
                  <a style={{ "color": "blue" }}>
                    R$ {this.props.preco.toLocaleString("pt-BR")}{' '}
                  </a>
                </b>
              </font>
              <font size="3"> x {this.props.estoque_total} disponíveis</font>
            </p>

            <Table basic>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Variação</Table.HeaderCell>
                  <Table.HeaderCell>Estoque</Table.HeaderCell>
                  <Table.HeaderCell>Qtde vendido</Table.HeaderCell>
                  <Table.HeaderCell>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.json.variations.map((variation, key) => {

                  return (
                    <Table.Row key={key}>
                      {variation.attribute_combinations.map(attr => {
                        if (attr.id === 'SIZE' || attr.id === null) {
                          return (
                            <>
                              <Table.Cell>{attr.value_name}</Table.Cell>
                              <Table.Cell>{variation.available_quantity}</Table.Cell>
                              <Table.Cell>{variation.sold_quantity}</Table.Cell>
                              <Table.Cell>
                                <Tooltip title="Remover variação">
                                  <Button icon color='red' style={{ 'fontSize': '12px' }}> <Icon name='remove' /> </Button>
                                </Tooltip>
                                <Tooltip title="Editar variação">
                                  <Button icon color='blue' style={{ 'fontSize': '12px' }} onClick={() => this.setPropsEditAnuncio(variation, attr, this.props.json)}> <Icon name='edit' /> </Button>
                                </Tooltip>
                              </Table.Cell>
                              <EditarVariacao
                                getImageSite={this.props.getImageSite}
                                setImageVariation={this.setImageVariation}
                                updateImagemVariation={this.props.updateImagemVariation}
                                urlImage={this.state.imageVariation}
                                imagesAnuncio={this.state.imagesAnuncio}
                                attributeCombinations={this.state.attributeCombinations}
                                isShowEditarAnuncio={this.state.isShowEditarAnuncio}
                                variation={variation}
                                vart={this.state.vart}
                                {...this.props}
                                {...this.state}
                                closeModalEditVariacao={this.closeModalEditVariacao}
                              />
                            </>
                          )
                        }
                      })}

                    </Table.Row>
                  )
                })}

              </Table.Body>
            </Table>
          </Modal.Content>
          <DialogActions>
            <ButtonUI variant="contained" color="primary" startIcon={<SaveAltIcon />}>Confirmar</ButtonUI>
            <ButtonUI variant="contained" color="secondary" onClick={() => this.props.setIsShowVariationManager(false)} startIcon={<CloseIcon />}>  Fechar   </ButtonUI>
          </DialogActions>
        </Modal>
      </div>
    )
  }
}