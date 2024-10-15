// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill , IconPlane} from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconPlane
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const timeoff = {
  id: 'timeoff',
  title: 'time off',
  icon: icons.IconTypography,
  type: 'group',
  children: [
    {
      id: 'util-timeoff',
      title: 'My Time off',
      type: 'item',
      url: '/time-off/my-time-off',
      icon: icons.IconPlane,
      breadcrumbs: false
    },
    {
      id: 'util-typog  raphy',
      title: 'Employee Time off',
      type: 'item',
      url: '/time-off/employee-time-off',
      icon: icons.IconShadow,
      breadcrumbs: false,
      moduleId: 3, 
    },
  ]
};

export default timeoff;
