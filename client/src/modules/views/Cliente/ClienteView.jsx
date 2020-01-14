import React from 'react'
import { Row, Col } from "react-bootstrap";
import Carregando from '../../components/Loading/LoadingCarregandoSolicitacao'
import Grid from '@material-ui/core/Grid';
import imgWhatsapp from '../../../assets/img/WhatsApp-icon.png'
import userAvatar from '../../../assets/img/useravatar.png'
import Panel from '../../components/Panel/Panel'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Accordion, Icon } from 'semantic-ui-react'

export default function ClientView(props) {
    return (
        <div className="content">
            {props.result.map(resp => {
                if (!props.isLoading) {
                    return (
                        <>
                            <Grid container spacing={2}>

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
                        </>
                    )
                } else {
                    return (
                        <div key={resp.id}>
                            <Carregando width={500} />
                        </div>
                    )
                }
            })}
        </div>
    )
}