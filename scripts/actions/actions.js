/*
 This was created to keep all static data being loaded in one place. Use template below to add data
 from an endpoint into the redux store.
 Template object:

 {
 actionType: '',
 propsArray: [''],
 endpointProps: {
 name: '',
 templateProps: {}
 },
 prepareData: function(data) {}

 }

 */

const Actions = [
  {
    actionType: 'countryProgrammes',
    propsArray: ['countryProgrammes'],
    endpointProps: {
      name: 'countryProgrammes'
    },
    prepareData: function(data) {
      data = data || [];
      return data.map(function(cp) {
        return _.pick(cp, ['id', 'name']);
      });
    }
  },
  {
    actionType: 'offices',
    propsArray: ['offices'],
    endpointProps: {
      name: 'offices',
      templateProps: {}
    },
    prepareData: function(data) {
      data = data || [];
      return data.map(function(office) {
        return _.pick(office, ['id', 'name']);
      });
    }
  },
  {
    actionType: 'trips',
    propsArray: ['trips'],
    endpointProps: function() {
      let ret = {name: 'trips', templateProps: {id: this.user.id}};
      return ret;
    },
    prepareData: function(data) {
      return data.length
        ? data.map(function(trip) {
            return _.pick(trip, ['id', 'start_date', 'purpose', 'reference_number', 'supervisor_name']);
          })
        : [];
    }
  },
  {
    actionType: 'tripsSupervised',
    propsArray: ['tripsSupervised'],
    endpointProps: function() {
      let ret = {name: 'tripsSupervised', templateProps: {id: this.user.id}};
      return ret;
    },
    prepareData: function(data) {
      return data.length
        ? data.map(trip=> {
            return _.pick(trip, ['id', 'start_date', 'purpose', 'reference_number', 'traveler']);
          })
        : [];
    }
  },
  {
    actionType: 'actionPointsByMe',
    propsArray: ['actionPointsByMe'],
    endpointProps: function() {
      let ret = {name: 'actionPointsByMe', templateProps: {id: this.user.id}};
      return ret;
    },
    prepareData: function(data) {
      return data.length
        ? data.map(function(actionPoint) {
            return _.pick(actionPoint, ['status', 'description', 'created_at', 'person_responsible_name', 'id', 'due_date']);
          })
        : [];
    }
  },
  {
    actionType: 'actionPointsForMe',
    propsArray: ['actionPointsForMe'],
    endpointProps: function() {
      let ret = {name: 'actionPointsForMe', templateProps: {id: this.user.id}};
      return ret;
    },
    prepareData: function(data) {
      return data.length
        ? data.map(function(actionPoint) {
            return _.pick(actionPoint, ['status', 'description', 'created_at', 'assigned_by_name', 'id', 'due_date']);
          })
        : [];
    }
  },
  {
    actionType: 'partnerships',
    propsArray: ['partnerships'],
    endpointProps: {
      name: 'partnerships',
      templateProps: {}
    },
    prepareData: function(data) {
      return data.length
        ? data.map(function(partnership) {
            return _.pick(partnership, ['id', 'title', 'number', 'total_unicef_budget']);
          })
        : null;
    }
  },
  {
    actionType: 'tripsYears',
    propsArray: ['tripsYears'],
    endpointProps: {},
    prepareData: function() {
      return _.range(2015, moment().year() + 1);
    }
  },
  {
    actionType: 'sections',
    propsArray: ['sections'],
    endpointProps: {
      name: 'sections',
      templateProps: {}
    },
    prepareData: function(data) {
      data = data || [];
      return data.map(function(d) {
        return {
          value: parseInt(d.id, 10),
          label: d.name
        };
      });
    }
  },
  {
    actionType: 'sectors',
    propsArray: ['sectors'],
    endpointProps: {
      name: 'sectors',
      templateProps: {}
    },
    prepareData: function(data) {
      data = data || [];
      return data.map(function(d) {
        return {
          value: d.id,
          label: d.name
        };
      });
    }
  },
  {
    actionType: 'unicefUsersData',
    propsArray: ['unicefUsersData'],
    endpointProps: {
      name: 'unicefUsers',
      templateProps: {}
    },
    prepareData: function(data) {
      data = data || [];
      return data.map(function(d) {
        return {
          value: parseInt(d.id, 10),
          label: d.name
        };
      });
    }
  },
  {
    actionType: 'static',
    propsArray: ['static'],
    endpointProps: {
      name: 'static',
      templateProps: {}
    },
    prepareData: data=>data
  },
  {
    actionType: 'userCountry',
    propsArray: ['userCountry'],
    endpointProps: {
      name: 'userCountry',
      templateProps: {}
    },
    prepareData: function(data) {
      return data[0];
    }
  },
  {
    actionType: 'hactGraphs',
    propsArray: ['hactGraphs'],
    endpointProps: {
      name: 'hactGraphs',
      templateProps: {}
    },
    prepareData: x=>x.partner_values
  }
];
