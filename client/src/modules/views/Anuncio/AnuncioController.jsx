import React, { useState } from 'react'
import AnuncioView from './AnuncioView';
import axios from 'axios'
import { useSelector } from 'react-redux'
//import { LISTAR_TODOS_ANUNCIOS } from '../../constants/constants'
//import NotificationSystem from 'react-notification-system'
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { useAlert } from "react-alert";

export default function AnuncioController() {

    const state = useSelector(store => store.anuncio)
    const [isShowEditPrice, setIsShowEditPrice] = useState(false)
    const [loadingButtonEditPrice, setLoadingButtonEditPrice] = useState(false)
    const [disabledButtonSuccess, setDisabledButtonSuccess] = useState(false)
    const [isPriceUpdated, setIsPriceUpdated] = useState(false)


    //const [userNickname, setUserNickname] = useState()
    /*
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('http://localhost:5000/anuncio').then(resp => {
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: resp.data, isLoading: false})
        }).catch(err => { console.log(err) })
    }, [])
*/

    let updateAnuncioPrice = async (itemId, price) => {
        if (price != '' || price != 0) {
            await axios.put('http://localhost:5000/anuncio/update_price', { itemId: itemId, price: price }).then(user => {
                console.log('Price updated: >> http://localhost:5000/anuncio/' + itemId + '/' + price + '\n')
                setIsShowEditPrice(false)
                setIsPriceUpdated(true)
                setLoadingButtonEditPrice(false)
                setDisabledButtonSuccess(false)
            }).catch(error => {
                console.log("An error occurred while fetching user by id: " + error)
            })
        } else {
            setLoadingButtonEditPrice(false)
            setDisabledButtonSuccess(false)
            console.log("Preço inválido, informe um valor maior do que zero! Tente novamente.")
        }
    }

    return (
        <>
            <AnuncioView
                state={state}
                {...state}
                updateAnuncioPrice={updateAnuncioPrice}
                isShowEditPrice={isShowEditPrice}
                setIsShowEditPrice={setIsShowEditPrice}
                loadingButtonEditPrice={loadingButtonEditPrice}
                setLoadingButtonEditPrice={setLoadingButtonEditPrice}
                disabledButtonSuccess={disabledButtonSuccess}
                setDisabledButtonSuccess={setDisabledButtonSuccess}
                isPriceUpdated={isPriceUpdated}
                setIsPriceUpdated={setIsPriceUpdated}/>
        </>
    );
}