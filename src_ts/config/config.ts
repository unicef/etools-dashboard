declare global {
  interface Window {EtoolsLogsLevel: string, EtoolsRequestCacheDb: any, devToolsExtension: any, Mixins: any}
}

window.EtoolsLogsLevel = 'INFO';

export const Config = {
  baseSite: window.location.origin,
  basePath: (window.location.port === '8080') ? '/' : '/dash/',
  productionDomain: 'etools.unicef.org',
  stagingDomain: 'etools-staging.unicef.org',
  demoDomain: 'etools-demo.unicef.org',
  devDomain: 'etools-dev.unicef.org',
  localDomain: 'localhost',
  loginPath: window.location.origin + '/login/',

  // TODO:is this needed ?
  // endpointsDomainConfig: {
  //   tokenEndpointsHost: {
  //     dash: window.location.port === '8082' ? 'http://127.0.0.1:8080' : 'https://etools-test.unicef.org'
  //   },

  //   tokenStorageKeys: {
  //     dash: 'etoolsDashToken'
  //   },

  //   getTokenEndpoints: {
  //     dash: 'dashToken'
  //   }
  // },

  _checkEnvironment: function() {
    let location = window.location.href;
    if (location.indexOf(this.stagingDomain) > -1) {
      return 'STAGING'
    }
    if (location.indexOf(this.demoDomain) > -1) {
      return 'DEMO'
    }
    if (location.indexOf(this.devDomain) > -1) {
      return 'DEVELOPMENT'
    } 
    if (location.indexOf(this.localDomain) > -1) {
      return 'LOCAL'
    }
    return null
  }
};
