import { MenuRootItem } from 'ontimize-web-ngx';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'products', name: 'PRODUCTS', route: '/main/products', icon: 'inventory_2'},
  { id: 'categories', name: 'CATEGORIES', icon: 'collections_bookmark', route: '/main/categories' },
  { id: 'orders', name: 'ORDERS', icon: 'local_shipping', route: '/main/orders' },
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' }
];


