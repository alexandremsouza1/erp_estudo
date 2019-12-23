import React from "react";
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

/** Created by Felipe M. Santos 
 * Simple Notification
*/
export default class Notification extends React.Component {

    constructor(props) {
        super(props)
    }

    handleCloseNotification = () => {this.props.close(false)}

    render() {
        return (
            <Modal
                open={this.props.modalOpen}
                onClose={this.handleCloseNotification}
                basic
                size='small'
            >
                <Header icon='browser' content='Mensagem' />
                <Modal.Content>
                    <h3>{this.props.content}</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={this.handleCloseNotification} inverted>
                        <Icon name='checkmark' /> Fechar
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}