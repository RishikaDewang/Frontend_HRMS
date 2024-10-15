// Import React and required libraries and components
import { useState, useEffect } from 'react';
import {  useLocation ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ResetPassword, ResetPasswordFailure } from 'redux/action/actions';
// Material-UI components and icons
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material';
import UseFormControl from 'ui-component/input/input';
import * as Yup from 'yup';
import { Formik } from 'formik';
import './style.css';
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer } from 'react-toastify';

// ============================|| FIREBASE - RESET PASSWORD ||============================ //

const FirebaseResetPassword = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = useState(false);
  const [viewPassword , setViewPassword] = useState(false)
  const Authenticate =  useSelector((state)=>state.resetPassword.Authenticate)
  // Access the Redux store
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  useEffect(() => {
    if (Authenticate === true) {
      navigate("/Reset2success");
    }
  }, [Authenticate]);
  useEffect(()=>{
    dispatch(ResetPasswordFailure())
  },[])
  // Access the location object to get the query parameters from the URL
  const location = useLocation();
  const tokenFromURL  = new URLSearchParams(location.search).get('token');
  const resetToken = useSelector((state) => state.userReducer.resetToken)
  console.log("resetToken",resetToken)
  const token = tokenFromURL ? tokenFromURL : resetToken;
  // Function to handle the visibility of the password field
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickviewPassword = () => {
    setViewPassword(!viewPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Function to handle the password reset process
  const handleResetPassword = (values) => {
    const { newPassword, confirmPassword } = values;

    if (newPassword === confirmPassword) {
      // If passwords match, dispatch the ResetPassword action
      dispatch(ResetPassword({ token, newPassword }));
     
    } else {
      // If passwords don't match, show an error
      console.error("Passwords don't match");
    }
  };

  return (
    <>
      <Grid container>
        <ToastContainer />
        <Grid item className='signin-card' container>
          {/* Your reset password form */}
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          newPassword: Yup.string()
            .matches(
              /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
              'Password must be 8 characters long, contain at least one capital letter, one number, and one special character.'
            )
            .required('New Password is required'),
          confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              handleResetPassword(values);
            }
          } catch (err) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others} >
            {/* JSX for password input fields and passing props to input components */}
            <FormControl fullWidth error={Boolean(touched.newPassword && errors.newPassword)} sx={{ ...theme.typography.customInput }}>
              <UseFormControl
                id="outlined-adornment-new-password"
                type={showPassword ? 'text' : 'password'}
                value={values.newPassword}
                name="newPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
                inputProps={{}}
              />
              {touched.newPassword && errors.newPassword && (
                <FormHelperText error>{errors.newPassword}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)} sx={{ ...theme.typography.customInput }}>
              <UseFormControl
                id="outlined-adornment-confirm-password"
                type={viewPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                name="confirmPassword"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickviewPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {viewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                inputProps={{}}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error>{errors.confirmPassword}</FormHelperText>
              )}
            </FormControl>

            {/* Display an error message, if any */}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  onClick={() => handleResetPassword(values)}
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Reset Password
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseResetPassword;
