import React from 'react'
import './style.css'
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Stack,useMediaQuery,Divider} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AuthWrapper1 from '../AuthWrapper';
import { ForgotPasswordFailure } from 'redux/action/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
export default function ResetSuccess() {

    const dispatch = useDispatch()
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const Authenticate =  useSelector((state)=>state.resetPassword.Authenticate)
    useEffect(()=>{
        if(Authenticate){
            console.log("authenticate",Authenticate)
            dispatch(ForgotPasswordFailure())
             console.log("authenticate",Authenticate)
        }
       
    },[dispatch])
    const handleBackToLogin = () => {
        localStorage.clear(); 
      };
    return (
        <AuthWrapper1>
        <div className="boxes">
            <div className="boxOne">
                <img src="https://img.freepik.com/free-vector/birthday-cap-with-confetti-serpentine-explosion_1017-17924.jpg?size=626&ext=jpg&ga=GA1.1.2092121799.1695119983&semt=sph" alt="" title="Arggg this is a sword!" />
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                    <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h1' : 'h1'}>
                       Congratulations!
                    </Typography>
                </Stack>
              
                <Grid item className='signin-card' container >
                    <Box sx={{marginBottom:"15px"}}>
                        <Typography variant="subtitle1">Your password has been successfully changed</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                  </Grid>
                <Grid item xs={12} sx={{ margin:"15px 0 15px" }}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link}  onClick={handleBackToLogin} variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Back to Login
                      </Typography>
                    </Grid>
                  </Grid>
            </div>
        </div>
        </AuthWrapper1>
    )
}
