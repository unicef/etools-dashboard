export const CommonDataEndpoints = {
  userCountry: {
    url: '/api/v3/users/country/'
  },
  static: {
    url: '/api/v2/dropdowns/static/',
    exp: 6 * 60 * 60 * 1000, // 6h
    cachingKey: 'static'
  },
  actionPointsByMe: {
    template: '/api/action-points/action-points/?assigned_by=<%=id%>&status=open&ordering=-due_date',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'actionPointsByMe'
  },
  actionPointsForMe: {
    template: '/api/action-points/action-points/?assigned_to=<%=id%>&status=open&ordering=-due_date',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'actionPointsForMe'
  },
  trips: {
    template: '/api/t2f/travels/?f_traveler=<%=id%>',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'trips'
  },
  tripsSupervised: {
    template: '/api/t2f/travels/?f_supervisor=<%=id%>',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'tripsSupervised'
  },
}

export const Endpoints = {
  userCountry: {
    url: '/api/v3/users/country/'
  },
  staticData: {
    url: '/api/v2/dropdowns/static/',
    exp: 6 * 60 * 60 * 1000, // 6h
    cachingKey: 'staticData'
  },
  actionPointsByMe: {
    template: '/api/action-points/action-points/?assigned_by=<%=id%>&status=open&ordering=-due_date',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'actionPointsByMe'
  },
  actionPointsForMe: {
    template: '/api/action-points/action-points/?assigned_to=<%=id%>&status=open&ordering=-due_date',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'actionPointsForMe'
  },
  trips: {
    template: '/api/t2f/travels/?f_traveler=<%=id%>',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'trips'
  },
  tripsSupervised: {
    template: '/api/t2f/travels/?f_supervisor=<%=id%>',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'tripsSupervised'
  },
  countryProgrammes: {
    url: '/api/v2/reports/countryprogramme/',
    exp: 6 * 60 * 60 * 1000,
    cachingKey: 'countryProgrammes'
  },
  countries: {
    url: '/api/countries/',
    exp: 6 * 60 * 60 * 1000, // 6h
    cachingKey: 'countries'
  },
  changeCountry: {
    url: '/api/v3/users/changecountry/'
  },
  // agreements: {
  //   url: '/api/v2/agreements/',
  //   exp: 6 * 60 * 60 * 1000, // 6h
  //   cachingKey: 'agreements'
  // },
  // partners: {
  //   url: '/api/v2/partners/hact/',
  //   exp: 6 * 60 * 60 * 1000, // 6h
  //   cacheTableName: 'partners'
  // },
  // partnershipsOverview: {
  //   template: '/api/v2/partners/dashboard/',
  //   exp: 6 * 60 * 60 * 1000, // 6h
  //   cacheTableName: 'partnershipsOverview'
  // },
  // partnerDetails: {
  //   template: '/api/v2/partners/<%=id%>/'
  // },
  // partnersDropdown: {
  //   url: '/api/v2/partners/?hidden=false',
  //   exp: 6 * 60 * 60 * 1000, // 6h
  //   cachingKey: 'partnersDropdown'
  // },
  // static: {
  //   url: '/api/v2/dropdowns/static/',
  //   exp: 6 * 60 * 60 * 1000, // 6h
  //   cachingKey: 'static'
  // },
  // sectors: {
  //   url: '/api/reports/sectors/',
  //   exp: 6 * 60 * 60 * 1000,
  //   cachingKey: 'sectors'
  // },
  // actionPointsByMe: {
  //   template: '/api/action-points/action-points/?assigned_by=<%=id%>&status=open&ordering=-due_date',
  //   exp: 6 * 60 * 60 * 1000,
  //   cachingKey: 'actionPointsByMe'
  // },
  // actionPointsForMe: {
  //   template: '/api/action-points/action-points/?assigned_to=<%=id%>&status=open&ordering=-due_date',
  //   exp: 6 * 60 * 60 * 1000,
  //   cachingKey: 'actionPointsForMe'
  // },
  // mapInterventions: {
  //   url: '/api/v2/interventions/map/'
  // },
  // interventions: {
  //   url: '/api/v2/interventions/',
  //   exp: 10 * 60 * 1000,
  //   cachingKey: 'interventions'
  // },
  // donors: {
  //   url: '/api/v2/funds/donor/',
  //   exp: 10*60000,
  //   cachingKey: 'donors'
  // },
  // grants: {
  //   url: '/api/v2/dropdowns/pmp/',
  //   exp: 10*60000,
  //   cachingKey: 'grants'
  // },
  // partnerships: {
  //   template: '/api/v2/interventions/dash/',
  //   exp: 6 * 60 * 60 * 1000,
  //   cacheTableName: 'partnerships'
  // },
  // results: {
  //   url: '/api/v2/reports/results/',
  //   exp: 10*60000,
  //   cachingKey: 'results'
  // },
  pdssfas: {
    template: '/api/v2/interventions/partnership-dash/',
    exp: 6 * 60 * 60 * 1000, // 6h
    cacheTableName: 'pdssfas'
  },
  // actionPointsBySection: {
  //   template: '/api/t2f/action_points/dashboard/'
  // },
  // actionPointsBySectionOffice: {
  //   template: '/api/t2f/action_points/dashboard/?office_id=<%=office%>'
  // },
  myProfile: {
    template: '/api/v3/users/profile/'
  },
  attachments: {
    template: '/api/v2/attachments/',
    exp: 6 * 60 * 60 * 1000,
    cacheTableName: 'attachments'
  }
};
