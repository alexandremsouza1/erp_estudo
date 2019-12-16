import React from "react";
import { Button, Modal, Header, Icon, Select, Input} from 'semantic-ui-react'

export default function AlterarPreco(props) {
    return (
        <Modal style={{
            'position': 'relative',
            'height': '50%',
            'width': '50%',
            'top': '10%',
            'bottom': '10%',
            'marginLeft': '50%',
            'marginRight': '50%'
        }}
            trigger={
                <a>Alterar preço</a>
            } >

            <Header icon='edit' content='Alterar preço'
                style={{ 'backgroundColor': '#467EED', 'color': 'white' }} />

            <Modal.Content>
                <p>
                    {props.titulo}
                </p>

                <Input>
                    <Select compact options={props.options} defaultValue='porcentagem'></Select>
                    <Input type='text' placeholder='Valor' />
                </Input>

            </Modal.Content>

            <Modal.Actions>
                <Button color='green'>
                    <Icon name='checkmark' /> Confirmar
                </Button>

                <Button color='red'>
                    <Icon name='remove' /> Fechar
                </Button>
            </Modal.Actions>
        </Modal>
    )
}