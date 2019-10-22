declare global {
  interface Window {
    EtoolsLogsLevel: string,
    EtoolsRequestCacheDb: any,
    devToolsExtension: any,
    EtoolsDashboard: any,
    __REDUX_DEVTOOLS_EXTENSION__?: any,
  }
}

window.EtoolsLogsLevel = 'INFO';

export const BASE_URL = '/dash/';

export const Config = {
  baseSite: window.location.origin,
  basePath: (window.location.port === '8080') ? '/' : '/dash/',
  productionDomain: 'etools.unicef.org',
  stagingDomain: 'etools-staging.unicef.org',
  demoDomain: 'etools-demo.unicef.org',
  devDomain: 'etools-dev.unicef.org',
  localDomain: 'localhost',
  loginPath: window.location.origin + '/login/',

  _checkEnvironment: function() {
    let location = window.location.href;
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
