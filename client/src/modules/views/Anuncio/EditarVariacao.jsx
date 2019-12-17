import React from 'react'
import { Button, Dropdown, Modal, Header, Icon, Select, Input, Table, Grid, Image } from 'semantic-ui-react'

export default function EditarVariacao(props) {

    return (
        <Modal open={props.isShowEditarAnuncio} style={{
            'position': 'relative',
            'marginLeft': '50%',
            'marginBottom': '5%',
            'marginRight': '50%'
        }}>
            <Header icon='edit' content={<>Alterar variação - {props.attributeCombinations.value_name}</>}
                style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

            <Modal.Content>
                <Grid doubling columns={10}>
                    {props.urlImage.map((url, key) => {
                        return (
                            <Grid.Column>
                                <img src={url} alt='imageVariation' height='100' width='80' />
                                <Dropdown floating labeled button text='' icon='image outline' className='icon'>
                                    <Dropdown.Menu>
                                        <Dropdown.Header content='Selecione uma imagem!'/>
                                        <Dropdown.Item key={key}>
                                            {console.log('URL: '+props.imagesAnuncio)}
                                            <img src={props.imagesAnuncio} alt='imageVariation' height='100' width='80' />
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Grid.Column>
                        )
                    })}
                </Grid>
            </Modal.Content>

            <Modal.Actions>
                <Button color='green' onClick={() => props.setIsShowEditarAnuncio(false)}>
                    <Icon name='checkmark' /> Alterar
                </Button>
                <Button color='red' onClick={() => props.setIsShowEditarAnuncio(false)}>
                    <Icon name='remove' /> Fechar
                </Button>
            </Modal.Actions>

        </Modal>
    )
}