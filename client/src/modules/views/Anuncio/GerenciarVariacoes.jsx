import React from 'react'
import { Button, Modal, Header, Icon, Table, Input } from 'semantic-ui-react'
import EditarVariacao from './EditarVariacao'

export default class GerenciarVariacoes extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isShowEditarAnuncio: false,
      attributeCombinations: {},
      imageVariation: [],
      imagesAnuncio: [],
      availableQuantity: 0,
      variationId: 0
    }
  }

  setProps = (attr) => {
    this.setState({
      isShowEditarAnuncio: false,
      attributeCombinations: attr
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
  }

  handleChangeInputAvailableQuantity = (itemId, id, availableQuantity) => {
    this.props.updateAvailableQuantity(itemId, id, availableQuantity)
    this.props.setIsShowVariationManager(false)
  }

  render() {
    return (
      <Modal open={this.props.isShowVariationManager} style={{
        'position': 'relative',
        'width': '70%',
        'marginBottom': '5%',
        'marginLeft': '50%',
        'marginRight': '50%'
      }}
        closeOnDimmerClick={false} >

        <Header icon='edit' content='Gerenciar Variações'
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
                            <Table.Cell><Input style={{ 'width': '70px' }} value={variation.available_quantity}></Input>
                            </Table.Cell>
                            <Table.Cell>{variation.sold_quantity}</Table.Cell>
                            <Table.Cell>
                              <Button icon color='red' style={{ 'fontSize': '12px' }}> <Icon name='remove' /> </Button>
                              <Button icon color='blue' style={{ 'fontSize': '12px' }} onClick={() => this.setPropsEditAnuncio(variation, attr, this.props.json)}> <Icon name='edit' /> </Button>
                            </Table.Cell>
                            <EditarVariacao
                              urlImage={this.state.imageVariation}
                              imagesAnuncio={this.state.imagesAnuncio}
                              attributeCombinations={this.state.attributeCombinations}
                              isShowEditarAnuncio={this.state.isShowEditarAnuncio}
                              setIsShowEditarAnuncio={this.props.setIsShowEditarAnuncio}
                              variation={variation}

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

        <Modal.Actions>
          <Button color='green' onClick={() => this.handleChangeInputAvailableQuantity(this.props.id, this.state.variationId, this.state.availableQuantity)}>
            <Icon name='checkmark' /> Confirmar
        </Button>

          <Button color='red' onClick={() => this.props.setIsShowVariationManager(false)}>
            <Icon name='remove' /> Fechar
        </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}