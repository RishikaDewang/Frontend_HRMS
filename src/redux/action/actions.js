
import ActionTypes from "../constant/constant";
// action - customization reducer
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';

// This function is used to create an action for requesting a login with 'email' and 'password' as parameters.
export const loginRequest = (email, password) => {

 return {
    type: ActionTypes.LOGIN.REQUEST,
    payload: { email, password },
  }};
  export const loginsuccess = () => {

    return {
       type: ActionTypes.LOGIN.SUCCESS,
      
     }};

     export const loginFailure = (error) => {
      return {
        type: ActionTypes.LOGIN.FAILURE,
        payload: error,
      };
    };
// This function is used to create an action for store the response of login like token, role and roleID
export const setUserData = (userData) => ({
    type: ActionTypes.LOGIN.SET_USER_DATA,
    payload: userData,
  });
  export const fetchRole = ()=>{
    return{
      type:ActionTypes.ROLES.FETCH
    }
  }
  export const setRole = (data)=>{
    return{
      type:ActionTypes.ROLES.SET,
      payload:data
    }
  }
  export const createRoleWithPermissionsRequest = (roleData) => {
    
    return{
    type: ActionTypes.CREATE_ROLE_WITH_PERMISSIONS.REQUEST,
    payload: roleData,
  }};
  export const createRoleWithPermissionsSuccess = () => {
    return{
    type: ActionTypes.CREATE_ROLE_WITH_PERMISSIONS.SUCCESS,
  }};
  export const createRoleWithPermissionsFailure = (error) => {
    return{
    type: ActionTypes.CREATE_ROLE_WITH_PERMISSIONS.FAILURE,
    payload: error,
  }};

  export const fetchPermissionByRole = (id)=>{
    return{
      type:ActionTypes.PERMISSIONS_BY_ROLE.FETCH,
      payload:id
    }
  }
  export const setPermissionByRole = (data)=>{
    return{
      type:ActionTypes.PERMISSIONS_BY_ROLE.SET,
      payload:data
    }
  }

  export const editPermissionsRequest = (roleData) => ({
    type: ActionTypes.EDIT_PERMISSIONS_REQUEST,
    payload: roleData,
  });

  export const fetchMyProfile = (id)=>{
    return{
      type:ActionTypes.MY_PROFILE.FETCH,
      payload:id
    }
  }
  export const setMyProfile = (data)=>{
    return{
      type:ActionTypes.MY_PROFILE.SET,
      payload:data
    }
  }
  export const fetchMyAddress = (id)=>{
    return{
      type:ActionTypes.MY_ADDRESS.FETCH,
      payload:id
    }
  }
  export const setMyAddress = (data)=>{
    return{
      type:ActionTypes.MY_ADDRESS.SET,
      payload:data
    }
  }
  export const updateProfileRequest = (employeeId, updatedProfile) => {
    return {
      type: ActionTypes.UPDATE_PROFILE_REQUEST,
      payload: {
        employeeId,
        updatedProfile,
      },
    };
  };
  export const updateAddressRequest = (employeeId, updatedProfile) => {
    return {
      type: ActionTypes.UPDATE_ADDRESS_REQUEST,
      payload: {
        employeeId,
        updatedProfile,
      },
    };
  };
  export const fetchEmergencyContact = (id)=>{
    return{
      type:ActionTypes.EMERGENCY_CONTACT.FETCH,
      payload:id
    }
  }
  export const setEmergencyContact = (data)=>{
    return{
      type:ActionTypes.EMERGENCY_CONTACT.SET,
      payload:data
    }
  }
  export const updateEmergecnyRequest = (employeeId, updatedProfile) => {
    return {
      type: ActionTypes.EMERGENCY_CONTACT.UPDATE_REQUEST,
      payload: {
        employeeId,
        updatedProfile,
      },
    };
  };
  export const fetchBankInfo = (id)=>{
    return{
      type:ActionTypes.BANK_INFORMATION.FETCH,
      payload:id
    }
  }
  export const setBankInfo = (data)=>{
    return{
      type:ActionTypes.BANK_INFORMATION.SET,
      payload:data
    }
  }

  export const updateBankRequest = (employeeId, updatedProfile) => {
    return {
      type: ActionTypes.BANK_INFORMATION.UPDATE_REQUEST,
      payload: {
        employeeId,
        updatedProfile,
      },
    };
  };

  export const fetchEmployee = (page, rowsPerPage)=>{
    console.log("action called",page, rowsPerPage)
    return{
      type:ActionTypes.EMPLOYEE.FETCH,
      payload:{page, rowsPerPage}
    }
  }
  export const setEmployee = (data)=>{
    return{
      type:ActionTypes.EMPLOYEE.SET,
      payload:data
    }
  }
  export const createEmployee = (employeedata,page, rowsPerPage) => {
    return {
      type: ActionTypes.EMPLOYEE.CREATE_REQUEST,
      payload: {employeedata,page, rowsPerPage}
    };
  };
  export const createEmployeeSuccess = () => {
    return {
      type: ActionTypes.EMPLOYEE.CREATE_SUCCESS,
    };
  };
  export const createEmployeeFailure = (error) => {
    return {
      type: ActionTypes.EMPLOYEE.CREATE_FAILURE,
      payload:error
    };
  };
  export const createEmployeeReset = () => {
    return {
      type: ActionTypes.EMPLOYEE.CREATE_RESET,
    };
  };
  export const deleteEmployee = (employeeid,page, rowsPerPage) => {
    return {
      type: ActionTypes.EMPLOYEE.DELETE,
      payload: {employeeid,page, rowsPerPage}
    };
  };

  export const fetchEmployeetimeoff = (id)=>{
    return{
      type:ActionTypes.EMPLOYEE_TIME_OFF.FETCH,
      payload:id
    }
  }
  export const setEmployeetimeoff = (data)=>{
    return{
      type:ActionTypes.EMPLOYEE_TIME_OFF.SET,
      payload:data
    }
  }
  export const RequestTimeoff = (employeedata, id) => {
    return {
      type: ActionTypes.CREATE_TIME_OFF_REQUEST,
      payload: {employeedata, id}
    };
  };

  export const fetchAllEmployeestimeoff = ()=>{
    return{
      type:ActionTypes.ALL_EMPLOYEES_TIME_OFF.FETCH,
    }
  }
  export const setAllEmployeestimeoff = (data)=>{
    return{
      type:ActionTypes.ALL_EMPLOYEES_TIME_OFF.SET,
      payload:data
    }
  }

  export const signupRequest = (userData) => ({
    type: ActionTypes.SIGNUP.REQUEST,
    payload: userData,
  });
  
  export const signupSuccess = () => ({
    type:ActionTypes.SIGNUP.SUCCESS,
  });
  
  export const signupFailure = (error) => ({
    type: ActionTypes.SIGNUP.FAILURE,
    payload: error,
  });
  export const signupReset = () => ({
    type: ActionTypes.SIGNUP.RESET,
  });
  export const fetchMyAttendance = (id)=>{
    return{
      type:ActionTypes.MY_ATTENDANCE.FETCH,
      payload:id
    }
  }
  export const setMyAttendance  = (data)=>{
    return{
      type:ActionTypes.MY_ATTENDANCE.SET,
      payload:data
    }
  }

  export const clockInRequest = (id ,requestBody ,startDate, endDate) => {
    return{
    type: ActionTypes.CLOCK.IN_REQUEST,
    payload: {id, requestBody,startDate, endDate},
  }};
  
  export const clockOutRequest = (id,requestBody,startDate, endDate) => {
    return{
    type: ActionTypes.CLOCK.OUT_REQUEST,
    payload: { id, requestBody,startDate, endDate},
  }};

  export const fetchAttendanceSummary = (employeeid, startDate, endDate)=>{
    return{
      type:ActionTypes.ATTENDANCE_SUMMARY.FETCH,
      payload:{employeeid, startDate, endDate}
    }
  }
  export const setAttendanceSummary  = (data)=>{
    return{
      type:ActionTypes.ATTENDANCE_SUMMARY.SET,
      payload:data
    }
  }
  export const fetchEmployeeAttendance = (startDate,endDate)=>{
    console.log("action called")
    return{
      type:ActionTypes.EMPLOYEE_ATTENDANCE.FETCH,
      data:{startDate,endDate}

    }
  }
  export const setEmployeeAttendance  = (data)=>{
    return{
      type:ActionTypes.EMPLOYEE_ATTENDANCE.SET,
      payload:data
    }
  }

  export const resetState = () => ({
    type: ActionTypes.RESET_STATE,
  });

  export const fetchProfilepic= (id)=>{
    return{
      type:ActionTypes.PROFILE_PICTURE.FETCH,
      data:id

    }
  }
  export const setProfilepic  = (data)=>{
    return{
      type:ActionTypes.PROFILE_PICTURE.SET,
      payload:data
    }
  }

  export const uploadImageRequest = (id ,formData) => {
    return{
    type: ActionTypes.UPLOAD_IMAGE.REQUEST,
    payload: {id ,formData},
  }};
  export const uploadImageSuccess = (imageUrl) => ({
    type: ActionTypes.UPLOAD_IMAGE.SUCCESS,
    payload: imageUrl,
  });
  export const uploadImageFailure = (error) => ({
    type: ActionTypes.UPLOAD_IMAGE.FAILURE,
    payload: error,
  });

  export const createqrcode = (id ,formData) => {
    return{
    type: ActionTypes.QR_CODE_CREATE,
    payload: {id ,formData},
  }};

  export const fetchQrcode= (id)=>{
    return{
      type:ActionTypes.QR_CODE.FETCH,
      data:id

    }
  }
  export const setQrcode  = (data)=>{
    return{
      type:ActionTypes.QR_CODE.SET,
      payload:data
    }
  }

  export const updateFeatures = (formData) => {
    return {
      type: ActionTypes.FEATURES.UPDATE,
      payload: formData
    };
  };


  export const fetchFeature= (id)=>{
    return{
      type:ActionTypes.FEATURES.FETCH,
      data:id

    }
  }
  export const setFeatures  = (data)=>{
    return{
      type:ActionTypes.FEATURES.SET,
      payload:data
    }
  }

  export const fetchNews= ()=>{
    return{
      type:ActionTypes.NEWS.FETCH,

    }
  }
  export const setNews = (data)=>{
     return{
      type:ActionTypes.NEWS.SET,
      payload:data
    }
  }

  export const createNews = (newsData) => {
    return{
    type: ActionTypes.NEWS.REQUEST,
    payload:newsData,
  }};

  export const deleteNews = (id) => {
    return{
    type: ActionTypes.NEWS.DELETE,
    payload:id,
  }};

  export const fetchDocuments= ()=>{
    return{
      type:ActionTypes.DOCUMENTS.FETCH,

    }
  }
  export const setDocuments = (data)=>{
     return{
      type:ActionTypes.DOCUMENTS.SET,
      payload:data
    }
  }

  export const createDocument = (documentdata) => {
    return{
    type: ActionTypes.DOCUMENTS.REQUEST,
    payload:documentdata,
  }};

  export const fetchDocumentsDetails= (id)=>{
    return{
      type:ActionTypes.DOCUMENTS.FETCH_DETAILS,
      payload:id,

    }
  }
  export const setDocumentsDetails = (data)=>{
     return{
      type:ActionTypes.DOCUMENTS.SET_DETAILS,
      payload:data
    }
  }
  export const fetchDocumentsData= (name)=>{
    return{
      type:ActionTypes.DOCUMENTS.FETCH_DATA,
      payload:name,

    }
  }
  export const setDocumentsData = (data)=>{
     return{
      type:ActionTypes.DOCUMENTS.SET_DATA,
      payload:data
    }
  }

  export const uploadFilesRequest = (id ,Files) => {
    return{
    type: ActionTypes.UPLOAD_FILES.REQUEST,
    payload: {id ,Files},
  }};
  export const uploadFilesSuccess = (imageUrl) => ({
    type: ActionTypes.UPLOAD_FILES.SUCCESS,
    payload: imageUrl,
  });
  export const uploadFilesFailure = (error) => ({
    type: ActionTypes.UPLOAD_FILES.FAILURE,
    payload: error,
  });

  export const deletefolder = (id) => {
    return{
    type: ActionTypes.UPLOAD_FILES.DELETE_FOLDER,
    payload:id,
  }};

  export const deletefolderfiles = (id) => {
    return{
    type: ActionTypes.UPLOAD_FILES.DELETE_FOLDER_FILE,
    payload:id,
  }};

  export const fetchJobs = ()=>{
    return{
      type:ActionTypes.JOBS.FETCH,

    }
  }
  export const setJobs = (data)=>{
    return{
      type:ActionTypes.JOBS.SET,
      payload:data
    }
  }

  export const createJobs = (data)=>{
    return{
      type:ActionTypes.JOBS.CREATE,
      payload:data
    }
  }

  export const fetchCandidate = ()=>{
    return{
      type:ActionTypes.CANDIDATE.FETCH,

    }
  }
  export const setCandidate = (data)=>{
    return{
      type:ActionTypes.CANDIDATE.SET,
      payload:data
    }
  }
  export const addCandidateRequest = (formData,jobId) => ({
    type: ActionTypes.ADD_CANDIDATE.REQUEST,
    payload: {formData, jobId},
  });

  export const fetchStages = ()=>{
    return{
      type:ActionTypes.STAGES.FETCH,

    }
  }
  export const setStages = (data)=>{
    return{
      type:ActionTypes.STAGES.SET,
      payload:data
    }
  }

  export const createStages = (stage) => ({
    type: ActionTypes.STAGES.CREATE,
    payload: stage,
  });

  export const deleteStages = (stageid) => ({
    type: ActionTypes.STAGES.DELETE,
    payload: stageid,
  });

  export const fetchjobdetail = (jobid)=>{
    return{
      type:ActionTypes.JOB_DETAILS.FETCH,
      payload:jobid

    }
  }
  export const setjobdetail = (data)=>{
    return{
      type:ActionTypes.JOB_DETAILS.SET,
      payload:data
    }
  }


  export const updateStages = (candateid , stagename,jobId) => ({
    type: ActionTypes.STAGES.UPDATE,
    payload: {candateid,stagename,jobId},
  });

  export const fetchtemplate = ()=>{
    return{
      type:ActionTypes.TEMPLATE.FETCH,
    }
  }
  export const settemplate = (data)=>{
    return{
      type:ActionTypes.TEMPLATE.SET,
      payload:data
    }
  }
  export const addTemplateRequest = (templateData) => ({
    type: ActionTypes.TEMPLATE.ADD_REQUEST,
    payload: templateData,
  });

  export const fetchtemplatedetail = (templateid)=>{
    return{
      type:ActionTypes.TEMPLATE_DETAILS.FETCH,
      payload:templateid
    }
  }
  export const settemplatedetail = (data)=>{
    return{
      type:ActionTypes.TEMPLATE_DETAILS.SET,
      payload:data
    }
  }

  export const updateTemplateRequest = ( templateData) => ({
    type: ActionTypes.TEMPLATE_DETAILS.UPDATE_REQUEST,
    payload:  templateData ,
  });

  export const deleteTemplate = (templateId) => ({
    type: ActionTypes.TEMPLATE.DELETE,
    payload: templateId,
  });
  export const deleteJob = (jobId) => {
    return{
    type: ActionTypes.JOBS.DELETE,
    payload: jobId,
  }};

  export const deleteCandidate = (candidateid) => ({
    type: ActionTypes.CANDIDATE.DELETE,
    payload: candidateid,
  });
  
  export const fetchtcandidateprofile = (candateid)=>{
    return{
      type:ActionTypes.CANDIDATE_PROFILE.FETCH,
      payload:candateid
    }
  }
  export const setcandidateprofile = (data)=>{
    return{
      type:ActionTypes.CANDIDATE_PROFILE.SET,
      payload:data
    }
  }

  export const fetchtemplatebody = (stageName)=>{
    return{
      type:ActionTypes.TEMPLATE_BODY.FETCH,
      payload:stageName
    }
  }
  export const settemplatebody = (data)=>{
    return{
      type:ActionTypes.TEMPLATE_BODY.SET,
      payload:data
    }
  }

  export const fetchcomments = (candateidId)=>{
    return{
      type:ActionTypes.COMMENTS.FETCH,
      payload:candateidId
    }
  }
  export const setcomments = (data)=>{
    return{
      type:ActionTypes.COMMENTS.SET,
      payload:data
    }
  }

  export const postComments = (data,candidateId)=>{
    return{
      type:ActionTypes.COMMENTS.POST,
      payload:{data,candidateId}
    }
  }

  export const deleteComments = (commentId, candateid)=>{
    return{
      type:ActionTypes.COMMENTS.DELETE,
      payload:{commentId,candateid}
    }
  }

  export const fetchholiday = ()=>{
    return{
      type:ActionTypes.HOLIDAY.FETCH
    }
  }
  export const setholiday = (data)=>{
    return{
      type:ActionTypes.HOLIDAY.SET,
      payload:data
    }
  }
  export const Addholiday = (holidayData)=>{
    return{
      type:ActionTypes.HOLIDAY.ADD,
      payload:holidayData
    }
  }
  export const Deleteholiday = (holidayId)=>{
    return{
      type:ActionTypes.HOLIDAY.DELETE,
      payload:holidayId
    }
  }

  export const sendEmailRequest = (emailData) => ({
    type: ActionTypes.SEND_EMAIL_REQUEST,
    payload: emailData,
  });

  export const saveCandidateProfileRequest = (data, candidateId) => ({
    type: ActionTypes.SAVE_CANDIDATE_PROFILE_REQUEST,
    payload: { data, candidateId },
  });

  export const AddAsEmployee = (userData) => ({
    type: ActionTypes.ADD_AS_EMPLOYEE,
    payload:  userData
  });

  export const fetchalldetails = ()=>{
    return{
      type:ActionTypes.ALL_DETAILS.FETCH
    }
  }
  export const setalldetails = (data)=>{
    return{
      type:ActionTypes.ALL_DETAILS.SET,
      payload:data
    }
  }

  export const filterattendance = (employeeid, startDate, endDate)=>{
    return{
      type:ActionTypes.ATTENDANCE_FILTER,
      payload:{employeeid,startDate,endDate}
    }
  }
  export const setfilterattendance = (data, clockType,firstSessionData )=>{
    console.log("TT01 : data, clockType", data, clockType)
    return{
      type:ActionTypes.SET_ATTENDANCE_FILTER,
      payload:{data, clockType,firstSessionData }
    }
  }

  export const updateStatus = (leaveId,statusId)=>{
    return{
      type:ActionTypes.UPDDATE_TIMEOFF_STATUS,
      payload:{leaveId,statusId}
    }
  }

  export const logOut = ()=>{
    return{
      type:ActionTypes.LOGOUT_SUCCESS,

    }
  }

  export const importCandidate = (formData) => {
    return{
    type: ActionTypes.IMPORT_CANDIDATE,
    payload:formData,
  }};

  export const importEmployee = (formData) => {
    return{
    type: ActionTypes.IMPORT_EMPLOYEE,
    payload:formData,
  }};

  export const bulkCV = (formData) => {
    return{
    type: ActionTypes.UPLOAD_BULK_CV,
    payload:formData,
  }};

  export const updateEmployee = (employeeData,employeeId,page, rowsPerPage)=>{
    return{
      type:ActionTypes.UPDATE_EMPLOYEE,
      payload:{employeeData,employeeId,page, rowsPerPage}
    }
  }

  export const assingJob = (candidateId,jobId)=>{
    return{
      type:ActionTypes.ASSIGN_JOB,
      payload:{candidateId,jobId}
    }
  }

  export const importAttendance = (formData) => {
    return{
    type: ActionTypes.UPLOAD_ATTENDANCE,
    payload:formData,
  }};

  export const ForgotPassword = (email) => {
    return{
    type: ActionTypes.FORGOT_PASSWORD.REQUEST,
    payload:email,
  }};

  export const ForgotPasswordSuccess = () => {
    return{
    type: ActionTypes.FORGOT_PASSWORD.SUCCESS,
  }};

  export const ForgotPasswordFailure = (data) => {
    return{
    type: ActionTypes.FORGOT_PASSWORD.FAILURE,
    payload:data,
  }};

  export const ResetPassword = (employeeData) => {
    return{
    type: ActionTypes.RESET_PASSWORD.REQUEST,
    payload:employeeData,
  }};

  export const ResetPasswordSuccess = () => {
    return{
    type: ActionTypes.RESET_PASSWORD.SUCCESS,
  }}

  export const ResetPasswordFailure = (data) => {
    return{
    type: ActionTypes.RESET_PASSWORD.FAILURE,
    payload: data
  }}

  export const fetchCountry = ()=>{
    return{
      type:ActionTypes.COUNTRY.FETCH,

    }
  }
  export const setCountry = (data)=>{
    return{
      type:ActionTypes.COUNTRY.SET,
      payload:data
    }
  }

  export const fetchState = (countryId)=>{
    return{
      type:ActionTypes.STATE.FETCH,
      payload:countryId

    }
  }
  export const setState = (data)=>{
    return{
      type:ActionTypes.STATE.SET,
      payload:data
    }
  }

  export const fetchCity = (stateId)=>{
    return{
      type:ActionTypes.CITY.FETCH,
      payload:stateId

    }
  }
  export const setCity = (data)=>{
    return{
      type:ActionTypes.CITY.SET,
      payload:data
    }
  }
  export const getNationality = ()=>{
    return{
      type:ActionTypes.NATIONALITY.FETCH,
    }
  }
  export const setNationality = (data)=>{
    return{
      type:ActionTypes.NATIONALITY.SET,
      payload:data
    }
  } 
  export const fetchSections= ()=>{
    return{
      type:ActionTypes.SECTIONS.FETCH,

    }
  }
  export const setSections  = (data)=>{
    return{
      type:ActionTypes.SECTIONS.SET,
      payload:data
    }
  }

  export const fetchModule= ()=>{
    return{
      type:ActionTypes.MODULE.FETCH,

    }
  }
  export const setModule  = (data)=>{
    return{
      type:ActionTypes.MODULE.SET,
      payload:data
    }
  }

  export const filterEmployee  = (page, rowsPerPage,word)=>{
    console.log("page, rowsPerPage,word",page, rowsPerPage,word)
    return{
      type:ActionTypes.FILTER.EMPLOYEE,
      payload:{page, rowsPerPage,word}
    }
  }

  export const activateCompany = (token) => ({
    type: ActionTypes.ACTIVATE_COMPANY.REQUEST,
    payload: token,
});

export const activateCompanySuccess = () => ({
    type: ActionTypes.ACTIVATE_COMPANY.SUCCESS,
});

export const activateCompanyFailure = (error) => ({
    type: ActionTypes.ACTIVATE_COMPANY.FAILURE,
    payload: error,
});

export const fetchWorkschedule= ()=>{
  return{
    type:ActionTypes.WORKSCHEDULE.FETCH,

  }
}
export const setWorkschedule  = (data)=>{
  return{
    type:ActionTypes.WORKSCHEDULE.SET,
    payload:data
  }
}
export const createWorkschedule  = (scheduleData)=>{
  return{
    type:ActionTypes.WORKSCHEDULE.CREATE,
    payload:scheduleData
  }
}

export const updateWorkschedule  = (workscheduleid,scheduleData)=>{
  return{
    type:ActionTypes.WORKSCHEDULE.UPDATE,
    payload:{workscheduleid,scheduleData}
  }
}
export const deleteWorkschedule  = (workscheduleid)=>{
  return{
    type:ActionTypes.WORKSCHEDULE.DELETE,
    payload:workscheduleid
  }
}

export const fetchOffices= ()=>{
  return{
    type:ActionTypes.OFFICES.FETCH,

  }
}
export const setOffices  = (data)=>{
  return{
    type:ActionTypes.OFFICES.SET,
    payload:data
  }
}
export const createOffices  = (officeData)=>{
  return{
    type:ActionTypes.OFFICES.CREATE,
    payload:officeData
  }
}
export const deleteOffice  = (officeid)=>{
  return{
    type:ActionTypes.OFFICES.DELETE,
    payload:officeid
  }
}

export const updateOffices  = (officeid,officeData)=>{
  return{
    type:ActionTypes.OFFICES.UPDATE,
    payload:{officeid,officeData}
  }
}

export const fetchScheduleByEmployee= (employeeId)=>{
  return{
    type:ActionTypes.EMPLOYEE_WORKSCHEDULE.FETCH,
    payload:employeeId

  }
}
export const setScheduleByEmployee  = (data)=>{
  return{
    type:ActionTypes.EMPLOYEE_WORKSCHEDULE.SET,
    payload:data
  }
}

export const updateEmpWorkschedule  = (empscheuledata)=>{
  console.log('empscheuledata',empscheuledata)
  return{
    type:ActionTypes.EMPLOYEE_WORKSCHEDULE.UPDATE,
    payload:empscheuledata
  }
}
export const fetchOfficeByEmployee= (employeeId)=>{
  return{
    type:ActionTypes.EMPLOYEE_OFFICE.FETCH,
    payload:employeeId

  }
}
export const setOfficeByEmployee  = (data)=>{
  return{
    type:ActionTypes.EMPLOYEE_OFFICE.SET,
    payload:data
  }
}

export const updateEmpOffice  = (employeeId,officeId)=>{
  console.log('updateEmpOffice',updateEmpOffice)
  return{
    type:ActionTypes.EMPLOYEE_OFFICE.UPDATE,
    payload:{employeeId,officeId}
  }
}

export const AllEmploymentType= ()=>{
  return{
    type:ActionTypes.EMPLOYMENT_TYPE.FETCH,
  }
}
export const setAllEmploymentType  = (data)=>{
  return{
    type:ActionTypes.EMPLOYMENT_TYPE.SET,
    payload:data
  }
}

export const updateEmployment  = (employmetData)=>{
  return{
    type:ActionTypes.EMPLOYMENT_TYPE.UPDATE,
    payload:employmetData
  }
}

export const fetchOfficeId= ()=>{
  return{
    type:ActionTypes.OFFICE_ID.FETCH,
  }
}
export const setOfficeId  = (data)=>{
  return{
    type:ActionTypes.OFFICE_ID.SET,
    payload:data
  }
}

export const fetchEmployEmployment= (employeeId)=>{
  return{
    type:ActionTypes.EMPLOYEE_EMPLOYMENT.FETCH,
    payload:employeeId
  }
}
export const setEmployEmployment  = (data)=>{
  return{
    type:ActionTypes.EMPLOYEE_EMPLOYMENT.SET,
    payload:data
  }
}

export const fetchPolicies= ()=>{
  return{
    type:ActionTypes.POLICIES.FETCH,
  }
}
export const setPolicies  = (data)=>{
  return{
    type:ActionTypes.POLICIES.SET,
    payload:data
  }
}

export const createPolicies  = (pociliesData)=>{
  return{
    type:ActionTypes.POLICIES.CREATE,
    payload:pociliesData
  }
}


export const fetchLeaveCount= (employeeid)=>{
  return{
    type:ActionTypes.LEAVE_COUNT.FETCH,
    payload:employeeid
  }
}
export const setLeaveCount  = (data)=>{
  return{
    type:ActionTypes.LEAVE_COUNT.SET,
    payload:data
  }
}

export const deletePolicies  = (policyId)=>{
  return{
    type:ActionTypes.POLICIES.DELETE,
    payload:policyId
  }
}
