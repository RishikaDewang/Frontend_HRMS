// assets
import { IconBrandChrome, IconHelp,IconNews,IconFiles } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp,IconNews,IconFiles };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'News',
      title: 'News',
      type: 'item',
      url: '/news/manage',
      icon: icons.IconNews,
      breadcrumbs: false,
      moduleId: 4,
    },
    {
      id: 'Document',
      title: 'Document',
      type: 'item',
      url: '/documents/documents',
      icon: icons.IconFiles, 
      moduleId: 5,
    }
  ]
};

export default other;
