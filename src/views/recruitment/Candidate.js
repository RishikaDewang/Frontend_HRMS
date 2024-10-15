import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import { Box } from '@mui/material';
import BasicButtons from 'ui-component/button';
import ExcelJS from 'exceljs';
import CollapsibleTable from 'ui-component/grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl, Input } from '@mui/material';
import { fetchCandidate, addCandidateRequest, fetchJobs, deleteCandidate, importCandidate, bulkCV, assingJob } from 'redux/action/actions';
import Candidateprofle from './Candidateprofle';
import { useDropzone } from 'react-dropzone';
import "./style.css"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import DeleteConfirmationDialog from 'ui-component/calendar';
export default function Candidate() {
  const columns = [
    { id: 'id', label: 'FullName' },
    { id: 'name', label: 'Email' },
    { id: 'Phone', label: 'Phone Number' },
    { id: 'CV', label: 'CV' },
    { id: 'Job', label: 'Job' },
    { id: 'Created', label: 'Created Date' },
    { id: 'Create', label: 'Created By' },
    { id: 'Stage', label: 'Stage' },
    { id: 'delete', label: '' },
  ];

  const dispatch = useDispatch();
  const candidate = useSelector((state) => state.fetchCandidateReducer.candidate);
  const jobs = useSelector((state) => state.fetchJobsReducer.jobs)
  console.log("jobs", candidate)

  // State for controlling the new candidate dialog
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [newCandidate, setNewCandidate] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    job: '',
    source: '',
    cv: null, // To store the uploaded CV file
  });
  const [isBulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [selectedBulkFiles, setSelectedBulkFiles] = useState([]);
  const [isDeleteStageDialogOpen, setDeleteStageDialogOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(null);
  const [isNewPopupOpen, setNewPopupOpen] = useState(false);
  const [email, setEmail] = useState(null)
  const [page, setPage] = useState(1); // Current page state
  const rowsPerPage = 10; // Number of rows to display per page
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    mobileNo: '',
    job: '',
    source: '',
    cv: '',
  });
  // Function to open the new popup
  const handleOpenNewPopup = (stageId, email) => {
    console.log(stageId, email)
    setNewPopupOpen(true);
    setSelectedStageId(stageId);
    setEmail(email)
  };

  // Function to close the new popup
  const handleCloseNewPopup = () => {
    setNewPopupOpen(false);
    setSelectedStageId(null);
  };
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setBulkDialogOpen(false)
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
    console.log("newcandidate", newCandidate)
  };

  const onDrop = (acceptedFiles) => {
    // Handle the dropped files
    const file = acceptedFiles[0];
    setNewCandidate({
      ...newCandidate,
      cv: file,
    });
    setSelectedBulkFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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

      dispatch(addCandidateRequest(formData));
      handleDialogClose();
    }
  };
  useEffect(() => {
    dispatch(fetchCandidate())
    dispatch(fetchJobs());
  }, [])
  const handleDeleteStage = () => {
    if (selectedStageId) {
      dispatch(deleteCandidate(selectedStageId));
      setDeleteStageDialogOpen(false);
    }
  };

  // const handleOpenAddStageDialog = () => {
  //     setAddStageDialogOpen(true);
  // };

  const handleOpenDeleteStageDialog = (stageId) => {
    console.log(stageId)
    setDeleteStageDialogOpen(true);
    setSelectedStageId(stageId);
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check if the selected file is of type XLSX
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // Process the file, e.g., upload it or perform other actions
        const formData = new FormData();
        formData.append('file', file);
        dispatch(importCandidate(formData))
        console.log('File uploaded:', file);
      } else {
        toast.error("Invalid file type. Please select a valid XLSX file." );
        // Display an error message for invalid file type
        console.error('Invalid file type. Please select a valid XLSX file.');
      }
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = candidate ? candidate.slice(startIndex, endIndex) : [];
  const handleOpenBulkDialog = () => {
    setBulkDialogOpen(true);
    setSelectedBulkFiles([]); // Clear previously selected files when opening the dialog
  };
  const handleBulkUpload = () => {
    console.log("selecte bulk cv", selectedBulkFiles)
    if (selectedBulkFiles.length > 0) {
      const formData = new FormData();
      selectedBulkFiles.forEach((file) => {
        formData.append('files', file);
      });
      dispatch(bulkCV(formData));
      setBulkDialogOpen(false)
    } else {
      console.error('No files selected for bulk upload.');
    }
  }
  const [isJobAssignDialogOpen, setJobAssignDialogOpen] = useState(false);

  // ... (your existing functions)

  const handleOpenJobAssignDialog = (stageId) => {
    setJobAssignDialogOpen(true);
    setSelectedStageId(stageId);
  };

  const handleCloseJobAssignDialog = () => {
    setJobAssignDialogOpen(false);
  };

  const handleAssignJob = (selectedJob) => {
    console.log(selectedStageId)
    // Handle the job assignment logic here
    console.log('Assigned Job:', selectedJob);
    dispatch(assingJob( selectedStageId,selectedJob))
    // You can dispatch an action or update state as needed
    setJobAssignDialogOpen(false);
  };
  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Data');

    // Your logic to add data to the worksheet
    worksheet.addRow(['Employee Name', 'Job Title', 'Line Manager', 'Office']);
    // Add your employee data here

    // Create a Blob from the workbook
    const blob = await workbook.xlsx.writeBuffer();

    // Create a link element and trigger a download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    link.download = 'employee_data.xlsx';

    // Append the link to the body and trigger a click
    document.body.appendChild(link);
    link.click();

    // Remove the link from the body
    document.body.removeChild(link);
  };

  return (
    <>
      <MainCard title="Candidate">
        <ToastContainer/>
        <Box className="job-buttonContainer">
          <Input
            accept=".xlsx"
            id="file-input"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="file-input">
            <Button variant="outlined" component="span" style={{ marginRight: '5px' }}>
              Import Candidates
            </Button>  </label>
          <Button variant="outlined" component="span" style={{ marginRight: '5px' }} onClick={handleOpenBulkDialog}>
            Bulk CV
          </Button>
          <BasicButtons name="New Candidate" handleSaveClick={handleDialogOpen} />
        </Box>
        <div style={{ display: 'flex', flexDirection: "row-reverse" }}>
          <div style={{ marginRight: '260px' }}>
            <button

              style={{
                fontSize: '13px',
                // Change the color to your preferred link color
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                textDecoration: 'underline',
                padding: 0,
                margin: 0,  
              }}
              onClick={handleDownloadExcel}
            >
              Accepted file types: .xlsx
            </button></div></div>
        <CollapsibleTable data={paginatedData} columns={columns} candidate={true} openDeleteModal={handleOpenDeleteStageDialog} handleOpenNewPopup={handleOpenNewPopup} handleOpenJobAssignDialog={handleOpenJobAssignDialog}/>
        <div className="pagination-container">
          <Stack spacing={2}>
            <Pagination count={Math.ceil((candidate?.length || 0) / rowsPerPage)} page={page} onChange={handleChangePage} color="secondary" />
          </Stack>
        </div>
      </MainCard>

      {/* New Candidate Dialog */}
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
          <div id="myMobileNo" className="mobile-no-news " >
            <PhoneInput
              inputStyle={{ width: "100%", height: "50px" }}
              value={newCandidate.mobileNo}
              onChange={(value) => handleInputChange('mobileNo', value)}
              country={'in'}

            /> </div>
          <p style={{ color: 'red', marginTop: '5px', fontSize: "12px", marginLeft: "13px" }}>{formErrors.mobileNo}</p>
          {/* <TextField
            label="Mobile No"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newCandidate.mobileNo}
            onChange={(e) => handleInputChange('mobileNo', e.target.value)}
            error={Boolean(formErrors.mobileNo)}
            helperText={formErrors.mobileNo}
          /> */}
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Job</InputLabel>
            <Select
              label="Job"
              value={newCandidate.job}
              onChange={(e) => handleInputChange('job', e.target.value)}
              error={Boolean(formErrors.job)}
              helperText={formErrors.job}
            >
              {jobs && jobs.map((job) => (
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
      <DeleteConfirmationDialog
        open={isDeleteStageDialogOpen}
        onClose={() => setDeleteStageDialogOpen(false)}
        onConfirm={handleDeleteStage}
        title="Delete Candidate"
        content="Are you sure you want to delete this Candidate?"
      />
      <Dialog open={isBulkDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Bulk CV Upload</DialogTitle>
        <DialogContent>
          {/* Dropzone for bulk CV */}
          <div {...getRootProps()} style={{ border: '1px dashed #5e35b1', padding: '20px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
            <input {...getInputProps()} />
            <p>
              {isDragActive
                ? 'Drop your bulk CV files here'
                : selectedBulkFiles.length === 0
                  ? 'Drag & drop some files here, or click to select files'
                  : `${selectedBulkFiles.length} files selected`}
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleBulkUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isJobAssignDialogOpen}
        onClose={handleCloseJobAssignDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle variant="h4">Assign Job</DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Job</InputLabel>
            <Select
              label="Job"
              value={newCandidate.job} // You can use the same state variable used for new candidate
              onChange={(e) => handleInputChange('job', e.target.value)}
              error={Boolean(formErrors.job)}
              helperText={formErrors.job}
            >
              {jobs && jobs.map((job) => (
                <MenuItem key={job.job.jobId} value={job.job.jobId}>
                  {job.job.jobTittle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAssignJob(newCandidate.job)} variant="contained" color="primary">
            Assign Job
          </Button>
          <Button onClick={handleCloseJobAssignDialog} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Candidateprofle isOpen={isNewPopupOpen} onClose={handleCloseNewPopup} candidateId={selectedStageId} email={email} />
    </>
  );
}
