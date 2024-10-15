import React from 'react';
import "./style.css"
import {
  Avatar
} from '@mui/material';
import { formatDate } from 'utils/utils';
const Cardcontainer = ({ employeesData }) => {
  const getEmailDisplay = (email) => {
    const maxLength = 23; // Maximum number of characters before showing ellipsis
    return email.length > maxLength ? `${email.substring(0, maxLength)}...` : email;
  };
  if(!employeesData){
    return <div>Loading...</div>;
  }
  console.log("Employees Data: ", employeesData);
  return (  

      
    <div className="card-container">
      {employeesData && employeesData?.map((employee) => (
        <div className="card" key={employee.id}>
          <div className="avatar">
          <Avatar

        src={employee.featuredImageURL}
    sx={{height:"100%", width:"100%"}}
      />
          </div>
          <div className="details">
            <h3 className="name">{employee.fullName}</h3>
            <p className="department">Gender - {employee.gender || "NA"}</p>
            <p className="position">Date Of Birth - {employee.dateOfBirth ? formatDate(employee.dateOfBirth) : "NA"}</p>
            <div className="contact">
              <i className="bi bi-telephone"></i>
              <span> Phone Number - {employee.phoneNumber ? `+${employee.phoneNumber.substring(0, 2)} ${employee.phoneNumber.substring(2)}` : "NA"}</span>
            </div>
            <div className="contact">
              <i className="fas fa-envelope"></i>
              <a href={`mailto:${employee.email}`}>Email - {getEmailDisplay(employee.email)}</a>
            </div>
            <div className="contact">
              <i className="fas fa-envelope"></i>
              <span>Line Manager - {employee.lineManagerName || "NA"}</span>
            </div>
          </div>
        </div>   
      ))}
    </div>
  );
};

export default Cardcontainer;
