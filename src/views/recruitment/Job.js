import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// import {Link} from "react-router-dom"
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import DeleteConfirmationDialog from 'ui-component/calendar';
import {
    Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, MenuItem, FormControl, InputLabel, Select, Grid,
   FormHelperText
} from '@mui/material';
import { StorefrontTwoTone as StorefrontIcon, DeleteOutline as DeleteIcon } from '@mui/icons-material';
import BasicButtons from 'ui-component/button';
import { fetchJobs, createJobs, deleteJob ,fetchalldetails} from 'redux/action/actions';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import './style.css'
// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180,
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130,
    }

}));
const modalStyle = {
    position: 'absolute',
    width: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};
// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const Job = () => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const jobs = useSelector((state) => state.fetchJobsReducer.jobs)
    const departments = useSelector((state) => state.fetchalldetail.job_designation?.departments);
    const designations = useSelector((state) => state.fetchalldetail.job_designation?.designations);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [departmentType, setDepartmentType] = useState('');
    const [office, setOffice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [closingDate, setClosingDate] = useState('');
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [jobIdToDelete, setJobIdToDelete] = useState(null);
    const [formErrors, setFormErrors] = useState({
        jobTitle: '',
        employmentType: '',
        departmentType: '',
        office: '',
        quantity: '',
        closingDate: '',
    });
    const openDeleteDialog = (jobId) => {
        setJobIdToDelete(jobId);
        setIsDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setJobIdToDelete(null);
        setIsDeleteDialogOpen(false);
    };

    const handleDeleteConfirm = () => {
        // Dispatch the deleteJob action with the jobIdToDelete
        dispatch(deleteJob(jobIdToDelete));
        closeDeleteDialog();
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const validateForm = () => {
        let isValid = true;
        const errors = {
            jobTitle: '',
            employmentType: '',
            departmentType: '',
            office: '',
            quantity: '',
            closingDate: '',
        };

        if (!jobTitle) {
            errors.jobTitle = 'Job Title is required';
            isValid = false;
        }

        if (!employmentType) {
            errors.employmentType = 'Employment Type is required';
            isValid = false;
        }

        if (!departmentType) {
            errors.departmentType = 'Department Type is required';
            isValid = false;
        }

        if (!office) {
            errors.office = 'Office is required';
            isValid = false;
        }

        if (!quantity) {
            errors.quantity = 'Quantity is required';
            isValid = false;
        }

        if (!closingDate) {
            errors.closingDate = 'Closing Date is required';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = () => {
        const isValid = validateForm();

        if (isValid) {
            const jobData = {
                JobTittle: jobTitle,
                EmployeementType: employmentType,
                DepartmentName: departmentType,
                OfficeName: office,
                Quantity: parseInt(quantity, 10),
                ClosingDate: closingDate,
            };

            dispatch(createJobs(jobData));
            closeModal();
        }
    };
    useEffect(() => {
        dispatch(fetchJobs());
        dispatch(fetchalldetails())
    }, []);
    const handleJobClick = (jobId) => {
        // Navigate to the job detail page and send the state
        navigate(`/recruitment/jobdeatil`, { state: { jobId } });
    };
    return (
        <>
            <MainCard title='Jobs'>
                <Box className="job-buttonContainer">
                    <BasicButtons name='New Job' handleSaveClick={openModal} />
                </Box>
                {jobs && jobs.map((job) => (
                    <CardWrapper key={job.job}>

                        <Box sx={{ p: 2 }} >

                            <List sx={{ py: 0 }}  >

                                <ListItem alignItems="center" disableGutters sx={{ py: 0, justifyContent: 'space-between' }} >
                                    <ListItemAvatar>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette.warning.light,
                                                color: theme.palette.warning.dark,
                                            }}
                                        >
                                            <StorefrontIcon fontSize="inherit" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText onClick={() => handleJobClick(job.job.jobId)}
                                        sx={{
                                            py: 0,
                                            mt: 0.45,
                                            mb: 0.45,
                                        }}
                                        primary={<Typography variant="h4">{job.job.jobTittle}</Typography>}
                                        secondary={
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    color: theme.palette.grey[500],
                                                    mt: 0.5,
                                                }}
                                            >
                                                {`${job.candidateCount} Candidate${job.candidateCount !== 1 || 0 ? '' : 's'}`}
                                            </Typography>
                                        }
                                    />
                                  
                                            <DeleteIcon onClick={() => openDeleteDialog(job.job.jobId)} style={{color:'red'}}/> 


                                </ListItem>

                            </List>
                        </Box>
                    </CardWrapper>))}
            </MainCard>
            <Modal open={isModalOpen} onClose={closeModal}>
                <Box sx={modalStyle}>
                    <Typography variant="h3" component="div">
                        New Job
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Job Title"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                fullWidth
                                margin="normal"
                                error={Boolean(formErrors.jobTitle)}
                                helperText={formErrors.jobTitle}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="employment-type-label">Employment Type</InputLabel>
                                <Select
                                    labelId="employment-type-label"
                                    id="employment-type"
                                    value={employmentType}
                                    onChange={(e) => setEmploymentType(e.target.value)}
                                    label="Employment Type"
                                    error={Boolean(formErrors.employmentType)}
                                    helperText={formErrors.employmentType}
                                >
                                    <MenuItem value="full-time">Full Time</MenuItem>
                                    <MenuItem value="part-time">Part Time</MenuItem>
                                    {/* Add other employment types as needed */}
                                </Select>
                                <FormHelperText style={{ color: 'red' }}>{formErrors.employmentType}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="department-type-label">Department Type</InputLabel>
                                <Select
                                    labelId="department-type-label"
                                    id="department-type"
                                    value={departmentType}
                                    onChange={(e) => setDepartmentType(e.target.value)}
                                    label="Department Type"
                                    error={Boolean(formErrors.departmentType)}
                                    helperText={formErrors.departmentType}
                                >
                                   {departments && departments.map((departments) => (
                                        <MenuItem key={departments.departmentId
                                        } value={departments.departmentName
                                        }>
                                            {departments.departmentName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText style={{ color: 'red' }}>{formErrors.departmentType}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="office-label">Office</InputLabel>
                                <Select
                                    labelId="office-label"
                                    id="office"
                                    value={office}
                                    onChange={(e) => setOffice(e.target.value)}
                                    label="Office"
                                    error={Boolean(formErrors.office)}
                                    helperText={formErrors.office}
                                >
                                     {designations && designations.map((designations) => (
                                        <MenuItem key={designations.departmentId
                                        } value={designations.designationName
                                        }>
                                            {designations.designationName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText style={{ color: 'red' }}>{formErrors.office}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                fullWidth
                                margin="normal"
                                error={Boolean(formErrors.quantity)}
                                helperText={formErrors.quantity}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Closing Date"
                                type="date"
                                value={closingDate}
                                onChange={(e) => setClosingDate(e.target.value)}
                                fullWidth
                                margin="normal"
                                error={Boolean(formErrors.closingDate)}
                                helperText={formErrors.closingDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                        <Button color="primary" variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>{' '}
                        <Button color="secondary" onClick={closeModal} variant="contained">
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDeleteConfirm}
        title="Delete Job"
        content="Are you sure you want to delete this Job?"
      />
        </>
    );
};

Job.propTypes = {
    isLoading: PropTypes.bool
};

export default Job;
