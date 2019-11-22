
import React from "react";

export class PedidosPendentes extends React.Component {
 
  render() {
    const mensagemPedidoPendente = [
      'Kit 10 Blusas Feminina Crepe Atacado - Promoção Frete Grátis"',
      "Kit 10 Blusas Feminina Crepe Atacado - Promoção Frete Grátis"
    ];
    var pedidos = [];

    for (var i = 0; i < mensagemPedidoPendente.length; i++) {
      pedidos.push(
        <tr key={i}>

          <td>
            {/* Colocar a imagem principal do anuncio aqui*/}
          </td>

          <td>
            <b>Anúncio:</b> {mensagemPedidoPendente[i]}
            <br></br>
            <b>Variação:</b> (10P - Manguinhas) - KIT 09
            <br></br>
            <b>Cliente:</b> João Antônio
            <br></br>
            <b>Data e hora da compra:</b> 08/11/2019 as 22:15
          </td>
         
        </tr>
      );
    }
    return <tbody>{pedidos}</tbody>;
  }
}

export default PedidosPendentes;
