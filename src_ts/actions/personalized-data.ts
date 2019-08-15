import {Action, ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';
import { map, pick } from 'ramda';

export const SET_TRIPS = 'SET_TRIPS';
export const SET_TRIPS_SUPERVISED = 'SET_TRIPS_SUPERVISED';
export const SET_ACTION_PTS_BY_ME = 'SET_ACTION_PTS_BY_ME';
export const SET_ACTION_PTS_FOR_ME = 'SET_ACTION_PTS_FOR_ME';

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

export type PersonalizedDataAction = PersonalizedDataSetTrips | PersonalizedDataSetTripsSupervised | 
                               PersonalizedDataSetActionPointsByMe | PersonalizedDataSetActionPointsForMe

// @ts-ignore - for now
type ThunkResult = ThunkAction<void, RootState, undefined, PersonalizedData>;

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

// next 4 actions destructure data due to corresponding format from backend

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
