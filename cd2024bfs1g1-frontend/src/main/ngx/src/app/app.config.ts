import { Config } from 'ontimize-web-ngx';

import { environment } from '../environments/environment';
import { MENU_CONFIG } from './shared/app.menu.config';
import { SERVICE_CONFIG } from './shared/app.services.config';

export const CONFIG: Config = {
  // The base path of the URL used by app services.
  //apiEndpoint:  (window['__env'] !== undefined) ? window['__env']['apiUrl'] : environment.apiEndpoint ,
  apiEndpoint: 'http://localhost:8085',
  //(window['__env'] !== undefined) ? window['__env']['apiUrl'] : environment.apiEndpoint,
  // --GRUPO 5 : Para probar usar localhost (8080, con http, sin la s)

  // Application identifier. Is the unique package identifier of the app.
  // It is used when storing or managing temporal data related with the app.
  // By default is set as 'ontimize-web-uuid'.
  uuid: 'com.campusdual.cd2024bfs1g1',

  // Title of the app
  title: 'JEE seed',

  // Language of the application.
  locale: 'en',

  // The service type used (Ontimize REST standart, Ontimize REST JEE
  // or custom implementation) in the whole application.
  serviceType: 'OntimizeEE',

  // Configuration parameters of application services.
  servicesConfiguration: SERVICE_CONFIG,

  appMenuConfiguration: MENU_CONFIG,

  applicationLocales: ['es', 'en'],

  permissionsServiceType: 'OntimizeEEPermissions' /* Optional, OntimizeEEPermissions is the default value */,
  permissionsConfiguration: {
    service: 'permissions',
  },

  exportConfiguration: {
    path:'/export'
 }
};
