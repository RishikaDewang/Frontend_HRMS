
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid, MenuItem ,} from '@mui/material';
import './style.css';
import { fetchCountry, fetchState, fetchCity, fetchOffices, createOffices, deleteOffice, updateOffices ,fetchOfficeId} from 'redux/action/actions'; // Assuming these are your action creators
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useDispatch, useSelector } from 'react-redux';
import DeleteConfirmationDialog from 'ui-component/calendar';
import QRCode from 'qrcode.react'; 
export default function Offices() {
  const [open, setOpen] = useState(false);
  const [officeName, setOfficeName] = useState('');
  const [ , setQrcode ] = useState('')
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [radius, setRadius] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editMode, setEditMode] = useState(false); // New state to determine edit mode
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to control de
  const [qrCodeKey, setQrCodeKey] = useState(0); 
  const [formErrors, setFormErrors] = useState({
    officeName: '',
    latitude: '',
    longitude: ''
  });

  const [deleteItemId, setDeleteItemId] = useState(null);
  const dispatch = useDispatch();
  const country = useSelector((state) => state.fetchCountry.country);
  const states = useSelector((state) => state.fetchState.state);
  const cities = useSelector((state) => state.fetchCity.city);
  const offices = useSelector((state) => state.setOffices.offices);
  console.log("offices",offices)
  const companyId = useSelector((state) => state.userReducer.companyid)
  const officeid =  useSelector((state)=> state.OfficeId.OfficeId?.
  nextOfficeId)
  console.log("officeid",officeid)
  const handleOpen = () => {
    setOpen(true);
    dispatch(fetchOfficeId())
  }
  const handleClose = () => {
    setOpen(false);
    // Reset all form fields when closing the dialog
    setOfficeName('');
    setAddress('');
    setLatitude(0);
    setLongitude(0);
    setSelectedCountry('');
    setSelectedState('');
    setSelectedCity('');
    setEditMode(false); // Reset edit mode
    setEditItemId(null);
  };
  const validationRules = {
    officeName: {
      required: true,
      message: 'Office name is required',
    },
    latitude: {
      required: true,
      message: 'Latitude is required',
    },
    longitude: {
      required: true,
      message: 'Longitude is required',
    },
    radius: {
      required: true,
      message: 'Radius is required',
    },
  };
  
  const handleGenerateQRCode = () => {
    // Update the key to force re-render of QR code component
    setQrCodeKey(qrCodeKey + 1);
  };
  const handleSave = () => {
    let isValid = true;
    const errors = {}; // Initialize errors object here

    // Iterate over each field and validate based on rules
    Object.entries(validationRules).forEach(([fieldName, rule]) => {
      if (rule.required && !officeName) {
        errors[fieldName] = rule.message;
        isValid = false;
      }
    });

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    // Create the payload for creating or updating an office
    const officeData = {
      officeName,
      address,
      latitude,
      longitude,
      radius, // Add radius here
      FkCountryId: selectedCountry,
      FkStateId: selectedState,
      FkCityId: selectedCity,
      qrCode:qrCodeToSVG()
    };
    

    if (editMode) {
      // Dispatch action to update the office
      // You need to implement the updateOffice action creator
      dispatch(updateOffices(editItemId, officeData));
      // For now, just log the office data
      console.log('Updated Office Data:', officeData);
    } else {
      // Dispatch action to create a new office
      dispatch(createOffices(officeData));
    }

    handleClose(); // Close the dialog after saving
  };
  const qrCodeToSVG = () => {
    // Get the SVG element
    const svgElement = document.getElementById('qrcode-svg');
    // Convert SVG element to string
    const svgString = new XMLSerializer().serializeToString(svgElement);
    return svgString;
  }; 

  useEffect(() => {
    dispatch(fetchCountry());
    dispatch(fetchOffices());
  }, [dispatch]);

  const handleCountryChange = (event) => {
    const selectedCountryId = event.target.value;
    setSelectedCountry(selectedCountryId);
    dispatch(fetchState(selectedCountryId));
  };

  const handleStateChange = (event) => {
    const selectedStateId = event.target.value;
    setSelectedState(selectedStateId);
    dispatch(fetchCity(selectedStateId));
  };
  const handleDelete = (officeId) => {
    // Open the delete confirmation dialog and set the deleteItemId
    setDeleteItemId(officeId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = () => {
    // Dispatch the delete action with the deleteItemId
    dispatch(deleteOffice(deleteItemId));
    // Close the delete confirmation dialog
    setIsDeleteModalOpen(false);
  };
  return (
    <div>
      <MainCard title="Offices">
        <div className="button-empattdance">
          <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginRight: '0px' }}>
            New Office
          </Button>
        </div>
        {offices.map((office, index) => (
          <div key={index} className="draggable-item" style={{ marginTop: '5px' }}>
            <div className="drag-icon">{office.officeName}</div>
            <div className="action">
              <EditRoundedIcon
                style={{ color: 'blue', marginRight: '10px' }}
                onClick={() => {
                  // Set office details to display in the dialog
                  setOfficeName(office.officeName);
                  setAddress(office.address);
                  setLatitude(office.latitude);
                  setLongitude(office.longitude);
                  setSelectedCountry(office.country);
                  setSelectedState(office.state);
                  setSelectedCity(office.city);
                  setRadius(office.radius);
                  setQrcode(office.qrcode )
                  setEditMode(true); // Set edit mode
                  setEditItemId(office.officeId);
                  handleOpen(); // Open the dialog
                }}
              />
              <DeleteOutlineRoundedIcon style={{ color: 'red' }} onClick={() => handleDelete(office.officeId)} />
            </div>
          </div>
        ))}
      </MainCard>
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>{editMode ? 'Edit Office' : 'Add Office'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Office Name"
                value={officeName}
                onChange={(e) => setOfficeName(e.target.value)}
                fullWidth
                error={!!formErrors.officeName}
                helperText={formErrors.officeName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Latitude"
                type="number"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                fullWidth
                error={!!formErrors.latitude}
                helperText={formErrors.latitude}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Longitude"
                type="number"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                fullWidth
                error={!!formErrors.longitude}
                helperText={formErrors.longitude}
              />
            </Grid>
            <Grid item xs={6}>
  <TextField
    label="Radius"
    type="number"
    value={radius}
    onChange={(e) => setRadius(e.target.value)}
    fullWidth
  />
</Grid>

            <Grid item xs={6}>
              <TextField select label="Country" value={selectedCountry} onChange={handleCountryChange} fullWidth>
                {country?.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField select label="State" value={selectedState} onChange={handleStateChange} fullWidth>
                {states?.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField select label="City" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} fullWidth>
                {cities?.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
            <QRCode
              id="qrcode-svg"
              key={qrCodeKey} // This will force re-render of QR code component
              value={`{"company_id": ${companyId}, "office_id": ${officeid}}`} // Static company ID and office ID
              size={150}
              includeMargin={true}
              renderAs={'svg'} // Render the QR code as SVG image
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleGenerateQRCode}>Generate QR Code</Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmationDialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirmed}
        title="Delete Office"
        content="Are you sure you want to delete this office?"
      />
    </div>
  );
}

