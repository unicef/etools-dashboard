export const Endpoints = {
  changeCountry: {
    url: '/api/v3/users/changecountry/'
  },
  countries: {
    url: '/api/countries/',
    exp: 6 * 60 * 60 * 1000, // 6h
    cachingKey: 'countries'
  },
  myProfile: {
    template: '/api/v3/users/profile/'
  },
  userCountry: {
    url: '/api/v3/users/country/'
  },
};
