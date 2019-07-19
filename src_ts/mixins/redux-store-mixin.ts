import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { element } from 'polymer-redux-typescript';
import { merge } from 'ramda';
// import '../scripts/redux';
// @ts-ignore
export const Mixins;

var Redux = Redux || {};
var PolymerRedux = PolymerRedux || {};

const initial = {
  countryProgrammes: [],
  offices: [],
  sectors: [],
  trips: null,
  tripsSupervised: null,
  actionPointsByMe: null,
  actionPointsForMe: null,
  partnerships: [],
  tripsYears: [],
  unicefUsers: [],
  static: null,
  userCountry: null,
  hactGraphs: [],
  donors: [],
  grants: [],
  results: [],
  clusters: [],
  pdssfas: []
};

const reducer = (state, action) => {

  switch (action.type) {
    case 'SET_COUNTRY_PROGRAMMES':
      return merge(state, { countryProgrammes: action.countryProgrammes });

    case 'SET_OFFICES':
      return merge(state, { offices: action.offices });

    case 'SET_TRIPS':
      return merge(state, { trips: action.trips });

    case 'SET_TRIPS_SUPERVISED':
      return merge(state, { tripsSupervised: action.tripsSupervised });

    case 'SET_ACTION_PTS_BY_ME':
      return merge(state, { actionPointsByMe: action.actionPointsByMe });

    case 'SET_ACTION_PTS_FOR_ME':
      return merge(state, { actionPointsForMe: action.actionPointsForMe });

    case 'SET_PDSSFAS':
      return merge(state, { pdssfas: action.pdssfas });

    case 'SET_PARTNERSHIPS':
      return merge(state, { partnerships: action.partnerships });

    case 'SET_TRIPS_YEARS':
      return merge(state, { tripsYears: action.tripsYears });

    case 'SET_SECTORS':
      return merge(state, { sectors: action.sectors });

    case 'SET_UNICEF_USERS':
      return merge(state, { unicefUsers: action.unicefUsers });

    case 'SET_STATIC_DATA':
      return merge(state, { static: action.static });

    case 'SET_USER_COUNTRY':
      return merge(state, { userCountry: action.userCountry });

    case 'SET_HACT_GRAPHS':
      return merge(state, { hactGraphs: action.hactGraphs });

    case 'SET_AGREEMENTS':
      return merge(state, {
        agreements: action.agreements
      });

    case 'SET_INTERVENTIONS':
      return merge(state, {
        interventions: action.interventions
      });

    case 'SET_GRANTS':
      return merge(state, {
        grants: action.grants
      });

    case 'SET_DONORS':
      return merge(state, {
        donors: action.donors
      });

    case 'SET_RESULTS':
      return merge(state, {
        results: action.results
      });

    case 'SET_CLUSTERS':
      return merge(state, {
        clusters: action.clusters
      });

    default:
      return state;

  }
};

const store = Redux.createStore(
  reducer,
  initial,
  Redux.compose(
    window.devToolsExtension
      ? window.devToolsExtension()
      : (v) => v
  ));

/**
* @polymer
* @mixinFunction
*/
Mixins.ReduxStore = dedupingMixin(element(store));
