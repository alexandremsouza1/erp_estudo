import React from 'react'
import { Button, Dropdown, Modal, Header, Icon, Segment } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import FormInput from '../../components/FormInput/FormInput'

export default class EditarVariacao extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            image: ''
        }        
    }

    handleChangeImage = (img) => {
        this.setState({image: img})
    }

    render() {
        return (
            <Modal size='fullscreen' open={this.props.isShowEditarAnuncio}>
                <Header icon='edit' content={<>Alterar variação - {this.props.attributeCombinations.value_name}</>}
                    style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

                <Modal.Content sytle={{ "width": "100px" }}>
                    <Row>
                        <Col md={5}>
                            <FormInput label="Variação" placeholder='Variação' value={this.props.attributeCombinations.value_name} style={{ "color": "blue" }} />
                        </Col>
                        <Col md={2}>
                            <FormInput label="SKU" placeholder='SKU' style={{ "color": "blue" }} />
                        </Col>
                        <Col md={2}>
                            <FormInput label="Qtde estoque da variação" value={this.props.variation.available_quantity} placeholder='Estoque da variação' style={{ "color": "blue" }} />
                        </Col>
                        <Col md={3}>
                            <FormInput label='Código universal de produto' placeholder='Código universal de produto' />
                        </Col>
                    </Row>
                    <br></br>
                    <Segment raised color='grey'>
                        <Row>
                            {this.props.urlImage.map((url) => {
                                return (
                                    <Col md={1}>
                                        <img src={url} alt='imageVariation' height='100' width='80'/>
                                        <Dropdown floating labeled button text='' icon='image outline' className='icon'>
                                            <Dropdown.Menu>
                                                <Dropdown.Header content='Selecione uma imagem!' />
                                                {this.props.urlImage.map((image, key) => {
                                                    return (
                                                        <Dropdown.Item key={key}>
                                                            <img src={image} alt='image' height='100' width='80'/>
                                                        </Dropdown.Item>
                                                    )
                                                })}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Segment>
                </Modal.Content>

                <Modal.Actions>
                    <Button color='green' onClick={() => this.props.closeModalEditVariacao(false)}>
                        <Icon name='checkmark' /> Alterar
                    </Button>
                    <Button color='red' onClick={() => this.props.closeModalEditVariacao(false)}>
                        <Icon name='remove' /> Fechar
                    </Button>
                </Modal.Actions>

            </Modal >
        )
    }

}