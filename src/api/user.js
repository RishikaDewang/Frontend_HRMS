// Import necessary constants and modules from other files.
import { BASE_URL, LOGIN, AUTH, ROLES, ROLES_WITH_EMPLOYEE_COUNT, CREATE_ROLE_WITH_PERMISSIONS, PERMISSIONS, GET_SECTION_AND_PERMISSIONS_ROLE, EDIT_ROLE_PERMISSIONS, PROFILE, ADDRESS, ADDTOEMPLOYEE, EMERGENCYCONTACT, BANKINFORMATION, UPDATEBANKINFORMATION, EMPLOYEE, DELETE, TIMEOFF, LEAVES, CREATE, COMPANYCREATE, ATTENDANCESESSION, GETBYEMPLOYEEID, CLOCKIN, CLOCKOUT, IMAGE, GET_IMAGE, UPLOAD, QRCODE, GENERATECOMPANYQR, GETIMAGEBYCOMPANY, PERMISSION, GIVE, ROLE, INFO, NEWS, DOCUMENTMODULE, GETFILES, GETFILE, ADDFILES, DELETEFILE, JOBS, CANDIDATE, STAGES, GETCANDIDATEWITHJOB, UPDATESTAGENAME, EMAILTEMPLATE, GETCANDIDATEBYID, GETEMAILTEMPLATEFORSTAGE, COMMENT, GETCOMMENTBYCANDIDATEID, DELETECOMMENT, SETTING, GETHOLIDAY, ADDHOLIDAY, DELETEHOLIDAY, SENDMAIL, UPDATECANDIDATE, DEPARTMENT_DESIGNATION_LIST, UPDATESTATUS, LOGOUT, IMPORT, CANDIDATES, IMPORTNEW, ASSIGNJOB, FORGOTPASSWORD, SENDRESETLINK, RESETPASSWORD, COUNTRY, STATE, CITY, NATIONALITY, GETSECTION, MODULE, SEARCH, PAGING , ACTIVATE, WORKSCHEDULE, OFFICE, BYEMPLOYEEID, ASSIGNSCHEDULE, ATTENDANCE, LOGGEDSESSION, MONTHLY_SUMMARY, ALL_EMPLOYEE_SUMMARY, OFFICEASSIGN, ALLOFFICE, EMPLOYEMENTYPE, ASSIGNTOEMPLOYEE, GETNEXTOFFICEID, GETLEAVETYPE, GETTOTALLEAVECOUNT, CREATELEAVE} from "./apiconstant";
import Api from ".";


// Define a function called 'login' that takes 'email' and 'password' as parameters.
export function login(email, password) {

  var url = BASE_URL + AUTH + LOGIN;
  var data = {
    email: email,
    password: password
  }
  var headers = {
    'Content-Type': 'application/json',
  };

  // Return the result of making an API request using the 'Api' function.
  // This function likely sends a POST request to the URL with the provided 'data' and 'headers'.
  return Api(url, 'POST', data, headers);
}
export function fetchrole() {
  var url = BASE_URL + ROLES + ROLES_WITH_EMPLOYEE_COUNT
  var headers = {
    'Content-Type': 'application/json',

  };
  return Api(url, 'GET', null, headers);
}
export function createrole(roleData) {
  var url = BASE_URL + ROLES + CREATE_ROLE_WITH_PERMISSIONS
  var data = JSON.stringify(roleData);
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);
}

export function fetchPermissionByRole(id) {

  var url = `${BASE_URL}${PERMISSIONS}${GET_SECTION_AND_PERMISSIONS_ROLE}${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);
}

export function editpermission(roleData) {
  var url = BASE_URL + PERMISSIONS + EDIT_ROLE_PERMISSIONS
  var data = JSON.stringify(roleData);
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers,);
}

export function fetchmyprofile(id, userData) {
  var url = `${BASE_URL}${PROFILE}${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers, userData);

}
export function fetchmyaddress(id, userData) {
  var url = `${BASE_URL}${ADDRESS}/${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers, userData);

}
export function updatemyprofile(id, userData, token) {
  var url = `${BASE_URL}${PROFILE}${id}`
  var data = userData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers, token);

}
export function updatemyaddress(id, userData, token) {
  var url = `${BASE_URL}${ADDRESS}/${ADDTOEMPLOYEE}/${id}`
  var data = userData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers, token);

}
export function fetchemergencycontact(id, userData) {
  var url = `${BASE_URL}${EMERGENCYCONTACT}/${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers, userData);

}

export function updateEmergency(id, userData, token) {
  var url = `${BASE_URL}${EMERGENCYCONTACT}/${ADDTOEMPLOYEE}/${id}`
  var data = userData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers, token);

}

export function fetchebankinfo(id, userData) {
  var url = `${BASE_URL}${BANKINFORMATION}/${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers, userData);

}

export function updateBankInfo(id, userData, token) {
  var url = `${BASE_URL}${BANKINFORMATION}/${UPDATEBANKINFORMATION}/${id}`
  var data = userData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers, token);

}
export function fetcheemployee(page, rowsPerPage) {
  var url = `${BASE_URL}${EMPLOYEE}/${PAGING}?page=${page}&pageSize=${rowsPerPage}`
  console.log(url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function createEmployee(userData, token) {
  var url = BASE_URL + EMPLOYEE
  var data = userData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers, token);

}
export function deleteemployee(id) {
  var url = `${BASE_URL}${EMPLOYEE}/${DELETE}/${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}

export function fetchemployeetimeoff(id) {
  var url = `${BASE_URL}${TIMEOFF}/${LEAVES}/${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function requestTimeoff(userData) {
  var url = `${BASE_URL}${TIMEOFF}/${CREATELEAVE}`
  var data = userData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}
export function fetchEmployeesTimeoff() {
  var url = BASE_URL + TIMEOFF
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function singup(userData) {
  var url = BASE_URL + COMPANYCREATE + CREATE
  var data = userData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);
}

export function fetchmyattendance(id) {
  var url = `${BASE_URL}${ATTENDANCESESSION}/${GETBYEMPLOYEEID}/${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function clockin(id, requestBody) {
  var url = `${BASE_URL}${ATTENDANCE}/${CLOCKIN}/${id}`
  var data = requestBody
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);
}
export function clockout(id, requestBody) {
  var url = `${BASE_URL}${ATTENDANCE}/${CLOCKOUT}/${id}`
  var data = requestBody
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);
}

export function fetchattendancesummary(employeeid, startDate,endDate) {
  var url = `${BASE_URL}${ATTENDANCE}/${MONTHLY_SUMMARY}/${employeeid}?startDate=${startDate}&endDate=${endDate}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function fetchemployeeattendance(startDate, endDate) {
  console.log(startDate, endDate)
  var url = `${BASE_URL}${ATTENDANCE}/${ALL_EMPLOYEE_SUMMARY}?startDate=${startDate}&endDate=${endDate}`
  console.log(url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function profilepicture(id) {
  var url = `${BASE_URL}${IMAGE}/${id}/${GET_IMAGE}`
  var headers = {
    'Content-Type': 'image/jpeg'
  };
  return Api(url, 'GET', null, headers);

}

export function uploadpicture(id, formData) {
  var url = `${BASE_URL}${IMAGE}/${UPLOAD}?employeeId=${id}`
  var data = formData
  var headers = {
    'Content-Type': 'multipart/form-data'
  };
  return Api(url, 'POST', data, headers);
}

export function createqrcode(id, formData) {
  var url = `${BASE_URL}${QRCODE}/${GENERATECOMPANYQR}/${id}`
  var data = formData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);
}
export function fetchqrcode(id) {
  var url = `${BASE_URL}${QRCODE}/${GETIMAGEBYCOMPANY}/${id}`
  var headers = {
    'Content-Type': 'text/plain'
  };
  return Api(url, 'GET', null, headers);
}

export function featurepermission(formData) {
  var url = BASE_URL + PERMISSION + GIVE
  var data = formData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);
}
export function fetchfeaturepermission(id) {
  var url = `${BASE_URL}${PERMISSION}${ROLE}/${id}/${INFO}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);
}

export function fetchnews() {
  var url = BASE_URL + NEWS
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function postnews(newsData) {
  var url = BASE_URL + NEWS
  var data = newsData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function deletenews(id) {
  var url = `${BASE_URL}${NEWS}/${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}

export function fetchdocuments() {
  var url = BASE_URL + DOCUMENTMODULE
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function createdocuments(documentdata) {
  var url = BASE_URL + DOCUMENTMODULE
  var data = documentdata
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function fetchdocumentsdetails(id) {
  var url = `${BASE_URL}${DOCUMENTMODULE}/${GETFILES}/${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function documentsdetails(name) {
  var url = `${BASE_URL}${DOCUMENTMODULE}/${GETFILE}/${name}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function uploadfiles(id, formData) {
  var url = `${BASE_URL}${DOCUMENTMODULE}/${ADDFILES}/${id}`
  var data = formData
  var headers = {
    'Content-Type': 'multipart/form-data'
  };
  return Api(url, 'POST', data, headers);

}
export function deletefolder(id) {
  var url = `${BASE_URL}${DOCUMENTMODULE}/${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);
}

export function deletefolderfiles(id) {
  var url = `${BASE_URL}${DOCUMENTMODULE}/${DELETEFILE}/${id}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);
}

export function fetchejobs() {
  var url = BASE_URL + JOBS
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function createjobs(jobData) {
  var url = BASE_URL + JOBS
  var data = jobData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function fetchecandidate() {
  var url = BASE_URL + CANDIDATE
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function createcandidate(formData) {
  var url = BASE_URL + CANDIDATE
  var data = formData
  var headers = {
    'Content-Type': 'multipart/form-data'
  };
  return Api(url, 'POST', data, headers);

}

export function fetchestages() {
  var url = BASE_URL + STAGES
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function createstages(stage) {
  var url = BASE_URL + STAGES
  var data = stage
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}
export function deletestages(stageid) {
  var url = `${BASE_URL}${STAGES}/${stageid}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}

export function jobdetail(jobid) {
  var url = `${BASE_URL}${CANDIDATE}/${GETCANDIDATEWITHJOB}?jobId=${jobid}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);
}

export function updatestage(candidateid, stagename) {
  var url = `${BASE_URL}${CANDIDATE}/${UPDATESTAGENAME}/${candidateid}`
  var data = stagename
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'PUT', data, headers);
}

export function fetchetemplate() {
  var url = BASE_URL + EMAILTEMPLATE
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function createtemplate(templateData) {
  var url = BASE_URL + EMAILTEMPLATE
  var data = templateData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function fetchetemplatedetail(templateid) {
  var url = `${BASE_URL}${EMAILTEMPLATE}/${templateid}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function updatetemplatedetail(templateid, templateData) {
  var url = `${BASE_URL}${EMAILTEMPLATE}/${templateid}`
  var data = templateData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'PUT', data, headers);

}

export function deletetemplate(templateid) {
  var url = `${BASE_URL}${EMAILTEMPLATE}/${templateid}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}

export function deletejobs(jobId) {
  var url = `${BASE_URL}${JOBS}/${jobId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}

export function deletecandidate(candateidId) {
  var url = `${BASE_URL}${CANDIDATE}/${candateidId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}
export function candidateprofile(candateidId) {
  var url = `${BASE_URL}${CANDIDATE}/${GETCANDIDATEBYID}?candidateId=${candateidId}`
  var headers = {
    'Content-Type': 'text/plain'
  };
  return Api(url, 'GET', null, headers);

}

export function templatebody(stageName) {
  var url = `${BASE_URL}${CANDIDATE}/${GETEMAILTEMPLATEFORSTAGE}?stageName=${stageName}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function getcomment(candateidId) {
  var url = `${BASE_URL}${COMMENT}/${GETCOMMENTBYCANDIDATEID}/${candateidId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function postcomment(commentData) {
  var url = BASE_URL + COMMENT
  var data = commentData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function deletescomment(commentId) {
  var url = `${BASE_URL}${COMMENT}/${DELETECOMMENT}/${commentId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}

export function getholiday() {
  var url = BASE_URL + SETTING + GETHOLIDAY
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function addholiday(holidayData) {
  var url = BASE_URL + SETTING + ADDHOLIDAY
  var data = holidayData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}
export function deleteholiday(deleteId) {
  var url = `${BASE_URL}${SETTING}${DELETEHOLIDAY}/${deleteId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}

export function sendcandidatemail(emailData) {
  var url =  `${BASE_URL}${CANDIDATE}/${SENDMAIL}`
  var data = emailData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function updatecandidate(formData, candateidId) {
  var url = `${BASE_URL}${CANDIDATE}/${UPDATECANDIDATE}/${candateidId}`
  var data = formData
  var headers = {
    'Content-Type': 'multipart/form-data'
  };
  return Api(url, 'PUT', data, headers);

}


export function addasemployee(userData) {
  var url = BASE_URL + EMPLOYEE
  var data = userData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function titleanddepartment() {
  var url = `${BASE_URL}${EMPLOYEE}/${DEPARTMENT_DESIGNATION_LIST}`
  console.log(url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function fileterattendance(employeeid, startDate, endDate) {
  var url = `${BASE_URL}${ATTENDANCE}/${LOGGEDSESSION}/${employeeid}?startDate=${startDate}&endDate=${endDate}`
  console.log(url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function statusupdate(leaveId,statusId) {
  var url = `${BASE_URL}${TIMEOFF}/${UPDATESTATUS}/${leaveId}?newStatusId=${statusId}`
  console.log(url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'PUT', null, headers);

}

export function logout() {
  var url = BASE_URL + AUTH + LOGOUT
  console.log(url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', null, headers);

}

export function importcandidate(formData) {
  console.log("candidate import ", formData)
  var url = `${BASE_URL}${CANDIDATE}/${IMPORT}/${CANDIDATES}`
  var data = formData
  var headers = {
    'Content-Type': 'multipart/form-data'
  };
  return Api(url, 'POST', data, headers);

}
export function importemployee(formData) {
  console.log("candidate import ", formData)
  var url = `${BASE_URL}${EMPLOYEE}/${IMPORT}`
  var data = formData
  var headers = {
    'Content-Type': 'multipart/form-data'
  };
  return Api(url, 'POST', data, headers);

}

export function bulkcv(formData) {
  console.log("candidate import ", formData)
  var url = `${BASE_URL}${IMPORTNEW}/${CANDIDATES}`
  var data = formData
  var headers = {
    'Content-Type': 'multipart/form-data'
  };
  return Api(url, 'POST', data, headers);

}

export function epmployeeupdate(emplyeeData,employeeId) {
  var url = `${BASE_URL}${EMPLOYEE}/${employeeId}`
  console.log(url)
  var data = emplyeeData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'PUT', data, headers);

}

export function jobassingn(candidateId,jobId) {
  var url = `${BASE_URL}${IMPORTNEW}/${candidateId}/${ASSIGNJOB}/${jobId}`
  console.log(url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'PUT', null, headers);

}

export function attendaceimport(formData) {
  console.log("candidate import ", formData)
  var url = `${BASE_URL}${ATTENDANCESESSION}/${IMPORT}`
  var data = formData
  var headers = {
    'Content-Type': 'multipart/form-data'
  };
  return Api(url, 'POST', data, headers);

}
export function forgotpassword(email) {
  var url = `${BASE_URL}${FORGOTPASSWORD}/${SENDRESETLINK}`
  var data = email
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function resetpassword(employeeData) {
  var url = `${BASE_URL}${RESETPASSWORD}/${RESETPASSWORD}`
  var data = employeeData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function getcountry() {
  var url = BASE_URL + COUNTRY
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function getstate(countryId) {
  var url = `${BASE_URL}${STATE}/${countryId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function getcity(stateId) {
  var url = `${BASE_URL}${CITY}/${stateId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function getnationality() {
  var url = BASE_URL + NATIONALITY
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function fetchSections() {
  var url = BASE_URL + PERMISSIONS + GETSECTION 
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function fetchmodule() {
  var url = BASE_URL + PERMISSIONS + MODULE 
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function fileremployee(page, rowsPerPage,word) {
  var url = `${BASE_URL}${SEARCH}/${PAGING}?page=${page}&pageSize=${rowsPerPage}&searchTerm=${word}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function loading(token) {
  console.log("api token",  token)
  var url = `${BASE_URL}${COMPANYCREATE}${ACTIVATE}?token=${token}`
  console.log("url", url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function fetchworkschedule() {
  var url = `${BASE_URL}${WORKSCHEDULE}/${WORKSCHEDULE}`
  console.log("url", url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function createworkschedule(scheduleData) {
  var url = `${BASE_URL}${WORKSCHEDULE}/${CREATE}`
  console.log("url", url, scheduleData)
  var data = scheduleData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}
export function updateworkschedule(workscheduleid,scheduleData) {
  var url = `${BASE_URL}${WORKSCHEDULE}/${WORKSCHEDULE}/${workscheduleid}`
  console.log("url", url)
  var data = scheduleData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'PUT', data, headers);

}

export function deleteworkschedule(workscheduleid) {
  var url = `${BASE_URL}${WORKSCHEDULE}/${WORKSCHEDULE}/${workscheduleid}`
  console.log("url", url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}

export function fetchoffices() {
  var url = `${BASE_URL}${OFFICE}/${ALLOFFICE}`
  console.log("url", url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}
export function createoffices(officeData) {
  var url = `${BASE_URL}${OFFICE}`
  console.log("url", url)
  var data = officeData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function deleteoffice(officeid) {
  var url = `${BASE_URL}${OFFICE}/${officeid}`
  console.log("url", url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}

export function updateoffices(officeid,officeData) {
  var url = `${BASE_URL}${OFFICE}/${officeid}`
  console.log("url", url)
  var data = officeData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'PUT', data, headers);

}

export function getschedulebyemployee(employeeId) {
  var url = `${BASE_URL}${WORKSCHEDULE}/${BYEMPLOYEEID}/${employeeId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function updateempschedule(empscheuledata) {
  var url = `${BASE_URL}${WORKSCHEDULE}/${ASSIGNSCHEDULE}`
  var data = empscheuledata
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function getofficebyemployee(employeeId) {
  var url = `${BASE_URL}${OFFICE}?employeeId=${employeeId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function getofficeId() {
  var url = `${BASE_URL}${OFFICE}/${GETNEXTOFFICEID}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function updateempoffice(employeeId,officeId) {
  var url = `${BASE_URL}${OFFICE}/${OFFICEASSIGN}?employeeId=${employeeId}&officeId=${officeId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', null, headers);

}

export function allemployementtype() {
  var url = BASE_URL + EMPLOYEMENTYPE
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function updateemployementtype(employmetData) {
  var url =  `${BASE_URL}${EMPLOYEMENTYPE}/${ASSIGNTOEMPLOYEE}`
  var data = employmetData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function employeemployment(employeeId) {
  var url =  `${BASE_URL}${EMPLOYEMENTYPE}/${EMPLOYEMENTYPE}/${employeeId}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function getpolicies() {
  var url =  `${BASE_URL}${TIMEOFF}/${GETLEAVETYPE}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function createpolicies(pociliesData) {
  var url = BASE_URL + TIMEOFF
  var data = pociliesData
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'POST', data, headers);

}

export function getcount(employeeid) {
  var url =  `${BASE_URL}${TIMEOFF}/${GETTOTALLEAVECOUNT}/${employeeid}`
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'GET', null, headers);

}

export function deletepolicy(policyId) {
  var url = `${BASE_URL}${TIMEOFF}/${policyId}`
  console.log("url", url)
  var headers = {
    'Content-Type': 'application/json'
  };
  return Api(url, 'DELETE', null, headers);

}