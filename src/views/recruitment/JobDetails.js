import PropTypes from 'prop-types';
import CollapsibleTable from 'ui-component/grid';
import MainCard from 'ui-component/cards/MainCard';
import { fetchjobdetail,fetchStages,fetchJobs, addCandidateRequest } from 'redux/action/actions';
import { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useDropzone } from 'react-dropzone';
import BasicButtons from 'ui-component/button';
import "./style.css"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl ,Box} from '@mui/material';
const JobDetails = () => {
  const columns = [
    { id: 'id', label: 'FullName' },
    { id: 'name', label: 'Email' },
    { id: 'Phone', label: 'Phone Number' },
    { id: 'CV', label: 'CV' },
    { id: 'Created By', label: 'Created By' },
    { id: 'Created', label: 'Created Date' },
    { id: 'Stage', label: 'Stage' },
  ];
const dispatch =  useDispatch()
const jobdetail =  useSelector((state)=>state.fetchJobDetails.jobdetail)
const stages = useSelector((state) => state.fetchStagesReducer.stages)
const jobs = useSelector((state) => state.fetchJobsReducer.jobs)
const location = useLocation();
const jobId = location.state.jobId;
const [isDialogOpen, setDialogOpen] = useState(false);
const [newCandidate, setNewCandidate] = useState({
  fullName: '',
  email: '',
  mobileNo: '',
  job: '',
  source: '',
  cv: null, // To store the uploaded CV file
});
const [formErrors, setFormErrors] = useState({
  fullName: '',
  email: '',
  mobileNo: '',
  job: '',
  source: '',
  cv: '',
}); 
useEffect(()=>{
  dispatch(fetchjobdetail(jobId))
  dispatch(fetchStages())
  dispatch(fetchJobs());
},[])

const handleDialogOpen = () => {
  setDialogOpen(true);
};
const handleDialogClose = () => {
  setDialogOpen(false);
  // Reset the form fields when closing the dialog
  setNewCandidate({
    fullName: '',
    email: '',
    mobileNo: '',
    job: '',
    source: '',
    cv: null,
  });
  setFormErrors({
    fullName: '',
    email: '',
    mobileNo: '',
    job: '',
    source: '',
    cv: '',
  });
};
const handleInputChange = (field, value) => {
  setNewCandidate({
    ...newCandidate,
    [field]: value,
  });
  console.log("newcandidate",newCandidate)
};

const onDrop = (acceptedFiles) => {
  // Handle the dropped files
  const file = acceptedFiles[0];
  setNewCandidate({
    ...newCandidate,
    cv: file,
  });
};
const { getRootProps, getInputProps ,isDragActive } = useDropzone({
  accept: '.pdf,.doc,.docx',
  onDrop,
})
const validateForm = () => {
  let isValid = true;
  const errors = {
    fullName: '',
    email: '',
    mobileNo: '',
    job: '',
    source: '',
    cv: '',
  };

  if (!newCandidate.fullName) {
    errors.fullName = 'Full Name is required';
    isValid = false;
  }

  if (!newCandidate.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(newCandidate.email)) {
    errors.email = 'Invalid email address';
    isValid = false;
  }

  if (!newCandidate.mobileNo) {
    errors.mobileNo = 'Mobile No is required';
    isValid = false;
  }

  if (!newCandidate.job) {
    errors.job = 'Job is required';
    isValid = false;
  }

  if (!newCandidate.source) {
    errors.source = 'Source is required';
    isValid = false;
  }

  if (!newCandidate.cv) {
    errors.cv = 'CV is required';
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};
const handleAddCandidate = () => {
  const isValid = validateForm();

  if (isValid) {
    const formData = new FormData();
    formData.append('Fullname', newCandidate.fullName);
    formData.append('Email', newCandidate.email);
    formData.append('MobileNo', newCandidate.mobileNo);
    formData.append('FkJobId', newCandidate.job);
    formData.append('Source', newCandidate.source);
    formData.append('File', newCandidate.cv);

    dispatch(addCandidateRequest(formData,jobId));
    handleDialogClose();
  }
};
  return (
    <>

        <MainCard >
        <Box className="job-buttonContainer">
          <BasicButtons name="New Candidate"  handleSaveClick={handleDialogOpen}/>
        </Box>
        <CollapsibleTable data={jobdetail} columns={columns} stagesData={stages} jobdetail={true} jobId={jobId}/>
        </MainCard>
        <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle variant="h4">Add New Candidate</DialogTitle>
        <DialogContent>
          {/* Form fields for adding a new candidate */}
          <div {...getRootProps()} style={{ border: '1px dashed #5e35b1', padding: '20px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
            <input {...getInputProps()} />
            <p>
              {isDragActive
                ? 'Drop your file here'
                : newCandidate.cv
                ? `Selected file: ${newCandidate.cv.name}`
                : 'Drag & drop your CV file here, or click to select file'}
            </p>
          </div>
          <p style={{ color: 'red', marginTop: '5px' }}>{formErrors.cv}</p>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newCandidate.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            error={Boolean(formErrors.fullName)}
            helperText={formErrors.fullName}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newCandidate.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
          />
          <TextField
            label="Mobile No"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newCandidate.mobileNo}
            onChange={(e) => handleInputChange('mobileNo', e.target.value)}
            error={Boolean(formErrors.mobileNo)}
            helperText={formErrors.mobileNo}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Job</InputLabel>
            <Select
              label="Job"
              value={newCandidate.job}
              onChange={(e) => handleInputChange('job', e.target.value)}
              error={Boolean(formErrors.job)}
              helperText={formErrors.job}
            >
              {jobs&&jobs.map((job) => (
                <MenuItem key={job.job.jobId} value={job.job.jobId}>
                  {job.job.jobTittle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Source</InputLabel>
            <Select
              label="Source"
              value={newCandidate.source}
              onChange={(e) => handleInputChange('source', e.target.value)}
              error={Boolean(formErrors.source)}
              helperText={formErrors.source}
            >
              {/* Add your source options here */}
              <MenuItem value="whatsapp">WhatsApp</MenuItem>
              <MenuItem value="linkedin">LinkedIn</MenuItem>
            </Select>
          </FormControl>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCandidate} variant="contained" color="primary">
            Add Candidate
          </Button>
          <Button onClick={handleDialogClose} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

JobDetails.propTypes = {
  isLoading: PropTypes.bool
};

export default JobDetails;