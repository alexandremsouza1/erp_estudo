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
                  <TableList {...props} title="Meus Anúncios" thArray={props.thArray} result={props.result} ></TableList>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  
}


