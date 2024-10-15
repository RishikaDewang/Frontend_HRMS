import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect } from 'react';
import './style.css';
import Header from 'ui-component/subheader';
import BasicButtons from 'ui-component/button';
import ProfileField from 'ui-component/myprofile';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import {
  fetchMyProfile,
  fetchMyAddress,
  updateProfileRequest,
  updateAddressRequest,
  fetchEmergencyContact,
  updateEmergecnyRequest,
  fetchBankInfo,
  updateBankRequest,
  fetchCountry,
  fetchState,
  fetchCity,
  getNationality,
  fetchWorkschedule,
  fetchScheduleByEmployee,
  updateEmpWorkschedule,
  fetchOffices,
  fetchOfficeByEmployee,
  updateEmpOffice,
  AllEmploymentType,
  updateEmployment,
  fetchEmployEmployment
} from 'redux/action/actions';
import { ToastContainer } from 'react-toastify';
// import { BankFilled } from '@ant-design/icons';
// import { Edit } from '@mui/icons-material';
const Myprofile = () => {
  const [editable, setEditable] = useState(false);
  const [addresseditable, setAddressEditable] = useState(false);
  const [emegencyeditable, setEmergencyEditable] = useState(false);
  const [bankeditable, setBankEditable] = useState(false);

  const location = useLocation();
  const id = location.state?.row;
  const permission = useSelector((state) => state.userReducer.permissions);
  const Employeeid = useSelector((state) => state.userReducer.id);
  const myprofile = useSelector((state) => state.setMyProfileReducer.data);
  const myaddress = useSelector((state) => state.setMyAddressReducer.data);
  const emergencycontact = useSelector((state) => state.setEmergencyContactReducer.data);
  const bankinfo = useSelector((state) => state.setBankInfoReducer.data);
  const country = useSelector((state) => state.fetchCountry.country);
  console.log('myprofile', myprofile);
  const states = useSelector((state) => state.fetchState.state);
  const city = useSelector((state) => state.fetchCity.city);
  const nationality = useSelector((state) => state.fetchNationatliy.nationality);
  const [formData, setFormData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [emergencyData, setEmergencyData] = useState({});
  const [bankData, setBankData] = useState({});
  const [formDataErrors, setFormDataErrors] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    setFormData(myprofile);
    setAddressData(myaddress);
    setEmergencyData(emergencycontact);
    setBankData(bankinfo);
  }, [myprofile, myaddress, emergencycontact, bankinfo]);
  useEffect(() => {
    dispatch(getNationality());
    dispatch(fetchCountry());
    dispatch(fetchEmergencyContact(id || Employeeid));
    dispatch(fetchMyProfile(id || Employeeid));
    dispatch(fetchMyAddress(id || Employeeid));
    dispatch(fetchBankInfo(id || Employeeid));
  }, [dispatch, Employeeid]);

  const handleEditClick = () => {
    setEditable(true);
  };
  const handleaddresseditClick = () => {
    setAddressEditable(true);
  };
  const handleEmergencyeditClick = () => {
    setEmergencyEditable(true);
  };
  const handleBankeditClick = () => {
    setBankEditable(true);
  };
  const isEditAllowedForSection = (sectionId) => {
    // Check if there is any permission for the given sectionId and permissionId 2
    return permission.some((item) => item.sectionId === sectionId && item.permissionId === 2);
  };
  const handleFormChange = (e, fieldName, fieldType) => {
    // const newValue = fieldType === 'phone'||fieldType === 'select' || fieldType === undefined || fieldType === "date"? e.target.value : e.target.value.name;
    const newValue = fieldType === 'nationality' ? e.target.value.name : e.target.value;
    console.log('fieldType', fieldType);
    // Update only if the new value is different from the original value

    if (newValue !== myprofile[fieldName]) {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: newValue
      }));
      setFormDataErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: ''
      }));
    }
  };
  const handleAddressChange = (e, fieldName) => {
    const newValue = e.target.value;
    const { id, name } = newValue;

    console.log('newValue', newValue);
    // Assuming 'stateProvince' is the name of the field that represents the selected state
    if (fieldName === 'stateProvince') {
      // Update only if the new value is different from the original value
      if (newValue !== addressData[fieldName]) {
        setAddressData((prevData) => ({
          ...prevData,
          [fieldName]: name || newValue
        }));

        // Trigger the fetchCity action with the selected stateId
        dispatch(fetchCity(id));
      }
    } else if (fieldName === 'country') {
      // For country, you might want to reset the city data when the country changes
      setAddressData((prevData) => ({
        ...prevData,
        stateProvince: ''
        // other fields you want to reset
      }));

      // Continue with the existing logic for country selection
      if (newValue !== addressData[fieldName]) {
        setAddressData((prevData) => ({
          ...prevData,
          [fieldName]: name || newValue
        }));

        dispatch(fetchState(newValue));
      }
    } else {
      // For other fields, update the data as usual
      if (newValue !== addressData[fieldName]) {
        setAddressData((prevData) => ({
          ...prevData,
          [fieldName]: name || newValue
        }));
      }
    }
  };

  const handleEmergencyChange = (e, fieldName) => {
    const newValue = e.target.value;

    // Update only if the new value is different from the original value
    if (newValue !== emergencycontact[fieldName]) {
      setEmergencyData((prevData) => ({
        ...prevData,
        [fieldName]: newValue
      }));
    }
  };
  const handleBankinfoChange = (e, fieldName) => {
    const newValue = e.target.value;

    // Update only if the new value is different from the original value
    if (newValue !== bankinfo[fieldName]) {
      setBankData((prevData) => ({
        ...prevData,
        [fieldName]: newValue
      }));
      setFormDataErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: ''
      }));
    }
  };
  const handleSaveClick = () => {
    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneValidationPattern = /^((\+)?(\d{2}[-]))?(\d{12}){1}?$/;

    // Validate phone number with the pattern
    const isPhoneNumberValid = phoneValidationPattern.test(formData.phoneNumber);

    if (!formData.fullName || !formData.email || !emailRegex.test(formData.email) || !isPhoneNumberValid) {
      // Set error messages for mandatory fields and invalid email
      setFormDataErrors({
        fullName: !formData.fullName ? 'Name is required' : '',
        email: !formData.email ? 'Email is required' : !emailRegex.test(formData.email) ? 'Invalid email format' : '',
        phoneNumber: !isPhoneNumberValid ? 'Phone number should  10 digits' : ''
      });
      return; // Do not proceed with save if mandatory fields are not filled or email is invalid
    }

    // Clear any previous error messages
    setFormDataErrors({});
    dispatch(updateProfileRequest(id || Employeeid, formData));
    setEditable(false);
  };
  const handleAddressClick = () => {
    dispatch(updateAddressRequest(id || Employeeid, addressData));
    setAddressEditable(false);
  };
  const handleEmergencyClick = () => {
    const phoneValidationPattern = /^((\+)?(\d{2}[-]))?(\d{12}){1}?$/;
    const isPhoneNumberValid = phoneValidationPattern.test(emergencyData.phoneNumber);

    if (!isPhoneNumberValid) {
      // Set error messages for mandatory fields and invalid phone number
      setFormDataErrors({
        phoneNumber: !isPhoneNumberValid ? 'Phone number should be 10 digits' : ''
      });
      return; // Do not proceed with save if the phone number is not valid
    }
    dispatch(updateEmergecnyRequest(id || Employeeid, emergencyData));
    setEmergencyEditable(false);
  };

  const handleBankClick = () => {
    if (!bankData.bankName || !bankData.accountName || !bankData.accountNumber || !bankData.iban) {
      setFormDataErrors({
        bankName: !bankData.bankName ? 'Bank Name is required' : '',
        accountName: !bankData.accountName ? 'Account Name is required' : '',
        accountNumber: !bankData.accountNumber ? 'Account Number is required' : '',
        iban: !bankData.iban ? 'IFSC code is required' : ''
      });
      return;
    }

    // Clear any previous error messages
    setFormDataErrors({});
    dispatch(updateBankRequest(id || Employeeid, bankData));
    setBankEditable(false);
  };

  const handleCancel = () => {
    setFormData(myprofile);
    setAddressData(myaddress);
    setEmergencyData(emergencycontact);
    setBankData(bankinfo);

    // Clear any previous error messages
    setFormDataErrors({});
    setBankEditable(false);
    setEmergencyEditable(false);
    setAddressEditable(false);
    setEditable(false);
  };
  if (!myprofile || !myaddress) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indication
  }
  const personalInfoFields = [
    {
      name: 'fullName',
      title: 'Full Name*'
    },
    {
      name: 'gender',
      title: 'Gender',
      type: 'select',
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' }
      ]
    },
    {
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'date'
    },
    {
      name: 'maritalStatus',
      title: 'Marital Status',
      type: 'select',
      options: [
        { value: 'Married', label: 'Married' },
        { value: 'Unmarried', label: 'Unmarried' },
        { value: 'Single', label: 'Single' }
      ]
    },
    {
      name: 'nationality',
      title: 'Nationality',
      type: 'nationality'
    },
    {
      name: 'personalTaxId',
      title: 'Personal Tax ID'
    },
    {
      name: 'email',
      title: 'Email Address*'
    },
    {
      name: 'socialInsurance',
      title: 'Social Insurance'
    },
    {
      name: 'healthInsurance',
      title: 'Health Insurance'
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number*',
      type: 'phone'
    }
  ];

  const emergencyContactFields = [
    {
      name: 'fullName',
      title: 'Full Name'
    },
    {
      name: 'relationship',
      title: 'Relationship',
      type: 'select',
      options: [
        { value: 'Father', label: 'Father' },
        { value: 'Mother', label: 'Mother' },
        { value: 'Sibling', label: 'Sibling' },
        { value: 'Other', label: 'Other' }
      ]
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'phone'
    }
  ];
  const addressFields = [
    {
      name: 'primaryAddress',
      title: 'Primary Address'
    },
    {
      name: 'country',
      title: 'Country',
      type: 'country'
    },
    {
      name: 'stateProvince',
      title: 'State/Province',
      type: 'state'
    },
    {
      name: 'city',
      title: 'City',
      type: 'city'
    },
    {
      name: 'postalCode',
      title: 'Postal Code'
    }
  ];
  const bankFields = [
    {
      name: 'bankName',
      title: 'Bank Name*',
      maxLength: 50
    },
    {
      name: 'accountName',
      title: 'Account Name*',
      maxLength: 50
    },
    {
      name: 'branch',
      title: 'Branch',
      maxLength: 50
    },
    {
      name: 'accountNumber',
      title: 'Account Number*',
      maxLength: 20
    },
    {
      name: 'swiftBic',
      title: 'SWIFT / BIC',
      maxLength: 10
    },
    {
      name: 'iban',
      title: 'IFSC*',
      maxLength: 20
    }
  ];

  return (
    <>
      <div className="main-container">
        <div>
          {' '}
          <ToastContainer />
          <MainCard title="Personal Info">
            <div className="flex-container">
              {isEditAllowedForSection(1) && (
                <div className="button-container">
                  <BasicButtons handleSaveClick={handleEditClick} name="Edit" />
                </div>
              )}
              <form method="POST" className="form-view">
                <div className="grid-container">
                  {personalInfoFields.map((field) => (
                    <ProfileField
                      key={field.name}
                      title={field.title}
                      value={formData?.[field.name]}
                      editable={editable}
                      onChange={(e) => handleFormChange(e, field.name, field.type)}
                      type={field.type}
                      options={field.options}
                      error={formDataErrors[field.name]}
                      nationality={field.type === 'nationality' ? nationality : undefined}
                    />
                  ))}
                </div>
              </form>
              {editable ? (
                <div className="Profile-button-container">
                  <BasicButtons handleSaveClick={handleSaveClick} name="save" cancel="cancel" handleCancelClick={handleCancel} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </MainCard>
        </div>
        <div>
          <MainCard title="Address">
            <div className="flex-container">
              {isEditAllowedForSection(2) && (
                <div className="button-container">
                  <BasicButtons handleSaveClick={handleaddresseditClick} name="Edit" />
                </div>
              )}
              <form method="POST" className="form-view">
                <div className="grid-container">
                  {addressFields &&
                    addressFields.map((field) => (
                      <ProfileField
                        key={field.name}
                        title={field.title}
                        value={addressData?.[field.name]}
                        editable={addresseditable}
                        onChange={(e) => handleAddressChange(e, field.name, field.type)}
                        type={field.type}
                        options={field.type === 'country' ? country : undefined}
                        state={field.type === 'state' ? states : undefined}
                        city={field.type === 'city' ? city : undefined}
                        countryId={addressData?.country?.id}
                      />
                    ))}
                </div>
              </form>
              {addresseditable ? (
                <div className="Profile-button-container">
                  <BasicButtons handleSaveClick={handleAddressClick} name="save" cancel="cancel" handleCancelClick={handleCancel} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </MainCard>
        </div>
        <div>
          <MainCard title="Emergency Contact">
            <div className="flex-container">
              {isEditAllowedForSection(3) && (
                <div className="button-container">
                  <BasicButtons handleSaveClick={handleEmergencyeditClick} name="Edit" />
                </div>
              )}
              <form method="POST" className="form-view">
                <div className="grid-container">
                  {emergencyContactFields.map((field) => (
                    <ProfileField
                      key={field.name}
                      title={field.title}
                      value={emergencyData?.[field.name]}
                      editable={emegencyeditable}
                      onChange={(e) => handleEmergencyChange(e, field.name)}
                      type={field.type}
                      error={formDataErrors[field.name]}
                      options={field.options}
                    />
                  ))}
                </div>
              </form>
              {emegencyeditable ? (
                <div className="Profile-button-container">
                  <BasicButtons handleSaveClick={handleEmergencyClick} name="save" cancel="cancel" handleCancelClick={handleCancel} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </MainCard>
        </div>
        <div>
          <MainCard title="Bank Info">
            <div className="flex-container">
              {isEditAllowedForSection(4) && (
                <div className="button-container">
                  <BasicButtons handleSaveClick={handleBankeditClick} name="Edit" />
                </div>
              )}
              <form method="POST" className="form-view">
                <div className="grid-container">
                  {bankFields.map((field) => (
                    <ProfileField
                      key={field.name}
                      title={field.title}
                      value={bankData?.[field.name]}
                      editable={bankeditable}
                      onChange={(e) => handleBankinfoChange(e, field.name)}
                      error={formDataErrors[field.name]}
                      maxLength={field.maxLength}
                    />
                  ))}
                </div>
              </form>
              {bankeditable ? (
                <div className="Profile-button-container">
                  <BasicButtons handleSaveClick={handleBankClick} name="save" cancel="cancel" handleCancelClick={handleCancel} />
                </div>
              ) : (
                <></>
              )}
            </div>
          </MainCard>
        </div>
      </div>
    </>
  );
};

 const Job = () => {
    const dispatch = useDispatch();
    const [schedule, setSchedule] = useState({});
    const [empoffices , setEmpOffice]= useState({})
    const [editMode, setEditMode] = useState(false);
    const [editJobMode, setEditJobMode] = useState(false);
    const [selectedScheduleId, setSelectedScheduleId] = useState(null); 
    const [employmentId, setEmploymentId] = useState(null); 
    const [selectedOfficeId, setSelectedOfficeId] = useState(null);
    const [employment, setEmployment] = useState(false);
    const [assingEmp , setAssingEmp] = useState({})
    const location = useLocation();
  const id = location.state?.row;
  const Employeeid = useSelector((state) => state.userReducer.id);
  const isEditAllowedForSection = (sectionId) => {
    // Check if there is any permission for the given sectionId and permissionId 2
    return permission.some((item) => item.sectionId === sectionId && item.permissionId === 2);
  };
    const workschedule = [
        {
        name: 'scheduleName',
        title: 'Current schedule'
        },
        {
        name: 'hoursPerDay',
        title: 'Standard working '
        },
        {
        name: 'hoursPerWeek',
        title: 'Total working'
        },
    ];
    const offices = [
      {
      name: 'officeName',
      title: 'Office'
      },
     
  ];
  const employementtpe = [
    {
    name: 'typeName',
    title: 'Employment Type'
    },
   
];
    const workdata = useSelector((state) => state.setWorkschedule.workschedule);
    const empwork  = useSelector((state) => state.setSchedulebyemploye.empworkschedule)
    const office = useSelector((state) => state.setOffices.offices);
    const empoffice =  useSelector((state)=>state.setOfficebyemploye.empoffice)
    const allEmployement =  useSelector((state)=>state.AllEmployementType.allemployement)
    const employeEployment =  useSelector((state)=>state.employeEmployment.empEmployment)
    const permission = useSelector((state) => state.userReducer.permissions);
    useEffect(() => {
        dispatch(fetchWorkschedule());
        dispatch(fetchOffices())
        dispatch(AllEmploymentType())
        dispatch(fetchScheduleByEmployee(id || Employeeid))
        dispatch(fetchOfficeByEmployee(id || Employeeid))
        dispatch(fetchEmployEmployment(id || Employeeid))
    }, []);

    const handleFormChange = (e, fieldName, fieldType) => {
        const newValue = e.target.value;
        console.log('fieldType', fieldType);

        if (newValue !== formData[fieldName]) {
            setSchedule((prevData) => ({
            ...prevData,
            [fieldName]: newValue
        }));
        }
    };
    const handleJobChange = (e, fieldName) => {
      const newValue = e.target.value;
      if (newValue !== formData[fieldName]) {
        setEmpOffice((prevData) => ({
          ...prevData,
          [fieldName]: newValue
      }));
      }
  };
    useEffect(() => {
        setSchedule(empwork);
        setEmpOffice(empoffice)
        setAssingEmp(employeEployment)
    }, [empwork,empoffice,employeEployment]);
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    const toggleJobEditMode = () => {
      setEditJobMode(!editJobMode);
  };
    const handleSave = () => {
        if (selectedScheduleId) {
          const requestBody = {
            employeeId: id || Employeeid,
            scheduleId: selectedScheduleId
          };
      
          dispatch(updateEmpWorkschedule(JSON.stringify(requestBody)));
        }
        setEditMode(false);
      };
      const handleJobSave = () => {
        if (selectedOfficeId) {
          dispatch(updateEmpOffice( id || Employeeid , selectedOfficeId));
        }
        setEditJobMode(false);
      };
      const toggleEmployment = () => {
        setEmployment(!employment);
    };

    const handleEmploymentSave = () => {
      if (employmentId) {
        const requestBody = {
          EmployeeId: id || Employeeid,
          EmploymentTypeId: employmentId
        };
    
        dispatch(updateEmployment(requestBody));
      }
      setEmployment(false);
    };
    const handleEmploymentcancel = () => {
    
      setEmployment(false);
    };
    const handleJobcancel = () => {
    
      setEditJobMode(false);
    };
    const handleWorkschedulecancel = () => {
    
      setEditMode(false);
    };
    return (
      <>    
       <div className="main-container"> 
       <div>
        <MainCard title="Work Schedule">
        <div className="flex-container">
        {isEditAllowedForSection(5) &&(
            <div className="button-container">
            <BasicButtons name="Edit" handleSaveClick={toggleEditMode} />
            </div>
                )}
            <form method="POST" className="form-view">
            <div className="grid-container">
            {editMode ? (
                            // Render select tag when in edit mode
                            <Select value={selectedScheduleId} onChange={(e) => setSelectedScheduleId(e.target.value)}>
                                {workdata.map((scheduleItem, index) => (
                                    <MenuItem key={index} value={scheduleItem.scheduleId}>{scheduleItem.scheduleName}</MenuItem>
                                ))}
                            </Select>
                        ) : ( workschedule.map((field) => (
                <ProfileField
                    key={field.name}
                    title={field.title}
                    value={schedule?.[field.name]}
                    // editable={bankeditable}
                    onChange={(e) => handleFormChange(e, field.name)}
                    // error={formDataErrors[field.name]}
                />
                )) )}
            </div>
            </form>

            {editMode &&  <div className="Profile-button-container">
            <BasicButtons name="save" cancel="cancel" handleSaveClick={handleSave} handleCancelClick={handleWorkschedulecancel}/>
            </div>}
        </div>
        </MainCard>
        </div>
        <div>
        <MainCard title="Job">
        <div className="flex-container">
        {isEditAllowedForSection(6) &&(
            <div className="button-container">
            <BasicButtons name="Edit" handleSaveClick={toggleJobEditMode} />
            </div>
        )}
            <form method="POST" className="form-view">
            <div className="grid-container">
            {editJobMode ? (
                            // Render select tag when in edit mode
                            <Select value={selectedOfficeId} onChange={(e) => setSelectedOfficeId(e.target.value)}>
                                {office.map((scheduleItem, index) => (
                                    <MenuItem key={index} value={scheduleItem.officeId}>{scheduleItem.officeName}</MenuItem>))}
                            </Select>
                        ) : ( offices.map((field) => (
                <ProfileField
                    key={field.name}
                    title={field.title}
                    value={empoffices?.[field.name]}
                    // editable={bankeditable}
                    onChange={(e) => handleJobChange(e, field.name)}
                    // error={formDataErrors[field.name]}
                />
                )) )}
            </div>
            </form>

            {editJobMode &&  <div className="Profile-button-container">
            <BasicButtons name="save" cancel="cancel" handleSaveClick={handleJobSave} handleCancelClick={handleJobcancel}/>
            </div>}
        </div>
        </MainCard>
        </div>
        <div>
        <MainCard title="Employment Type">
        <div className="flex-container">
        {isEditAllowedForSection(7) &&(
            <div className="button-container">
            <BasicButtons name="Edit" handleSaveClick={toggleEmployment} />
            </div>
        )}
            <form method="POST" className="form-view">
            <div className="grid-container">
            {employment ? (
                            // Render select tag when in edit mode
                            <Select value={employmentId} onChange={(e) => setEmploymentId(e.target.value)}>
                                {allEmployement.map((typeName, index) => (
                                    <MenuItem key={index} value={typeName.employeeTypeId}>{typeName.typeName}</MenuItem>))}
                            </Select>
                        ) : ( employementtpe.map((field) => (
                <ProfileField
                    key={field.name}
                    title={field.title}
                    value={assingEmp?.[field.name]}
                    // editable={bankeditable}
                    onChange={(e) => handleJobChange(e, field.name)}
                    // error={formDataErrors[field.name]}
                />
                )) )}
            </div>
            </form>

            {employment &&  <div className="Profile-button-container">
            <BasicButtons name="save" cancel="cancel" handleSaveClick={handleEmploymentSave}handleCancelClick={handleEmploymentcancel}/>
            </div>}
        </div>
        </MainCard>
        </div>
        </div>
        </>
    );
    };

export default function ProfileSettings() {
  const generalTabs = [
    { label: 'General', value: '1', component: <Myprofile /> },
    { label: 'Job', value: '2', component: <Job /> }
    // Add more tabs as needed
  ];

  return (
    <MainCard>
      <Header tabs={generalTabs} />
      {/* Use Header component with different tabs as needed */}
    </MainCard>
  );
}
