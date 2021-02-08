import dayjs from 'dayjs';
import {compose, map, head, propOr, pick, range, isEmpty} from 'ramda';

export const setCountryProgrammes = (data = []) => {
  return {
    type: 'SET_COUNTRY_PROGRAMMES',
    countryProgrammes: map(
      compose(({id, name, active, special, invalid})=>({
      active, special, invalid,
      label: name,
      value: id
    }),
    pick(['id', 'name', 'active', 'special', 'invalid'])), data)
  };
};

export const setOffices = (data = []) => {
  return {
    type: 'SET_OFFICES',
    offices: map(pick(['id', 'name']), data)
  };
};

// next 4 actions destructure data due to corresponding format from backend
export const setTrips = ({data= []} ) => {
  const payload = map(
      pick(['id', 'start_date', 'purpose', 'reference_number', 'supervisor_name']),
      data
    );

  return {
    type: 'SET_TRIPS',
    trips: payload
  };
};

export const setTripsSupervised = ({data = []}) => {
  return {
    type: 'SET_TRIPS_SUPERVISED',
    tripsSupervised: map(
      pick(['id', 'start_date', 'purpose', 'reference_number', 'traveler']),
      data
    )
  };
};

export const setActionPointsByMe = ({results = []}) => {
  return {
    type: 'SET_ACTION_PTS_BY_ME',
    actionPointsByMe: map(
      pick(['status', 'description', 'created_at', 'person_responsible_name', 'id', 'due_date']),
      results
    )
  };
};

export const setActionPointsForMe =({results = []} ) => {
  return {
    type: 'SET_ACTION_PTS_FOR_ME',
    actionPointsForMe: map(
      pick(['status', 'description', 'created_at', 'assigned_by_name', 'id', 'due_date']),
      results
    )
  };
};

export const setPartnerships = (data = []) => {
  return {
    type: 'SET_PARTNERSHIPS',
    partnerships: map(
      pick(['id', 'title', 'number', 'total_unicef_budget', 'budget_currency']),
      data
    )
  };
};

export const setPdssfas = (data = []) => {
  return {
    type: 'SET_PDSSFAS',
    pdssfas: data
  };
};

export const setTripsYears = () => {
  return {
    type: 'SET_TRIPS_YEARS',
    tripsYears: range(2015, dayjs().year() + 1)
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

export const setUnicefUsers = (data = []) => {
  return {
    type: 'SET_UNICEF_USERS',
    unicefUsers: map(
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

export const setUserCountry = (data = []) => {
  return {
    type: 'SET_USER_COUNTRY',
    userCountry: head(data)
  };
};

export const setHactGraphs = (data = {}) => {
  return {
    type: 'SET_HACT_GRAPHS',
    hactGraphs: propOr([], 'partner_values', data)
  };
};

export const setAgreements = (data = []) => {
  return {
    type: 'SET_AGREEMENTS',
    agreements: data.filter(a=>a.agreement_type==='PCA').map(ag=>({
      label: ag.agreement_number,
      value: ag.id
    }))
  };
};

export const setInterventions = (data = []) => {
  return {
    type: 'SET_INTERVENTIONS',
    interventions: data.map(inter=>({
      label: inter.number,
      value: inter.id
    }))
  };
};

export const setGrants = (data = []) => {
  return {
    type: 'SET_GRANTS',
    // @ts-ignore
    grants: data.grants.map(grant=>({
      label: grant.label,
      value: grant.value
    }))
  };
};

export const setDonors = (data = []) => {
  return {
    type: 'SET_DONORS',
    donors: data.map(donor=>({
      label: donor.name,
      value: donor.id
    }))
  };
};

export const setResults = (data = []) => {
  return {
    type: 'SET_RESULTS',
    results: data.map(res=>({
      label: res.name,
      value: res.id
    }))
  };
};
export const setClusters = (data=[]) => {
  return {
    type: 'SET_CLUSTERS',
    clusters: data.filter(f=>!isEmpty(f.cluster_name)).map(cluster=>({
      label: cluster.cluster_name,
      value: cluster.cluster_name
      }))
  };
};
