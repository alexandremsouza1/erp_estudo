import React from "react";
import { Grid, Row, Col, Table} from "react-bootstrap";
import Card from "modules/components/Card/Card.jsx";
import Button from "modules/components/CustomButton/CustomButton.jsx";
import { Badge } from 'react-bootstrap';
import LoadingCarregandoSolicitacao from "modules/components/Loading/LoadingCarregandoSolicitacao"

export default function TableList(props) {
  
  if (!props.isLoading) {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>

              <Card
                title={props.title}
                category="Anúncios Ativos"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <tbody>
                      {props.result.map(prop => {
                        return (
                          <tr key={prop.id}>
                            <td><img src={prop.foto_principal} alt='fotoPrincipal' height='100' width='80' /></td>
                            <td>
                              <a href={prop.link_anuncio} rel="noopener noreferrer" target='_blank'>{prop.titulo}</a>
                              <br />#{prop.id}
                              <br></br>
                              <Badge pill variant="warning">
                                <span style={{ "font-weight": "bold" }}>Status: {prop.status === 'active' ? 'Ativo' : 'Inativo'}</span>
                              </Badge>
                            </td>

                            <td>
                              <Badge>R$: {prop.preco}</Badge>
                              <br />
                              <Badge>{prop.visualizacao} Visitas</Badge>
                              <br />
                              Estoque total: {prop.estoque_total}
                            </td>

                            <td>
                              <Button bsStyle="info" pullRight fill type="submit">
                                <i className='fa fa-edit'></i>
                                Editar
                              </Button>
                            </td>
                          </tr>
                        )
                      }
                      )}
                    </tbody>

                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  } else {
    return (
      <>
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={props.title}
                category="Anúncios Ativos"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <LoadingCarregandoSolicitacao width={450}/>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
      </>
    )
  }
}



