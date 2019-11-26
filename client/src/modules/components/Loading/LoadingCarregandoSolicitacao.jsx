import React from 'react'
import { Image } from "react-bootstrap";


export default function Carregando(props){
    return ( 
        <Image src="http://www.kelvenveiculos.com.br/html/images/aguarde.gif" width={props.width}/>
    )
}