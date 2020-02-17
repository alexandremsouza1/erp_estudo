import React, { useState } from 'react'
import imgWhatsapp from '../../../assets/img/WhatsApp-icon.png'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import ButtonUI from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function ClientView(props) {

    const textStyle = {
        color: 'black',
        fontFamily: 'arial',
        fontSize: '14px'
    }
    const textStyle_02 = {
        fontFamily: 'arial',
        fontSize: '14px',
        fontWeight: 'bold'
    }
    const alinhamentoTableCell = {
        padding: '0 15px 35px'
    }
    return (
        <div>

            <div style={{ margin: '0 0 10px' }}>
                <TextField label="Buscar por nome" variant="outlined" style={{ width: '100%' }} />
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {props.result.map((resp, key) => {
                            if (!props.isLoading) {
                                return (
                                    <>
                                        <TableRow key={key}>
                                            <TableCell component="th" scope="row">
                                                <>
                                                    <div style={{
                                                        color: 'black',
                                                        fontFamily: 'arial',
                                                        fontSize: '19px'
                                                    }}>{resp.id} - {resp.primeiro_nome} {resp.last_name}</div>
                                                    <div style={textStyle}>{resp.cidade} - {resp.estado}</div>
                                                    <div>
                                                        <ButtonUI
                                                            variant="contained"
                                                            color="default"
                                                            startIcon={<VisibilityIcon />}>
                                                            Ver detalhes das compras realizadas
                                                        </ButtonUI>
                                                    </div>
                                                </>
                                            </TableCell>
                                            <TableCell style={alinhamentoTableCell} align="right">
                                                <>
                                                    <div style={textStyle}> {resp.nickname} </div>
                                                    <div style={textStyle_02}>Usuário</div>
                                                </>
                                            </TableCell>
                                            <TableCell style={alinhamentoTableCell} align="right">
                                                <>
                                                    <div style={textStyle}><img src={imgWhatsapp}></img>062982380218</div>
                                                    <div style={textStyle_02}>CPF 75565698756</div>
                                                </>
                                            </TableCell>
                                            <TableCell style={alinhamentoTableCell} align="right">
                                                <>
                                                    <div style={textStyle}>1</div>
                                                    <div style={textStyle_02}>Compras</div>
                                                </>
                                            </TableCell>
                                            <TableCell style={alinhamentoTableCell} align="right">
                                                <>
                                                    <div style={textStyle}>R$ {resp.valorCompra}</div>
                                                    <div style={textStyle_02}>Valor total</div>
                                                </>
                                            </TableCell>
                                        </TableRow>


                                    </>
                                )
                            }
                        }
                        )}

                    </TableBody>
                </Table>
            </TableContainer>


            {/*props.result.map(resp => {
                if (!props.isLoading) {
                    return (
                        <>
                            {/**
                             * <Grid container spacing={2}>

                                <Grid item xs>
                                    <Typography variant="body2" color="textSecondary" style={{ 'color': 'black' }}>
                                        {<>{resp.primeiro_nome} {resp.last_name}</>}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{ 'color': 'black' }}>
                                        {resp.cidade} - {resp.estado}
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {resp.nickname}
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography variant="subtitle1">
                                        <img src={imgWhatsapp}></img>062982380218
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        CPF 75565698756
                                    </Typography>
                                </Grid>

                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        1
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" style={{ 'color': 'black' }}>
                                        Compras
                                    </Typography >
                                </Grid>

                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        R$ 149,99
                                    </Typography >
                                    <Typography variant="body2" color="textSecondary" style={{ 'color': 'black' }}>
                                        Valor total
                                    </Typography >
                                </Grid>
                            </Grid>

                            <Accordion>
                                <Accordion.Title>
                                    <Icon name="dropdown" />
                                    Ver detalhes das compras realizadas
                                </Accordion.Title>
                                <Accordion.Content>
                                    <p>
                                        A dog is a type of domesticated animal. Known for its loyalty and
                                        faithfulness, it can be found as a welcome guest in many households
                                        across the world.
                                    </p>
                                </Accordion.Content>
                            </Accordion>

                            <Divider />
                            }
                        </>
                    )
                } else {
                    return (
                        <div key={resp.id}>
                            <Carregando width={500} />
                        </div>
                    )
                }
            })*/}
        </div>
    )
}