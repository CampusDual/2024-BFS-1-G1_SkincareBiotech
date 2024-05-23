import { MenuRootItem } from 'ontimize-web-ngx';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'productsPublic', name: 'PRODUCTS_LINK', icon: 'inventory_2', route: '/view' },
  { id: 'featuredPublic', name: 'FEATURED_LINK', icon: 'stars', route: '/' },
  { id: 'history', name: 'ORDERS_HISTORY', icon: 'local_shipping', route: '/order/history' },
  { id: 'products', name: 'PRODUCTS', route: '/main/products', icon: 'inventory_2'},
  { id: 'categories', name: 'CATEGORIES', icon: 'collections_bookmark', route: '/main/categories' },
  { id: 'brands', name: 'BRANDS', icon: 'label', route: '/main/brands' },
  { id: 'orders', name: 'ORDERS', icon: 'local_shipping', route: '/main/orders' },
  { id: 'data-analysis', name: 'DATA_ANALYSIS', icon: 'bar_chart', route: '/main/data-analysis' },
  { id: 'login', name: 'LOGIN', route: '/login', icon: 'power_settings_new'},
  { id: 'cart', name:'CART', route: '/order/cart', icon: 'shopping_cart'},
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' },
];