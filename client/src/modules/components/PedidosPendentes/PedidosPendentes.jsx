
import React from "react";

export default function PedidosPendentes(props) {
  return (
    <tbody>
        <tr>
          <td>
            <img src={props.fotoPrincipal} alt='fotoPrincipal' height='100' width='80'></img>
          </td>
          <td>
            <b>Anúncio:</b> {props.titulo}
          <br></br>
            <b>Variação:</b> {props.variacao}
          <br></br>
            <b>Cliente:</b> {props.cliente}
          <br></br>
            <b>Data e hora da compra:</b> {props.dataPedido}
          <br></br>
            <b>Valor do produto:</b> {props.valor} reais
          <br></br>
            <b>Boleto:</b> <a href={props.linkBoleto} target='_blank'> {props.linkBoleto}</a>  
        </td>
      </tr>
    </tbody>
  )
}



