import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from './Privateroute';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('utils/Typography')));
const UtilsColor = Loadable(lazy(() => import('utils/Color')));
const UtilsShadow = Loadable(lazy(() => import('utils/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('utils/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('utils/TablerIcons')));


//kitchensink routing
const Calendar = Loadable(lazy(() => import('kitchensink/pages/Calendar')))
const Card = Loadable(lazy(() => import('kitchensink/pages/Cards')))
const Dropdown = Loadable(lazy(() => import('kitchensink/pages/Dropdown')))
const Grid = Loadable(lazy(() => import('kitchensink/pages/Grid')))
const Avatar = Loadable(lazy(() => import('kitchensink/pages/Avatar')))
const Calculation = Loadable(lazy(() => import('kitchensink/pages/Calulationcard')))
const Button = Loadable(lazy(() => import('kitchensink/pages/Button')))
const Tab = Loadable(lazy(() => import('kitchensink/pages/Tab')))
const Input = Loadable(lazy(() => import('kitchensink/pages/Input')))
const Nodata = Loadable(lazy(() => import('kitchensink/pages/Nodata')))
const Popup = Loadable(lazy(() => import('kitchensink/pages/Popup')))
const Subheader = Loadable(lazy(() => import('kitchensink/pages/Subheader')))
const Header = Loadable(lazy(() => import('kitchensink/pages/Header')))
const Phoneno = Loadable(lazy(() => import('kitchensink/pages/Phoneno')))
const ProgressBar = Loadable(lazy(() => import('kitchensink/pages/Progressbar')))
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Role = Loadable(lazy(() => import('views/roles/Role')));
const Permissions = Loadable(lazy(() => import('views/rolepermission/Permission')))
const Myprofile = Loadable(lazy(() => import('views/myprofile/Myprofile')))
const Directory = Loadable(lazy(() => import('views/directory/Directory')))
const ManageEmployee = Loadable(lazy(() => import('views/directory/Manageemployee')))
const Mytimeoff = Loadable(lazy(() => import('views/Timeoff/Mytimeoff')))
const EmployeeTimeoff = Loadable(lazy(() => import('views/Timeoff/Employee')))
const Myattendance = Loadable(lazy(() => import('views/attendance/Myattendance')))
const Employeattendance = Loadable(lazy(() => import('views/attendance/Employeattendance')))
const Attsettings = Loadable(lazy(()=>import('views/attendance/Settings')))
const News = Loadable(lazy(()=>import('views/news/News')))  
const Document = Loadable(lazy(()=>import('views/document/Document')))
const Documentdetails = Loadable(lazy(()=> import('views/document/Documentdetails')))
const Job = Loadable(lazy(()=> import('views/recruitment/Job')))
const Jobdetails = Loadable(lazy(()=> import('views/recruitment/JobDetails')))
const Candidate = Loadable(lazy(()=> import('views/recruitment/Candidate')))
const RecruitmentSetting = Loadable(lazy(()=>import('views/recruitment/Settings')))
const TimeoffSetting = Loadable(lazy(()=> import('views/Timeoff/Setting')))
const Offices  = Loadable(lazy(()=> import('views/attendance/Offices')))
const WorkSchedule = Loadable(lazy(()=> import('views/attendance/Workschedule')))
// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'kitchensink',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
        {
          path: 'calendar',
          element: <Calendar />
        },
        {
          path: 'card',
          element: <Card />
        },
        {
          path: 'dropdown',
          element: <Dropdown />
        },
        {
          path: 'grid',
          element: <Grid />
        },
        {
          path: 'avatar',
          element: <Avatar />
        },
        {
          path: 'calculation',
          element: <Calculation />
        },
        {
          path: 'buttons',
          element: <Button />
        },
        {
          path: 'tab',
          element: <Tab />
        },
        {
          path: 'input',
          element: <Input />
        },
        {
          path: 'nodata',
          element: <Nodata />
        },
        {
          path: 'popup',
          element: <Popup />
        },
        {
          path: 'subheader',
          element: <Subheader />
        },
        {
          path: 'header',
          element: <Header />
        },
        {
          path: 'phoneno',
          element: <Phoneno />
        },
        {
          path: 'progressbar',
          element: <ProgressBar />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'settings',
      children: [
        {
          path: 'role',
          element: <PrivateRoute element={Role}  moduleId={10}/>
        },
        {
          path: 'permission',
          element:<PrivateRoute element={Permissions} moduleId={10}/>
        }
      ]
    },

    {
      path: 'myprofile',
      element:<PrivateRoute element={Myprofile} />
    },
    {
      path: 'myprofile?id=:id',
      element:<PrivateRoute element={Myprofile} />
    },
    {
      path: 'employees',
      children: [
        {
          path: 'directory',
          element: <PrivateRoute element={Directory} />
        },
        {
          path: 'manageemployee',
          element:  <PrivateRoute element={ManageEmployee} moduleId={1} />
        }
      ]
    },
    {
      path: 'time-off',
      children: [
        {
          path: 'my-time-off',
          element: <PrivateRoute element={Mytimeoff} />
        },
        {
          path: 'employee-time-off',
          element:  <PrivateRoute element={EmployeeTimeoff} moduleId={3}/>
        },
        {
          path: 'setting',
          element:  <PrivateRoute element={TimeoffSetting} moduleId={4}/>
        },
       
      ]
    },
    {
      path: 'attendance',
      children: [
        {
          path: 'my-attendance',
          element:   <PrivateRoute element={Myattendance} />
        },
        {
          path: 'employe-attendance',
          element:  <PrivateRoute element={Employeattendance} moduleId={5} />
        },
        {
          path: 'my-attendance?id=:id',
          element:<PrivateRoute element={Myattendance} />
        },
        {
          path: 'settings',
          element: <PrivateRoute element={Attsettings} moduleId={6}/>
        }, 
        {
          path: 'offices',
          element: <PrivateRoute element={Offices} moduleId={6}/>
        }, 
        {
          path: 'workschedule',
          element:  <WorkSchedule/>
        },
      ]
    },
    {
      path: 'news',
      children: [
        {
          path: 'manage',
          element: <PrivateRoute element={News} moduleId={7} />
        },
      ]
    },
    {
      path: 'documents',
     
      children: [
        {
          path: 'documents',
          element:  <PrivateRoute element={Document} moduleId={8}/>,
        },
        {
          path: 'documentsdetails',
          element:  <PrivateRoute element={Documentdetails} moduleId={8}/>,
        },
      ]
    },
    {
      path: 'recruitment',
      children: [
        {
          path: 'job',
          element: <PrivateRoute element={Job} moduleId={9} />
        },
        {
          path: 'jobdeatil',
          element:  <PrivateRoute element={Jobdetails} moduleId={9} />
        },
        {
          path: 'candidate',
          element: <PrivateRoute element={Candidate} moduleId={9}/>
        },
        {
          path: 'settings',
          element:  <PrivateRoute element={RecruitmentSetting}  moduleId={9}/>
        },
      ]
    }
  ]
};

export default MainRoutes;
