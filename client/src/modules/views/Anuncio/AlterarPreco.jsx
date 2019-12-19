import React, {useState} from "react";
import { Button, Modal, Header, Icon, Select, Input} from 'semantic-ui-react'

export default function AlterarPreco(props) {

    let [price, setPrice] = useState(0)

    let handleOnChangeInputPrice = (event) => {
        setPrice(event.target.value)
    }

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

                {console.log(props.id)}

                <Input>
                    <Select compact options={props.options} defaultValue='porcentagem'></Select>
                    <Input type='text' placeholder='Valor' value={price} onChange={handleOnChangeInputPrice}/>
                </Input>

            </Modal.Content>

            <Modal.Actions>
                <Button color='green' onClick={() => {props.updateAnuncioPrice(props.id, price)}}>
                    <Icon name='checkmark' /> Confirmar
                </Button>

                <Button color='red'>
                    <Icon name='remove' /> Fechar
                </Button>
            </Modal.Actions>
        </Modal>
    )
}