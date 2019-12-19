import React, {useState} from 'react'
import AnuncioView from './AnuncioView';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { LISTAR_TODOS_ANUNCIOS } from '../../constants/constants'

export default function AnuncioController() {

    const state = useSelector(store => store.anuncio)
    const [userNickname, setUserNickname] = useState()
    /*
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('http://localhost:5000/anuncio').then(resp => {
            dispatch({ type: LISTAR_TODOS_ANUNCIOS, data: resp.data, isLoading: false})
        }).catch(err => { console.log(err) })
    }, [])
*/
        let getUserById = (userId) => {
            axios.get('http://localhost:5000/usuario/'+userId).then(user =>{
                setUserNickname(user.data.nickname)
            }).catch(error => {
                console.log("An error occurred while fetching user by id: "+error)
            })
        }



    return (
        <div>
            <AnuncioView state={state} {...state}/>
        </div>
    );


}