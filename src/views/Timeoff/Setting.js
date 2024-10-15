import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import CollapsibleTable from 'ui-component/grid';
import { fetchholiday, Addholiday , Deleteholiday, fetchPolicies,createPolicies,fetchEmployee, deletePolicies} from 'redux/action/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DeleteConfirmationDialog from 'ui-component/calendar';
import Header from 'ui-component/subheader';
import { ToastContainer } from 'react-toastify';
import {
  Autocomplete,
  FormHelperText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,

  FormGroup,
  Grid,
} from '@mui/material';
import { DatePicker } from 'antd';
import "./style.css"
 function Holiday() {
  const dispatch = useDispatch();
  const [holidayName, setHolidayName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startDateError,setStartDateError ] = useState('');
  const [endDateError, setEndDateError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedHolidayId, setSelectedHolidayId] = useState(null);
  const columns = [
    { id: 'id', label: 'Holiday' },
    { id: 'name', label: 'From Date' },
    { id: 'calories', label: 'To Date' },
    { id: 'calori', label: '' },
  ];

  useEffect(() => {
    dispatch(fetchholiday());
  }, []);

  const holiday = useSelector((state) => state.fetchHoliday.holiday);
  console.log(holiday);

  const handleDateChange = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
    setStartDateError(''); // Resetting the error when dates change
    setEndDateError('');
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // Resetting the form fields and errors when closing the modal
    setHolidayName('');
    setStartDate(null);
    setEndDate(null);
    setStartDateError('');
    setEndDateError('');
  };

  const handleSaveModal = () => {
    // Validation
    let isValid = true;
    if (!holidayName.trim()) {
      setStartDateError('Holiday Name is required');
      isValid = false;
    }

    // if (!startDate) {
    //   setStartDateError('From Date is required');
    //   isValid = false;
    // }

    if (!endDate) {
      setEndDateError(' Date is required');
      isValid = false;
    }

    if (isValid) {
      const holidayData = {
        holidayName: holidayName,
        fromDate: startDate.toISOString(),
        toDate: endDate.toISOString(),
      };
      dispatch(Addholiday(holidayData));
      handleCloseModal();
    }
  };
  const handleDeleteClick = (holidayId) => {
    setSelectedHolidayId(holidayId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(Deleteholiday(selectedHolidayId));
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };
  return (
    <>
    <ToastContainer/>
      <MainCard>
      <div className='holiday_button'>
        <Button variant="contained" onClick={handleOpenModal}>
          New Holiday
        </Button>
        </div>
        <CollapsibleTable data={holiday} columns={columns} holiday={true} openDeleteModal={handleDeleteClick} />
      </MainCard>

      {/* Modal for the form */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
    
        <DialogTitle>Add New Holiday</DialogTitle>
    
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Holiday Name"
              type="text"
              value={holidayName}
              onChange={(e) => setHolidayName(e.target.value)}
              fullWidth
              error={Boolean(startDateError)}
              helperText={startDateError}
            />
          </Box>
          <Box mb={30}>
            <DatePicker.RangePicker
               style={{ zIndex: 5 }}
              getPopupContainer={(trigger) => trigger.parentNode}
              value={[startDate, endDate]}
              onChange={handleDateChange}
            />
            {endDateError && (
              <FormHelperText error>{endDateError}</FormHelperText>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveModal}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Holiday</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this holiday?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Holiday"
        content="Are you sure you want to delete this Holiday?"
      />
    </>
  );
}


const Policies = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [policyToDelete, setPolicyToDelete] = useState(null);
const [policyNameError, setPolicyNameError] = useState(false);
const [policyNameHelperText, setPolicyNameHelperText] = useState('');
  const [requestData, setRequestData] = useState({
    requestType: "leave",
    paid: false,
    unpaid: false,
    description: "",
    policyName: "",
    count: "",
    duration: "",
    limit: "",
    carryForward: "yes",
    fullType: false,
    partTime: false,
    probation: false,
    specific: false,
    specificEmployee1: false,
    specificEmployee2: false,
    specificEmployee3: false,
  });

  const handleOpen = () => {
    setOpen(true);
  };
const handleClosenew = ()=>{
  setOpen(false);
}
  const handleClose = () => {
    if (!requestData.policyName.trim()) {
      setPolicyNameError(true);
      setPolicyNameHelperText("Policy Name is required");
      return; // Don't proceed with the API call if policy name is empty
    }
  
    // Reset error state if policy name is valid
    setPolicyNameError(false);
    setPolicyNameHelperText("");
  
    const eligibleEmployeeType = [];
    const specificEmployees = [];

    if (requestData.fullType) eligibleEmployeeType.push(1);
    if (requestData.partTime) eligibleEmployeeType.push(2);
    if (requestData.probation) eligibleEmployeeType.push(3);

    if (requestData.specific) {
      const selectedEmployeeIds = selectedEmployees.map(employee => employee.employeeId);
      specificEmployees.push(...selectedEmployeeIds);
    
      // Add more conditions for additional specific employee checkboxes if needed
    }

    const requestBody = {
      Name: requestData.policyName,
      Description: requestData.description,
      IsPaid: requestData.paid,
      Count: parseInt(requestData.count),
      Duration: requestData.duration,
      Limit: parseInt(requestData.limit),
      IsCarryForward: requestData.carryForward === "yes" ? true : false,
      EligibleEmployeeType: eligibleEmployeeType,
      SpecificEmployees: specificEmployees,
    };
console.log("requestBody",requestBody)
    dispatch(createPolicies(requestBody));

    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    
    setRequestData((prevData) => {
      if (type === "checkbox") {
        // If a checkbox is checked, uncheck the other checkbox
        return {
          ...prevData,
          paid: name === "paid" ? checked : false,
          unpaid: name === "unpaid" ? checked : false,
          [name]: checked,
        };
      } else {
        // For non-checkbox inputs, update the corresponding field
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };
  
  
  

  const policie = useSelector((state) => state.policies.policie);
  const employee = useSelector((state) => state.fetchEmployeeReducer.data?.employees);
  console.log("employee",employee)
  useEffect(() => {
    dispatch(fetchPolicies());
    dispatch(fetchEmployee(1,10));
  }, []);
  const handleDeleteOpen = (policyId) => {
    setPolicyToDelete(policyId);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteCancel = () => {
    setPolicyToDelete(null);
    setDeleteDialogOpen(false);
  };
  
  const handleDeleteConfirm = () => {
    // Dispatch action to delete the policy based on the policyToDelete ID
    dispatch(deletePolicies(policyToDelete));
    setPolicyToDelete(null);
    setDeleteDialogOpen(false);
  };
  const [, setSearchQuery] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]); 
  return (
    <>     <ToastContainer/>

      <div style={{ width:'100%',display:'flex', flexDirection:'row-reverse' }}>
      <Button variant="contained" onClick={handleOpen}>
        Create Policy
      </Button>
      </div>
      <div className='policie-container'>
      {policie &&
        policie.map((item) => (
          <MainCard key={item.id} title={item.name} style={{marginTop:"15px"}}>
                  <div style={{ width:'100%',display:'flex', flexDirection:'row-reverse' }}>
            <DeleteOutlineRoundedIcon onClick={() => handleDeleteOpen(item.leaveTypeId)} style={{ color: 'red' }}/></div>
            <div className="field-container">
              <div>
                <span className="field-title bJvZsc">Type Name</span>
              </div>
              <div className="field-content">
                <span className="field-value">{item.name}</span>
              </div>
              <div>
                <span className="field-title bJvZsc">Eligibility</span>
              </div>
              <div className="field-content">
                <span className="field-value">{item.eligibleEmployeeType}</span>
              </div>
            </div>
          </MainCard>
        ))}
</div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Request</DialogTitle>
        <DialogContent>
        <TextField
            label="Policy Name"
            name="policyName"
            value={requestData.policyName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={Boolean(policyNameError)}
            helperText={policyNameHelperText}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={requestData.paid}
                    onChange={handleInputChange}
                    name="paid"
                  />
                }
                label="Paid"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={requestData.unpaid}
                    onChange={handleInputChange}
                    name="unpaid"
                  />
                }
                label="Unpaid"
              />
            </Grid>
          </Grid>
          <TextField
            label="Description"
            name="description"
            value={requestData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Count"
                name="count"
                type='number'
                value={requestData.count}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Duration"
                name="duration"
          
                value={requestData.duration}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Limit"
                name="limit"
                type='number'
                value={requestData.limit}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
  <TextField
    label="Carry Forward"
    name="carryForward"
    type='text'
    value={requestData.carryForward}
    onChange={handleInputChange}
    fullWidth
  />
</Grid>

          </Grid>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={requestData.fullType}
                  onChange={handleInputChange}
                  name="fullType"
                />
              }
              label="Full-time"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={requestData.partTime}
                  onChange={handleInputChange}
                  name="partTime"
                />
              }
              label="Part-time"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={requestData.probation}
                  onChange={handleInputChange}
                  name="probation"
                />
              }
              label="Probation"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={requestData.specific}
                  onChange={handleInputChange}
                  name="specific"
                />
              }
              label="Specific"
            />

          </FormGroup>
          {requestData.specific && (
        <Autocomplete
          value={selectedEmployees}
          onChange={(event, newValue) => {
            setSelectedEmployees(newValue);
          }}
          multiple
          id="specific-employees"
          options={employee}
          getOptionLabel={(option) => option.fullName}
          filterOptions={(options, { inputValue }) =>
            options.filter(
              (option) =>
              option.fullName &&
              option.fullName.toLowerCase().includes(inputValue?.toLowerCase() || '')
            )
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Employees"
              variant="outlined"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        />
      )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosenew}>Cancel</Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmationDialog
  open={deleteDialogOpen}
  onClose={handleDeleteCancel}
  onConfirm={handleDeleteConfirm}
  title="Delete Policy"
  content="Are you sure you want to delete this Policy?"
/>

    </>
  );
};



export default function Setting() {
  const generalTabs = [
    { label: 'Holiday', value: '1', component: <Holiday/> },
    { label: 'Policies', value: '2',component: <Policies/>},
    // Add more tabs as needed
  ];
  return (
    <MainCard>
      <Header tabs={generalTabs} />
      {/* Use Header component with different tabs as needed */}
    </MainCard>
  );
}