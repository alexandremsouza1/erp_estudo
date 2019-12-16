import React from 'react'
import { Button, Dropdown, Modal, Header, Icon, Select, Input, Table } from 'semantic-ui-react'

export default function EditarVariacao(props){
    return(
        <Modal open={props.isShowEditarAnuncio} style={{
            'position': 'relative',
            'height': '50%',
            'width': '50%',
            'top': '10%',
            'bottom': '10%',
            'marginLeft': '50%',
            'marginRight': '50%'
           }}>
            
           <Header icon='edit' content={<>Alterar variação - {props.attributeCombinations.value_name}</>}
                style={{ 'backgroundColor': '#467EED', 'color': 'white' }}/>

           <Modal.Content>
                <Input></Input>
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