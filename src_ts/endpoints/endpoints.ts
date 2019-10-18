export const Endpoints = {
  userCountry: {
    url: '/api/v3/users/country/'
  },
  countries: {
    url: '/api/countries/',
    exp: 6 * 60 * 60 * 1000, // 6h
    cachingKey: 'countries'
  },
  changeCountry: {
    url: '/api/v3/users/changecountry/'
  },
  myProfile: {
    template: '/api/v3/users/profile/'
  }
};
