import React from 'react'
import { Button, Dropdown, Modal, Header, Icon, Select, Input, Table, Grid, Image } from 'semantic-ui-react'

export default function EditarVariacao(props) {

    return (
        <Modal open={props.isShowEditarAnuncio} style={{
            'position': 'relative',
            'width': '50%',
            'marginLeft': '50%',
            'marginBottom': '5%',
            'marginRight': '50%'
        }}>
            <Header icon='edit' content={<>Alterar variação - {props.attributeCombinations.value_name}</>}
                style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

            <Modal.Content>
                <Grid doubling columns={5}>
                    <Grid.Column>
                        {props.json.pictures.map(image => {
                            props.variation.picture_ids.map(picture_ids => {
                                if (picture_ids === image.id) {
                                    console.log(image.url)
                                    return (
                                        <Image src={image.url} />
                                    )
                                }
                            })
                        })}
                    </Grid.Column>
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