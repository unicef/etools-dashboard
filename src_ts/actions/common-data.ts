// /**
//  @license
//  Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
//  This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
//  The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
//  The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
//  Code distributed by Google as part of the polymer project is also
//  subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
//  */

import {Action, ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';
import { map, pick, 
  // range, 
  // head 
} from 'ramda';
// import moment from 'moment';
// import {EndpointsMixin} from '../endpoints/endpoints-mixin';
// import {Endpoints} from '../endpoints/endpoints';
// import {RootState} from '../store';
// import {Config} from '../config/config';
export const SET_TRIPS = 'SET_TRIPS';
export const SET_TRIPS_SUPERVISED = 'SET_TRIPS_SUPERVISED';
export const SET_ACTION_PTS_BY_ME = 'SET_ACTION_PTS_BY_ME';
export const SET_ACTION_PTS_FOR_ME = 'SET_ACTION_PTS_FOR_ME';
export const SET_COUNTRY_PROGRAMMES = 'SET_COUNTRY_PROGRAMMES';
export const SET_OFFICES = 'SET_OFFICES';
export const SET_PDSSFAS = 'SET_PDSSFAS';
export const SET_PARTNERSHIPS = 'SET_PARTNERSHIPS';
// export const SET_TRIPS_YEARS = 'SET_TRIPS_YEARS';
export const SET_SECTORS = 'SET_SECTORS';
export const SET_UNICEF_USERS = 'SET_UNICEF_USERS';
export const SET_STATIC_DATA = 'SET_STATIC_DATA';
export const SET_USER_COUNTRY = 'SET_USER_COUNTRY';
export const SET_AGREEMENTS = 'SET_AGREEMENTS';
export const SET_INTERVENTIONS = 'SET_INTERVENTIONS';

export interface PersonalizedDataSetTrips extends Action<'SET_TRIPS'> {
  trips: object[]
}

export interface PersonalizedDataSetTripsSupervised extends Action<'SET_TRIPS_SUPERVISED'> {
  tripsSupervised: object[]
}

export interface PersonalizedDataSetActionPointsByMe extends Action<'SET_ACTION_PTS_BY_ME'> {
  actionPointsByMe: object[]
}

export interface PersonalizedDataSetActionPointsForMe extends Action<'SET_ACTION_PTS_FOR_ME'> {
  actionPointsForMe: object[]
}

export interface CommonDataActionSetCountryProgrammes extends Action<'SET_COUNTRY_PROGRAMMES'> {
  countryProgrammes: object[]
}

export interface CommonDataActionSetOffices extends Action<'SET_OFFICES'> {
  offices: object[]
}

export interface CommonDataActionSetPdssfas extends Action<'SET_PDSSFAS'> {
  pdssfas: object[]
}

export interface CommonDataActionSetPartnerships extends Action<'SET_PARTNERSHIPS'> {
  partnerships: object[]
}

// export interface CommonDataActionSetTripsYears extends Action<'SET_TRIPS_YEARS'> {
//   tripsYears: number[]
// }

export interface CommonDataActionSetSectors extends Action<'SET_SECTORS'> {
  sectors: object[]
}

export interface CommonDataActionSetUnicefUsers extends Action<'SET_UNICEF_USERS'> {
  unicefUsers: object[]
}

export interface CommonDataActionSetStaticData extends Action<'SET_STATIC_DATA'> {
  staticData: object
}

export interface CommonDataActionSetUserCountry extends Action<'SET_USER_COUNTRY'> {
  userCountry: object
}

export interface CommonDataActionSetAgreements extends Action<'SET_AGREEMENTS'> {
  agreements: object[]
}

export interface CommonDataActionSetInterventions extends Action<'SET_INTERVENTIONS'> {
  interventions: object[]
}

// export interface CommonDataActionSetAttachments extends Action<'SET_ATTACHMENTS'> {
//   attachments: object[]
// }

export type CommonDataAction = CommonDataActionSetCountryProgrammes | CommonDataActionSetOffices |
                               CommonDataActionSetPdssfas | CommonDataActionSetPartnerships | 
                              //  CommonDataActionSetTripsYears |
                               CommonDataActionSetSectors | CommonDataActionSetUnicefUsers | CommonDataActionSetStaticData |
                               CommonDataActionSetUserCountry | CommonDataActionSetAgreements | CommonDataActionSetInterventions 
                              //  CommonDataActionSetAttachments;

// @ts-ignore - for now
type ThunkResult = ThunkAction<void, RootState, undefined, CommonDataAction>;

// export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> {page: string};
// export interface AppActionUpdateDrawerState extends Action<'UPDATE_DRAWER_STATE'> {opened: boolean};

// export type AppAction = AppActionUpdatePage | AppActionUpdateDrawerState;

// type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

// const updatePage: ActionCreator<AppActionUpdatePage> = (page: string) => {
//   return {
//     type: UPDATE_PAGE,
//     page
//   };
// };

// const loadPage: ActionCreator<ThunkResult> = (page: string) => (dispatch) => {
//   switch (page) {
//     case 'page-one':
//       import('../components/pages/page-one.js').then(() => {
//         // Put code in here that you want to run every time when
//         // navigating to view1 after my-view1.js is loaded.
//       });
//       break;
//     case 'page-two':
//       import('../components/pages/page-two.js');
//       break;
//     default:
//       page = 'page-not-found';
//       import('../components/pages/page-not-found.js');
//   }

//   dispatch(updatePage(page));
// };

// export const updateDrawerState: ActionCreator<AppActionUpdateDrawerState> = (opened: boolean) => {
//   return {
//     type: UPDATE_DRAWER_STATE,
//     opened
//   };
// };

export const setCountryProgrammes: ActionCreator<CommonDataActionSetCountryProgrammes> = (countryProgrammes: object[]) => {
  return {
    type: 'SET_COUNTRY_PROGRAMMES',
    // countryProgrammes: map(
    //   compose(({ id, name, active, special, invalid }) => ({
    //   active, special, invalid,
    //   label: name,
    //   value: id
    // }),
    // pick(['id', 'name', 'active', 'special', 'invalid'])), data)
    countryProgrammes
  };
}

export const setOffices: ActionCreator<CommonDataActionSetOffices> = (offices: object[]) => {
  return {
    type: 'SET_OFFICES',
    offices: map(pick(['id', 'name']), offices)
  };
}

export const setPartnerships: ActionCreator<CommonDataActionSetPartnerships> = (data: object[]) => {
  return {
    type: 'SET_PARTNERSHIPS',
    partnerships: map(
      pick(['id', 'title', 'number', 'total_unicef_budget', 'budget_currency']),
      data
    )
  };
}

export const setPdssfas: ActionCreator<CommonDataActionSetPdssfas> = (data: object[]) => {
  return {
    type: 'SET_PDSSFAS',
    pdssfas: data
  };
}

// export const setTripsYears: ActionCreator<CommonDataActionSetTripsYears> = () => {
//   return {
//     type: 'SET_TRIPS_YEARS',
//     tripsYears: range(2015, moment().year() + 1)
//   };
// }

export const setSectors: ActionCreator<CommonDataActionSetSectors> = (data: object[] | any) => {
  return {
    type: 'SET_SECTORS',
    sectors: map(
      (s) => ({ value: parseInt(s.id), label: s.name }),
      data
    )
  };
}
// TODO: Remove any from types in this file

export const setUnicefUsers: ActionCreator<CommonDataActionSetUnicefUsers> = (data: object[] | any) => {
  return {
    type: 'SET_UNICEF_USERS',
    unicefUsers: map(
      (s) => ({ value: parseInt(s.id), label: s.name }),
      data
    )
  };
}

export const setStaticData: ActionCreator<CommonDataActionSetStaticData> = (data: object) => {
  return {
    type: 'SET_STATIC_DATA',
    staticData: data
  };
}

export const setUserCountry: ActionCreator<CommonDataActionSetUserCountry> = (data: object) => {
  return {
    type: 'SET_USER_COUNTRY',
    userCountry: data
  };
}

export const setAgreements: ActionCreator<CommonDataActionSetAgreements> = (data: object[] | any) => {
  return {
    type: 'SET_AGREEMENTS',
    agreements: data.filter((a) => a.agreement_type === 'PCA').map((ag)=>({
      label: ag.agreement_number,
      value: ag.id
    }))
  };
}

export const setInterventions: ActionCreator<CommonDataActionSetInterventions> = (data: object[] | any) => {
  return {
    type: 'SET_INTERVENTIONS',
    interventions: data.map((inter)=>({
      label: inter.number,
      value: inter.id
    }))
  };
}

export const setTrips: ActionCreator<PersonalizedDataSetTrips> = (data: any) => {
  const payload = map(
      pick(['id', 'start_date', 'purpose', 'reference_number', 'supervisor_name']),
      data.data
    );

  return {
    type: 'SET_TRIPS',
    trips: payload
  };
}

export const setTripsSupervised: ActionCreator<PersonalizedDataSetTripsSupervised> = (data: any) => {
  return {
    type: 'SET_TRIPS_SUPERVISED',
    tripsSupervised: map(
      pick(['id', 'start_date', 'purpose', 'reference_number', 'traveler']),
      data.data
    )
  };
}

export const setActionPointsByMe: ActionCreator<PersonalizedDataSetActionPointsByMe> = (data: any) => {
  return {
    type: 'SET_ACTION_PTS_BY_ME',
    actionPointsByMe: map(
      pick(['status', 'description', 'created_at', 'person_responsible_name', 'id', 'due_date']),
      data.results
    )
  };
}

export const setActionPointsForMe: ActionCreator<PersonalizedDataSetActionPointsForMe> = (data: any ) => {
  return {
    type: 'SET_ACTION_PTS_FOR_ME',
    actionPointsForMe: map(
      pick(['status', 'description', 'created_at', 'assigned_by_name', 'id', 'due_date']),
      data.results
    )
  };
}

// export const navigate: ActionCreator<ThunkResult> = (path: string) => (dispatch) => {
//   // Extract the page name from path.
//   const page = path === Config.basePath ? 'page-one' : path.slice(1);

//   // Any other info you might want to extract from the path (like page type),
//   // you can do here
//   dispatch(loadPage(page));

//   // Close the drawer - in case the *path* change came from a link in the drawer.
//   dispatch(updateDrawerState(false));
// };

