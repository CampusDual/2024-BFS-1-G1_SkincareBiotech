import { MenuRootItem } from 'ontimize-web-ngx';
 
export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home' },
  { id: 'data-analysis', name: 'DATA_ANALYSIS', icon: 'bar_chart', route: '/main/data-analysis' },
  { id: 'customer-analysis', name: 'CUSTOMER_ANALYSIS', icon: 'assignment_ind', route: '/main/data-analysis/customer-analysis' },
  { id: 'sells-by-category', name: 'DATA_BY_CATEGORY', icon: 'category', route: '/main/data-analysis/bycategory'},
  { id: 'users-skin-types', name: 'DATA_BY_SKIN', icon: 'pie_chart_icon', route: '/main/data-analysis/skintypes'},
  { id: 'billed-age', name: 'BILLED_AGE', icon: 'bar_chart', route: '/main/data-analysis/billed-age' },
  { id: 'age-range-configuration', name: 'CHART_SETTINGS', icon: 'settings_icon', route: '/main/data-analysis/age-range-configuration' }, 
  { id: 'featuredPublic', name: 'FEATURED_LINK', icon: 'stars', route: '/' },
  { id: 'productsPublic', name: 'PRODUCTS_LINK', icon: 'inventory_2', route: '/view' },
  { id: 'products', name: 'PRODUCTS', route: '/main/products', icon: 'inventory_2'},
  { id: 'orders', name: 'ORDERS', icon: 'local_shipping', route: '/main/orders' },
  { id: 'sellers', name:'SELLERS', route: '/main/admin/sellers/', icon: 'person'},
  { id: 'allergens', name: 'ALLERGENS', route: '/main/admin/allergens', icon: 'priority_high'},
  { id: 'skin-types', name: 'SKIN_TYPES', icon: 'accessibility', route: '/main/skin-types' },
  { id: 'categories', name: 'CATEGORIES', icon: 'collections_bookmark', route: '/main/categories' },
  { id: 'brands', name: 'BRANDS', icon: 'label', route: '/main/brands' },
  { id: 'commissions', name:'COMMISSIONS', route: '/main/admin/commissions/', icon: 'payments'},
  { id: 'login', name: 'LOGIN', route: '/login', icon: 'power_settings_new'},
  { id: 'profile', name: 'PROFILE', route: '/profile', icon: 'person'},
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' },
];

