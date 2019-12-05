import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "modules/components/Card/Card.jsx";
import StatsCard from "modules/components/StatsCard/StatsCard.jsx";
import PedidosPendentes from "modules/components/PedidosPendentes/PedidosPendentes";
import Carregando from '../../components/Loading/LoadingCarregandoSolicitacao'

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
              isLoading={props.isLoading} />
          </Col>

          <Col lg={4} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-wallet text-success" />}
              statsText="Saldo"
              statsValue={<span>R$ {props.saldoTotal}</span>}
              statsIcon={<i className="fa fa-calendar-o" />}
              statsIconText={<span>Disponível: R$ {props.saldoDisponivel}</span>}
              isLoading={props.isLoading}
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
              title={<>Pedido de vendas pendente {props.totalVendasPendentes}</>}
              category="Aguardando confirmação do pagamento"
              content={
                <div className="table-full-width">

                  {props.vendasPendente.map(resp => {
                    if (!props.isLoading) {
                      return (
                          <PedidosPendentes resp={resp} key={resp.id} />
                      )
                    } else {
                      return (
                        <Carregando width={450} />
                      )
                    }
                  })
                  }
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );

}


