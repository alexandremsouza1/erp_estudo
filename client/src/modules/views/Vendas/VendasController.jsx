import React from 'react'
import VendasView from './VendasView'
import axios from 'axios'
import { DOMAIN } from '../../constants/constants'
//import sendNotification from '../../components/Notification/Notification'
import swal from 'sweetalert'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export default class VendasController extends React.Component {

    constructor(props) {
        super(props)
        document.title = "Vendas"
        this.state = {
            vendas: [],
            dadosRastreamento: {},
            isLoading: true,
            qtdeVendasConcluidas: 0,
            qtdeVendasCanceladas: 0,
            qtdeVendasEmTransito: 0,
            qtdeVendasPendentes: 0,
            qtdeVendasAEnviar: 0,

            isLoadingVendasPendentes: true,
            isLoadingVendasConcluidas: true,
            isLoadingVendasEmTransito: true,

            isLoadingQtdeVendasAEnviar: true,
            isLoadingQtdeVendasEmTransito: true,
            isLoadingVendasAEnviar: true
        }
    }

    componentDidMount = async () => {

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

        await axios.get(`${DOMAIN}/vendas/getVendasEmTransito`).then(vendasEmTransito => {
            let vendas = this.state.vendas
            vendasEmTransito.data.map(venda => {
                vendas.push(venda)
            })
            this.setState({ vendas: vendas, isLoadingVendasEmTransito: false })
        }).catch(error => {
            swal("Error", "Houve um erro ao listar todas as vendas em transito(VendasController:44): \n \n " + error, "error");
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
            swal("Error", "Houve um erro ao listar todas as vendas em transito(VendasController:44): \n \n " + error, "error");
        })

        await axios.get(`${DOMAIN}/vendas/getTotalVendas`).then(vendas => {
            this.setState({
                qtdeVendasConcluidas: vendas.data.qtdeVendasConcluidas,
                qtdeVendasCanceladas: vendas.data.qtdeVendasCanceladas,
                isLoading: false
            })
        }).catch(error => swal('Error', 'Houve um erro ao mostrar a quantidade total de vendas! \n \n ' + error, 'error'))

        await axios.get(`${DOMAIN}/vendas/getTotalVendasEmTransito`).then(vendas => {
            this.setState({
                qtdeVendasEmTransito: vendas.data.qtdeVendasEmTransito,
                isLoadingQtdeVendasEmTransito: false
            })
        }).catch(error => swal('Error', 'Houve um erro ao mostrar a quantidade total de vendas! \n \n ' + error, 'error'))

        await axios.get(`${DOMAIN}/vendas/getTotalVendasAEnviar`).then(vendas => {
            this.setState({
                qtdeVendasAEnviar: vendas.data.qtdeVendasAEnviar,
                isLoadingQtdeVendasAEnviar: false
            })
        }).catch(error => swal('Error', 'Houve um erro ao mostrar a quantidade total de vendas! \n \n ' + error, 'error'))

        await axios.get(`${DOMAIN}/vendas/getTotalVendasPendentes`).then(vendas => {
            this.setState({
                qtdeVendasPendentes: vendas.data.qtdeVendasPendentes,
                isLoading: false
            })
        }).catch(error => swal('Error', 'Houve um erro ao mostrar a quantidade total de vendas! \n \n ' + error, 'error'))


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
        let isShowLoading = this.state.isLoadingVendasPendentes
            && this.state.isLoadingVendasConcluidas
            && this.state.isLoadingVendasEmTransito
            && this.state.isLoadingVendasAEnviar
        return (
            <>
                <Dimmer.Dimmable as={Segment} dimmer={isShowLoading}>
                    <Dimmer active={isShowLoading} inverted>
                        <Loader>Carregando dados do Mercado Livre, por favor aguarde...</Loader>
                    </Dimmer>
                    <VendasView
                        vendas={this.state.vendas}
                        obterRastreioCorreios={this.obterRastreioCorreios}
                        dadosRastreamento={this.state.dadosRastreamento}
                        isLoading={this.state.isLoading}
                        isLoadingQtdeVendasAEnviar={this.state.isLoadingQtdeVendasAEnviar}
                        isLoadingQtdeVendasEmTransito={this.state.isLoadingQtdeVendasEmTransito}
                        qtdeVendasConcluidas={this.state.qtdeVendasConcluidas}
                        qtdeVendasCanceladas={this.state.qtdeVendasCanceladas}
                        qtdeVendasEmTransito={this.state.qtdeVendasEmTransito}
                        qtdeVendasPendentes={this.state.qtdeVendasPendentes}
                        qtdeVendasAEnviar={this.state.qtdeVendasAEnviar}
                        qtdeVendasEmTransito={this.state.qtdeVendasEmTransito}
                        gerarEtiqueteEnvio={this.gerarEtiqueteEnvio}
                        obterQuantidadeDelinhasTextArea={this.obterQuantidadeDelinhasTextArea}/>
                </Dimmer.Dimmable>
            </>
        )
    }
}