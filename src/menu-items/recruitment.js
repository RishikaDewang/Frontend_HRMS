// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill ,IconClock ,IconBriefcase,IconUserPlus } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconClock,
  IconBriefcase,
  IconUserPlus  
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //
const recruitment = {
  id: 'recruitment',
  title: 'recruitment',
  icon: icons.IconTypography,
  type: 'group',
  children: [
    {
      id: 'util-recruitment',
      title: 'Jobs',
      type: 'item',
      url: '/recruitment/job',
      icon: icons.IconBriefcase ,
      breadcrumbs: false,
      moduleId: 9
    },
    {
        id: 'util-candidate',
        title: 'Candidate',
        type: 'item',
        url: '/recruitment/candidate',
        icon: icons.IconUserPlus  ,
        breadcrumbs: false,
        moduleId: 9
      }
]
  
};

export default recruitment;
