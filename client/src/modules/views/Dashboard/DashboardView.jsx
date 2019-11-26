import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "modules/components/Card/Card.jsx";
import { StatsCard } from "modules/components/StatsCard/StatsCard.jsx";
import  PedidosPendentes  from "modules/components/PedidosPendentes/PedidosPendentes";


export default function DashboardView(props) {
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-server text-warning" />}
              statsText="Total de vendas"
              statsValue={props.totalVendas}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText={<span>Mês de {props.nomeMes}</span>}
            />
          </Col>

          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-wallet text-success" />}
              statsText="Saldo"
              statsValue={<span>R$ {props.saldoTotal}</span>}
              statsIcon={<i className="fa fa-calendar-o" />}
              statsIconText={<span>Disponível: R$ {props.saldoDisponivel}</span>}
            />

          </Col>
          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-graph1 text-danger" />}
              statsText="Pedidos Novos"
              statsValue="23"
              statsIcon={<i className="fa fa-clock-o" />}
              statsIconText="10 pedidos Hoje"
            />
          </Col>
        </Row>


        <Row>

          <Col md={12}>
            <Card
              title="Pedido de vendas pendente"
              category="Aguardando confirmação do pagamento"
              stats="Atualizado a 5 minutos atrás..."
              statsIcon="fa fa-history"
              content={
                <div className="table-full-width">
                  <table className="table">
                    <PedidosPendentes {...props}/>
                  </table>
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );

}


