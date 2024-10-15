// Import necessary modules from Redux
import { combineReducers } from 'redux';

// Import reducers from the 'customizationReducer' file
import { authReducer,userReducer, fetchRole,setRole, createRoleWithPermissionsReducer,fetchPermissionByRole , setRoleByPermission, editpermissionsReducer, setMyProfileReducer, setMyAddressReducer, updatePersonalInfoReducer,updateAddressInfoReducer, setEmergencyContactReducer, setBankInfoReducer, updateBankReducer, fetchEmployeeReducer, createEmployeeReducer, deleteEmployeeReducer , fetchEmployeetimeoffReducer, fetchAllEmployeetimeoffReducer , signupReducer, fetchMyAttendanceReducer, clockReducer, fetchAttendanceSummaryReducer, fetchEmpAttendanceReducer,resetState,fetchProfilePicReducer,qrcodereducer,featuresfetchReducer, fetchNewsReducer,fetchDocumentsReducer,fetchDocumentDetailReducer,fetchDocumentDataReducer,fetchJobsReducer,fetchCandidateReducer,fetchStagesReducer,fetchJobDetails,fetchTemplate,fetchTemplateDetail,fetchCandidateProfile,fetchTemplatebody,fetchComments,fetchHoliday,fetchalldetail,filterattendace,forgotpassword,resetPassword,fetchCountry,fetchState,fetchCity,fetchNationatliy,setSections,setModule,loadingReducer,setWorkschedule,setOffices,setSchedulebyemploye,setOfficebyemploye,AllEmployementType,OfficeId,employeEmployment,policies,remainingCount} from './customizationReducer';
// reducer import
import customizationReducer from './customizationReducer';

// ==============================|| COMBINE REDUCER ||============================== //


// Combine multiple reducers into a single root reducer using 'combineReducers'.
const reducer = combineReducers({
  customization: customizationReducer,
  authReducer:authReducer,
  userReducer:userReducer,
  fetchRole:fetchRole,
  setRole:setRole,
  createRoleWithPermissionsReducer:createRoleWithPermissionsReducer,
  fetchPermissionByRole:fetchPermissionByRole,
  setRoleByPermission:setRoleByPermission,
  editpermissionsReducer:editpermissionsReducer,
  setMyProfileReducer:setMyProfileReducer,
  setMyAddressReducer:setMyAddressReducer,
  updatePersonalInfoReducer:updatePersonalInfoReducer,
  updateAddressInfoReducer: updateAddressInfoReducer,
  setEmergencyContactReducer:setEmergencyContactReducer,
  setBankInfoReducer:setBankInfoReducer,
  updateBankReducer:updateBankReducer,
  fetchEmployeeReducer:fetchEmployeeReducer,
  createEmployeeReducer:createEmployeeReducer,
  deleteEmployeeReducer:deleteEmployeeReducer,
  fetchEmployeetimeoffReducer:fetchEmployeetimeoffReducer,
  fetchAllEmployeetimeoffReducer:fetchAllEmployeetimeoffReducer,
  signupReducer:signupReducer,
  fetchMyAttendanceReducer:fetchMyAttendanceReducer,
  clockReducer:clockReducer,
  fetchAttendanceSummaryReducer:fetchAttendanceSummaryReducer,
  fetchEmpAttendanceReducer:fetchEmpAttendanceReducer,
  resetState:resetState,
  fetchProfilePicReducer:fetchProfilePicReducer,
  qrcodereducer:qrcodereducer,
  featuresfetchReducer:featuresfetchReducer,
  fetchNewsReducer:fetchNewsReducer,
  fetchDocumentsReducer:fetchDocumentsReducer,
  fetchDocumentDetailReducer:fetchDocumentDetailReducer,
  fetchDocumentDataReducer:fetchDocumentDataReducer,
  fetchJobsReducer:fetchJobsReducer,
  fetchCandidateReducer:fetchCandidateReducer,
  fetchStagesReducer:fetchStagesReducer,
  fetchJobDetails:fetchJobDetails,
  fetchTemplate:fetchTemplate,
  fetchTemplateDetail:fetchTemplateDetail,
  fetchCandidateProfile:fetchCandidateProfile,
  fetchTemplatebody:fetchTemplatebody,
  fetchComments:fetchComments,
  fetchHoliday:fetchHoliday,
  fetchalldetail:fetchalldetail,
  filterattendace:filterattendace,
  forgotpassword:forgotpassword,
  resetPassword:resetPassword,
  fetchCountry:fetchCountry,
  fetchState:fetchState,
  fetchCity:fetchCity,
  fetchNationatliy:fetchNationatliy,
  setSections:setSections,
  setModule:setModule,
  loadingReducer:loadingReducer,
  setWorkschedule:setWorkschedule,
  setOffices:setOffices,
  setSchedulebyemploye:setSchedulebyemploye,
  setOfficebyemploye:setOfficebyemploye,
  AllEmployementType:AllEmployementType,
  OfficeId:OfficeId,
  employeEmployment:employeEmployment,
  policies:policies,
  remainingCount:remainingCount
});

export default reducer;
