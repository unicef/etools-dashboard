import 'moment-element/moment-element';

export const ReduxProps = [
  {
    propName: 'clusters',
    endpointProps: {
      name: 'clusters',
      templateProps: {}
    }
  },
  {
    propName: 'countryProgrammes',
    endpointProps: {
      name: 'countryProgrammes'
    }
  },
  {
    propName: 'offices',
    endpointProps: {
      name: 'offices',
      templateProps: {}
    }
  },
  {
    propName: 'trips',
    endpointProps: function() {
      return { name: 'trips', templateProps: { id: this.user.user } };
    }
  },
  {
    propName: 'tripsSupervised',
    endpointProps: function() {
      return { name: 'tripsSupervised', templateProps: { id: this.user.user } };
    }
  },
  {
    propName: 'actionPointsByMe',
    endpointProps: function() {
      return { name: 'actionPointsByMe', templateProps: { id: this.user.user } };
    }
  },
  {
    propName: 'actionPointsForMe',
    endpointProps: function() {
      return { name: 'actionPointsForMe', templateProps: { id: this.user.user } };
    }
  },
  {
    propName: 'pdssfas',
    endpointProps: {
      name: 'csoDashboard',
      templateProps: {}
    }
  },
  {
    propName: 'partnerships',
    endpointProps: {
      name: 'partnerships',
      templateProps: {}
    }
  },
  {
    propName: 'tripsYears',
    endpointProps: {}
  },
  {
    propName: 'sectors',
    endpointProps: {
      name: 'sectors',
      templateProps: {}
    }
  },
  {
    propName: 'unicefUsers',
    endpointProps: {
      name: 'unicefUsers',
      templateProps: {}
    }
  },
  {
    propName: 'static',
    endpointProps: {
      name: 'static',
      templateProps: {}
    }
  },
  {
    propName: 'userCountry',
    endpointProps: {
      name: 'userCountry',
      templateProps: {}
    }
  },
  {
    propName: 'hactGraphs',
    endpointProps: {
      name: 'hactGraphs',
      templateProps: {}
    }
  },
  {
    propName: 'agreements',
    endpointProps: {
      name: 'agreements',
      templateProps: {}
    }
  },
  {
    propName: 'interventions',
    endpointProps: {
      name: 'interventions',
      templateProps: {}
    }
  },
  {
    propName: 'donors',
    endpointProps: {
      name: 'donors',
      templateProps: {}
    }
  },
  {
    propName: 'grants',
    endpointProps: {
      name: 'grants',
      templateProps: {}
    }
  },
  {
    propName: 'results',
    endpointProps: {
      name: 'results',
      templateProps: {}
    }
  }


];
