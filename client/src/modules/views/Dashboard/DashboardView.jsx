import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "modules/components/Card/Card.jsx";
import StatsCard from "modules/components/StatsCard/StatsCard.jsx";
import PedidosPendentes from "modules/components/PedidosPendentes/PedidosPendentes";
import Carregando from '../../components/Loading/LoadingCarregandoSolicitacao'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'

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
                <>
                  {props.vendasPendente.map((prop, key) => {
                    if (!props.isLoading) {
                      return (
                        <Item.Group divided>
                          <Item key={key}>
                            <Item.Image src={prop.fotoPrincipal}  style={{'height':'100px', 'width':'80px', 'marginTop': '13px'}}/>
                            <Item.Content>
                              <Item.Header style={{ 'margin-left': '-16px' }}>{prop.titulo}</Item.Header>
                              <Item.Meta>
                                <span className='cinema'>{prop.dataPedido}</span>
                              </Item.Meta>
                              <Item.Description>
                                <b>Cliente:</b> {prop.cliente}
                                <br></br>
                              </Item.Description>
                              <Item.Extra>
                                <Label>{prop.variacao}</Label>
                                <Label icon='money' content={<>{prop.preco} reais</>} />
                                <Button icon labelPosition='left' style={{'fontSize': '10px'}} color='orange'>
                                  <Icon name='file pdf outline'></Icon>
                                  <a style={{'color': 'white'}} href={prop.boleto} target='_blank' rel="noopener noreferrer"> Boleto</a>
                                </Button>
                              </Item.Extra>
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      )
                    } else {
                      return (
                        <Carregando width={450} />
                      )
                    }
                  })
                  }
                </>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );

}


