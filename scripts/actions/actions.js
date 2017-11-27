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
    prepareData: data => {
      data = data || [];
      return data.map(cp => {
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
    prepareData: data => {
      data = data || [];
      return data.map(office => {
        return _.pick(office, ['id', 'name']);
      });
    }
  },
  {
    actionType: 'trips',
    propsArray: ['trips'],
    endpointProps: function() {
      return {name: 'trips', templateProps: {id: this.user.id}};
    },
    prepareData: data => {
      return data.length
        ? data.map(trip => {
            return _.pick(trip, ['id', 'start_date', 'purpose', 'reference_number', 'supervisor_name']);
          })
        : [];
    }
  },
  {
    actionType: 'tripsSupervised',
    propsArray: ['tripsSupervised'],
    endpointProps: function() {
      return {name: 'tripsSupervised', templateProps: {id: this.user.id}};
    },
    prepareData: data => {
      return data.length
        ? data.map(trip => {
            return _.pick(trip, ['id', 'start_date', 'purpose', 'reference_number', 'traveler']);
          })
        : [];
    }
  },
  {
    actionType: 'actionPointsByMe',
    propsArray: ['actionPointsByMe'],
    endpointProps: function() {
      return {name: 'actionPointsByMe', templateProps: {id: this.user.id}};
    },
    prepareData: data => {
      return data.length
        ? data.map(actionPoint => {
            return _.pick(actionPoint, ['status', 'description', 'created_at', 'person_responsible_name', 'id', 'due_date']);
          })
        : [];
    }
  },
  {
    actionType: 'actionPointsForMe',
    propsArray: ['actionPointsForMe'],
    endpointProps: function() {
      return {name: 'actionPointsForMe', templateProps: {id: this.user.id}};
    },
    prepareData: data => {
      return data.length
        ? data.map(actionPoint => {
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
    prepareData: data => {
      return data.length
        ? data.map(partnership => {
            return _.pick(partnership, ['id', 'title', 'number', 'total_unicef_budget']);
          })
        : null;
    }
  },
  {
    actionType: 'tripsYears',
    propsArray: ['tripsYears'],
    endpointProps: {},
    prepareData: () => {
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
    prepareData: data => {
      data = data || [];
      return data.map(d => {
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
    prepareData: data => {
      data = data || [];
      return data.map(d => {
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
    prepareData: data => {
      data = data || [];
      return data.map(d => {
        return {
          value: parseInt(d.user_id, 10),
          label: d.full_name
        };
      });
    }
  },
  {
    actionType: 'statuses',
    propsArray: ['statuses'],
    endpointProps: {
      name: 'static',
      templateProps: {}
    },
    prepareData: data => {
      return _.get(data, 'intervention_status', []);
    }
  },
  {
    actionType: 'userCountry',
    propsArray: ['userCountry'],
    endpointProps: {
      name: 'userCountry',
      templateProps: {}
    },
    prepareData: data => {
      return data[0];
    }
  }
];
