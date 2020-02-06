import React from 'react'
import { connect } from 'react-redux'
import VendasView from './VendasView'
import axios from 'axios'
import { DOMAIN } from '../../constants/constants'
//import sendNotification from '../../components/Notification/Notification'
import swal from 'sweetalert'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
//import socketIOClient from 'socket.io-client'


class VendasController extends React.Component {

    constructor(props) {
        super(props)
        document.title = "Vendas"
        this.state = {
            dadosRastreamento: {}
        }
    }

    componentDidMount = async () => {
        /* 
         await axios.get(`${DOMAIN}/vendas/getVendasPendentes`).then(vendasPendentes => {
             let vendas = this.state.vendas
             vendasPendentes.data.map(venda => {
                 vendas.push(venda)
             })
             this.setState({ vendas: vendas, isLoadingVendasPendentes: false })
         }).catch(error => {
             swal("Error", "Houve um erro ao listar todas as vendas pendentes (VendasController:28):  \n \n " + error, "error");
         })
 
         await axios.get(`${DOMAIN}/vendas/getVendasConcluidas`).then(vendasConcluidas => {
 
             let vendas = this.state.vendas
             vendasConcluidas.data.map(venda => {
                 vendas.push(venda)
             })
             this.setState({ vendas: vendas, isLoadingVendasConcluidas: false })
         }).catch(error => {
             swal("Error", "Houve um erro ao listar todas as vendas concluídas (VendasController:34):  \n \n " + error, "error");
         })
         */
        /*
         await axios.get(`${DOMAIN}/vendas/getVendasEmTransito`).then(vendasEmTransito => {
             let vendas = this.state.vendas
             vendasEmTransito.data.map(venda => {
                 vendas.push(venda)
             })
             this.setState({ vendas: vendas, isLoadingVendasEmTransito: false })
         }).catch(error => {
             swal("Error", "Houve um erro ao listar todas as vendas em transito(VendasController:66): \n \n " + error, "error");
         })
 
         await axios.get(`${DOMAIN}/vendas/getVendasAEnviar`).then(vendasAEnviar => {
             if (vendasAEnviar.data !== null) {
                 let vendas = this.state.vendas
                 vendasAEnviar.data.map(venda => {
                     vendas.push(venda)
                 })
                 this.setState({ vendas: vendas, isLoadingVendasAEnviar: false })
             }
 
         }).catch(error => {
             swal("Error", "Houve um erro ao listar todas as vendas a enviar(VendasController:79): \n \n " + error, "error");
         })
 *//*
                       await axios.get(`${DOMAIN}/vendas/getTotalVendas`).then(vendas => {
                           this.setState({
                               qtdeVendasConcluidas: vendas.data.qtdeVendasConcluidas,
                               qtdeVendasCanceladas: vendas.data.qtdeVendasCanceladas,
                               isLoading: false
                           })
                       }).catch(error => swal('Error', 'Houve um erro ao mostrar a quantidade total de vendas! \n \n ' + error, 'error'))
               *//*
                await axios.get(`${DOMAIN}/vendas/getTotalVendasEmTransito`).then(vendas => {
                    this.setState({
                        qtdeVendasEmTransito: vendas.data.qtdeVendasEmTransito,
                        isLoadingQtdeVendasEmTransito: false
                    })
                }).catch(error => swal('Error', 'Houve um erro ao mostrar a quantidade total de vendas! \n \n ' + error, 'error'))
        *//*
                await axios.get(`${DOMAIN}/vendas/getTotalVendasAEnviar`).then(vendas => {
                    this.setState({
                        qtdeVendasAEnviar: vendas.data.qtdeVendasAEnviar,
                        isLoadingQtdeVendasAEnviar: false
                    })
                }).catch(error => swal('Error', 'Houve um erro ao mostrar a quantidade total de vendas! \n \n ' + error, 'error'))
        *//*
                await axios.get(`${DOMAIN}/vendas/getTotalVendasPendentes`).then(vendas => {
                    this.setState({
                        qtdeVendasPendentes: vendas.data.qtdeVendasPendentes,
                        isLoading: false
                    })
                }).catch(error => swal('Error', 'Houve um erro ao mostrar a quantidade total de vendas! \n \n ' + error, 'error'))
                */


        /*const socket = socketIOClient(DOMAIN)
        socket.on('ml-notification-perguntas', (data) => {
            console.log("message: "+data);
            
          });*/
    }





    obterRastreioCorreios = async (codigo) => {
        await axios.get(`${DOMAIN}/rastreio/${codigo}`).then(async response => {
            await this.setState({
                dadosRastreamento: response.data,
                isLoading: false
            })
        })
    }

    gerarEtiqueteEnvio = async (shippingId) => {

        await axios.get(`${DOMAIN}/vendas/gerarEtiquetaEnvio/${shippingId}`).then(response => {

            window.open(response.data);

        }).catch(error => swal('Error', 'Houve um erro ao tentar gerar a etiqueta de envio! \n \n ' + error, 'error'))
    }

    obterQuantidadeDelinhasTextArea = (qtde, msgId) => {
        return qtde.map(line => {
            return line.id === msgId ? line.qtdeBarraN : ''
        })
    }


    render() {
        let isShowLoading = this.props.isLoadingVendasPendentes
            && this.props.isLoadingVendasConcluidas
            && this.props.isLoadingVendasEmTransito
            && this.props.isLoadingVendasAEnviar
        return (
            <>
                <Dimmer.Dimmable as={Segment} dimmer={isShowLoading.toString()}>
                    
                    <Dimmer active={isShowLoading} inverted>
                        <Loader>Carregando dados do Mercado Livre, por favor aguarde...</Loader>
                    </Dimmer>

                    <VendasView
                        vendas={this.props.vendas}
                        obterRastreioCorreios={this.obterRastreioCorreios}
                        dadosRastreamento={this.state.dadosRastreamento}
                        gerarEtiqueteEnvio={this.gerarEtiqueteEnvio}
                        obterQuantidadeDelinhasTextArea={this.obterQuantidadeDelinhasTextArea}
                        isLoading={this.props.isLoading}
                        isLoadingQtdeVendasAEnviar={this.props.isLoadingQtdeVendasAEnviar}
                        isLoadingQtdeVendasEmTransito={this.props.isLoadingQtdeVendasEmTransito}
                        qtdeVendasConcluidas={this.props.qtdeVendasConcluidas}
                        qtdeVendasCanceladas={this.props.qtdeVendasCanceladas}
                        qtdeVendasEmTransito={this.props.qtdeVendasEmTransito}
                        qtdeVendasPendentes={this.props.qtdeVendasPendentes}
                        qtdeVendasAEnviar={this.props.qtdeVendasAEnviar}
                        qtdeVendasEmTransito={this.props.qtdeVendasEmTransito}
                        />
                </Dimmer.Dimmable>
            </>
        )
    }
}

const mapStateToProps = store => ({
    vendas: store.venda.vendas,
    isLoading: store.venda.isLoading,
    isLoadingQtdeVendasAEnviar: store.venda.isLoadingQtdeVendasAEnviar,
    isLoadingQtdeVendasEmTransito: store.venda.isLoadingQtdeVendasEmTransito,
    qtdeVendasConcluidas: store.venda.qtdeVendasConcluidas,
    qtdeVendasCanceladas: store.venda.qtdeVendasCanceladas,
    qtdeVendasEmTransito: store.venda.qtdeVendasEmTransito,
    qtdeVendasPendentes: store.venda.qtdeVendasPendentes,
    qtdeVendasAEnviar: store.venda.qtdeVendasAEnviar,
    qtdeVendasEmTransito: store.venda.qtdeVendasEmTransito,
    isLoadingVendasPendentes: store.venda.isLoadingVendasPendentes,
    isLoadingVendasConcluidas: store.venda.isLoadingVendasConcluidas,
    isLoadingVendasEmTransito: store.venda.isLoadingVendasEmTransito,
    isLoadingVendasAEnviar: store.venda.isLoadingVendasAEnviar
})

export default connect(mapStateToProps)(VendasController)