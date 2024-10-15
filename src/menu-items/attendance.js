// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill ,IconClock } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconClock 
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //
const attendance = {
  id: 'attendance',
  title: 'attendance',
  icon: icons.IconTypography,
  type: 'group',
  children: [
    {
      id: 'util-attendance',
      title: 'My Attendance',
      type: 'item',
      url: '/attendance/my-attendance',
      icon: icons.IconClock ,
      breadcrumbs: false
    },
   {
        id: 'util-emp-attendance',
        title: 'Team Attendance',
        type: 'item',
        url: '/attendance/employe-attendance',
        icon: icons.IconWindmill,
        breadcrumbs: false,
        moduleId: 5, 
      }
]
  
};

export default attendance;
