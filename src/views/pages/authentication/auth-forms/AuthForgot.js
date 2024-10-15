// Import React and required libraries and components
// import { Link } from 'react-router-dom';
import { ForgotPassword } from 'redux/action/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
// Material-UI components and icons
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,



} from '@mui/material';
import UseFormControl from 'ui-component/input/input';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import './style.css'
// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';



// ============================|| FIREBASE - LOGIN ||============================ //

// Define a functional component for handling email and password login
const FirebaseLogin = ({ ...others }) => {

  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [loading, setLoading] = useState(false);

  // Access the Redux store




  // Access the Redux dispatch function to trigger actions
  const dispatch = useDispatch();
  const forgot =  useSelector((state)=>state.forgotpassword)
  // Function to handle the login process and dispatch action for login process
  const handleLogin = (values) => {
    const { email } = values;
    if (email) {
      setLoading(true)
        const payload = { email };
      dispatch(ForgotPassword(payload));
    }


  };
  useEffect(() => {
    if (forgot.error) {
      setLoading(false);
    }
  }, [forgot.forgoterror]);
  useEffect(()=>{
   if(forgot.forgotsuccess===false){
    setLoading(false)
   }
  },[forgot.forgotsuccess])
  useEffect(()=>{
   
     setLoading(false)
    
   },[forgot.forgoterror])
  return (
    // JSX markup for the login form
    <> 
      <Grid container>
<ToastContainer/>
       
      </Grid>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
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
             
            {/* JSX for email input field and passing props to input components */}
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <UseFormControl
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

          
            {/* Checkbox for "Remember me" */}
           
            {/* Display an error message, if any */}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button onClick={() => handleLogin(values)} disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
           { loading  ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Send  Mail'
            )}           
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;

