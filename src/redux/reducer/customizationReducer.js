// project imports
import config from 'config';
// action - state management
import * as actionTypes from '../action/actions';
import ActionTypes from 'redux/constant/constant';
export const initialState = {
  isOpen: [], // for active default menu
  defaultId: 'default',
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
  user: null,
  loading: false,
  fetchPermission: {},
  myattendance:[], 
  clockedIn:false,
  calculation:{},
  empattendance : [],
  error: null,
  profilepic :{},
  imageUrl: null,
  qrcode : {},
  qrimage : {},
  features : {},
  featurefectch : {},
  isAuthenticated: false,
  news : [],
  createnews : [],
  document : [],
  createdocument:[],
  documentdetail : [],
  documentdata : null,
  files : null,
  jobs:[],
  createjobs : [],
  candidate : [],
  stages : [],
  createstage : [],
  jobdetail : [],
  updatestage:{},
  template:[],
  templatedetail:{},
  candidateprofile :{},
  templatebody :{},
  Comment :[],
  postComment : {},
  holiday:[],
  job_designation :[],
  filterattendance:[],
  forgoterror: null,
  forgotsuccess:false,
  Authenticate: false,
  country : [],
  state : [],
  city :[],
  nationality :[],
  sections : [],
  module:[],
  filteremployee:[],
  workschedule:[],
  offices:[],
  empworkschedule:[],
  empoffice:[],
  isclockIn: false,
  firstSessionData:[],
  allemployement:[],
  OfficeId:{},
  empEmployment:null,
  policie:[],
  count:null
};
const feature = {
  featurefectch : {}
}

// Initialize the user data for response of login
const userData = {
  id: null,
  token: null,
  roleId: null,
  role: null,
  roleName: null,
  permissions: []
};
const getRole = {
  role: {},
  setrole: null
}
const set_role = {
  data: []
}
const createnewrole = {
  loading: false,
}
const setpermissionrole = {
  permissionbyrole: []
}
const editrolepermission = {
  loading: false,
  error: null,
};
const myprofile = {
  data: null
}
const updateprofile = {
  data: null
}
const updateaddress = {
  data: null
}
const updatemergency = {
  data: null
}
const updatebank = {
  data: null,
  success:false,
  error:null
}
const employee = {
  data: []
}
const employeetimeoff = {
  data: []
}

// const myattendance = {
//   data: []
// }
const signup = {
  loading: false,
  error: null,
  success: false,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //
// Define the customizationReducer function, which manages state related to customization.
export default function customizationReducer(state = initialState, action) {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      return {
        ...state,
        isOpen: [id]
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened
      };
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily
      };
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius
      };
    default:
      return state;
  }
}
// Define the authReducer function to manage Login-related state.
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN.REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.LOGIN.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: true
      };
      case ActionTypes.LOGIN.FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload, // Set the error on login failure
        };
    default:
      return state;
  }
}
// Define the userReducer function to manage login response like token , roleID, role.
export const userReducer = (state = userData, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN.SET_USER_DATA:
      return {
        ...state,
        token: action.payload.token,
        roleId: action.payload.roleId,
        roleName: action.payload.roleName,
        permissions: action.payload.permissions,
        id: action.payload.id,
        companyid :action.payload.companyId,
        modulepermission :action.payload.modulePermissions,
        isPasswordGenerated:action.payload.isPasswordGenerated,
        resetToken:action.payload.resetToken,
        officeid:action.payload.officeid,


      };
    default:
      return state;
  }
};
export const fetchRole = (state = getRole, action) => {

  switch (action.type) {
    case ActionTypes.ROLES.FETCH:
      return {
        ...state,
      };
    default:
      return state;
  }
}
export const setRole = (state = set_role, action) => {

  switch (action.type) {
    case ActionTypes.ROLES.SET:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
export const createRoleWithPermissionsReducer = (state = createnewrole, action) => {

  switch (action.type) {
    case ActionTypes.CREATE_ROLE_WITH_PERMISSIONS.REQUEST:
      return {
        ...state,
        loading: true,
      };
      case ActionTypes.CREATE_ROLE_WITH_PERMISSIONS.SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case ActionTypes.CREATE_ROLE_WITH_PERMISSIONS.FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
};
export const fetchPermissionByRole = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.PERMISSIONS_BY_ROLE.FETCH:
      return {
        ...state,
        fetchPermission: action.payload
      };


    default:
      return state;
  }
}
export const setRoleByPermission = (state = setpermissionrole, action) => {

  switch (action.type) {
    case ActionTypes.PERMISSIONS_BY_ROLE.SET:
      return {
        ...state,
        permissionbyrole: action.payload
      }

    default:
      return state;
  }
};
export const editpermissionsReducer = (state = editrolepermission, action) => {
  switch (action.type) {
    case ActionTypes.EDIT_PERMISSIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export const fetchMyProfileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.MY_PROFILE.FETCH:
      return {
        ...state,
      };
    default:
      return state;
  }
}
export const setMyProfileReducer = (state = myprofile, action) => {

  switch (action.type) {
    case ActionTypes.MY_PROFILE.SET:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
export const fetchMyAddressReducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.MY_ADDRESS.FETCH:
      return {
        ...state,
      };
    default:
      return state;
  }
}
export const setMyAddressReducer = (state = myprofile, action) => {

  switch (action.type) {
    case ActionTypes.MY_ADDRESS.SET:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export const updatePersonalInfoReducer = (state = updateprofile, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;

  }
}
export const updateAddressInfoReducer = (state = updateaddress, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_ADDRESS_REQUEST:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;

  }
}
export const fetchEmergencyContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.EMERGENCY_CONTACT.FETCH:
      return {
        ...state,
      };
    default:
      return state;
  }
}
export const setEmergencyContactReducer = (state = myprofile, action) => {
  switch (action.type) {
    case ActionTypes.EMERGENCY_CONTACT.SET:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
export const updateEmergecnyReducer = (state = updatemergency, action) => {
  switch (action.type) {
    case ActionTypes.EMERGENCY_CONTACT.UPDATE_REQUEST:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;

  }
}

export const fetchBankInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.BANK_INFORMATION.FETCH:
      return {
        ...state,
      };
    default:
      return state;
  }
}
export const setBankInfoReducer = (state = myprofile, action) => {

  switch (action.type) {
    case ActionTypes.BANK_INFORMATION.SET:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export const updateBankReducer = (state = updatebank, action) => {
  switch (action.type) {
    case ActionTypes.BANK_INFORMATION.UPDATE_REQUEST:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;

  }
}
export const fetchEmployeeReducer = (state = employee, action) => {
  switch (action.type) {
    case ActionTypes.EMPLOYEE.FETCH:
      return {
        ...state,
        data: null
      };
    case ActionTypes.EMPLOYEE.SET:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
export const createEmployeeReducer = (state = updatebank, action) => {
  switch (action.type) {
    case ActionTypes.EMPLOYEE.CREATE_REQUEST:
      return {
        ...state,
        data: action.payload,
        success:false
      };
      case  ActionTypes.EMPLOYEE.CREATE_SUCCESS:
        return {
          ...state,
          data: action.payload,
          success:true
        };
        case ActionTypes.EMPLOYEE.CREATE_FAILURE:
          return {
            ...state,
            error: action.payload,
            success:false
          };
          case ActionTypes.EMPLOYEE.CREATE_RESET:
            return {
              ...state,
              error: null,
              success:false
            };
    default:
      return state;

  }
}
export const deleteEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.EMPLOYEE.DELETE:
      return {
        ...state,
      };
    default:
      return state;

  }
}
export const fetchEmployeetimeoffReducer = (state = employeetimeoff, action) => {
  switch (action.type) {
    case ActionTypes.EMPLOYEE_TIME_OFF.FETCH:
      return {
        ...state,
        data: null
      };
    case ActionTypes.EMPLOYEE_TIME_OFF.SET:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

export const createTimeoffReducer = (state = updatebank, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_TIME_OFF_REQUEST:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;

  }
}

export const fetchAllEmployeetimeoffReducer = (state = employeetimeoff, action) => {
  switch (action.type) {
    case ActionTypes.ALL_EMPLOYEES_TIME_OFF.FETCH:
      return {
        ...state,
        data: null
      };
    case ActionTypes.ALL_EMPLOYEES_TIME_OFF.SET:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
export  const signupReducer = (state = signup, action) => {
  switch (action.type) {
    case ActionTypes.SIGNUP.REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case ActionTypes.SIGNUP.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };

    case ActionTypes.SIGNUP.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Set the error message from the API response
        success: false,
      };
      case ActionTypes.SIGNUP.RESET:
      return {
        ...state,
        success: false,
        error:null
      };
    default:
      return state;
  }
};
export const fetchMyAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MY_ATTENDANCE.FETCH:
      return {
        ...state,
        myattendance: null
      };
    case ActionTypes.MY_ATTENDANCE.SET:
      return {
        ...state,
        myattendance: action.payload
      };
    default:
      return state;
  }
}

export const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLOCK.IN_REQUEST:
      return {
        ...state,
        clockedIn: true,
      };

    case ActionTypes.CLOCK.OUT_REQUEST:
      return {
        ...state,
        clockedIn: false,
      };

    default:
      return state;
  }
};

export const fetchAttendanceSummaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ATTENDANCE_SUMMARY.FETCH:
      return {
        ...state,
        calculation: null
      };
    case ActionTypes.ATTENDANCE_SUMMARY.SET:
      return {
        ...state,
        calculation: action.payload
      };
    default:
      return state;
  }
}
export const fetchEmpAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.EMPLOYEE_ATTENDANCE.FETCH:
      return {
        ...state,
        empattendance: null
      };
    case ActionTypes.EMPLOYEE_ATTENDANCE.SET:
      return {
        ...state,
        empattendance: action.payload
      };
    default:
      return state;
  }
}

export const resetState = (state = initialState , action) =>{
   switch(action.type){
    case ActionTypes.RESET_STATE :
      return {
        isAuthenticated: false,
      };


      default:
        return state;
   }
    

} 

export const fetchProfilePicReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PROFILE_PICTURE.FETCH:
      return {
        ...state,
        profilepic: null
      };
    case ActionTypes.PROFILE_PICTURE.SET:
      return {
        ...state,
        profilepic: action.payload
      };
    default:
      return state;
  }
}

export const profilereducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPLOAD_IMAGE.SUCCESS:
      return {
        ...state,
        imageUrl: action.payload,
      };
    case  ActionTypes.UPLOAD_IMAGE.FAILURE:
      return {
        ...state,
        imageUrl: null,
      };
    default:
      return state;
  }
};

export const qrcodereducer = (state = initialState, action) => {
  switch (action.type) {
    case  ActionTypes.QR_CODE_CREATE:
      return {
        ...state,
        qrcode: action.payload,
      };
      case ActionTypes.QR_CODE.FETCH:
        return {
          ...state,
         qrimage: null,
        };
        case ActionTypes.QR_CODE.SET:
          return {
            ...state,
          qrimage: action.payload,
          };
    default:
      return state;
  }
};

export const featuresUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FEATURES.UPDATE:
      return {
        ...state,
        features: action.payload
      };
    default:
      return state;

  }
}
export const featuresfetchReducer = (state = feature, action) => {
  switch (action.type) {
      case ActionTypes.FEATURES.FETCH:
      return {
        ...state,
        featurefectch: null
      };
      case ActionTypes.FEATURES.SET:
      return {
        ...state,
        featurefectch: action.payload
      };
    default:
      return state;

  }
}

export const fetchNewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.NEWS.FETCH:
      return {
        ...state,
        news: null
      };
    case ActionTypes.NEWS.SET:
      return {
        ...state,
        news: action.payload
      };
      case ActionTypes.NEWS.DELETE:
        return {
          ...state,
        };
    default:
      return state;
  }
}

export const createnewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case  ActionTypes.NEWS.REQUEST:
      return {
        ...state,
        createnews: action.payload
      };

    default:
      return state;
  }
};

export const fetchDocumentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DOCUMENTS.FETCH:
      return {
        ...state,
        document: null
      };
    case ActionTypes.DOCUMENTS.SET:
      return {
        ...state,
        document: action.payload
      };

    default:
      return state;
  }
}
export const createDocumentReducer = (state = initialState, action) => {
  switch (action.type) {
    case  ActionTypes.DOCUMENTS.REQUEST:
      return {
        ...state,
        createdocument: action.payload
      };

    default:
      return state;
  }
};
export const fetchDocumentDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DOCUMENTS.FETCH_DETAILS:
      return {
        ...state,
        documentdetail: null
      };
    case ActionTypes.DOCUMENTS.SET_DETAILS:
      return {
        ...state,
        documentdetail: action.payload
      };
      case ActionTypes.UPLOAD_FILES.DELETE_FOLDER_FILE:
        return {
          ...state,
        };

    default:
      return state;
  }
}
export const fetchDocumentDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DOCUMENTS.FETCH_DATA:
      return {
        ...state,
        documentdata: null
      };
    case ActionTypes.DOCUMENTS.SET_DATA:
      return {
        ...state,
        documentdata: action.payload
      };
      case ActionTypes.UPLOAD_FILES.DELETE_FOLDER:
        return {
          ...state,
        };
    default:
      return state;
  }
}

export const filesreducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPLOAD_FILES.SUCCESS:
      return {
        ...state,
        files: action.payload,
      };
    case ActionTypes.UPLOAD_FILES.FAILURE:
      return {
        ...state,
        files: null,
      };
    default:
      return state;
  }
};

export const fetchJobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.JOBS.FETCH:
      return {
        ...state,
        jobs: null
      };
    case ActionTypes.JOBS.SET:
      return {
        ...state,
        jobs: action.payload
      };
      case  ActionTypes.STAGES.DELETE:
        return {
          ...state,
        };
        case ActionTypes.JOBS.DELETE:
        return {
          ...state,
        };
    default:
      return state;
  }
}
export const createJobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.JOBS.CREATE:
      return {
        ...state,
        createjobs: action.payload
      };
    default:
      return state;
  }
}

export const fetchCandidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CANDIDATE.FETCH:
      return {
        ...state,
        candidate: null
      };
    case ActionTypes.CANDIDATE.SET:
      return {
        ...state,
        candidate: action.payload
      };
      case ActionTypes.CANDIDATE.DELETE:
        return {
          ...state,
        };
    default:
      return state;
  }
}

export const fetchStagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STAGES.FETCH:
      return {
        ...state,
        stages: null
      };
    case ActionTypes.STAGES.SET:
      return {
        ...state,
        stages: action.payload
      };
    default:
      return state;
  }
}
export const createStageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STAGES.CREATE:
      return {
        ...state,
        createstage: action.payload
      };
    default:
      return state;
  }
}

export const fetchJobDetails = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.JOB_DETAILS.FETCH:
      return {
        ...state,
        jobdetail: null
      };
    case ActionTypes.JOB_DETAILS.SET:
      return {
        ...state,
        jobdetail: action.payload
      };
    default:
      return state;
  }
}

export const updateStageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STAGES.UPDATE:
      return {
        ...state,
        updatestage: action.payload
      };
    default:
      return state;
  }
}

export const fetchTemplate = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TEMPLATE.FETCH:
      return {
        ...state,
        template: null
      };
    case ActionTypes.TEMPLATE.SET:
      return {
        ...state,
        template: action.payload
      };
      case ActionTypes.TEMPLATE.DELETE:
        return {
          ...state,
        };
    default:
      return state;
  }
}

export const fetchTemplateDetail = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TEMPLATE_DETAILS.FETCH:
      return {
        ...state,
        templatedetail: null
      };
    case ActionTypes.TEMPLATE_DETAILS.SET:
      return {
        ...state,
        templatedetail: action.payload
      };
    default:
      return state;
  }
}

export const fetchCandidateProfile= (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CANDIDATE_PROFILE.FETCH:
      return {
        ...state,
        candidateprofile: null
      };
    case ActionTypes.CANDIDATE_PROFILE.SET:
      return {
        ...state,
        candidateprofile: action.payload
      };
    default:
      return state;
  }
}

export const fetchTemplatebody= (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TEMPLATE_BODY.FETCH:
      return {
        ...state,
        templatebody: null
      };
    case ActionTypes.TEMPLATE_BODY.SET:
      return {
        ...state,
        templatebody: action.payload
      };
    default:
      return state;
  }
}
export const fetchComments= (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.COMMENTS.FETCH:
      return {
        ...state,
        Comment: null
      };
    case ActionTypes.COMMENTS.SET:
      return {
        ...state,
        Comment: action.payload
      };
      case ActionTypes.COMMENTS.DELETE:
        return {
          ...state,
        };
    default:
      return state;
  }
}
export const postComments= (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.COMMENTS.POST:
      return {
        ...state,
        postComment: action.payload
      };
     
    default:
      return state;
  }
}
export const fetchHoliday= (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.HOLIDAY.FETCH:
      return {
        ...state,
        holiday: null
      };
    case ActionTypes.HOLIDAY.SET:
      return {
        ...state,
        holiday: action.payload
      };
      case ActionTypes.HOLIDAY.ADD:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export const fetchalldetail = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ALL_DETAILS.FETCH:
      return {
        ...state,
        job_designation: null
      };
    case ActionTypes.ALL_DETAILS.SET:
      return {
        ...state,
        job_designation: action.payload
      };
    default:
      return state;
  }
}

export const filterattendace = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ATTENDANCE_FILTER:
      return {
        ...state,
        filterattendance: null
      };
    case ActionTypes.SET_ATTENDANCE_FILTER:
      return {
        ...state,
        filterattendance: action.payload.data,
        isClockIn : action.payload.clockType,
        firstSessionData:action.payload.firstSessionData 
      };
    default:
      return state;
  }
}
export const forgotpassword = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FORGOT_PASSWORD.REQUEST:
      return {
        ...state,
        forgotsuccess: true,
        forgoterror:null
      };
      case ActionTypes.FORGOT_PASSWORD.SUCCESS:
        return {
          ...state,
          forgotsuccess: false,
          forgoterror:null
        };
    case ActionTypes.FORGOT_PASSWORD.FAILURE:
      return {
        ...state,
        forgoterror: action.payload
      };
    default:
      return state;
  }
}

export const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RESET_PASSWORD.REQUEST:
      return {
        ...state,
        loading: true,
        Authenticate:false
      };
      case ActionTypes.RESET_PASSWORD.SUCCESS:
        return {
          ...state,
          loading: false,
          Authenticate:true
        };
    case ActionTypes.RESET_PASSWORD.FAILURE:
      return {
        ...state,
        Authenticate: false
      };
    default:
      return state;
  }
}

export const fetchCountry = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.COUNTRY.FETCH:
      return {
        ...state,
        country:null
      };
      case ActionTypes.COUNTRY.SET:
        return {
          ...state,
          country:action.payload
        };

    default:
      return state;
  }
}

export const fetchState = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.STATE.FETCH:
      return {
        ...state,
        state:null
      };
      case ActionTypes.STATE.SET:
        return {
          ...state,
          state:action.payload
        };

    default:
      return state;
  }
}

export const fetchCity = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CITY.FETCH:
      return {
        ...state,
        city:null
      };
      case ActionTypes.CITY.SET:
        return {
          ...state,
          city:action.payload
        };

    default:
      return state;
  }
}

export const fetchNationatliy = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.NATIONALITY.FETCH:
      return {
        ...state,
        nationality:null
      };
      case ActionTypes.NATIONALITY.SET:
        return {
          ...state,
          nationality:action.payload
        };

    default:
      return state;
  }
}

export const setSections = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.SECTIONS.SET:
      return {
        ...state,
        sections: action.payload
      };
    default:
      return state;
  }
};

export const setModule = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.MODULE.SET:
      return {
        ...state,
        module: action.payload
      };
    default:
      return state;
  }
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
      case ActionTypes.ACTIVATE_COMPANY.REQUEST:
          return {
              ...state,
              loading: false,
              error: null,
          };
      case ActionTypes.ACTIVATE_COMPANY.SUCCESS:
          return {
              ...state,
              loading: true,
              error: null,
          };
      case ActionTypes.ACTIVATE_COMPANY.FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export const setWorkschedule = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.WORKSCHEDULE.SET:
      return {
        ...state,
        workschedule: action.payload
      };
    default:
      return state;
  }
};

export const setOffices = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.OFFICES.SET:
      return {
        ...state,
        offices: action.payload
      };
    default:
      return state;
  }
};

export const setSchedulebyemploye = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.EMPLOYEE_WORKSCHEDULE.SET:
      return {
        ...state,
        empworkschedule: action.payload
      };
    default:
      return state;
  }
};

export const setOfficebyemploye = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.EMPLOYEE_OFFICE.SET:
      return {
        ...state,
        empoffice: action.payload
      };
    default:
      return state;
  }
};

export const AllEmployementType = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.EMPLOYMENT_TYPE.SET:
      return {
        ...state,
        allemployement: action.payload
      };
    default:
      return state;
  }
};
export const OfficeId = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.OFFICE_ID.SET:
      return {
        ...state,
        OfficeId: action.payload
      };
    default:
      return state;
  }
};

export const employeEmployment = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.EMPLOYEE_EMPLOYMENT.SET:
      return {
        ...state,
        empEmployment: action.payload
      };
    default:
      return state;
  }
};

export const policies = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.POLICIES.SET:
      return {
        ...state,
        policie: action.payload
      };
    default:
      return state;
  }
};

export const remainingCount = (state = initialState, action) => {

  switch (action.type) {
    case ActionTypes.LEAVE_COUNT.SET:
      return {
        ...state,
        count: action.payload
      };
    default:
      return state;
  }
};