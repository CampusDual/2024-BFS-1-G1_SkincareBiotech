import { MenuRootItem } from 'ontimize-web-ngx';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  {
    id: 'admin', name: 'ADMIN', tooltip: 'ADMIN', icon: 'admin_panel_settings',
    items: [
      { id: 'roles', name: 'ROLES', tooltip: 'ROLES', route: '/main/admin/roles', icon: 'supervisor_account' },
      { id: 'users', name: 'USERS', tooltip: 'USERS', route: '/main/admin/users', icon: 'person' },
    ]
  },
  { id: 'products', name: 'PRODUCTS', route: '/main/products', icon: 'inventory_2', 
    items:[
      { id: 'categories', name: 'CATEGORIES', icon: 'collections_bookmark', route: '/main/categories' },
      { id: 'brands', name: 'BRANDS', icon: 'label', route: '/main/brands' }
    ]
  },
  { id: 'orders', name: 'ORDERS', icon: 'local_shipping', route: '/main/orders' },
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' }
];


