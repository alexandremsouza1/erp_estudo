import React, { useState } from 'react'
import AnuncioView from './AnuncioView';
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function AnuncioController() {

    const state = useSelector(store => store.anuncio)
    const [isShowEditPrice, setIsShowEditPrice] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)
    const [isPriceUpdated, setIsPriceUpdated] = useState(false)
    const [isStatusUpdated, setIsStatusUpdated] = useState(false)
    const [isShowConfirmPauseProduct, setIsShowConfirmPauseProduct] = useState(false)


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
                setLoadingButton(false)
                setDisabledButton(false)
            }).catch(error => {
                console.log("An error occurred while fetching user by id: " + error)
            })
        } else {
            setLoadingButton(false)
            setDisabledButton(false)
            console.log("Preço inválido, informe um valor maior do que zero! Tente novamente.")
        }
    }

    let updateStatus = async (itemId, status) => {
        await axios.put('http://localhost:5000/anuncio/update_status', {itemId, status}).then(response => {
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