import React, {useState} from 'react'
import AnuncioView from './AnuncioView';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { LISTAR_TODOS_ANUNCIOS } from '../../constants/constants'

export default function AnuncioController() {

    const state = useSelector(store => store.anuncio)
    //const [userNickname, setUserNickname] = useState()
    /*
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('http://localhost:5000/anuncio').then(resp => {
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: resp.data, isLoading: false})
        }).catch(err => { console.log(err) })
    }, [])
*/
        let updateAnuncioPrice= async (itemId, price) => {
            await axios.put('http://localhost:5000/anuncio/update_price', {itemId: itemId, price: price}).then(user =>{
                console.log('Price updated: >> http://localhost:5000/anuncio/'+itemId+'/'+price+'\n')
            }).catch(error => {
                console.log("An error occurred while fetching user by id: "+error)
            })
        }

    return (
        <div>
            <AnuncioView state={state} {...state} updateAnuncioPrice={updateAnuncioPrice}/>
        </div>
    );


}