import React from 'react'
import { Grid, Row, Col } from "react-bootstrap"
import Card from "../../components/Card/Card"
import { FormInputs } from "../../components/FormInputs/FormInputs";

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
                                    <FormInputs
                                        ncols={["col-md-4", "col-md-4", "col-md-4"]}
                                        properties={[
                                            {
                                                label: "City",
                                                type: "text",
                                                bsClass: "form-control",
                                                placeholder: "City",
                                                defaultValue: "Mike"
                                            },
                                            {
                                                label: "Country",
                                                type: "text",
                                                bsClass: "form-control",
                                                placeholder: "Country",
                                                defaultValue: "Andrew"
                                            },
                                            {
                                                label: "Postal Code",
                                                type: "number",
                                                bsClass: "form-control",
                                                placeholder: "ZIP Code"
                                            }
                                        ]}
                                    />
                                </div>
                            }
                        />
                    </Col>
                </Row>
            </Grid>
        </div>
    )
}