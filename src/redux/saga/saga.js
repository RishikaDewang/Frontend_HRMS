// sagas.js
import { call, put, all, takeLatest } from 'redux-saga/effects';
import ActionTypes from '../constant/constant';
import * as actions from "../action/actions";
import * as api from 'api/user'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function* loginSaga(action) {
  try {
    // Extract 'email' and 'password' from the action's payload.

    const { email, password } = action.payload;
    // Make an API call using the 'call' effect to the 'login' function with the provided credentials.
    const response = yield call(api.login, email, password);
    const { token, officeid
,      roleId, roleName, permissions, id ,companyId ,modulePermissions,resetToken} = response;
    // Dispatch the action to store user data in Redux
    yield put(actions.setUserData({ token,officeid
,      roleId, roleName, permissions, id,companyId,modulePermissions ,resetToken}));
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('roleName', JSON.stringify(roleName));
    yield put(actions.loginsuccess())
    console.log("login respoinse",response)
  } catch (error) {
    toast.error(error.response.data );
    // alert("your Email and password is incorrect")
    yield put(actions.loginFailure(error));
   
    return error
  }
}
function* fetchRole() {
  try {
    const response = yield call(api.fetchrole)
    yield put(actions.setRole(response));
  }
  catch (error) {
    return error
  }
}

function* createRoleWithPermissions(action) {
  try {
    // Perform the API request here using the provided roleData
    // Example:
    const response = yield call(api.createrole, action.payload);
    if (response.status === 200) {
      // Handle a successful response
      yield put(actions.createRoleWithPermissionsSuccess());
      
    } else {
      // Handle error status
      // Dispatch an action for failure
      yield put(actions.createRoleWithPermissionsFailure(response.data));
    }
    // Handle a successful response
yield put(actions.fetchRole())
  } catch (error) {
    toast.error(error.response.data );
    yield put(actions.createRoleWithPermissionsFailure(error));
    

   
  }
}

function* fetchPermission(action) {
  const id = action.payload
  try {

    const response = yield call(api.fetchPermissionByRole, id)
    yield put(actions.setPermissionByRole(response))
  }
  catch (error) {
    return error
  }
}

function* edipermission(action) {

  try {
    yield call(api.editpermission, action.payload);
    yield call(api.editpermission, action.payload);
    // yield put(createRoleWithPermissionsSuccess());
  } catch (error) {
    return error
  }
}


function* fetchMyProfilesaga(action) {
  const id = action.payload
  try {
    const response = yield call(api.fetchmyprofile, id)

    yield put(actions.setMyProfile(response))
  }
  catch (error) {
    return error
  }
}
function* fetchMyAddresssaga(action) {
  const id = action.payload
  try {
    const response = yield call(api.fetchmyaddress, id)

    yield put(actions.setMyAddress(response))
  }
  catch (error) {
    return error
  }
}

function* updateProfileSaga(action) {
  try {
   const response =  yield call(api.updatemyprofile, action.payload.employeeId, action.payload.updatedProfile);
    toast.success(response);
  } catch (error) {
    toast.error(error.response.data);
  }
}
function* updateAddressSaga(action) {
  try {
    const response = yield call(api.updatemyaddress, action.payload.employeeId, action.payload.updatedProfile);
    toast.success(response);
  } catch (error) {
    toast.error(error.response.data);
  }
}
function* fetchEmergencyContactsaga(action) {
  const id = action.payload
  try {

    const response = yield call(api.fetchemergencycontact, id)
    yield put(actions.setEmergencyContact(response))
  }
  catch (error) {
    return error
  }
}

function* updateEmergencySaga(action) {
  try {
   const response = yield call(api.updateEmergency, action.payload.employeeId, action.payload.updatedProfile);
   toast.success(response);
  } catch (error) {
    toast.error(error.response.data);
  }
}
function* fetchBankInfosaga(action) {
  const id = action.payload
  try {

    const response = yield call(api.fetchebankinfo, id)
    yield put(actions.setBankInfo(response))
  }
  catch (error) {
    return error
  }
}

function* updateBankInfoSaga(action) {
  try {
   const response =  yield call(api.updateBankInfo, action.payload.employeeId, action.payload.updatedProfile);
    toast.success(response);
  } catch (error) {
    toast.error(error.response.data);
  }
}
function* fetchEmployeesaga(action) {
  const {page,rowsPerPage} = action.payload
  console.log("saga called",page, rowsPerPage)
  try {

    const response = yield call(api.fetcheemployee, page,rowsPerPage)
console.log(response,"in saga")
    yield put(actions.setEmployee(response))
 
  }
  catch (error) {
    return error
  }
}

function* createEmployeeSaga(action) {
  const {employeedata,page, rowsPerPage} = action.payload
  try {
    const response = yield call(api.createEmployee, employeedata);
    yield put(actions.fetchEmployee(page, rowsPerPage))
    yield put(actions.createEmployeeSuccess())
    toast.success(response);
  } catch (error) {
    yield put(actions.createEmployeeFailure(error.response.data))
    toast.error(error.response.data );
    
  }
}

function* deleteEmployeesaga(action) {
  const {employeeid,page, rowsPerPage} = action.payload
  try {
    const response=yield call(api.deleteemployee, employeeid)
    yield put(actions.fetchEmployee(page, rowsPerPage))
    toast.success(response);
  }
  
  catch (error) {
    toast.error(error.response.data );
  }
}

function* fetchEmployeeTimeoffsaga(action) {
  const id = action.payload
  try {

    const response = yield call(api.fetchemployeetimeoff, id)
    console.log("my time off response", response)
    yield put(actions.setEmployeetimeoff(response))
  }
  catch (error) {
    return error
  }
}

function* createTimeoffSaga(action) {


  try {
    // yield call(requestTimeoff, action.payload.employeedata, action.payload.id);
    yield call(api.requestTimeoff, action.payload.employeedata);
    yield put(actions.fetchEmployeetimeoff(action.payload.id))
  
  } catch (error) {
     toast.error(error.response.data );
    return error
  }
}
function* signupSaga(action) {

  try {
    const response = yield call(api.singup, action.payload);
    if (response ) {
     
      yield put(actions.signupSuccess());
      toast.success(response);
    } 
  } catch (error) {
    toast.error(error.response.data );
    yield put(actions.signupFailure(error.message));
  }
}

function* fetchAllEmployeeTimeoffsaga() {
  try {

    const response = yield call(api.fetchEmployeesTimeoff)
    yield put(actions.setAllEmployeestimeoff(response))
  }
  catch (error) {
    return error
  }
}

function* fetchMyAttendancesaga(action) {
  try {

    const response = yield call(api.fetchmyattendance, action.payload)
    yield put(actions.setMyAttendance(response))
  }
  catch (error) {
    return error
  }
}
function* clockIn(action) {
  try {
    const { requestBody, id , startDate, endDate} = action.payload;
    yield call(api.clockin, id, requestBody);
    yield put(actions.filterattendance(id , startDate, endDate ))
    yield put(actions.fetchAttendanceSummary(id , startDate, endDate))

  } catch (error) {
    return error
  }
}
function* clockOut(action) {
  try {
    const { requestBody, id , startDate, endDate } = action.payload;
    yield call(api.clockout, id, requestBody);
    yield put(actions.filterattendance(id , startDate, endDate ))
    yield put(actions.fetchAttendanceSummary(id , startDate, endDate ))
  } catch (error) {
    return error
  }
}

function* fetchAttendancesummary(action) {
  const {employeeid, startDate, endDate} = action.payload
  try {

    const response = yield call(api.fetchattendancesummary, employeeid, startDate, endDate)
    yield put(actions.setAttendanceSummary(response))
  }
  catch (error) {
    return error
  }
}
function* fetchEmpAttendance(action) {
  const { startDate, endDate} = action.data
  try {

    const response = yield call(api.fetchemployeeattendance, startDate, endDate)
    yield put(actions.setEmployeeAttendance(response))
  }
  catch (error) {
    return error
  }
}

function* fetchProfilePicsaga(action) {
  const id = action.data
  try {

    const response = yield call(api.profilepicture, id)
    yield put(actions.setProfilepic(response))
  }
  catch (error) {
    return error
  }
}

function* uploadImageSaga(action) {
  try {
   yield call(api.uploadpicture, action.payload.id , action.payload.formData);
    yield put (actions.fetchProfilepic(action.payload.id))
    // yield put(uploadImageSuccess(response.data.imageUrl));
  
  } catch (error) {
    yield put(actions.uploadImageFailure(error.message));
  }
}

function* createqrcodesaga(action) {
  try {
   yield call(api.createqrcode, action.payload.id , action.payload.formData);
   yield put(actions.fetchQrcode(action.payload.id ))
  } catch (error) {
   return error
  }
}
function* fetchqrcodesaga(action) {

  try {
   const response = yield call(api.fetchqrcode, action.data);

 yield put(actions.setQrcode(response))
  } catch (error) {
   return error
  }
}

function* feautresUpdateSaga(action) {

  try {
 yield call(api.featurepermission, action.payload);

  } catch (error) {
   return error
  }
}

function* fetchfeaturesaga(action) {

  try {
   const response = yield call(api.fetchfeaturepermission, action.data);
 yield put(actions.setFeatures(response))
  } catch (error) {
   return error
  }
}

function* fetchNewsSaga() {
  try {
 
 const response = yield call(api.fetchnews)
    yield put(actions.setNews(response))
  }
  catch (error) {
    return error
  }
 }
 function* NewsSaga(action) {
  try {
  
   yield call(api.postnews, action.payload);
   yield call(api.postnews, action.payload);

     yield put(actions.fetchNews())
  } catch (error) {
     return error 
  }
}
function* DeleteNewsSaga(action) {
  console.log(action)
  try {
  
  const response = yield call(api.deletenews, action.payload);
  console.log(response)
     yield put(actions.fetchNews())
  } catch (error) {
    console.log(error)
     return error 
  }
}

function* fetchDocumentSaga() {
  try {
 
    const response = yield call(api.fetchdocuments)
    yield put(actions.setDocuments(response))
  }
  catch (error) {
    return error
  }
 }
 function* creatDocumentSaga(action) {
  try {
  
     yield call(api.createdocuments, action.payload);
     yield put(actions.fetchDocuments())
  } catch (error) {
     return error 
  }
}

function* fetchDocumentdetailsSaga(action) {
  try {
 
    const response = yield call(api.fetchdocumentsdetails,action.payload)
    yield put(actions.setDocumentsDetails(response))
  }
  catch (error) {
   console.log(error)
  }
 }

 function* fetchDocumentdataSaga(action) {
  try {
 
    const response = yield call(api.documentsdetails,action.payload)
    yield put(actions.setDocumentsData(response))
  }
  catch (error) {
   console.log(error)
  }
 }
 function* uploadFilesSaga(action) {
  try {
    yield call(api.uploadfiles, action.payload.id , action.payload.Files);
    yield put (actions.fetchDocumentsDetails(action.payload.id))
    // yield put(uploadImageSuccess(response.data.imageUrl));
  
  } catch (error) {
    return error
    // yield put(uploadImageFailure(error.message));
  }
}

function* DeleteFolderSaga(action) {
  try {
  
  yield call(api.deletefolder, action.payload);
     yield put(actions.fetchDocuments())
  } catch (error) {
     return error 
  }
}

function* DeleteFolderfilesSaga(action) {
  try {
  
  yield call(api.deletefolderfiles, action.payload);
     yield put(actions.fetchDocumentsDetails(action.payload))
  } catch (error) {
     return error 
  }
}
function* fetchJobsaga() {
  try {

    const response = yield call(api.fetchejobs)
    yield put(actions.setJobs(response))
  }
  catch (error) {
    return error
  }
}

function* createJobsSaga(action) {
  try {
   yield call(api.createjobs, action.payload);
    yield put(actions.fetchJobs())  
  } catch (error) {
    return error
  }
}

function* fetchCandidatesaga() {
  try {

    const response = yield call(api.fetchecandidate)
    yield put(actions.setCandidate(response))
  }
  catch (error) {
    return error
  }
}

function* createCandidateSaga(action) {
  try {
     yield call(api.createcandidate, action.payload.formData);
     yield call(api.createcandidate, action.payload.formData);

    yield put(actions.fetchCandidate())
    yield put(actions.fetchjobdetail(action.payload.jobId))
    // yield put(uploadImageSuccess(response.data.imageUrl));
  
  } catch (error) {
  console.log(error)
    // yield put(uploadImageFailure(error.message));
  }
}

function* fetchStagesaga() {
  try {

    const response = yield call(api.fetchestages)
    yield put(actions.setStages(response))
  }
  catch (error) {
    return error
  }
}
function* createStageSaga(action) {
  try {
yield call(api.createstages, action.payload);
  yield put(actions.fetchStages())
  
  } catch (error) {
  console.log(error);
  }
}
function* DeleteStageSaga(action) {
  try {
  
  yield call(api.deletestages, action.payload);
  yield put(actions.fetchStages())
  } catch (error) {
     return error 
  }
}
function* fetchJobDetailsaga(action) {
  try {

    const response = yield call(api.jobdetail, action.payload)
    yield put(actions.setjobdetail(response))
  }
  catch (error) {
    return error
  }
}
function* updateStageSaga(action) {
  try {
  yield call(api.updatestage, action.payload.candateid.candidateId, action.payload.stagename);
  yield put(actions.fetchjobdetail(action.payload.candateid.jobId))

  
  } catch (error) {
  return error
  }
}
function* fetchTemplatesaga() {
  try {

    const response = yield call(api.fetchetemplate)
    yield put(actions.settemplate(response))
  }
  catch (error) {
    return error
  }
}
function* addTemplate(action) {
  try {

  yield call(api.createtemplate, action.payload);
  yield put(actions.fetchtemplate())
  } catch (error) {
return error

  }
}
function* fetchTemplateDetailsaga(action) {
  try {

    const response = yield call(api.fetchetemplatedetail, action.payload)
    yield put(actions.settemplatedetail(response))
  }
  catch (error) {
    return error
  }
}
function* updateTemplateDetailsaga(action) {
  const {id, ...templateData } = action.payload;
  try {

    yield call(api.updatetemplatedetail, id,templateData)
    yield put(actions.fetchtemplate())
  }
  catch (error) {
    return error
  }
}
function* DeleteTemplate(action) {
  try {
  
  yield call(api.deletetemplate, action.payload);
  yield put(actions.fetchtemplate())
  } catch (error) {
     return error 
  }
}

function* DeleteJobs(action) {
  try {
  
 yield call(api.deletejobs, action.payload);
 yield put(actions.fetchJobs()) 
  } catch (error) {
     return error 
  }
}

function* DeleteCandidateSaga(action) {
  try {
  
 yield call(api.deletecandidate, action.payload);
 yield put(actions.fetchCandidate())
  } catch (error) {
     return error 
  }
}

function* fetchCandidateProfile(action) {
  try {

    const response = yield call(api.candidateprofile, action.payload.candidateId)
    yield put(actions.setcandidateprofile(response))
  }
  catch (error) {
    return error
  }
}
function* fetchTemplateBody(action) {
  try {

    const response = yield call(api.templatebody, action.payload)
    yield put(actions.settemplatebody(response))
  }
  catch (error) {
    return error
  }
}

function* fetchCommentsSaga(action) {
  try {

    const response = yield call(api.getcomment, action.payload)
    yield put(actions.setcomments(response))
  }
  catch (error) {
    return error
  }
}
function* postCommetSaga(action) {
  try {

 yield call(api.postcomment, action.payload.data);
 yield put(actions.fetchcomments(action.payload.candidateId))
  } catch (error) {
return error

  }
}
function* deleteCommetSaga(action) {
  try {

  yield call(api.deletescomment, action.payload.commentId);
  yield put(actions.fetchcomments(action.payload.candateid))

  } catch (error) {
return error

  }
}
function* fetchholidaysaga() {
  try {
  const response = yield call(api.getholiday);
  yield put(actions.setholiday(response))

  } catch (error) {
return error

  }
}
function* addholidaysaga(action) {
  try {

 yield call(api.addholiday, action.payload);
  yield put(actions.fetchholiday())

  } catch (error) {
return error

  }
}
function* deleteHolidaySaga(action) {
  try {

 yield call(api.deleteholiday, action.payload);
 yield put(actions.fetchholiday())
  } catch (error) {
return error

  }
}
function* sendMailSaga(action) {
  try {

    yield call(api.sendcandidatemail, action.payload);

  } catch (error) {
return error

  }
}

function* saveCandidateProfile(action) {
  try {
   yield call(api.updatecandidate, action.payload.data, action.payload.candidateId.candidateId);
   toast.success('Profile Updated!');


  } catch (error) {
    return error
  }
}

function* addasEmployeSaga(action) {
  try {
     yield call(api.addasemployee, action.payload);
   toast.success('Profile Updated!');


  } catch (error) {
    return error
  }
}

function* fetchAlldetailssaga() {
  try {

    const response = yield call(api.titleanddepartment)
    yield put(actions.setalldetails(response))
  }
  catch (error) {
    return error
  }
}
function* fetchfilterattendace(action) {
  const {employeeid, startDate, endDate} = action.payload
  try {

    const response = yield call(api.fileterattendance, employeeid,startDate,endDate)
    var lastAttrTemp = response[response.length - 1];
    var lastAttr = lastAttrTemp?.sessions[lastAttrTemp?.sessions.length - 1];
    var firstAttr = lastAttrTemp?.sessions[0]; 
    const clockType = lastAttr;
    // const firstSessionData = response.map(item => item.sessions[0]);
    yield put(actions.setfilterattendance(response, clockType,firstAttr ))
  }
  catch (error) {
    return error
  }
}

function* logoutsaga() {
  try {

     yield call(logout)
  }
  catch (error) {
    return error
  }
}
function* updatestatussaga(action) {
  const {leaveId,statusId} = action.payload
  try {

    yield call(api.statusupdate, leaveId,statusId)
    yield put(actions.fetchAllEmployeestimeoff())
  }
  catch (error) {
    return error
  }
}
function* importCandidateSaga(action) {
  try {
  yield call(api.importcandidate,  action.payload);
  yield put(actions.fetchCandidate())
  
  } catch (error) {
    return error
    // yield put(uploadImageFailure(error.message));
  }
}
function* importEmpoyeeSaga(action) {
  try {
    yield call(api.importemployee,  action.payload);
  yield put(actions.fetchEmployee())
  
  } catch (error) {
    return error
    // yield put(uploadImageFailure(error.message));
  }
}
function* forgotpasswordsaga(action) {
  try {
   yield call(api.forgotpassword,  action.payload);
   yield call(api.forgotpassword,  action.payload);
  toast.success("Reset link sent to your Email");
  yield put(actions.ForgotPasswordSuccess())
  } catch (error) {
    yield put(actions.ForgotPasswordFailure(error.response.data))
    toast.error(error.response.data);
    // yield put(uploadImageFailure(error.message));
  }
}
function* bulkCvSaga(action) {
  try {
   yield call(api.bulkcv,  action.payload);
  yield put(actions.fetchCandidate())
  
  } catch (error) {
    return error
    // yield put(uploadImageFailure(error.message));
  }
}

function* updateEmployeeSaga(action) {
  const {employeeData, employeeId,page, rowsPerPage}= action.payload
  try {
  const response = yield call(api.epmployeeupdate, employeeData, employeeId);
  toast.success(response);
  yield put(actions.fetchEmployee(page, rowsPerPage))

  
  } catch (error) {
    toast.error(error.response.data);
  }
}

function* assignJobSaga(action) {
  const {candidateId, jobId}= action.payload
  try {
   yield call(api.jobassingn, candidateId, jobId);
  } catch (error) {
  return error
  }
}

function* importAttendanceSaga(action) {
  try {
   yield call(api.attendaceimport,  action.payload);

  // yield put(fetchCandidate())
  
  } catch (error) {
    return error
    // yield put(uploadImageFailure(error.message));
  }
}
function* resetpasswordsaga(action) {
  try {
   yield call(api.resetpassword,  action.payload);
   yield put(actions.ResetPasswordSuccess())
  } catch (error) {
    toast.error(error.response.data);
    yield put(actions.ResetPasswordFailure(error.response.data))
    // yield put(uploadImageFailure(error.message));
  }
}

function* fetchCountrySaga() {
  try {
    const response = yield call(api.getcountry)
    yield put(actions.setCountry(response))
  }
  catch (error) {
    return error
  }
}

function* fetchStageSaga(action) {
  try {

    const response = yield call(api.getstate, action.payload.id|| action.payload)
    yield put(actions.setState(response))
  }
  catch (error) {
    return error
  }
}

function* fetchCitySaga(action) {

  try {

    const response = yield call(api.getcity, action.payload)
    yield put(actions.setCity(response))
  }
  catch (error) {
    return error
  }
}

function* fetchNationalitySaga() {

  try {

    const response = yield call(api.getnationality)
    yield put(actions.setNationality(response))
  }
  catch (error) {
    return error
  }
}
function* fetchSectionsSaga() {

  try {
    const response = yield call(api.fetchSections)
    yield put(actions.setSections(response))
  }
  catch (error) {
    return error
  }
}
function* fetchModuleSaga() {

  try {

    const response = yield call(api.fetchmodule)
    yield put(actions.setModule(response))
  }
  catch (error) {
    return error
  }
}

function* filterEmployeSaga(action) {
 const {page, rowsPerPage, word} = action.payload
  try {
    const response = yield call(api.fileremployee,page, rowsPerPage, word)
    yield put(actions.setEmployee(response))
  }
  catch (error) {
    return error
  }
}

function* activateCompanySaga(action) {
  try {
     yield call(api.loading, action.payload);
      yield put(actions.activateCompanySuccess());
  } catch (error) {
      yield put(actions.activateCompanyFailure(error));
  }
}

function* WorkscheduleSaga() {
   try {
     const response = yield call(api.fetchworkschedule)
     yield put(actions.setWorkschedule(response))
   }
   catch (error) {
     return error
   }
 }
 function* CreatescheduleSaga(action) {
  try {

    yield call(api.createworkschedule,action.payload)
    yield put(actions.fetchWorkschedule())
    // yield put(setWorkschedule(response))
  }
  catch (error) {
    return error
  }
}

function* deletescheduleSaga(action) {
  try {
   const response= yield call(api.deleteworkschedule,action.payload )
    yield put(actions.fetchWorkschedule())
    toast.success(response);

  }
  catch (error) {
    toast.error(error.response.data);
    return error
  }
}
function* updateschedule(action) {
  const {workscheduleid,scheduleData} = action.payload
  try {
    yield call( api.updateworkschedule  ,workscheduleid,scheduleData)
    yield put(actions.fetchWorkschedule())
  }
  catch (error) {
    return error
  }
}
function* OfficeSaga() {
  try {

    const response = yield call(api.fetchoffices)
    yield put(actions.setOffices(response))
  }
  catch (error) {
    return error
  }
}

function* Createoffice(action) {
  try {
   yield call(api.createoffices,action.payload)
    yield put(actions.fetchOffices())
    // yield put(setWorkschedule(response))
  }
  catch (error) {
    return error
  }
}

function* deleteofficeSaga(action) {
  try {
   yield call(api.deleteoffice,action.payload )
    yield put(actions.fetchOffices())
  }
  catch (error) {
    return error
  }
}

function* updateoffice(action) {
  const {officeid,officeData} = action.payload
  try {

   yield call( api.updateoffices,officeid,officeData )
   
  }
  catch (error) {
    return error
  }
}

function* employeeScheduleSaga(action) {
  try {
   const response= yield call(api.getschedulebyemployee, action.payload)
    yield put(actions.setScheduleByEmployee(response))
  }
  catch (error) {
    return error
  }
}

function* updateEmpschedule(action) {
  const payload = JSON.parse(action.payload); // Parse the JSON string
  const { employeeId } = payload; 
  try {

    yield call( api.updateempschedule  ,action.payload)
    yield put(actions.fetchScheduleByEmployee(employeeId))
  }
  catch (error) {
    return error
  }
}

function* employeeOfficeSaga(action) {
  try {

    const response = yield call(api.getofficebyemployee, action.payload)
    yield put(actions.setOfficeByEmployee(response))
  }
  catch (error) {
    return error
  }
}
function* updateEmpoffice(action) {
  const {employeeId,officeId} = action.payload
  try {

    yield call( api.updateempoffice  ,employeeId,officeId)
    yield put(actions.fetchOfficeByEmployee(employeeId))
  }
  catch (error) {
    return error
  }
}

function* allEmploymentSaga() {
  try {

    const response = yield call(api.allemployementtype)
    yield put(actions.setAllEmploymentType(response))
  }
  catch (error) {
    return error
  }
}

function* updateEmployment(action) {
  const {EmployeeId}  = action.payload
  console.log("EmployeeId",EmployeeId)
  try {

  const response =   yield call( api.updateemployementtype  ,action.payload)
  console.log("update employment", response)
    yield put(actions.fetchEmployEmployment(EmployeeId))
  }
  catch (error) {
    return error
  }
}

function* officeIdSaga() {
  try {

  const response =   yield call(api.getofficeId)
  console.log("office id", response)
    yield put(actions.setOfficeId(response))
  }
  catch (error) {
    return error
  }
}

function* EmployeeEmployment(action) {
  try {

  const response =   yield call(api.employeemployment, action.payload)
    yield put(actions.setEmployEmployment(response))
  }
  catch (error) {
    return error
  }
}

function* PolicieSaga() {
  try {

  const response =   yield call(api.getpolicies)
  console.log("getpolicies", response)
    yield put(actions.setPolicies(response))
  }
  catch (error) {
    return error
  }
}

function* CreatePolicieSaga(action) {
  try {

  const response =   yield call(api.createpolicies, action.payload)
  yield put(actions.fetchPolicies())
  toast.success(response);
  console.log("createpolicies", response)
  }
  catch (error) {
    toast.error(error.response.data);
    return error
  }
}

function* CountSaga(action) {
  try {

  const response =   yield call(api.getcount,action.payload)
  console.log("getcount", response)
    yield put(actions.setLeaveCount(response))
  }
  catch (error) {
    return error
  }
}
function* DeletePolicySaga(action) {
  try {

  const response =   yield call(api.deletepolicy,action.payload)
  yield put(actions.fetchPolicies())
  toast.success(response);
  console.log("deletepolicy", response)
    // yield put(actions.setLeaveCount(response))
  }
  catch (error) {























































































































































    
    toast.error(error.response.data);
    return error
  }
}
// Define a Saga function 'watchLoginSaga' responsible for watching login requests.
export function* watchDeletePolicy() {
  yield takeLatest(ActionTypes.POLICIES.DELETE, DeletePolicySaga);
}
export function* watchCount() {
  yield takeLatest(ActionTypes.LEAVE_COUNT.FETCH, CountSaga);
}
export function* watchCreataePolices() {
  yield takeLatest(ActionTypes.POLICIES.CREATE, CreatePolicieSaga);
}
export function* watchPolices() {
  yield takeLatest(ActionTypes.POLICIES.FETCH, PolicieSaga);
}
export function* watchEmployeeEmployment() {
  yield takeLatest(ActionTypes.EMPLOYEE_EMPLOYMENT.FETCH, EmployeeEmployment);
}
export function* watchOfficeId() {
  yield takeLatest(ActionTypes.OFFICE_ID.FETCH, officeIdSaga);
}
export function* watchUpdateEmployment() {
  yield takeLatest(ActionTypes.EMPLOYMENT_TYPE.UPDATE, updateEmployment);
}
export function* watchAllEmployment() {
  yield takeLatest(ActionTypes.EMPLOYMENT_TYPE.FETCH, allEmploymentSaga);
}
export function* updateempofficeSaga() {
  yield takeLatest(ActionTypes.EMPLOYEE_OFFICE.UPDATE, updateEmpoffice);
}
export function* getempofficeSaga() {
  yield takeLatest(ActionTypes.EMPLOYEE_OFFICE.FETCH, employeeOfficeSaga);
}
export function* updateempscheduleSaga() {
  yield takeLatest(ActionTypes.EMPLOYEE_WORKSCHEDULE.UPDATE, updateEmpschedule);
}
export function* getempscheduleSaga() {
  yield takeLatest(ActionTypes.EMPLOYEE_WORKSCHEDULE.FETCH, employeeScheduleSaga);
}
export function* updateOfficeSaga() {
  yield takeLatest(ActionTypes.OFFICES.UPDATE, updateoffice);
}
export function* deleteOfficeSaga() {
  yield takeLatest(ActionTypes.OFFICES.DELETE, deleteofficeSaga);
}
export function* createOfficeSaga() {
  yield takeLatest(ActionTypes.OFFICES.CREATE, Createoffice);
}
export function* fetchOfficeSaga() {
  yield takeLatest(ActionTypes.OFFICES.FETCH, OfficeSaga);
}
export function* updateScheduleSaga() {
  yield takeLatest(ActionTypes.WORKSCHEDULE.UPDATE, updateschedule);
}
export function* deleteworkscheduleSaga() {
  yield takeLatest(ActionTypes.WORKSCHEDULE.DELETE, deletescheduleSaga);
}
export function* createworkscheduleSaga() {
  yield takeLatest(ActionTypes.WORKSCHEDULE.CREATE, CreatescheduleSaga);
}
export function* workscheduleSaga() {
  yield takeLatest(ActionTypes.WORKSCHEDULE.FETCH, WorkscheduleSaga);
}
export function* loadingSaga() {
  yield takeLatest(ActionTypes.ACTIVATE_COMPANY.REQUEST, activateCompanySaga);
}
export function* watchfilteremployee() {
  yield takeLatest(ActionTypes.FILTER.EMPLOYEE, filterEmployeSaga);
}
export function* watchModule() {
  yield takeLatest(ActionTypes.MODULE.FETCH, fetchModuleSaga);
}
export function* watchSections() {
  yield takeLatest(ActionTypes.SECTIONS.FETCH, fetchSectionsSaga);
}
export function* watchNationality() {
  yield takeLatest(ActionTypes.NATIONALITY.FETCH, fetchNationalitySaga);
}
export function* watchCity() {
  yield takeLatest(ActionTypes.CITY.FETCH, fetchCitySaga);
}
export function* watchState() {
  yield takeLatest( ActionTypes.STATE.FETCH, fetchStageSaga);
}
export function* watchCountry() {
  yield takeLatest(ActionTypes.COUNTRY.FETCH, fetchCountrySaga);
}
export function* watchResetPassword() {
  yield takeLatest(ActionTypes.RESET_PASSWORD.REQUEST, resetpasswordsaga);
}
export function* watchForgotPassword() {
  yield takeLatest(ActionTypes.FORGOT_PASSWORD.REQUEST, forgotpasswordsaga);
}
export function* watchImportAttendance() {
  yield takeLatest(ActionTypes.UPLOAD_ATTENDANCE, importAttendanceSaga);
}
export function* watchJobAssing() {
  yield takeLatest(ActionTypes.ASSIGN_JOB, assignJobSaga);
}
export function* watchEmployeupdate() {
  yield takeLatest(ActionTypes.UPDATE_EMPLOYEE, updateEmployeeSaga);
}
export function* watchBulkCv() {
  yield takeLatest( ActionTypes.UPLOAD_BULK_CV, bulkCvSaga);
}
export function* watchEmployeCandidate() {
  yield takeLatest(ActionTypes.IMPORT_EMPLOYEE, importEmpoyeeSaga);
}
export function* watchImportCandidate() {
  yield takeLatest(ActionTypes.IMPORT_CANDIDATE, importCandidateSaga);
}
export function* watchLogout() {
  yield takeLatest(ActionTypes.LOGOUT_SUCCESS, logoutsaga);
}
export function* watchUpdatestatus() {
  yield takeLatest(ActionTypes.UPDDATE_TIMEOFF_STATUS, updatestatussaga);
}
export function* watchFilterattendance() {
  yield takeLatest(ActionTypes.ATTENDANCE_FILTER, fetchfilterattendace);
}
export function* watchAlldetails() {
  yield takeLatest(ActionTypes.ALL_DETAILS.FETCH, fetchAlldetailssaga);
}
export function* watchAddasEmploye() {
  yield takeLatest(ActionTypes.ADD_AS_EMPLOYEE, addasEmployeSaga);
}
export function* watchSaveCandidateProfile() {
  yield takeLatest(ActionTypes.SAVE_CANDIDATE_PROFILE_REQUEST, saveCandidateProfile);
}
export function* watchSendMail() {
  yield takeLatest(ActionTypes.SEND_EMAIL_REQUEST, sendMailSaga);
}
export function* watchDeleteHoliday() {
  yield takeLatest(ActionTypes.HOLIDAY.DELETE, deleteHolidaySaga);
}
export function* watchAddHoliday() {
  yield takeLatest(ActionTypes.HOLIDAY.ADD, addholidaysaga);
}
export function* watchHoliday() {
  yield takeLatest(ActionTypes.HOLIDAY.FETCH, fetchholidaysaga);
}
export function* watchDeleteComment() {
  yield takeLatest(ActionTypes.COMMENTS.DELETE, deleteCommetSaga);
}
export function* watchPostComment() {
  yield takeLatest(ActionTypes.COMMENTS.POST, postCommetSaga);
}
export function* watchComments() {
  yield takeLatest(ActionTypes.COMMENTS.FETCH, fetchCommentsSaga);
}
export function* watchTemplateBody() {
  yield takeLatest(ActionTypes.TEMPLATE_BODY.FETCH, fetchTemplateBody);
}
export function* watchCandidateProfile() {
  yield takeLatest(ActionTypes.CANDIDATE_PROFILE.FETCH, fetchCandidateProfile);
}
export function* watchDeleteCandidate() {
  yield takeLatest(ActionTypes.CANDIDATE.DELETE, DeleteCandidateSaga);
}
export function* watchDeleteJob() {
  yield takeLatest(ActionTypes.JOBS.DELETE, DeleteJobs);
}
export function* watchDeleteTemplate() {
  yield takeLatest(ActionTypes.TEMPLATE.DELETE, DeleteTemplate);
}
export function* watchUpdateTemplateDetail() {
  yield takeLatest(ActionTypes.TEMPLATE_DETAILS.UPDATE_REQUEST, updateTemplateDetailsaga);
}
export function* watchAddTemplateDetail() {
  yield takeLatest(ActionTypes.TEMPLATE_DETAILS.FETCH, fetchTemplateDetailsaga);
}
export function* watchAddTemplate() {
  yield takeLatest( ActionTypes.TEMPLATE.ADD_REQUEST, addTemplate);
}
export function* watchtemplate() {
  yield takeLatest(ActionTypes.TEMPLATE.FETCH, fetchTemplatesaga);
}
export function* watchupdatestage() {
  yield takeLatest(ActionTypes.STAGES.UPDATE, updateStageSaga);
}
export function* watchJobDetails() {
  yield takeLatest(ActionTypes.JOB_DETAILS.FETCH, fetchJobDetailsaga);
}
export function* watchDeleteStages() {
  yield takeLatest(ActionTypes.STAGES.DELETE, DeleteStageSaga);
}
export function* watchCreateStages() {
  yield takeLatest(ActionTypes.STAGES.CREATE, createStageSaga);
}
export function* watchStages() {
  yield takeLatest(ActionTypes.STAGES.FETCH, fetchStagesaga);
}
export function* watchAddCandidate() {
  yield takeLatest(ActionTypes.ADD_CANDIDATE.REQUEST, createCandidateSaga);
}
export function* watchCandidate() {
  yield takeLatest(ActionTypes.CANDIDATE.FETCH, fetchCandidatesaga);
}
export function* watchCreateJobs() {
  yield takeLatest(ActionTypes.JOBS.CREATE, createJobsSaga);
}
export function* watchJobs() {
  yield takeLatest(ActionTypes.JOBS.FETCH, fetchJobsaga);
}
export function* watchDeleteFolderFiles() {
  yield takeLatest(ActionTypes.UPLOAD_FILES.DELETE_FOLDER_FILE, DeleteFolderfilesSaga);
}
export function* watchDeleteFolder() {
  yield takeLatest(ActionTypes.UPLOAD_FILES.DELETE_FOLDER, DeleteFolderSaga);
}
export function* watchFilesSaga() {
  yield takeLatest(ActionTypes.UPLOAD_FILES.REQUEST, uploadFilesSaga);
}
export function* watchDocumentsData() {
  yield takeLatest(ActionTypes.DOCUMENTS.FETCH_DATA, fetchDocumentdataSaga);
}
export function* watchDocumentsDetail() {
  yield takeLatest(ActionTypes.DOCUMENTS.FETCH_DETAILS, fetchDocumentdetailsSaga);
}
export function* watchCreateDocuments() {
  yield takeLatest(ActionTypes.DOCUMENTS.REQUEST, creatDocumentSaga);
}
export function* watchDocuments() {
  yield takeLatest(ActionTypes.DOCUMENTS.FETCH, fetchDocumentSaga);
}
function* watchDeleteNews() {
  yield takeLatest(ActionTypes.NEWS.DELETE, DeleteNewsSaga);
}
function* watchSaveNews() {
  yield takeLatest(ActionTypes.NEWS.REQUEST, NewsSaga);
}
export function* watchNews() {
  yield takeLatest(ActionTypes.NEWS.FETCH, fetchNewsSaga);
}
export function* watchFetchFeatures() {
  yield takeLatest(ActionTypes.FEATURES.FETCH, fetchfeaturesaga);
}
export function* watchFeaturesUpdate() {
  yield takeLatest(ActionTypes.FEATURES.UPDATE, feautresUpdateSaga);
}
export function* watchFetchQr() {
  yield takeLatest(ActionTypes.QR_CODE.FETCH, fetchqrcodesaga);
}
export function* watchCreateQr() {
  yield takeLatest(ActionTypes.QR_CODE_CREATE, createqrcodesaga);
}
export function* watchUploadImage() {
  yield takeLatest(ActionTypes.UPLOAD_IMAGE.REQUEST, uploadImageSaga);
}
export function* watchProfilepic() {
  yield takeLatest(ActionTypes.PROFILE_PICTURE.FETCH, fetchProfilePicsaga);
}
export function* watchEmployeAttendance() {
  yield takeLatest(ActionTypes.EMPLOYEE_ATTENDANCE.FETCH, fetchEmpAttendance);
}
export function* watchAttendanceSummary() {
  yield takeLatest(ActionTypes.ATTENDANCE_SUMMARY.FETCH, fetchAttendancesummary);
}
export function* watchclockOut() {
  yield takeLatest(ActionTypes.CLOCK.OUT_REQUEST, clockOut);
}
export function* watchclockin() {
  yield takeLatest(ActionTypes.CLOCK.IN_REQUEST, clockIn);
}
export function* watchmyattendance() {
  yield takeLatest(ActionTypes.MY_ATTENDANCE.FETCH, fetchMyAttendancesaga);
}
export function* watchSignup() {
  yield takeLatest(ActionTypes.SIGNUP.REQUEST, signupSaga);
}
export function* watchEmpoyessTimeOff() {
  yield takeLatest(ActionTypes.ALL_EMPLOYEES_TIME_OFF.FETCH, fetchAllEmployeeTimeoffsaga);
}
export function* watchRequestTimeoff() {
  yield takeLatest(ActionTypes.CREATE_TIME_OFF_REQUEST, createTimeoffSaga);
}
function* watchEmployeeTimeoffSaga() {
  yield takeLatest(ActionTypes.EMPLOYEE_TIME_OFF.FETCH, fetchEmployeeTimeoffsaga);
}
function* watchEmployeeDeleteSaga() {
  yield takeLatest(ActionTypes.EMPLOYEE.DELETE, deleteEmployeesaga);
}
export function* watchCreateEmployee() {
  yield takeLatest( ActionTypes.EMPLOYEE.CREATE_REQUEST, createEmployeeSaga);
}
function* watchEmployeeSaga() {
  yield takeLatest(ActionTypes.EMPLOYEE.FETCH, fetchEmployeesaga);
}
export function* watchUpdateBank() {
  yield takeLatest( ActionTypes.BANK_INFORMATION.UPDATE_REQUEST, updateBankInfoSaga);
}
function* watchBankInfoSaga() {
  yield takeLatest(ActionTypes.BANK_INFORMATION.FETCH, fetchBankInfosaga);
}
export function* watchUpdateEmergency() {
  yield takeLatest(ActionTypes.EMERGENCY_CONTACT.UPDATE_REQUEST, updateEmergencySaga);
}
function* watchEmergencyContactSaga() {
  yield takeLatest(ActionTypes.EMERGENCY_CONTACT.FETCH, fetchEmergencyContactsaga);
}
export function* watchUpdateAddress() {
  yield takeLatest(ActionTypes.UPDATE_ADDRESS_REQUEST, updateAddressSaga);
}
export function* watchUpdateProfile() {
  yield takeLatest(ActionTypes.UPDATE_PROFILE_REQUEST, updateProfileSaga);
}
function* watchMyAddressaSaga() {
  yield takeLatest(ActionTypes.MY_ADDRESS.FETCH, fetchMyAddresssaga);
}
function* watchMyProfileSaga() {
  yield takeLatest(ActionTypes.MY_PROFILE.FETCH, fetchMyProfilesaga);
}
function* watchLoginSaga() {
  yield takeLatest(ActionTypes.LOGIN.REQUEST, loginSaga);
}
function* watchFetchRoleSaga() {
  yield takeLatest(ActionTypes.ROLES.FETCH, fetchRole)
}
function* watchPermissionByRoleSaga() {
  yield takeLatest(ActionTypes.PERMISSIONS_BY_ROLE.FETCH, fetchPermission);
}

function* watchEditPermissionByRole() {
  yield takeLatest(ActionTypes.EDIT_PERMISSIONS_REQUEST, edipermission);
}
export function* watchCreateRoleWithPermissions() {
  yield takeLatest(ActionTypes.CREATE_ROLE_WITH_PERMISSIONS.REQUEST, createRoleWithPermissions);
}
// Define the root Saga that combines all other Sagas.
export default function* rootSaga() {
  yield all([
    watchLoginSaga(),
    watchFetchRoleSaga(),
    watchCreateRoleWithPermissions(),
    watchPermissionByRoleSaga(),
    watchEditPermissionByRole(),
    watchMyProfileSaga(),
    watchMyAddressaSaga(),
    watchUpdateProfile(),
    watchUpdateAddress(),
    watchEmergencyContactSaga(),
    watchUpdateEmergency(),
    watchBankInfoSaga(),
    watchUpdateBank(),
    watchEmployeeSaga(),
    watchCreateEmployee(),
    watchEmployeeDeleteSaga(),
    watchEmployeeTimeoffSaga(),
    watchRequestTimeoff(),
    watchEmpoyessTimeOff(),
    watchSignup(),
    watchmyattendance(),
    watchclockin(),
    watchclockOut(),
    watchAttendanceSummary(),
    watchEmployeAttendance(),
    watchProfilepic(),
    watchUploadImage(),
    watchCreateQr(),
    watchFetchQr(),
    watchFeaturesUpdate(),
    watchFetchFeatures(),
    watchNews(),
    watchSaveNews(),
    watchDeleteNews(),
    watchDocuments(),
    watchCreateDocuments(),
    watchDocumentsDetail(),
    watchDocumentsData(),
    watchFilesSaga(),
    watchDeleteFolder(),
    watchDeleteFolderFiles(),
    watchJobs(),
    watchCreateJobs(),
    watchCandidate(),
    watchAddCandidate(),
    watchStages(),
    watchCreateStages(),
    watchDeleteStages(),
    watchJobDetails(),
    watchupdatestage(),
    watchtemplate(),
    watchAddTemplate(),
    watchAddTemplateDetail(),        
    watchUpdateTemplateDetail(),
    watchDeleteTemplate(),
    watchDeleteJob(),
    watchDeleteCandidate(),
    watchCandidateProfile(),
    watchTemplateBody(),
    watchComments(),
    watchPostComment(),
    watchDeleteComment(),
    watchHoliday(),
    watchAddHoliday(),
    watchDeleteHoliday(),
    watchSendMail(),
    watchSaveCandidateProfile(),
    watchAddasEmploye(),
    watchAlldetails(),
    watchFilterattendance(),
    watchUpdatestatus(),
    watchLogout(),
    watchImportCandidate(),
    watchEmployeCandidate(),
    watchBulkCv(),
    watchEmployeupdate(),
    watchJobAssing(),
    watchImportAttendance(),
    watchForgotPassword(),
    watchResetPassword(),
    watchCountry(),
    watchState(),
    watchCity(),
    watchNationality(),
    watchSections(),
    watchModule(),
    watchfilteremployee(),
    loadingSaga(),
    workscheduleSaga(),
    createworkscheduleSaga(),
    deleteworkscheduleSaga(),
    fetchOfficeSaga(),
    createOfficeSaga(),
    deleteOfficeSaga(),
    updateOfficeSaga(),
    updateScheduleSaga(),
    getempscheduleSaga(),
    updateempscheduleSaga(),
    getempofficeSaga(),
    updateempofficeSaga(),
    watchAllEmployment(),
    watchUpdateEmployment(),
    watchOfficeId(),
    watchEmployeeEmployment(),
    watchPolices(),
    watchCreataePolices(),
    watchCount(),
    watchDeletePolicy()          
  ]);
}