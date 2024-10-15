import React from 'react';
import { Dialog, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, TextField, Box, Button, DialogTitle, Grid } from '@mui/material';
import Header from 'ui-component/subheader';
import { Input } from '@mui/material';
import { useRef } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { fetchtcandidateprofile, fetchtemplate, fetchStages, fetchtemplatebody, fetchcomments, postComments, deleteComments, sendEmailRequest, saveCandidateProfileRequest, fetchRole, fetchEmployee, AddAsEmployee, fetchalldetails } from 'redux/action/actions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import LinkIcon from '@mui/icons-material/Link';
import { ToastContainer } from 'react-toastify';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BasicButtons from 'ui-component/button';
import {
    Avatar
} from '@mui/material';
import "./style.css"
const Profile = (candidateId) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
    const dispatch = useDispatch()
    const candidateprofile = useSelector((state) => state.fetchCandidateProfile.candidateprofile)
    const [editedProfile, setEditedProfile] = useState(candidateprofile);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedLineManagerId, setSelectedLineManagerId] = useState('');
    const [jobtitle, setJobTitle] = useState('')
    const [department, setDepartment] = useState('')
    const [resume, setResume] = useState(null)
    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        password: '',
        joiningDate: '',
        contactNo: '',
        role: '',
    });
    const [formErrors, setFormErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        joiningDate: '',
        contactNo: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    useEffect(() => {
        dispatch(fetchtcandidateprofile(candidateId))
        dispatch(fetchRole());
        dispatch(fetchEmployee());
        dispatch(fetchalldetails())
    }, [candidateId])
    const role = useSelector(state => state.setRole.data)
    const employee = useSelector((state) => state?.fetchEmployeeReducer?.data);
    const departments = useSelector((state) => state.fetchalldetail.job_designation?.departments);
    const designations = useSelector((state) => state.fetchalldetail.job_designation?.designations);
    console.log("employee", employee)
    useEffect(() => {
        setEditedProfile(candidateprofile);
    }, [candidateprofile]);
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const fileInputRef = useRef(null);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setResume(file);
        console.log("resume", resume)
    };

    const handleClickUpload = () => {
        fileInputRef.current.click();
    };
    const handleSaveClick = () => {
        const isProfileEdited =
            editedProfile?.fullname !== candidateprofile?.fullname ||
            editedProfile?.email !== candidateprofile?.email ||
            editedProfile?.mobileNo !== candidateprofile?.mobileNo ||
            editedProfile?.skills !== candidateprofile?.skills ||
            resume !== null || selectedFile !== null;
        // editedProfile?.selectedFile !== candidateprofile?.selectedFile ;

        if (isProfileEdited) {
            const formData = new FormData();
            formData.append('Fullname', editedProfile?.fullname);
            formData.append('Email', editedProfile?.email);
            formData.append('MobileNo', editedProfile?.mobileNo);
            formData.append('Skills', editedProfile?.skills);
            formData.append('ResumeFile', resume);
            formData.append('ProfilePhotoFile', selectedFile);
            dispatch(saveCandidateProfileRequest(formData, candidateId));
        }
    };
    const handleAddEmployeeClick = () => {
        console.log("call")
        setShowAddEmployeeDialog(true);
    };

    const handleCloseAddEmployeeDialog = () => {
        setShowAddEmployeeDialog(false);
    };
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };
    const handleTitleChange = (event) => {
        setJobTitle(event.target.value)
    };
    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value)
    };
    const handleLineManagerChange = (event) => {
        setSelectedLineManagerId(event.target.value);
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    const validateForm = () => {
        let isFormValid = true;
        const errors = {
            fullName: '',
            email: '',
            password: '',
            joiningDate: '',
            contactNo: '',
        };

        if (!formValues.fullName.trim()) {
            errors.fullName = 'Full Name is required';
            isFormValid = false;
        }

        if (!formValues.email.trim()) {
            errors.email = 'Email is required';
            isFormValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = 'Invalid email address';
            isFormValid = false;
        }

        if (!formValues.password.trim()) {
            errors.password = 'Full Name is required';
            isFormValid = false;
        }
        if (!formValues.contactNo.trim()) {
            errors.contactNo = 'Contact No is required';
            isFormValid = false;
        }
        if (!formValues.joiningDate.trim()) {
            errors.joiningDate = 'joining Date is required';
            isFormValid = false;
        }
        // Add similar validation for other fields

        setFormErrors(errors);
        return isFormValid;
    };
    const handleSaveEmployee = () => {
        // Access values from the formValues state
        const { fullName, email, password, joiningDate, contactNo } = formValues;
        const isFormValid = validateForm();
        // Create the request body
        if (isFormValid) {
            const requestBody = {
                fkDepartmentId: department,
                lineManagerId: selectedLineManagerId,
                mobileNo: parseInt(contactNo),
                email: email,
                password: password,
                fullName: fullName,
                joinDate: joiningDate,
                fk_role_id: selectedRole,
                fkDesignationId: jobtitle,
            };

            // Dispatch the action with the created request body
            dispatch(AddAsEmployee(requestBody));

            // Close the dialog or perform any other necessary actions
            handleCloseAddEmployeeDialog();
        }
    };

    return (
        <>

            {candidateprofile && <div className='horizontal-layout'>
                <ToastContainer />
                <div>
                    <MainCard title="Basic Information" secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} />}>
                        <Box className="job-buttonContainer">

                            <Button name="Edit" onClick={handleEditClick}>Edit</Button>
                            {isEditing && <Button name="Add as Employee" onClick={handleAddEmployeeClick} >Add as Employee</Button>}

                        </Box>
                        <div className='profile-container'>

                            {isEditing && <Input
                                accept="image/*"
                                id="upload-image"
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />}
                            <label htmlFor="upload-image">
                                <div className='upload-container'>
                                    {selectedFile ? (
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt="uploaded"
                                        />
                                    ) : (
                                        candidateprofile && candidateprofile.profilePhoto ? (
                                            <img
                                                src={candidateprofile.profilePhoto}
                                                alt="api"
                                            />
                                        ) : (
                                            <span className='upload-text'>
                                                <Avatar
                                                    alt=''

                                                    sx={{ width: 100, height: 100 }}
                                                />
                                            </span>
                                        )
                                    )}
                                </div>
                            </label>
                        </div>
                        <div className="form-field layout-horizontal">
                            <div className="form-field-title" style={{ marginTop: isEditing ? '20px' : '0' }}>
                                <span className="field-title">Full Name</span>
                            </div>
                            <div className="form-field-content">
                                {isEditing ? (
                                    <TextField
                                        type="text"
                                        name="fullname"
                                        value={editedProfile.fullname}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, fullname: e.target.value })}
                                    />
                                ) : (
                                    <span className="field-value ellipsis">{candidateprofile.fullname}</span>
                                )}
                            </div>
                            <div className="form-field-title" style={{ marginTop: isEditing ? '20px' : '0' }}>
                                <span className="field-title">Phone Number</span>
                            </div>
                            <div className="form-field-content">
                                {isEditing ? (
                                    // <Input
                                    //     type="text"
                                    //     name="mobileNo"
                                    //     value={editedProfile.mobileNo}
                                    //     onChange={(e) => setEditedProfile({ ...editedProfile, mobileNo: e.target.value })}
                                    // />
                                    <div className="mobile-no-new " >
                                        <PhoneInput
                                            inputStyle={{ width: "96%", height: "45px" }}
                                            value={editedProfile.mobileNo}
                                            onChange={(value) => setEditedProfile({ ...editedProfile, mobileNo: value })}
                                            country={'in'}

                                        /> </div>
                                ) : (
                                    <span className="field-value ellipsis">{candidateprofile.mobileNo}</span>
                                )}
                            </div>
                            <div className="form-field-title" style={{ marginTop: isEditing ? '20px' : '0' }}>
                                <span className="field-title">Email</span>
                            </div>
                            <div className="form-field-content">
                                {isEditing ? (
                                    <TextField
                                        type="text"
                                        name="email"
                                        value={editedProfile.email}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                                    />
                                ) : (
                                    <span className="field-value ellipsis">{candidateprofile.email}</span>
                                )}
                            </div>
                            <div className="form-field-title" style={{ marginTop: isEditing ? '20px' : '0' }}>
                                <span className="field-title">Skills</span>
                            </div>
                            <div className="form-field-content">
                                {isEditing ? (
                                    <TextField
                                        type="text"
                                        name="email"
                                        value={editedProfile.skills}
                                        onChange={(e) => setEditedProfile({ ...editedProfile, skills: e.target.value })}
                                    />
                                ) : (
                                    <span className="field-value ellipsis">{candidateprofile.skills}</span>
                                )}
                            </div>
                            <div className="form-field-footer">
                            </div>
                        </div>

                    </MainCard>
                </div>
                <MainCard title="CV" secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} />}>
                    <Box className="job-buttonContainer">
                        {isEditing && <Button name="Upload CV" onClick={handleClickUpload} >
                            Upload CV
                        </Button>}
                        <input
                            type="file"
                            accept=".pdf, .doc, .docx"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}

                        />
                    </Box>
                    <div style={{ height: "100%", width: "100%" }}>
                        {resume ? (
                            <iframe
                                title="Resume"
                                width="300"
                                height="300"
                                src={URL.createObjectURL(resume)}
                            ></iframe>
                        ) : <object data={candidateprofile.resume} width="300" height="300" aria-label="PDF Viewer" ></object>}</div>
                </MainCard>

            </div>}
            {isEditing &&
                <div style={{ marginTop: "50px" }}>
                    <BasicButtons name="Save" handleSaveClick={handleSaveClick} >Save</BasicButtons>
                </div>}

            <Dialog open={showAddEmployeeDialog} onClose={handleCloseAddEmployeeDialog} maxWidth="sm" fullWidth>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {/* First row */}
                        <Grid item xs={6}>
                            <TextField label="Full Name" name="fullName" fullWidth margin="normal" value={formValues.fullName} onChange={handleInputChange} error={Boolean(formErrors.fullName)}
                                helperText={formErrors.fullName} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleInputChange} value={formValues.email} error={Boolean(formErrors.email)}
                                helperText={formErrors.email} />
                        </Grid>

                        {/* Second row */}
                        <Grid item xs={6}>
                            <TextField label="Password" name="password" type="password" fullWidth margin="normal" value={formValues.password} onChange={handleInputChange} error={Boolean(formErrors.password)}
                                helperText={formErrors.password} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField name="joiningDate" type="date" fullWidth margin="normal" value={formValues.joiningDate} onChange={handleInputChange} error={Boolean(formErrors.joiningDate)}
                                helperText={formErrors.joiningDate} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Contact No" name="contactNo" type="phoeno" fullWidth margin="normal" value={formValues.contactNo} onChange={handleInputChange} error={Boolean(formErrors.contactNo)}
                                helperText={formErrors.contactNo} />
                        </Grid>
                        <Grid item xs={6}>
                            {/* Add other fields... */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Office title</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    value={jobtitle}
                                    onChange={handleTitleChange}
                                    label="Line Manager"
                                >
                                    {designations && designations.map((designations) => (
                                        <MenuItem key={designations.departmentId
                                        } value={designations.designationId
                                        }>
                                            {designations.designationName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal" >
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    label="Role"
                                >
                                    {role && role.map((roles) => (
                                        <MenuItem key={roles.roleId} value={roles.roleId}>{roles.roleName}</MenuItem>)
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="role-label">Line Manager</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    value={selectedLineManagerId}
                                    onChange={handleLineManagerChange}
                                    label="Line Manager"
                                >
                                 {Array.isArray(employee) && employee.map((employee) => (
    <MenuItem key={employee.employeeId} value={employee.employees.employeeId}>
        {employee.employees.fullName}
    </MenuItem>
))}

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            {/* Add other fields... */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Department</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    value={department}
                                    onChange={handleDepartmentChange}
                                    label="Line Manager"
                                >
                                    {departments && departments.map((departments) => (
                                        <MenuItem key={departments.departmentId
                                        } value={departments.departmentId
                                        }>
                                            {departments.departmentName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddEmployeeDialog} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSaveEmployee}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

const Email = ({ email }) => {
    const dispatch = useDispatch()
    console.log(email)
    //   const [ setSelectedStage] = useState('');
    const template = useSelector((state) => state.fetchTemplateDetail.templatedetail);
    const stages = useSelector((state) => state.fetchStagesReducer.stages);
    const templatebody = useSelector((state) => state.fetchTemplatebody.templatebody)
    console.log("templatebody", templatebody)
    console.log(template, stages)
    useEffect(() => {
        dispatch(fetchtemplate());
        dispatch(fetchStages());
        // dispatch((fetchtemplatebody(selectedStage)))
    }, [email]);
    const handleInputChange = (value) => {
        dispatch(fetchtemplatebody(value));
    };
    const handleSendEmail = () => {
        const emailData = {
            to: email,
            subject: templatebody?.subject,
            body: templatebody?.body,
        };
        dispatch(sendEmailRequest(emailData));
    };
    return (
        <>
            {stages && <div>  <ToastContainer />
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Stage</InputLabel>
                    <Select
                        label="Stage"
                        // value={template.Stage}
                        onChange={(e) => {
                            // setSelectedStage(e.target.value); // Update selectedStage state
                            handleInputChange(e.target.value); // Call handleInputChange with the selected value
                        }}
                    >
                        {stages && stages.map((stage) => (
                            <MenuItem key={stage.stageId} value={stage.stageName}>
                                {stage.stageName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="To"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                />
                <TextField
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={templatebody?.subject}
                />
                {/* ReactQuill for the body */}
                <ReactQuill theme="snow"
                    value={templatebody?.body}
                    modules={{ toolbar: true }}
                    formats={['bold', 'italic', 'underline', 'strike', 'list', 'bullet']}
                /> </div>}
            <Box className="job-buttonContainer" style={{ marginTop: "5px" }}>
                <BasicButtons name="Send" handleSaveClick={handleSendEmail} />
            </Box>
        </>
    )
}


const Comments = ({ candidateId }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(dispatch(fetchcomments(candidateId)))
    }, []);
    const comment = useSelector((state) => state.fetchComments.Comment)
    console.log("comeent", comment)
    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };
    const sanitizeHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };
    const handleSendClick = () => {
        if (editorContent.trim() !== '') {
            const commentData = {
                text: editorContent,
                fkCandidateId: candidateId,
            };
            dispatch(postComments(commentData, candidateId));

            setEditorContent('');
        }
    };
    function handleDelete(id) {
        console.log("delete")
        dispatch(deleteComments(id, candidateId))
    }
    return (

        <>
            <ReactQuill theme="snow"
                value={editorContent}
                onChange={handleEditorChange}
                modules={{ toolbar: true }}
                formats={['bold', 'italic', 'underline', 'strike', 'list', 'bullet']}
            />
            <Box className="job-buttonContainer" style={{ marginTop: "5px" }}>
                <BasicButtons name="Send" handleSaveClick={handleSendClick} style={{ display: editorContent.trim() !== '' ? 'block' : 'none' }} /></Box>

            {comment && comment.map((comment) => (
                <div className="comment-container" key={comment.commentId}>

                    <div className="comment-item" >
                        <div className="avatar-container">
                            <img src={comment.employeeImage} className="avatar-image" alt='emp' />
                        </div>
                        <div className="comment-content">
                            <h8_inter_bold className="comment-author">{comment.employeeName}</h8_inter_bold>
                            <div className="comment-text">
                                <div
                                    className="comment-editor"
                                    color="dark100"
                                    fontSize="14px"
                                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(comment.text) }}
                                />
                            </div>
                            <div className="comment-details">
                                <span className="comment-time" title="">{comment.timeAgo}</span>
                                <div className="comment-buttons">
                                    {/* <button className="edit-button">Edit</button> */}
                                    <button className="delete-button" onClick={() => handleDelete(comment.commentId)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>))}

        </>
    )
}
export default function Candidateprofle({ isOpen, onClose, candidateId, email }) {
    const generalTabs = [
        { label: 'Profile', value: '1', component: <Profile candidateId={candidateId} /> },
        { label: 'Email', value: '2', component: <Email email={email} /> },
        { label: 'Comments', value: '3', component: <Comments candidateId={candidateId} /> },
    ];
    console.log(email)
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth >
            <DialogContent >
                <Header tabs={generalTabs} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
