import React from "react";
import { Row, Col } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import { Card } from "modules/components/Card/Card.jsx";
import StatsCard from "modules/components/StatsCard/StatsCard.jsx";
import Carregando from '../../components/Loading/LoadingCarregandoSolicitacao'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

export default function DashboardView(props) {

  return (
    <div className="content">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper elevation={3}>
            <StatsCard
              bigIcon={<i className="fa fa-shopping-cart" />}
              statsText="Total de vendas"
              statsValue={props.totalVendas}
              statsIcon={<i className="fa fa-calendar-o" />}
              statsIconText={<span>Mês de {props.nomeMes}</span>}
              isLoading={props.isLoading} />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={3} style={{'height':'130px'}}>
            <Row>
              <Col md={12}>
                <div style={{ 'color': '#4194D8', 'fontSize': '15px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>Mercado Pago</div>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>R$ {props.totalVendas}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Dinheiro em conta</div>
              </Col>
           
              <Col md={4}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>R$ 0,00</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Dinheiro disponível</div>
              </Col>
           
              <Col md={4}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>R$ 0,00</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Dinheiro a liberar</div>
              </Col>
            </Row>

          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper elevation={3}>

            <Row>
              <Col md={12}>
                <div style={{ 'color': '#4194D8', 'fontSize': '15px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>Estado das publicações</div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>0</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Perguntas</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>sem responder</div>
              </Col>

              <Col md={6}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>0</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Mensagens</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>sem ler</div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>0</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Publicações</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>ativas</div>
              </Col>

              <Col md={6}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>0</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Publicações</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>pausadas</div>
              </Col>
            </Row>

          </Paper>
        </Grid>

        


        {props.vendasPendente.length > 0 &&
          <Grid item xs={12}>
            <Card
              title={<>Pedido de vendas pendente {props.totalVendasPendentes}</>}
              category="Aguardando confirmação do pagamento"
              content={
                <Segment raised color='grey'>
                  {props.vendasPendente.map((prop, key) => {
                    if (!props.isLoading) {
                      return (
                        <Item.Group divided key={key}>
                          <Item key={key}>
                            <Item.Image src={prop.fotoPrincipal} style={{ 'height': '100px', 'width': '80px', 'marginTop': '13px' }} />
                            <Item.Content>
                              <Item.Header style={{ 'marginLeft': '-16px' }}>{prop.titulo}</Item.Header>
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
                                <Button icon labelPosition='left' style={{ 'fontSize': '10px' }} color='orange'>
                                  <Icon name='file pdf outline'></Icon>
                                  <a style={{ 'color': 'white' }} href={prop.boleto} target='_blank' rel="noopener noreferrer"> Boleto</a>
                                </Button>
                              </Item.Extra>
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      )
                    } else {
                      return (
                        <Carregando width={450} key={key} />
                      )
                    }
                  })
                  }
                </Segment>
              }
            />
          </Grid>
        }
      </Grid>
    </div >
  );

}


