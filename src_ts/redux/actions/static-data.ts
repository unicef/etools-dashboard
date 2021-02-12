import {map, pick} from 'ramda';

export const setOffices = (data = []) => {
  return {
    type: 'SET_OFFICES',
    offices: map(pick(['id', 'name']), data)
  };
};

export const setSectors = (data = []) => {
  return {
    type: 'SET_SECTORS',
    sectors: map(
      s => ({value: parseInt(s.id), label: s.name}),
      data
    )
  };
};

export const setStatic = (data = []) => {
  return {
    type: 'SET_STATIC_DATA',
    static: data
  };
};
