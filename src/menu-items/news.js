import { IconTypography, IconPalette, IconShadow, IconWindmill,IconUserCircle,IconUsers  ,IconNews   } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconUserCircle,
  IconUsers  ,
  IconNews  
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const news = {
  id: 'news',
  title: 'news',
  icon: icons.IconTypography,
  type: 'group',
  children: [
    {
      id: 'util-news',
      title: 'News',
      type: 'item',
      url: '/news/manage',
      icon: icons.IconNews ,
      breadcrumbs: false,
      moduleId: 7,
    },

  ]
};

export default news;