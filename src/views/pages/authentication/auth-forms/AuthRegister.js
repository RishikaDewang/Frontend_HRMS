import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useq Selector } from 'react-redux';
import { signupRequest, signupReset } from 'redux/action/actions';
import { useDispatch , useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  // Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  // useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
// import useScriptRef from 'hooks/useScriptRef';
// import Google from 'assets/images/icons/social-google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { useNavigate } from 'react-router-dom';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ToastContainer } from 'react-toastify';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
  const theme = useTheme();
  // const scriptedRef = useScriptRef();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  // const googleHandler = async () => {
  //   console.error('Register');
  // };
  const singUP = useSelector((state)=>state.signupReducer)
  console.log("singup", singUP)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
console.log("loader ", loading)
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate()
  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };
  useEffect(() => {
    // Check if signup was successful
    if (singUP.success) {
      // toast.success('Sucessfully Registered!');
      // Signup was successful, navigate to the login page
      const delay = setTimeout(() => {
        navigate('/login');
        setLoading(false); 
        // Cleanup by resetting signup state
        dispatch(signupReset());
      }, 1500); // Adjust the delay as needed
  
      return () => clearTimeout(delay);
    
    }
  }, [singUP.success]);
  useEffect(() => {
    changePassword('123456');
  }, []);
  const dispatch = useDispatch()
  useEffect(()=>{
    setLoading(false);
    console.log("loader ", loading)
    dispatch(signupReset());
  },[singUP.error])
  return (
    <>
<ToastContainer/>
      <Formik
        initialValues={{
          fname: '',
          email: '',
          password: '',
          companyName: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().matches(
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 number, and 1 special character'
          )
          .required('Password is required'),
          companyName: Yup.string().max(255).required('Comapany name is required'),
          fname: Yup.string().max(255).required('Full Name is required'),
        })}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            // Create the payload for the signup API call
            const userData = {
              company: {
                CompanyName: values.companyName, // Update with your field name
              },
              employee: {
                FullName: values.fname,
                Email: values.email,
                Password: values.password,

              },
            };
            dispatch(signupRequest(userData));
          
          } catch (err) {
            console.log("signup",err)
          } 
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
                  {/* {singUP.error && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{singUP.error}</FormHelperText>
        </Box>
      )} */}
            <FormControl fullWidth error={Boolean(touched.fname && errors.fname)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Full Name</InputLabel>
              <OutlinedInput
                fullWidth
                label="Full Name"
                margin="normal"
                name="fname"
                value={values.fname}
                type="text"
                defaultValue="" 
                sx={{ ...theme.typography.customInput }}
                onChange={handleChange}
                inputProps={{}}
              /> {touched.fname && errors.fname && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.fname}
                </FormHelperText>
              )} </FormControl>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-register">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}
            <FormControl fullWidth error={Boolean(touched.companyName && errors.companyName)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-companyName-register">Company Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-companyName-register"
                type="companyName"
                value={values.companyName}
                name="companyName"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.companyName && errors.companyName && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.companyName}
                </FormHelperText>
              )}
            </FormControl>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                  }
                  label={
                    <Typography variant="subtitle1">
                      Agree with &nbsp;
                      <Typography variant="subtitle1" component={Link} to="#">
                        Terms & Condition.
                      </Typography>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting } fullWidth size="large" type="submit" variant="contained" color="secondary">
                { loading  ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Sign up'
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

export default FirebaseRegister;
