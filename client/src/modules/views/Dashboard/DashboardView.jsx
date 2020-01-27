import React from "react";
import { Row, Col } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';
import { Card } from "modules/components/Card/Card.jsx";
import Carregando from '../../components/Loading/LoadingCarregandoSolicitacao'
import { Loader } from 'semantic-ui-react'
import Paper from '@material-ui/core/Paper';

export default function DashboardView(props) {

  return (
    <div className="content">
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Paper elevation={3} style={{ 'height': '130px' }}>
            <Row>
              <Col md={12}>
                <div style={{ 'color': '#818181', 'fontSize': '20px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>Mercado Pago</div>
              </Col>
            </Row>

            <Row style={{ 'paddingTop': '15px' }}>
              <Col md={3}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.saldoTotal}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Em conta</div>
              </Col>

              <Col md={3}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.saldoDisponivel}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Disponível</div>
              </Col>

              <Col md={3}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.saldoALiberar}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>A liberar</div>
              </Col>

              <Col md={3}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.saldoBloqueado}</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Bloqueado</div>
              </Col>
            </Row>

          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={3}>

            <Row>
              <Col md={12}>
                <div style={{ 'color': '#818181', 'fontSize': '20px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>Estado das publicações</div>
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

            <Row style={{ 'paddingBottom': '20px', 'paddingTop': '10px' }}>
              <Col md={6}>
                {props.totalAtivos === undefined
                ? <Loader size='mini' active={props.totalAtivos === undefined} inline style={{margin : '16px 130px 0'}}/>
                :<div style={{ 'color': '#71D8BF', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.totalAtivos}</div>
                }
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Publicações</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>ativas</div>
              </Col>

              <Col md={6}>
                {props.totalPausados === undefined
                ? <Loader size='mini' active={props.totalPausados === undefined} inline style={{margin : '16px 130px 0'}}/>
                : <div style={{ 'color': '#71D8BF', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>{props.totalPausados}</div>
                } 
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Publicações</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>pausadas</div>
              </Col>
            </Row>

          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper elevation={3} style={{ 'height': '200px' }}>

            <Row>
              <Col md={12}>
                <div style={{ 'color': '#818181', 'fontSize': '20px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>Atividade de hoje</div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div style={{ 'color': '#71D8BF', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>0</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Vendas</div>
              </Col>

              <Col md={6}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>R$ 0,00</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Faturamento</div>
              </Col>
            </Row>

            <Row style={{ 'paddingBottom': '20px', 'paddingTop': '30px' }}>
              <Col md={6}>
                <div style={{ 'color': '#71D8BF', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>0</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Perguntas</div>
              </Col>

              <Col md={6}>
                <div style={{ 'color': '#4194D8', 'fontSize': '25px', 'lineHeight': '30px', 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center', 'fontWeight': 'bold' }}>R$ 0,00</div>
                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'center' }}>Ticket médio</div>
              </Col>
            </Row>

          </Paper>
        </Grid>
      </Grid>
    </div >
  );

}


