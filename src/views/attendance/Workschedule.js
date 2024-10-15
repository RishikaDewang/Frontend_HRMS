import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogActions, Grid, Checkbox } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkschedule, createWorkschedule, deleteWorkschedule , updateWorkschedule} from 'redux/action/actions';
import './style.css';
import DeleteConfirmationDialog from 'ui-component/calendar';
import { ToastContainer } from 'react-toastify';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
export default function WorkSchedule() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    scheduleName: '',
    hoursPerDay: '',
    startTime: '',
    endTime: '',
    halfDayTime: '',
    lateTime: '',
    workingDays: ''
  });
  const [editIndex, setEditIndex] = useState(null); // Index of schedule being edited
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formErrors, setFormErrors] = useState({
    scheduleName: '',
    hoursPerDay :'',
    startTime: '',
    endTime: '',
    halfDayTime: '',
    lateTime: ''
  });
  const dispatch = useDispatch();
  const workschedule = useSelector((state) => state.setWorkschedule.workschedule);
  const validationRules = {
    scheduleName: { required: true, message: 'Schedule name is required' },
    hoursPerDay: { required: true, message: 'Standard working hours are required' },
    startTime: { required: true, message: 'Start time is required' },
    endTime: { required: true, message: 'End time is required' },
    halfDayTime: { required: true, message: 'Half-day time is required' },
    lateTime: { required: true, message: 'Late time is required' }
  };
  const handleDialogOpen = (editIndex = null) => {
    setEditIndex(editIndex);
    setDialogOpen(true);
    
    if (editIndex !== null) {
      const scheduleToEdit = workschedule[editIndex] || {};
      const WorkingDaysObject = JSON.parse(scheduleToEdit.workingDays); // Parse the JSON string
      
      // Convert the keys of the object to numbers and filter out the days that are true
      const WorkingDaysArray = Object.keys(WorkingDaysObject)
        .map(Number)
        .filter((key) => WorkingDaysObject[key]);
  
      setFormData({ ...scheduleToEdit, workingDays: WorkingDaysArray });
    } else {
      setFormData({
        scheduleName: '',
        hoursPerDay: '',
        startTime: '',
        endTime: '',
        halfDayTime: '',
        lateTime: '',
        workingDays: ''
      });
    }
  };
  

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === 'workingDays' ? value.split(',') : value
    });
  };

  useEffect(() => {
    dispatch(fetchWorkschedule());
  }, []);

  const handleSubmit = () => {
    let isValid = true;
    const errors = {}; 
    Object.entries(validationRules).forEach(([fieldName, rule]) => {
      if (rule.required && !formData[fieldName]) {
        errors[fieldName] = rule.message;
        isValid = false;
      }
    });

    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    

    const WorkingDaysObject = {
      1: formData.workingDays.includes(1),
      2: formData.workingDays.includes(2),
      3: formData.workingDays.includes(3),
      4: formData.workingDays.includes(4),
      5: formData.workingDays.includes(5),
      6: formData.workingDays.includes(6),
      7: formData.workingDays.includes(7)
    };
    const WorkingDaysString = JSON.stringify(WorkingDaysObject); // Convert to JSON string
    if (editIndex !== null) {
      // If editing, update existing schedule
      const updatedSchedule = { ...formData, scheduleId: workschedule[editIndex].scheduleId }; // Add scheduleId to formData
      // Dispatch action to update the schedule in Redux store
      dispatch(updateWorkschedule(updatedSchedule.scheduleId, { ...updatedSchedule, workingDays: WorkingDaysString }));

    } else {
      // If adding new, add to the list
      // Dispatch action to add the new schedule to Redux store
      dispatch(createWorkschedule({ ...formData, workingDays: WorkingDaysString }));
    }
    handleDialogClose();
  };

  const handleCheckboxChange = (day) => {
    const newWorkingDays = [...formData.workingDays];
    if (newWorkingDays.includes(day)) {
      newWorkingDays.splice(newWorkingDays.indexOf(day), 1);
    } else {
      newWorkingDays.push(day);
    }
    setFormData({
      ...formData,
      workingDays: newWorkingDays
    });
  };

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleKeyDown = (event) => {
    // Check if the Enter key is pressed
    if (event.key === 'Enter') {
      toggleAccordion();
    }
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteConfirmed = (deleteItemId) => {
    console.log(deleteItemId)
    dispatch(deleteWorkschedule(deleteItemId));
    toggleDeleteModal();
  };

  const handleDelete = (id) => {
    console.log(id)
    toggleDeleteModal();
    // handleDeleteConfirmed(id);
    setDeleteItemId(id);
  };
  console.log('formdate', formData);
  return (
    <>
    <ToastContainer />
      <MainCard title="Workschedule">
        <div className="button-empattdance">
          <Button variant="contained" color="primary" onClick={() => handleDialogOpen()}>
            New Schedule
          </Button>
        </div>
        {workschedule.map((item, index) => (
          <div key={index} className={`draggable-items ${isAccordionOpen ? 'accordion-open' : ''}`} style={{ marginTop: '5px' }}>
            <div
              className="accordion-header"
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <div className="drag-icon">{item.scheduleName}</div>
              <div className="drag-icon">Default</div>
              <div className="action">
                <EditRoundedIcon style={{ color: 'blue', marginRight:'10px' }} onClick={() => handleDialogOpen(index)} />
                <DeleteOutlineRoundedIcon style={{ color: 'red' }} onClick={() => handleDelete(item.scheduleId)} />
              </div>
            </div>
            <div className="accordion-content">
              <div>hiii</div>
            </div>
          </div>
        ))}
      </MainCard>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Schedule' : 'New Schedule'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: '5px' }}>
            {/* Your form fields here */}
            <Grid item xs={6}>
              <TextField name="scheduleName" label="Schedule Name" value={formData.scheduleName} onChange={handleChange} fullWidth
           error={!!formErrors.scheduleName}
           helperText={formErrors.scheduleName} />
            </Grid>
            {/* <Grid item xs={6}>
                            <TextField name="effectiveDate" label="Effective Date" type="date" value={formData.effectiveDate} onChange={handleChange} fullWidth />
                        </Grid> */}
            <Grid item xs={6}>
              {/* TimePicker for Standard Working Hours */}

              <TextField
              autoFocus= 'true'
                label="Standard Working Hours"
                value={formData.hoursPerDay}
                onChange={(event) => {
                  const value = event.target.value;
                  const newValue = value.split(':').length === 2 ? value + ':00' : value; // If seconds are not provided, append ":00"
                  handleChange({ target: { name: 'hoursPerDay', value: newValue } });
                }}
                type="time"
                fullWidth
                error={!!formErrors.hoursPerDay}
                helperText={formErrors.hoursPerDay}
              />
            </Grid>
            <Grid item xs={6}>
              {/* TimePicker for Start Time */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                 autoFocus= 'true'
                  type="time"
                  label="Start Time"
                  value={formData.startTime}
                  onChange={(event) => {
                    const value = event.target.value;
                    const newValue = value.split(':').length === 2 ? value + ':00' : value; // If seconds are not provided, append ":00"
                    handleChange({ target: { name: 'startTime', value: newValue } });
                  }}
                  fullWidth
                  error={!!formErrors.startTime}
                  helperText={formErrors.startTime}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              {/* TimePicker for End Time */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                  type="time"
                  label="End Time"
                  value={formData.endTime}
                  onChange={(event) => {
                    const value = event.target.value;
                    const newValue = value.split(':').length === 2 ? value + ':00' : value; // If seconds are not provided, append ":00"
                    handleChange({ target: { name: 'endTime', value: newValue } });
                  }}
                  fullWidth
                  error={!!formErrors.endTime}
                  helperText={formErrors.endTime}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              {/* TimePicker for Half-day Time */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                  type="time"
                  label="Half-day Time"
                  value={formData.halfDayTime}
                  onChange={(event) => {
                    const value = event.target.value;
                    const newValue = value.split(':').length === 2 ? value + ':00' : value; // If seconds are not provided, append ":00"
                    handleChange({ target: { name: 'halfDayTime', value: newValue } });
                  }}
                  fullWidth
                  error={!!formErrors.halfDayTime}
                  helperText={formErrors.halfDayTime}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              {/* TimePicker for Late Time */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TextField
                  type="time"
                  label="Late Time"
                  value={formData.lateTime}
                  onChange={(event) => {
                    const value = event.target.value;
                    const newValue = value.split(':').length === 2 ? value + ':00' : value; // If seconds are not provided, append ":00"
                    handleChange({ target: { name: 'lateTime', value: newValue } });
                  }}
                  fullWidth
                  error={!!formErrors.lateTime}
                  helperText={formErrors.lateTime}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {/* Checkbox for Working Days */}
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Checkbox
                  checked={formData.workingDays.includes('Monday') || formData.workingDays.includes(1)}
                  onChange={() => handleCheckboxChange(1)}
                />
                Monday
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={formData.workingDays.includes('Tuesday') || formData.workingDays.includes(2)}
                  onChange={() => handleCheckboxChange(2)}
                />
                Tuesday
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={formData.workingDays.includes('Wednesday') || formData.workingDays.includes(3)}
                  onChange={() => handleCheckboxChange(3)}
                />
                Wednesday
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={formData.workingDays.includes('Thursday') || formData.workingDays.includes(4)}
                  onChange={() => handleCheckboxChange(4)}
                />
                Thursday
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={formData.workingDays.includes('Friday') || formData.workingDays.includes(5)}
                  onChange={() => handleCheckboxChange(5) || formData.workingDays.includes(5)}
                />
                Friday
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={formData.workingDays.includes('Saturday') || formData.workingDays.includes(6)}
                  onChange={() => handleCheckboxChange(6) || formData.workingDays.includes(6)}
                />
                Saturday
              </Grid>
              <Grid item xs={2}>
                <Checkbox
                  checked={formData.workingDays.includes('Sunday') || formData.workingDays.includes(7)}
                  onChange={() => handleCheckboxChange(7)}
                />
                Sunday
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editIndex !== null ? 'Save' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmationDialog
        open={isDeleteModalOpen}
        onClose={toggleDeleteModal}
        onConfirm={() => handleDeleteConfirmed(deleteItemId)}
        title="Delete Employee"
        content="Are you sure you want to delete this Employee?"
      />
    </>
  );
}
