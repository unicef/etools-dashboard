export const Endpoints = {
  changeCountry: {
    url: '/api/v3/users/changecountry/',
  },
  countries: {
    url: '/api/countries/',
  },
  myProfile: {
    url: '/api/v3/users/profile/',
  },
  userCountry: {
    url: '/api/v3/users/country/',
  },
  static: {
    url: '/api/v2/dropdowns/static/',
    exp: 6 * 60 * 60 * 1000, // 6h
    cachingKey: 'static',
  },
  sectors: {
    url: '/api/reports/sectors/',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'sectors',
  },
  offices: {
    url: '/api/offices/',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'offices',
  },
  partnershipsOverview: {
    template: '/api/v2/partners/dashboard/',
    exp: 6 * 60 * 60 * 1000, // 6h
    cacheTableName: 'partnershipsOverview',
  },
  csoDashboard: {
    template: '/api/v2/interventions/partnership-dash/',
    exp: 6 * 60 * 60 * 1000, // 6h
    cacheTableName: 'csoDashboard',
  },
};
