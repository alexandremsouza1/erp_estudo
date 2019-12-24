import React, { useState } from 'react'
import AnuncioView from './AnuncioView';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {DOMAIN, LISTAR_TODOS_ANUNCIOS} from '../../constants/constants'

export default function AnuncioController() {

    const state = useSelector(store => store.anuncio)
    
    const [isShowEditPrice, setIsShowEditPrice] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)
    const [isPriceUpdated, setIsPriceUpdated] = useState(false)
    const [isStatusUpdated, setIsStatusUpdated] = useState(false)
    const [isShowConfirmPauseProduct, setIsShowConfirmPauseProduct] = useState(false)

    const dispatch = useDispatch()

    //const [userNickname, setUserNickname] = useState()
    /*
    useEffect(() => {
        axios.get('http://localhost:5000/anuncio').then(resp => {
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: resp.data, isLoading: false})
        }).catch(err => { console.log(err) })
    }, [])
*/

    let updateAnuncioPrice = async (itemId, price) => {
        if (price != '' || price != 0) {
            await axios.put(`${DOMAIN}/anuncio/update_price`, { itemId: itemId, price: price }).then(user => {
                console.log('Price updated: >> http://localhost:5000/anuncio/' + itemId + '/' + price + '\n')
                setIsShowEditPrice(false)
                setIsPriceUpdated(true)
                setLoadingButton(false)
                setDisabledButton(false)
                console.log(updateStateStorePriceProduct(itemId, price))
                dispatch({type: LISTAR_TODOS_ANUNCIOS, data: updateStateStorePriceProduct(itemId, price), isLoading: false})
            }).catch(error => {
                console.log("An error occurred while fetching user by id: " + error)
            })
        } else {
            setLoadingButton(false)
            setDisabledButton(false)
            console.log("Preço inválido, informe um valor maior do que zero! Tente novamente.")
        }
    }

    //Function responsible for update product price
    let updateStateStorePriceProduct = (itemId, price) => {
            let temp = [] // The temp variable must be created because the map is returned undefined in another object
            state.result.map(product => {
                if(product.id === itemId){
                    product.preco = price
                    temp.push(product)
                }else{
                    temp.push(product)
                }
            })
            return temp
    }

    let updateStatus = async (itemId, status) => {
        await axios.put(`${DOMAIN}/anuncio/update_status`, {itemId, status}).then(response => {
            console.log("Status updated with success!")
            setLoadingButton(false)
            setDisabledButton(false)
            setIsShowConfirmPauseProduct(false)
            setIsStatusUpdated(true)
        }).catch(error => {console.error("An error occurred to update status product: "+error)})
    }

    return (
        <>
            <AnuncioView
                state={state}
                {...state}
                updateAnuncioPrice={updateAnuncioPrice}
                isShowEditPrice={isShowEditPrice}
                setIsShowEditPrice={setIsShowEditPrice}
                loadingButton={loadingButton}
                setLoadingButton={setLoadingButton}
                disabledButton={disabledButton}
                setDisabledButton={setDisabledButton}
                isPriceUpdated={isPriceUpdated}
                setIsPriceUpdated={setIsPriceUpdated}
                isStatusUpdated={isStatusUpdated}
                setIsStatusUpdated={setIsStatusUpdated}
                updateStatus={updateStatus}
                isShowConfirmPauseProduct={isShowConfirmPauseProduct}
                setIsShowConfirmPauseProduct={setIsShowConfirmPauseProduct}/>
        </>
    );
}