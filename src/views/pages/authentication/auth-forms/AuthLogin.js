// Import React and required libraries and components
import { useState } from 'react';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';
import { loginRequest } from 'redux/action/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Material-UI components and icons
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,

} from '@mui/material';
import UseFormControl from 'ui-component/input/input';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import './style.css'
// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useEffect } from 'react';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';


// ============================|| FIREBASE - LOGIN ||============================ //

// Define a functional component for handling email and password login
const FirebaseLogin = ({ ...others }) => {

  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // Access the Redux store




  // Function to handle the visibility of the password field
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Access the Redux dispatch function to trigger actions
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.authReducer)
  const resetToken = useSelector((state) => state.userReducer.resetToken)
  const storedToken = localStorage.getItem('token');
  const token = JSON.parse(storedToken || 'null')
  // Function to handle the login process and dispatch action for login process
  const handleLogin = (values) => {
    const { email, password } = values;
    if (email && password) {
      setLoading(true)
      dispatch(loginRequest(email, password));
    }


  };
  useEffect(() => {
    setLoading(false);
    if (token && loggedIn.isAuthenticated) {
      if (resetToken === "Null") { // Check for the string "Null"
        navigate("/employees/directory");
      } else {
        navigate("/employees/directory", { state: { resetToken: resetToken } });
      }
    }
  }, [loggedIn.isAuthenticated, token, resetToken]);
  
  
  return (
    // JSX markup for the login form
    <> 
      <Grid container>
<ToastContainer/>
        <Grid item className='signin-card' container >
          <Box >
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
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
              {/* {loggedIn.error && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{"Incorrect username or password. Please try again."}</FormHelperText>
        </Box>
      )} */}
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

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <UseFormControl
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
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
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {/* Checkbox for "Remember me" */}
            <Stack direction="row" className="forgot-password-label"  >
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
               <Link to="/forgot" style={{ textDecoration: 'none', cursor: 'pointer' }}>
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography></Link>
            </Stack>

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
              'Sign in'
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

