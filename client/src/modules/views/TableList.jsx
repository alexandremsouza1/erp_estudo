import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "modules/components/Card/Card.jsx";
import Button from "modules/components/CustomButton/CustomButton.jsx";

class TableList extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title={this.props.title}
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>

                    <thead>
                      <tr>
                        {this.props.thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>

                    <tbody>
                      {this.props.result.map(prop => {
                        return (
                          <tr>
                            <td>{prop.titulo}</td>
                            <td>{prop.preco}</td>
                            <td>{prop.descricao}</td>
                            <td>
                              <Button bsStyle="info" pullRight fill type="submit">
                                Editar
                              </Button>
                            </td>
                          </tr>)
                      })}
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
