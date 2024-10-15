// Settings.jsx
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Header from 'ui-component/subheader';
import { createqrcode } from 'redux/action/actions';
import {  useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchQrcode } from 'redux/action/actions';
import { useEffect } from 'react';
import { ImageListItem ,Button ,Dialog ,TextField ,FormControl ,InputLabel ,Select ,MenuItem ,DialogTitle ,DialogContent ,DialogActions,Grid  } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BasicButtons from 'ui-component/button';
const QRCodeContent = () => {
    // const employeeid = useSelector((state) => state.userReducer.id);
    const dispatch = useDispatch();
    const qrimage =  useSelector((state)=>state.qrcodereducer.qrimage)
    const companyid =  useSelector((state)=>state.userReducer.companyid)
    console.log("company id", companyid)
    const defaultProfilepic = { imageUrl: 'default_image_url' };
    const profilePicObject = qrimage || defaultProfilepic;
    console.log("qr image", qrimage)
    const [locationDetails, setLocationDetails] = useState({});

    useEffect(()=>{
    dispatch(fetchQrcode(companyid))
    },[dispatch])

  
    const getUserLocation = () => {
      if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log('Latitude:', latitude);
              console.log('Longitude:', longitude);
  
              setLocationDetails({
                locationDetails,
                latitude,
                longitude,
              });
  
              resolve({
                latitude,
                longitude,
              });
            },
            (error) => {
              console.error('Error getting user location:', error);
              reject(error);
            }
          );
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
        return Promise.reject('Geolocation not supported');
      }
    };
    
    const handleCreateQR = async () => {
      try {
        const locationDetails = await getUserLocation();

        // Assuming static place name for now
        const staticPlaceName = 'Static Place Name';
  
        // Now, you can dispatch the API call with the updated location details
        dispatch(createqrcode(companyid, { ...locationDetails, location: staticPlaceName }));
      } catch (error) {
        console.error('Error creating QR code:', error);
      }
    };
    return (
      <>

<ImageListItem >
      <img
       style={{ width: '30%' }} 
        src={profilePicObject.imageUrl}
        alt='qrcode'
        loading="lazy"
      />
    </ImageListItem>
        <BasicButtons name='Create QR' handleSaveClick={async () => {
          await getUserLocation();
          handleCreateQR();
        }}>Create QR</BasicButtons>

      </>
    );
  };
  

  const General = () => {
    // const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
      scheduleName: '',
      effectiveDate: '',
      standardWorkingHours: '',
      workingDays: [],
    });
  
    const handleDialogOpen = () => {
      setDialogOpen(true);
    };
  
    const handleDialogClose = () => {
      setDialogOpen(false);
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleWorkingDaysChange = (event) => {
      setFormData({
        ...formData,
        workingDays: event.target.value,
      });
    };
    const handleStandardWorkingHoursChange = (time) => {
      setFormData({
        ...formData,
        standardWorkingHours: time,
      });
    };
    const handleSubmit = () => {
      // Implement your logic to handle submission here
      console.log("Schedule submitted!", formData);
      // Optionally, you can close the dialog after submission
      handleDialogClose();
    };
  
    return (
      <>
     <Button variant="contained" color="primary" onClick={handleDialogOpen}>
        New Schedule
      </Button>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>New Schedule</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField name="scheduleName" label="Schedule Name" value={formData.scheduleName} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField name="effectiveDate" label="Effective Date" type="date" value={formData.effectiveDate} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Standard Working Hours"
                  value={formData.standardWorkingHours}
                  onChange={handleStandardWorkingHoursChange}
                  views={['hours', 'minutes']}
                  format="hh:mm"
                  ampm={false} 
                  fullWidth
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="working-days-label">Working Days</InputLabel>
                <Select
                  labelId="working-days-label"
                  id="working-days"
                  multiple
                  value={formData.workingDays}
                  onChange={handleWorkingDaysChange}
                  fullWidth
                >
                  <MenuItem value="Monday">Monday</MenuItem>
                  <MenuItem value="Tuesday">Tuesday</MenuItem>
                  <MenuItem value="Wednesday">Wednesday</MenuItem>
                  <MenuItem value="Thursday">Thursday</MenuItem>
                  <MenuItem value="Friday">Friday</MenuItem>
                  <MenuItem value="Saturday">Saturday</MenuItem>
                  <MenuItem value="Sunday">Sunday</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </>
    );
  };
export default function Settings() {
  const generalTabs = [
    { label: 'QR code', value: '1', component: <QRCodeContent/> },
    { label: 'General Tab 2', value: '2', component: <General/> },
    // Add more tabs as needed
  ];

  return (
    <MainCard>
      <Header tabs={generalTabs} />
      {/* Use Header component with different tabs as needed */}
    </MainCard>
  );
}
