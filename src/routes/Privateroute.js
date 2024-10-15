import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({  element: Component, moduleId , ...rest }) => {
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('token');
    const token = JSON.parse(storedToken || 'null')
    const modulePermissions = useSelector((state) => state.userReducer.modulepermission);
  if (!token) {
    navigate('/login');
    return null;
  }
  const isEditAllowedForSection = (moduleId) => {
    return modulePermissions.some(
        (item) => item.moduleId === moduleId && item.permissionId === 1
    );
};

if (moduleId && !isEditAllowedForSection(moduleId)) {
    navigate('/unauthorized');
    return null; 
}

  return  <Component {...rest} />;
};

export default PrivateRoute;
