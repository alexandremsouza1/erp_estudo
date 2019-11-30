
import React from "react";
import { Card } from "modules/components/Card/Card.jsx";

export default function PedidosPendentes(props) {
  return (
    <Card
      title={props.resp.titulo}
      category={<>{props.resp.dataPedido}</>}
      stats="Atualizado a 5 minutos atrás..."
      statsIcon="fa fa-history"
      content={
        <div className="table-full-width">
          <table className="table">
            <tbody>
              <tr key={props.resp.id}>
                <td>
                  <img src={props.resp.fotoPrincipal} alt='fotoPrincipal' height='100' width='80'></img>
                </td>
                <td>
                  <b>Variação:</b> {props.resp.variacao}
                  <br></br>
                  <b>Cliente:</b> {props.resp.cliente}
                  <br></br>
                  <b>Data e hora da compra:</b> {props.resp.dataPedido}
                  <br></br>
                  <b>Valor do produto:</b> {props.resp.preco} reais
                  <br></br>
                  <b>Boleto:</b> <a href={props.resp.boleto} target='_blank' rel="noopener noreferrer"> {props.resp.boleto}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }>
    </Card>

  )










}



