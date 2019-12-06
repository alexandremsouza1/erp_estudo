import React from 'react'
import { Grid, Row, Col } from "react-bootstrap"
import Card from "../../components/Card/Card"
import { FormInput } from "../../components/FormInput/FormInput";

export default function ControlleEstoqueView(props) {
    return (
        <div className="content">
            <Grid fluid>
                <Row>
                    <Col md={12}>
                        <Card
                            title=""
                            content={
                                <div>
                                    <FormInput ncols={["col-md-4"]} label="A" style={{"width": "500px"}}/>
                                </div>
                            }
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}