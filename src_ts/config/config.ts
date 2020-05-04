import {GenericObject} from '../typings/globals.types';

declare global {
  interface Window {
    EtoolsLogsLevel: string,
    devToolsExtension: GenericObject,
    EtoolsDashboard: GenericObject
  }
}

window.EtoolsLogsLevel = 'INFO';

export const BASE_URL = '/dash/';

export const Config = {
  basePath: (window.location.port === '8080') ? '/' : '/dash/',
  baseSite: window.location.origin,
  demoDomain: 'etools-demo.unicef.org',
  devDomain: 'etools-dev.unicef.org',
  localDomain: 'localhost',
  loginPath: window.location.origin + '/login/',
  productionDomain: 'etools.unicef.org',
  stagingDomain: 'etools-staging.unicef.org',

  _checkEnvironment: function(): string {
    const location = window.location.href;
    if (location.indexOf(this.stagingDomain) > -1) {
      return 'STAGING';
    }
    if (location.indexOf(this.demoDomain) > -1) {
      return 'DEMO';
    }
    if (location.indexOf(this.devDomain) > -1) {
      return 'DEVELOPMENT';
    }
    if (location.indexOf(this.localDomain) > -1) {
      return 'LOCAL';
    }
    return null;
  }
};
