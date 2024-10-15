import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';
// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
// import User1 from 'assets/images/users/user-round.svg';
import { fetchProfilepic, resetState, uploadImageRequest } from 'redux/action/actions';
// assets
import {
  IconLogout,
  IconSettings, IconUser, IconBriefcase ,IconPlane  
} from '@tabler/icons';
// ==============================|| PROFILE MENU ||============================== //
const ProfileSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch()
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const Profilepic = useSelector((state) => state.fetchProfilePicReducer.profilepic)
  const defaultProfilepic = { imageUrl: 'default_image_url' };
  const profilePicObject = Profilepic || defaultProfilepic;
  const employeeid = useSelector((state) => state.userReducer.id);
  const modulePermissions = useSelector((state) => state.userReducer.modulepermission)
  console.log("modulePermissions",modulePermissions)
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */

  useEffect(() => {
    dispatch(fetchProfilepic(employeeid))
  }, [])
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    navigate("/login")
    localStorage.clear()
    setTimeout(() => {
      dispatch(resetState());
    }, 1000);
    // dispatch(logOut())
    window.location.reload(true);
  };
  
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);
    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
  const now = new Date();
  const hours = now.getHours();

  let greeting = '';

  if (hours >= 5 && hours < 12) {
    greeting = 'Good Morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  const fileInputRef = useRef();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('employeeId', employeeid);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      dispatch(uploadImageRequest(employeeid, formData));
    }
  };
  const isEditAllowedForSection = (sectionId) => {
    console.log("sectionId",sectionId)
    // Check if there is any permission for the given sectionId and permissionId 2
    return modulePermissions.some(
        (item) => item.moduleId  === sectionId && item.permissionId  === 1
    );
};

  return (
    <>
      <Chip 
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar 
            src={profilePicObject.imageUrl}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack >
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">{greeting}</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {/* {Profilepic} */}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <Avatar 
                    src={profilePicObject.imageUrl}
                    sx={{
                      ...theme.typography.mediumAvatar,
                      margin: 'auto',
                      cursor: 'pointer',
                      width: '80px', // Adjust the width as needed
                      height: '80px',
                    }}

                    aria-controls={open ? 'menu-list-grow' : undefined}
                    // aria-haspopup="true"
                    color="inherit"
                    onClick={() => fileInputRef.current.click()}
                  />
                  <input 
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      <Divider />
                      <Divider />
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                       {  isEditAllowedForSection(10)  &&
                          <ListItemButton
                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0, '/settings/role')}
                          >
                            <ListItemIcon>
                              <IconSettings stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Permissions</Typography>} />
                          </ListItemButton>}
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1, '/myprofile')}
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2"> Profile</Typography>
                                </Grid>
                                <Grid item>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                        <Divider />
                     {/* {  isEditAllowedForSection(6) && <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={(event) => handleListItemClick(event, 5, '/attendance/settings')}
                        >
                          <ListItemIcon>
                            <IconClockHour5 stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2">Attendance</Typography>
                                </Grid>
                                <Grid item>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>} */}
                        {  isEditAllowedForSection(9) &&    <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={(event) => handleListItemClick(event, 5, '/recruitment/settings')}
                        >
                          <ListItemIcon>
                            <IconBriefcase  stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2">Recruitment</Typography>
                                </Grid>
                                <Grid item>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>}
                        {  isEditAllowedForSection(4) && <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={(event) => handleListItemClick(event, 5, '/time-off/setting')}
                        >
                          <ListItemIcon>
                            <IconPlane  stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2">Time Off</Typography>
                                </Grid>
                                <Grid item>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>}
                        {  isEditAllowedForSection(11) &&    <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={(event) => handleListItemClick(event, 5, '/attendance/offices')}
                        >
                          <ListItemIcon>
                            <IconPlane  stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2">Offices</Typography>
                                </Grid>
                                <Grid item>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>}
                        {  isEditAllowedForSection(12) &&    <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          selected={selectedIndex === 4}
                          onClick={(event) => handleListItemClick(event, 5, '/attendance/workschedule')}
                        >
                          <ListItemIcon>
                            <IconPlane  stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Grid container spacing={1} justifyContent="space-between">
                                <Grid item>
                                  <Typography variant="body2">WorkSchedule</Typography>
                                </Grid>
                                <Grid item>
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>}
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};
export default ProfileSection;