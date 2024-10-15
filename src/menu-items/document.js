import { IconTypography, IconPalette, IconShadow, IconWindmill,IconUserCircle,IconUsers ,IconFiles    } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconUserCircle,
  IconUsers ,
  IconFiles   
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const document = {
  id: 'document',
  title: 'document',
  icon: icons.IconTypography,
  type: 'group',
  children: [
    {
      id: 'util-document',
      title: 'Document',
      type: 'item',
      url: '/documents/documents',
      icon: icons.IconFiles ,
      breadcrumbs: false,
      moduleId: 8,
    },

  ]
};

export default document;