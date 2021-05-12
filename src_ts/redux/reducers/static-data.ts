import {merge} from 'ramda';

const initial = {
  offices: [],
  sectors: [],
  static: null
};

export const staticDataReducer = (state = initial, action) => {

  switch (action.type) {
    case 'SET_OFFICES':
      return merge(state, {offices: action.offices});

    case 'SET_SECTORS':
      return merge(state, {sectors: action.sectors});

    case 'SET_STATIC_DATA':
      return merge(state, {static: action.static});

      default:
      return state;

  }
};
