import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "modules/components/Card/Card.jsx";
import Button from "modules/components/CustomButton/CustomButton.jsx";
import { Badge } from 'react-bootstrap';

class TableList extends Component {

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={this.props.title}
                category="Anúncios Ativos"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <tbody>
                      {this.props.result.map(prop => {
                        return (
                          <tr>
                            <td><img src={prop.foto_principal} alt='fotoPrincipal' height='100' width='80'/></td>  
                            <td>
                              <a href={prop.link_anuncio} rel="noopener noreferrer" target='_blank'>{prop.titulo}</a>
                              <br/>#{prop.id}
                              <br></br>
                              <Badge pill variant="warning">
                                <span style={{"font-weight": "bold"}}>Status: {prop.status === 'active' ? 'Ativo' : 'Inativo'}</span>
                              </Badge>  
                            </td>
                            
                            <td>
                            <Badge>R$: {prop.preco}</Badge>
                              <br/>
                            <Badge>{prop.visualizacao} Visitas</Badge>
                              <br/>
                            Estoque total: {prop.estoque_total}
                            </td>
                           
                            <td>
                              <Button bsStyle="info" pullRight fill type="submit">
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
  }
}

export default TableList;
