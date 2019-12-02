import React from "react";

import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";

import { Card } from "modules/components/Card/Card.jsx";
import TableList from './TableList'

export default function AnuncioView(props) {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Anúncio"
                content={            
                  <TableList title="Meus Anúncios" result={props.state.result} {...props}></TableList>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  
}


