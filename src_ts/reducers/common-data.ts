/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {Reducer} from 'redux';
import {merge} from 'ramda';
import {
  SET_ACTION_PTS_BY_ME,
  SET_ACTION_PTS_FOR_ME,
  SET_TRIPS,
  SET_TRIPS_SUPERVISED,
  // SET_AGREEMENTS,
  SET_COUNTRY_PROGRAMMES,
  // SET_INTERVENTIONS,
  // SET_OFFICES,
  // SET_PARTNERSHIPS,
  SET_PDSSFAS,
  // SET_SECTORS,
  SET_STATIC_DATA,
  // SET_TRIPS_YEARS,
  // SET_UNICEF_USERS,
  SET_USER_COUNTRY,
  SET_ATTACHMENTS
} from '../actions/common-data'

export class CommonDataState {
  countryProgrammes: object[] = []
  // offices: object[] = []
  // sectors: object[] = []
  trips: object[] | null = []
  tripsSupervised: object[] | null = []
  actionPointsByMe: object[] | null = []
  actionPointsForMe: object[] | null = []
  // partnerships: object[] = []
  // tripsYears: object[] = []
  // unicefUsers: object[] = []
  staticData: object | null = {}
  userCountry: object | null
  // hactGraphs: object[] = []
  // donors: object[] = []
  // grants: object[] = []
  // results: object[] = []
  // clusters: object[] = []
  attachments: object[] = []
  pdssfas: object[] = []
}

export const INITIAL_STATE = new CommonDataState;

const commonData: Reducer<CommonDataState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TRIPS:
      return merge(state, { trips: action.trips });
    case SET_TRIPS_SUPERVISED:
      return merge(state, { tripsSupervised: action.tripsSupervised });
    case SET_ACTION_PTS_BY_ME:
      return merge(state, { actionPointsByMe: action.actionPointsByMe });
    case SET_ACTION_PTS_FOR_ME:
      return merge(state, { actionPointsForMe: action.actionPointsForMe });
    case SET_COUNTRY_PROGRAMMES:
      return merge(state, { countryProgrammes: action.countryProgrammes });
    // case SET_OFFICES:
    //   return merge(state, { offices: action.offices });
    case SET_PDSSFAS:
      return merge(state, { pdssfas: action.pdssfas });
    // case SET_PARTNERSHIPS:
    //   return merge(state, { partnerships: action.partnerships });
    // case SET_TRIPS_YEARS:
    //   return merge(state, { tripsYears: action.tripsYears });
    // case SET_SECTORS:
    //   return merge(state, { sectors: action.sectors });
    // case SET_UNICEF_USERS:
    //   return merge(state, { unicefUsers: action.unicefUsers });
    case SET_STATIC_DATA:
      return merge(state, { staticData: action.staticData });
    case SET_USER_COUNTRY:
      return merge(state, { userCountry: action.userCountry });
    case SET_ATTACHMENTS:
      return merge(state, { attachments: action.attachments })
    // case SET_HACT_GRAPHS:
    //   return merge(state, { hactGraphs: action.hactGraphs });

    // case SET_AGREEMENTS:
    //   return merge(state, {
    //     agreements: action.agreements
    //   });

    // case SET_INTERVENTIONS:
    //   return merge(state, {
    //     interventions: action.interventions
    //   });

    // case 'SET_GRANTS':
    //   return merge(state, {
    //     grants: action.grants
    //   });
    // case 'SET_DONORS':
    //   return merge(state, {
    //     donors: action.donors
    //   });
    // case 'SET_RESULTS':
    //   return merge(state, {
    //     results: action.results
    //   });

    // case 'SET_CLUSTERS':
    //   return merge(state, {
    //     clusters: action.clusters
    //   });
    default:
      return state;
  }
};

export default commonData;
