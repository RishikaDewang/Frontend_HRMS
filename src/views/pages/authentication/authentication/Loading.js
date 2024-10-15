import React from 'react';
import Box from '@mui/material/Box';

import { Typography, useMediaQuery } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import { activateCompany } from 'redux/action/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default function Loading() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loadingReducer.loading);
  console.log('isLoading', isLoading);
  const location = useLocation();
  const tokenFromURL = new URLSearchParams(location.search).get('token');
  console.log('token', tokenFromURL);
  const [activate , setActivate] = useState(true)
  useEffect(() => {
    if (tokenFromURL) {
      dispatch(activateCompany(tokenFromURL));
      setActivate(true)
    }
  }, [tokenFromURL]);
  useEffect(() => {
    if (isLoading === true) {
      navigate('/signupsucess');
    } else {
      navigate('/signupsucess');
    }
  }, [activate]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh' // Set the height of the box to be the full viewport height
      }}
    >
      <CircularProgress size={28} />
      <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
        Please wait
      </Typography>
    </Box>
  );
}
