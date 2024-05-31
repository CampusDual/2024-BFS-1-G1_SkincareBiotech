import { MenuRootItem } from 'ontimize-web-ngx';
 
export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'featuredPublic', name: 'FEATURED_LINK', icon: 'stars', route: '/' },
  { id: 'productsPublic', name: 'PRODUCTS_LINK', icon: 'inventory_2', route: '/view' },
  { id: 'products', name: 'PRODUCTS', route: '/main/products', icon: 'inventory_2'},
  { id: 'categories', name: 'CATEGORIES', icon: 'collections_bookmark', route: '/main/categories' },
  { id: 'brands', name: 'BRANDS', icon: 'label', route: '/main/brands' },
  { id: 'orders', name: 'ORDERS', icon: 'local_shipping', route: '/main/orders' },
  { id: 'data-analysis', name: 'DATA_ANALYSIS', icon: 'bar_chart', route: '/main/data-analysis' },
  { id: 'sellers', name:'SELLERS', route: '/main/admin/sellers/', icon: 'person'},
  { id: 'billed-age', name: 'BILLED_AGE', icon: 'bar_chart', route: '/main//data-analysis/billed-age' },
  { id: 'login', name: 'LOGIN', route: '/login', icon: 'power_settings_new'},
  { id: 'cart', name:'CART', route: '/order/cart', icon: 'shopping_cart'},
  { id: 'profile', name: 'PROFILE', route: '/profile', icon: 'person'},
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' },
];