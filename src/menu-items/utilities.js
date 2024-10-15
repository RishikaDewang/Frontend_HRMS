// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill,IconUserCircle,IconUsers    } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconUserCircle,
  IconUsers   
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const employees = {
  id: 'employees',
  title: 'employees',
  icon: icons.IconTypography,
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Directory',
      type: 'item',
      url: '/employees/directory',
      icon: icons.IconUserCircle,
      breadcrumbs: false
    },
    {
      // id: 'util-typog  raphy',
      title: 'Manage Employee',
      type: 'item',
      url: '/employees/manageemployee',
      icon: icons.IconUsers ,
      breadcrumbs: false,
       moduleId: 1, 
    },
  ]
};

export default employees;
