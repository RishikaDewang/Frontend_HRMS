import React from 'react'
import Header from 'ui-component/subheader'
import MainCard from 'ui-component/cards/MainCard'
import './style.css'
import { useEffect, useState } from 'react'
import { fetchStages, createStages, deleteStages, fetchtemplate, addTemplateRequest, fetchtemplatedetail, updateTemplateRequest, deleteTemplate } from 'redux/action/actions'
import { useDispatch, useSelector } from 'react-redux'
import BasicButtons from 'ui-component/button'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CollapsibleTable from 'ui-component/grid'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./style.css"
import DeleteConfirmationDialog from 'ui-component/calendar'
function HiringWorkflow() {
    const dispatch = useDispatch()
    const stages = useSelector((state) => state.fetchStagesReducer.stages)
    const [isAddStageDialogOpen, setAddStageDialogOpen] = useState(false);
    const [newStageName, setNewStageName] = useState('');
    const [stageerror, setStageError] = useState('')
    const [isDeleteStageDialogOpen, setDeleteStageDialogOpen] = useState(false);
    const [selectedStageId, setSelectedStageId] = useState(null);

    useEffect(() => {
        dispatch(fetchStages())
    }, [dispatch])

    const handleAddStage = () => {
        // Validate the input if needed
        if (newStageName.trim() == '') {
            setStageError("Stage Name is required")
        }
        if (newStageName.trim() !== '') {
            dispatch(createStages({ stageName: newStageName }));
            setNewStageName('');
            setAddStageDialogOpen(false);
        }
    };
    const handleOpen = () => {

        setAddStageDialogOpen(true)
    }
    const handleDeleteStage = () => {
        if (selectedStageId) {
            dispatch(deleteStages(selectedStageId));
            setDeleteStageDialogOpen(false);
        }
    };

    // const handleOpenAddStageDialog = () => {
    //     setAddStageDialogOpen(true);
    // };

    const handleOpenDeleteStageDialog = (stageId) => {
        setDeleteStageDialogOpen(true);
        setSelectedStageId(stageId);
    }
    return (
        <>
            <Box className="job-buttonContainer">
                <BasicButtons name='New Stage' handleSaveClick={handleOpen} />
            </Box>
            {stages && stages.map((stage) => (
                <div className="draggable-item" key={stage.stageId}>
                    <div className="drag-icon">
                        {stage.stageName}
                    </div>

                    <div className="action">
                        <Button className="BaseButton " onClick={() => handleOpenDeleteStageDialog(stage.stageId)} >
                            <DeleteOutlineRoundedIcon style={{ color: 'red' }} />
                        </Button>
                    </div>
                </div>
            ))}
            <Dialog open={isAddStageDialogOpen} onClose={() => setAddStageDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Stage</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Stage Name"
                        variant="outlined"
                        fullWidth
                        value={newStageName}
                        onChange={(e) => setNewStageName(e.target.value)}
                        error={Boolean(stageerror)}
                        helperText={stageerror}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddStage}>Add Stage</Button>
                    <Button onClick={() => setAddStageDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <DeleteConfirmationDialog
                open={isDeleteStageDialogOpen}
                onClose={() => setDeleteStageDialogOpen(false)}
                onConfirm={handleDeleteStage}
                title="Delete Stage"
                content="Are you sure you want to delete this stage?"
            />

        </>
    );
}



function EmailTemplate() {
    const dispatch = useDispatch()
    const [isDeleteStageDialogOpen, setDeleteStageDialogOpen] = useState(false);
    const [selectedStageId, setSelectedStageId] = useState(null);
    const [formErrors, setFormErrors] = useState({
        Stage: '',
        EmailTemplate1: '',
        Subject: '',
        Body: '',
    });
    const columns = [
        { id: 'id', label: 'Email Template' },
        { id: 'name', label: 'Subject' },
        { id: 'Phone', label: 'Stage' },
        { id: 'CV', label: 'Last Modified' },
        { id: 'Action', label: '' }
    ];

    useEffect(() => {
        dispatch(fetchtemplate());
        dispatch(fetchStages());
    }, []);

    const templatedetails = useSelector((state) => state.fetchTemplate.template);
    const stages = useSelector((state) => state.fetchStagesReducer.stages);
    const template = useSelector((state) => state.fetchTemplateDetail.templatedetail);

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [newTemplate, setNewTemplate] = useState({
        Stage: '',
        EmailTemplate1: '',
        Subject: '',
        Body: '',
        id: '', // Template ID for editing
    });

    const handleDialogOpen = () => {
        setDialogOpen(true);
        setNewTemplate({
            Stage: '',
            EmailTemplate1: '',
            Subject: '',
            Body: '',
            id: '',
        });
        setFormErrors({
            Stage: '',
            EmailTemplate1: '',
            Subject: '',
            Body: '',
            id: '', // Template ID for editing
        })
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setNewTemplate({
            Stage: '',
            EmailTemplate1: '',
            Subject: '',
            Body: '',
            id: '',
        });
    };

    const handleInputChange = (field, value) => {
        setNewTemplate({
            ...newTemplate,
            [field]: value,
        });
    };

    const handleBodyChange = (value) => {
        setNewTemplate({
            ...newTemplate,
            Body: value,
        });
    };

    const handleSaveClick = (templateid) => {
        console.log(templateid);
        if (templateid) {
            dispatch(fetchtemplatedetail(templateid))
        }
        setDialogOpen(true);
        setNewTemplate({
            Stage: template.stage,
            EmailTemplate1: template.emailTemplate1,
            Subject: template.subject,
            Body: template.body,
            id: template.templateId,
        });
    };

    const handleAddTemplate = () => {
        const errors = {};
        let isValid = true;

        if (!newTemplate.Stage) {
            errors.Stage = 'Stage is required';
            isValid = false;
        }

        if (!newTemplate.EmailTemplate1) {
            errors.EmailTemplate1 = 'Template Name is required';
            isValid = false;
        }

        if (!newTemplate.Subject) {
            errors.Subject = 'Subject is required';
            isValid = false;
        }

        if (!newTemplate.Body) {
            errors.Body = 'Body is required';
            isValid = false;
        }

        // Update formErrors state with validation results
        setFormErrors(errors);

        // If any field is missing, return without making the API call
        if (!isValid) {
            return;
        }

        // Clear any previous errors
        setFormErrors({
            Stage: '',
            EmailTemplate1: '',
            Subject: '',
            Body: '',
        });
        console.log("newtemplate", newTemplate)
        if (newTemplate.id) {
            // Handle the logic to dispatch the action to edit the existing template
            dispatch(updateTemplateRequest(newTemplate));
        } else {
            // Handle the logic to dispatch the action to add a new template
            dispatch(addTemplateRequest(newTemplate));
        }
        handleDialogClose();
    };
    const handleDeleteStage = () => {
        if (selectedStageId) {
            dispatch(deleteTemplate(selectedStageId));
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

    useEffect(() => {
        if (template) {
            setNewTemplate({
                Stage: template?.stage || '',
                EmailTemplate1: template?.emailTemplate1 || '',
                Subject: template?.subject || '',
                Body: template?.body || '',
                id: template?.templateId || '',
            });
        }
    }, [template]);

    return (
        <>
            <Box className="job-buttonContainer">
                <BasicButtons name='New Template' handleSaveClick={handleDialogOpen} />
            </Box>
            <CollapsibleTable data={templatedetails} columns={columns} template={true} handleSaveClick={handleSaveClick} openDeleteModal={handleOpenDeleteStageDialog} />
            <Dialog open={isDialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle variant="h4">Add New Template</DialogTitle>
                <DialogContent>
                    {/* Form fields for adding a new template */}
                    <FormControl fullWidth variant="outlined" margin="normal">
                        <InputLabel>Stage</InputLabel>
                        <Select
                            label="Stage"
                            value={newTemplate.Stage}
                            onChange={(e) => handleInputChange('Stage', e.target.value)}
                        >
                            {stages && stages.map((stage) => (
                                <MenuItem key={stage.stageId} value={stage.stageName}>
                                    {stage.stageName}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText style={{ color: 'red' }}>{formErrors.Stage}</FormHelperText>
                    </FormControl>
                    <TextField
                        label="Template Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newTemplate.EmailTemplate1}
                        onChange={(e) => handleInputChange('EmailTemplate1', e.target.value)}
                        error={Boolean(formErrors.EmailTemplate1)}
                        helperText={formErrors.EmailTemplate1}

                    />
                    <TextField
                        label="Subject"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={newTemplate.Subject}
                        onChange={(e) => handleInputChange('Subject', e.target.value)}
                        error={Boolean(formErrors.Subject)}
                        helperText={formErrors.Subject}
                    />
                    {/* ReactQuill for the body */}
                    <ReactQuill theme="snow"
                        value={newTemplate.Body}
                        onChange={handleBodyChange}
                        modules={{ toolbar: true }}
                        formats={['bold', 'italic', 'underline', 'strike', 'list', 'bullet']}
                    />
                    <FormHelperText style={{ color: 'red' }}>{formErrors.Body}</FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddTemplate} variant="contained" color="primary">
                        {newTemplate.id ? 'Update Template' : 'Add Template'}
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
                title="Delete Template"
                content="Are you sure you want to delete this Template?"
            />

        </>
    );
}

export default function Settings() {
    const generalTabs = [
        { label: 'Hiring Workflow', value: '1', component: <HiringWorkflow /> },
        { label: 'Email Templates', value: '2', component: <EmailTemplate /> },
        // Add more tabs as needed
    ];

    return (
        <>
            <MainCard>
                <Header tabs={generalTabs} />
            </MainCard>
        </>
    )
}
