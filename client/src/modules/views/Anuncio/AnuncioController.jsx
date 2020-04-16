import React, { useState } from 'react'
import AnuncioView from './AnuncioView';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { DOMAIN, LISTAR_TODOS_ANUNCIOS } from '../../constants/constants'
import sendNotification from '../../components/Notification/Notification'
import swal from 'sweetalert'

export default function AnuncioController() {

    const state = useSelector(store => store.anuncio)

    const [isShowEditPrice, setIsShowEditPrice] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)
    const [isStatusUpdated, setIsStatusUpdated] = useState(false)
    const [isShowConfirmPauseProduct, setIsShowConfirmPauseProduct] = useState(false)
    const [custoFrete, setCustoFrete] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [atributo, setAtributo] = useState([])
    const [validationAttribute, setValidationAttribute] = useState(false)

    const [loadingButtonTitulo, setLoadingButtonTitulo] = useState(false)
    const [loadingButtonFormaEntrega, setLoadingButtonFormaEntrega] = useState(false)
    const [loadingButtonTipoAnuncio, setLoadingButtonTipoAnuncio] = useState(false)
    const [loadingButtonRetirarPessoalmente, setLoadingButtonRetirarPessoalmente] = useState(false)
    const [loadingButtonDescription, setLoadingButtonDescription] = useState(false)
    const [loadingButtonGarantia, setLoadingButtonGarantia] = useState(false)
    const [loadingButtonDisponibilidadeEstoque, setLoadingButtonDisponibilidadeEstoque] = useState(false)
    const [loadingButtonCondicao, setLoadingButtonCondicao] = useState(false)
    const [loadingCategoria, setLoadingCategoria] = useState(true)
    const [loadingButtonAtributos, setLoadingButtonAtributos] = useState(false)
    const [loadingButtonVideoYoutube, setLoadingButtonVideoYoutube] = useState(false)

    const dispatch = useDispatch()

    let updateShipping = async (itemId, free_shipping, custoFrete) => {
        sendNotification('success', 'Processando sua solicitação, por favor aguarde...', 8999)
        setTimeout(async () => {
            await axios.put(`${DOMAIN}/anuncio/update_shipping`, { itemId, free_shipping }).then(response => {
                dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateStateShipping(itemId, free_shipping, custoFrete), isLoading: false })
                if (free_shipping) {
                    sendNotification('success', 'Objetivo alcançado! Agora você oferece frete grátis.', 5000)
                    setLoadingButtonFormaEntrega(false)
                } else {
                    sendNotification('success', 'Pronto, salvamos suas modificações!', 5000)
                    setLoadingButtonFormaEntrega(false)
                }

            }).catch(error => {
                sendNotification('error', 'Ocorreu um problema ao tentar atualizar a forma de entrega (AnuncioController)', 5000)
            })
        }, 9000)
    }

    let updateStateShipping = (itemId, free_shipping, custoFrete) => {
        let temp = []
        state.result.map(product => {
            if (product.id === itemId) {
                product.freeShipping = free_shipping
                if(free_shipping){
                    product.freteGratis = 'Grátis Brasil'
                    product.custoFreteGratis = custoFrete
                }else{
                    product.freteGratis = ''
                    product.custoFreteGratis = 5.00
                }
                product.liquido = calcValorLiquido(product.preco, calcTarifa(product.preco, product), free_shipping === true ? custoFrete : 5.00)
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let updateTitle = async (itemId, title) => {
        await axios.put(`${DOMAIN}/anuncio/update_title`, { itemId, title }).then(response => {
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateStateTitleProduct(itemId, title), isLoading: false })
            sendNotification('success', 'Pronto, salvamos suas modificações!', 5000)
            setLoadingButtonTitulo(false)
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar o titulo do anuncio (AnuncioController:35)', 5000)
        })
    }

    let updateAnuncioPrice = async (itemId, price) => {
        if (price != '' || price != 0) {
            await axios.put(`${DOMAIN}/anuncio/update_price`, { itemId: itemId, price: price }).then(user => {

                setIsShowEditPrice(false)
                setLoadingButton(false)
                setDisabledButton(false)

                dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateStateStorePriceProduct(itemId, price), isLoading: false })

                //sendNotification('success', 'Preço do anúncio atualizado com sucesso!', 5000)
                swal("Atualizado!", "Preço do anúncio atualizado com sucesso", "success");

            }).catch(error => {
                sendNotification('error', 'Ocorreu um erro ao buscar o usuário pelo ID (AnuncioController:53)', 5000)
            })
        } else {
            //sendNotification('error', 'Preço inválido, informe um valor maior do que zero! Tente novamente', 5000)
            swal("Atenção", "Preço inválido, informe um valor maior do que zero! Tente novamente", "error");
            setIsShowEditPrice(false)
            setLoadingButton(false)
            setDisabledButton(false)
        }
    }

    //Function responsible for update product price
    let updateStateStorePriceProduct = (itemId, price) => {
        let temp = [] // The temp variable must be created because the map is returned undefined in another object
        state.result.map(product => {
            if (product.id === itemId) {
                product.preco = price
                product.tarifa = calcTarifa(price, product)
                product.liquido = calcValorLiquido(price, calcTarifa(price, product), product.custoFreteGratis)
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let calcTarifa = (price, anuncio) => {
        if (anuncio.tipoAnuncio_id === 'gold_special') {
            return price * (11 / 100)
        } else {
            return price * (16 / 100)
        }

    }

    let calcValorLiquido = (price, tarifa, custoFixo) => {
        return price - (tarifa + custoFixo)
    }

    let updateStateTitleProduct = (itemId, title) => {
        let temp = [] // The temp variable must be created because the map is returned undefined in another object
        state.result.map(product => {
            if (product.id === itemId) {
                product.titulo = title
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let updateAvailableQuantity = (itemId, id, availableQuantity) => {
        sendNotification('success', 'Estoque do anúncio atualizado com sucesso!', 5000)
        sendNotification('success', 'ItemId: ' + itemId + ' ID: ' + id + ' AvailableQuantity: ' + availableQuantity)
    }

    let updateStatusAnuncioInStore = (itemId, status) => {
        let temp = []
        state.result.map(product => {
            if (product.id === itemId) {
                if (status === 'active') {
                    product.status = 'active'
                } else {
                    product.status = 'paused'
                }
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let updateListingTypeInStore = (itemId, listingType) => {
        let temp = []
        state.result.map(product => {
            if (product.id === itemId) {
                if (listingType === 'gold_special') {
                    product.tipoAnuncio = 'Clássico - Exposição alta'
                    product.tipoAnuncio_id = listingType
                } else {
                    product.tipoAnuncio = 'Premium - Exposição máxima'
                    product.tipoAnuncio_id = listingType
                }
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }


    let updateStatus = async (itemId, status) => {
        await axios.put(`${DOMAIN}/anuncio/update_status`, { itemId, status }).then(response => {

            setLoadingButton(false)
            setDisabledButton(false)
            setIsShowConfirmPauseProduct(false)
            setIsStatusUpdated(true)

            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateStatusAnuncioInStore(itemId, status), isLoading: false })

            //sendNotification('success', 'Status atualizado com sucesso!', 5000)
            swal("Atualizado!", "Status atualizado com sucesso", "success");

        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar o status do anúncio (AnuncioController:167)' + error, 5000)
        })
    }

    let updateListingType = async (itemId, listingType) => {
        await axios.post(`${DOMAIN}/anuncio/update_listing_type`, { id: listingType, itemId: itemId }).then(response => {
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateListingTypeInStore(itemId, listingType), isLoading: false })
            if (listingType === 'gold_special') {
                sendNotification('success', 'Pronto, salvamos suas modificações!', 5000)
                setLoadingButtonTipoAnuncio(false)
            } else {
                sendNotification('success', 'Objetivo alcançado! Agora você pode oferecer parcelamento sem juros.', 5000)
                setLoadingButtonTipoAnuncio(false)
            }

        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar o tipo de anúncio (AnuncioController:181)' + error, 5000)
        })
    }

    let obterValorDoCustoFreteGratisPorAnuncio = async (itemID) => {
        await axios.get(`${DOMAIN}/anuncio/obterValorDoCustoFreteGratisPorAnuncio/${itemID}`).then(response => {
            setCustoFrete(response.data.custo.toFixed(2))
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao obter o custo do frete (AnuncioController:189)' + error, 5000)
        })
    }

    let updateRetirarPessoalmente = async (itemId, isRetirarPessoalmente) => {
        await axios.put(`${DOMAIN}/anuncio/update_retirar_pessoalmente`, { itemId: itemId, local_pick_up: isRetirarPessoalmente }).then(response => {
            sendNotification('success', 'Pronto salvamos suas modificações', 5000)
            setLoadingButtonRetirarPessoalmente(false)
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateStateRetirarPessoalmente(itemId, isRetirarPessoalmente) })
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar a retirar pessoalmente (AnuncioController:197)' + error, 5000)
        })
    }

    let updateStateRetirarPessoalmente = (itemId, isRetirarPessoalmente) => {
        let temp = [] // The temp variable must be created because the map is returned undefined in another object
        state.result.map(product => {
            if (product.id === itemId) {
                product.json.shipping.local_pick_up = isRetirarPessoalmente
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let updateDescription = async (itemId, plainText) => {
        await axios.put(`${DOMAIN}/anuncio/update_description`, { itemId: itemId, plain_text: plainText }).then(response => {
            sendNotification('success', 'Pronto salvamos suas modificações', 5000)
            setLoadingButtonDescription(false)
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateStateDescription(itemId, plainText) })
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar a descrição do anuncio (AnuncioController:216)' + error, 5000)
        })
    }

    let updateStateDescription = (itemId, description) => {
        let temp = [] // The temp variable must be created because the map is returned undefined in another object
        state.result.map(product => {
            if (product.id === itemId) {
                product.description = description
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let updateGarantia = async (itemId, tipoGarantia, valueName, tempo, garantia) => {
        await axios.put(`${DOMAIN}/anuncio/update_garantia`, { itemId: itemId, tipo_garantia: tipoGarantia, value_name: valueName, tempo: tempo }).then(response => {
            sendNotification('success', 'Pronto salvamos suas modificações', 5000)
            setLoadingButtonGarantia(false)
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: updateStateGarantia(itemId, garantia, valueName, tempo) })
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar a garantia do anuncio' + error, 5000)
        })
    }

    let updateStateGarantia = (itemId, garantia, valueName, tempo) => {
        let temp = [] // The temp variable must be created because the map is returned undefined in another object
        state.result.map(product => {
            if (product.id === itemId) {
                product.garantia = garantia
                product.valueName = valueName
                product.tempo = tempo
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let updateDisponibilidadeEstoque = async (itemId, valueName) => {
        await axios.put(`${DOMAIN}/anuncio/update_disponibilidade_estoque`, { itemId: itemId, value_name: valueName }).then(response => {
            sendNotification('success', 'Pronto salvamos suas modificações', 5000)
            setLoadingButtonDisponibilidadeEstoque(false)
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar a disponibilidade de estoque' + error, 5000)
        })
    }

    let updateCondicao = async (itemId, condicao) => {
        await axios.put(`${DOMAIN}/anuncio/update_condicao`, { itemId: itemId, condicao: condicao }).then(response => {
            sendNotification('success', 'Pronto salvamos suas modificações', 5000)
            setLoadingButtonCondicao(false)
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao atualizar a condição do anuncio' + error, 5000)
        })
    }

    let obterCategoria = async (itemId) => {
        setCategoria(categoria !== '' ? 'Carregando, aguarde...' : categoria)
        await axios.get(`${DOMAIN}/anuncio/obter_categoria/${itemId}`).then(response => {
            let dados = []
            response.data.map(cat => {
                dados.push(cat.name)
            })
            setCategoria(dados.join(' > '))
            setLoadingCategoria(false)
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao obter a categoria do anuncio' + error, 5000)
        })
    }

    let obterAtributosPorCategoria = async (categoria, itemId) => {

        let newArray = []
        
        await axios.get(`${DOMAIN}/anuncio/obter_atributos_por_categoria/${categoria}`).then(async response => {
            let valorVerificado = response.data.reduce((valorAcumulado, valorCorrente) => {
                if (valorCorrente.value_name === "") {
                    return true
                }
            })
            if(valorVerificado){
                setValidationAttribute(true)
            }

            response.data.map(att => {
                state.result.map(stateAtt => {
                    if(stateAtt.json.id === itemId){
                        stateAtt.json.attributes.map(jsonAtt => {
                            if(att.id === jsonAtt.id){
                                newArray.push(
                                    {
                                        id: att.id,
                                        name: att.name,
                                        type: att.type,
                                        value_name: jsonAtt.value_name,
                                        isNaoPreenchido: att.isNaoPreenchido,
                                        values: att.values
                                    }
                                )
                            }
                        })
                    }
                })
            })

            console.log(newArray)
            setAtributo(newArray)
        }).catch(error => {
            sendNotification('error', 'Ocorreu um erro ao obter os atributos do anuncio' + error, 5000)
        })

    }

    let updateAtributos = async (attributes, itemId) => {
        let newArray = []
        attributes.map(att => {
            newArray.push({ id: att.id, value_name: att.value_name })
        })
        let valorVerificado = newArray.reduce((valorAcumulado, valorCorrente) => {
            if (valorCorrente.value_name === "") {
                return true
            }
        })
        if (valorVerificado) {
            setValidationAttribute(true)
            sendNotification('error', 'Ficha técnica incompleta, preencha todas as informações para que seu anúncio tenha mais destaque no Mercado Livre.', 5000)
            setLoadingButtonAtributos(false)
        } else {
            setValidationAttribute(false)
            await axios.put(`${DOMAIN}/anuncio/update_atributos`, { attributes: newArray, itemId: itemId }).then(response => {
                sendNotification('success', 'Pronto salvamos suas modificações', 5000)
                setLoadingButtonAtributos(false)
            }).catch(error => {
                sendNotification('error', 'Ocorreu um erro ao atualizar os atributos do anuncio' + error, 5000)
            })
        }
    }

    const updateVideoYoutube = async (itemId, linkVideo) => {
        let videoId = linkVideo.replace("https://www.youtube.com/watch?v=", "")
        await axios.put(`${DOMAIN}/anuncio/update_video_youtube`, {itemId, videoId}).then(response => {
            sendNotification('success', 'Pronto salvamos suas modificações', 5000)
            setLoadingButtonVideoYoutube(false)
            updateStateVideoYoutube(itemId, linkVideo)
        }).catch(error => {
                sendNotification('error', 'Ocorreu um erro ao atualizar o vídeo do anuncio' + error, 5000)
            })
    }

    let updateStateVideoYoutube = (itemId, linkVideo) => {
        let temp = [] // The temp variable must be created because the map is returned undefined in another object
        state.result.map(product => {
            if (product.id === itemId) {
                product.video_id = linkVideo
                temp.push(product)
            } else {
                temp.push(product)
            }
        })
        return temp
    }

    let getImageSite = async (url) => {
        await axios.post(`${DOMAIN}/anuncio/obter_imagem_site`, {url}).then(response => {
            localStorage.setItem("@sisiml/url_image", response.data)
        })
    }

    return (
        <>
            <AnuncioView
                state={state}
                {...state}
                getImageSite={getImageSite}
                loadingButtonVideoYoutube={loadingButtonVideoYoutube}
                setLoadingButtonVideoYoutube={setLoadingButtonVideoYoutube}
                updateVideoYoutube={updateVideoYoutube}
                validationAttribute={validationAttribute}
                setLoadingButtonAtributos={setLoadingButtonAtributos}
                loadingButtonAtributos={loadingButtonAtributos}
                updateAtributos={updateAtributos}
                atributo={atributo}
                setAtributo={setAtributo}
                obterAtributosPorCategoria={obterAtributosPorCategoria}
                loadingCategoria={loadingCategoria}
                categoria={categoria}
                obterCategoria={obterCategoria}
                updateCondicao={updateCondicao}
                loadingButtonCondicao={loadingButtonCondicao}
                setLoadingButtonCondicao={setLoadingButtonCondicao}
                updateDisponibilidadeEstoque={updateDisponibilidadeEstoque}
                setLoadingButtonDisponibilidadeEstoque={setLoadingButtonDisponibilidadeEstoque}
                loadingButtonDisponibilidadeEstoque={loadingButtonDisponibilidadeEstoque}
                updateDescription={updateDescription}
                updateRetirarPessoalmente={updateRetirarPessoalmente}
                updateTitle={updateTitle}
                custoFrete={custoFrete}
                updateAnuncioPrice={updateAnuncioPrice}
                isShowEditPrice={isShowEditPrice}
                setIsShowEditPrice={setIsShowEditPrice}
                loadingButton={loadingButton}
                setLoadingButton={setLoadingButton}
                disabledButton={disabledButton}
                setDisabledButton={setDisabledButton}
                isStatusUpdated={isStatusUpdated}
                setIsStatusUpdated={setIsStatusUpdated}
                updateStatus={updateStatus}
                isShowConfirmPauseProduct={isShowConfirmPauseProduct}
                setIsShowConfirmPauseProduct={setIsShowConfirmPauseProduct}
                updateAvailableQuantity={updateAvailableQuantity}
                updateListingType={updateListingType}
                obterValorDoCustoFreteGratisPorAnuncio={obterValorDoCustoFreteGratisPorAnuncio}
                updateShipping={updateShipping}
                loadingButtonTitulo={loadingButtonTitulo}
                setLoadingButtonTitulo={setLoadingButtonTitulo}
                loadingButtonFormaEntrega={loadingButtonFormaEntrega}
                setLoadingButtonFormaEntrega={setLoadingButtonFormaEntrega}
                loadingButtonTipoAnuncio={loadingButtonTipoAnuncio}
                setLoadingButtonTipoAnuncio={setLoadingButtonTipoAnuncio}
                loadingButtonRetirarPessoalmente={loadingButtonRetirarPessoalmente}
                setLoadingButtonRetirarPessoalmente={setLoadingButtonRetirarPessoalmente}
                setLoadingButtonDescription={setLoadingButtonDescription}
                loadingButtonDescription={loadingButtonDescription}
                loadingButtonGarantia={loadingButtonGarantia}
                setLoadingButtonGarantia={setLoadingButtonGarantia}
                updateGarantia={updateGarantia} />
        </>
    );
}