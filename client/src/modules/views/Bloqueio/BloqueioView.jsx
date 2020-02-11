import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';

export default function BloqueioView(props) {

    const textStyle = {
        fontFamily: 'arial',
        fontSize: '20px',
        color: '#818281',
        padding: '0 0 10px'
    }

    const stylePaper = {
        height: '80px'
    }

    const textInsidePaper = {
        padding: '30px 30px 0',
        fontSize: '16px',
        color: '#818181'
    }

    return (
        <>

            <div style={{ margin: '0 0 15px' }}>
                <div style={{ borderLeft: '3px solid #179aa0', color: '#179aa0', backgroundColor: '#ebf8fa', padding: '10px 10px 10px', fontSize: '13px', display: 'grid', gridTemplateColumns: '30px auto' }}>
                    <InfoIcon />
                    <div style={{ margin: '2px 0 0' }}>
                        Embora estejam disponíveis uma prestação e fluxos de prevenção de fraude para manter a segurança de compradores e vendedores, em alguns casos, você pode encontrar usuários que, por algum motivo, ofertam nos anúncios. Estes casos podem ser enviados para a lista negra, a fim de evitar que voltem a ofertar.
                    </div>
                </div>

                <div style={{ borderLeft: '3px solid #179aa0', color: '#179aa0', backgroundColor: '#ebf8fa', padding: '10px 10px 10px', fontSize: '13px', display: 'grid', gridTemplateColumns: '30px auto' }}>
                    <InfoIcon />
                    <div style={{ margin: '2px 0 0' }}>
                        Gerenciar a lista negra de perguntas permite bloquear usuários para evitar que eles façam perguntas sobre seus produtos. Posteriormente, você pode removê-los da lista negra para que possam perguntar novamente. A lista negra é baseada em usuário, e o vendedor tem controle total sobre a lista de usuários que fazem parte dela.
                    </div>
                </div>
            </div>

            <div style={{ fontFamily: 'arial', fontSize: '14px', fontWeight: 'bold' }}>
                Bloqueio de usuários
            </div>
            <div>
                <TextField variant="outlined" placeholder='Buscar por apelido' size="small" />
                <Button
                    variant="contained"
                    color="default"
                    startIcon={<SearchIcon />}
                    style={{ margin: '2px 5px 0' }}>
                    Buscar
                </Button>
            </div>
            <div>
                <Grid container spacing={3} style={{ margin: '30px 0 0' }}>
                    <Grid item xs={6}>
                        <div style={textStyle}>Bloqueados para comprar</div>
                        <Paper style={stylePaper}>
                            <div style={textInsidePaper}>Você não possui nenhum usuário bloqueado para realizar compras.</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={textStyle}>Bloqueados para perguntar</div>
                        <Paper style={stylePaper}>
                            <div style={textInsidePaper}>Você não possui nenhum usuário bloqueado para realizar perguntas.</div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}