import {Reducer} from 'redux';
import {merge} from 'ramda';
import {
  SET_ACTION_PTS_BY_ME,
  SET_ACTION_PTS_FOR_ME,
  SET_TRIPS,
  SET_TRIPS_SUPERVISED,
} from '../actions/personalized-data'

export class PersonalizedDataState {
  trips: object[] | null = []
  tripsSupervised: object[] | null = []
  actionPointsByMe: object[] | null = []
  actionPointsForMe: object[] | null = []
}

export const INITIAL_STATE = new PersonalizedDataState;

const personalizedData: Reducer<PersonalizedDataState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TRIPS:
      return merge(state, { trips: action.trips });
    case SET_TRIPS_SUPERVISED:
      return merge(state, { tripsSupervised: action.tripsSupervised });
    case SET_ACTION_PTS_BY_ME:
      return merge(state, { actionPointsByMe: action.actionPointsByMe });
    case SET_ACTION_PTS_FOR_ME:
      return merge(state, { actionPointsForMe: action.actionPointsForMe });
    default:
      return state;
  }
};

export default personalizedData;