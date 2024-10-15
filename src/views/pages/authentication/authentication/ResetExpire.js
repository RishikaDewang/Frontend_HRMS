import React from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Stack,useMediaQuery,Divider} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthWrapper1 from '../AuthWrapper';
export default function ResetExpire() {

    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <AuthWrapper1>
        <div className="boxes">
            <div className="boxOne">
                <Stack alignItems="center" justifyContent="center" spacing={5}>
                    <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h1' : 'h1'}  style={{marginTop:'15px'}}>
                    Link expired
                    </Typography>
                </Stack>
              
                <Grid item className='signin-card' container >
                    <Box sx={{marginBottom:"15px"}}>
                        <Typography variant="subtitle1">This link is no longer available. Please request a new one.</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                  </Grid>
                <Grid item xs={12} sx={{ margin:"15px 0 15px" }}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to="/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Back to Login
                      </Typography>
                    </Grid>
                  </Grid>
            </div>
        </div>
        </AuthWrapper1>
    )
}
