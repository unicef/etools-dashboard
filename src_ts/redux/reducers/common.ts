export interface CommonDataState {
  offices: any[];
  sectors: any[];
  static: any;
}

const INITIAL_STATE: CommonDataState = {
  offices: [],
  sectors: [],
  static: null
};

export const common = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case 'SET_OFFICES':
      return {
        ...state,
        offices: action.offices
      };

    case 'SET_SECTORS':
      return {
        ...state,
        sectors: action.sectors
      };

    case 'SET_STATIC_DATA':
      return {
        ...state,
        static: action.static
      };

    default:
      return state;
  }
};
