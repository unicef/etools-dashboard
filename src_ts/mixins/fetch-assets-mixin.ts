import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
// import { Mixins } from './redux-store-mixin';
import './event-helper-mixin';
import './ajax-server-errors-mixin';
import '../endpoints/endpoints-mixin';
import { ReduxProps } from '../components/reduxProps';
import moment from 'moment';
import { isEmpty, compose, map, pick, range, head, propOr, keys, concat } from 'ramda';
// export const Mixins = Mixins || {};

window.EtoolsDashboard = window.EtoolsDashboard || {};
window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};

const falsy = (x) => isEmpty(x) || !x;

/**
 * @polymer
 * @mixinFunction
 */
window.EtoolsDashboard.Mixins.FetchAsset = (superClass) =>
  class extends window.EtoolsDashboard.Mixins.Endpoints(
    window.EtoolsDashboard.Mixins.ReduxStore(
      window.EtoolsDashboard.Mixins.AjaxServerErrors(
        window.EtoolsDashboard.Mixins.ToastNotifications(
          window.EtoolsDashboard.Mixins.EventHelper(
            EtoolsAjaxRequestMixin(superClass)))))) {

    constructor() {
      super();
    }

    static get actions() {
      return {

        setCountryProgrammes(data = []) {
          return {
            type: 'SET_COUNTRY_PROGRAMMES',
            countryProgrammes: map(
              compose(({ id, name, active, special, invalid })=>({
              active, special, invalid,
              label: name,
              value: id
            }),
            pick(['id', 'name', 'active', 'special', 'invalid'])), data)
          };
        },

        setOffices(data = []) {
          return {
            type: 'SET_OFFICES',
            offices: map(pick(['id', 'name']), data)
          };
        },

        // next 4 actions destructure data due to corresponding format from backend

        setTrips({ data= [] } ) {
          const payload = map(
              pick(['id', 'start_date', 'purpose', 'reference_number', 'supervisor_name']),
              data
            );

          return {
            type: 'SET_TRIPS',
            trips: payload
          };
        },

        setTripsSupervised({ data = [] }) {
          return {
            type: 'SET_TRIPS_SUPERVISED',
            tripsSupervised: map(
              pick(['id', 'start_date', 'purpose', 'reference_number', 'traveler']),
              data
            )
          };
        },

        setActionPointsByMe({ results = [] }) {
          return {
            type: 'SET_ACTION_PTS_BY_ME',
            actionPointsByMe: map(
              pick(['status', 'description', 'created_at', 'person_responsible_name', 'id', 'due_date']),
              results
            )
          };
        },

        setActionPointsForMe({ results = [] } ) {
          return {
            type: 'SET_ACTION_PTS_FOR_ME',
            actionPointsForMe: map(
              pick(['status', 'description', 'created_at', 'assigned_by_name', 'id', 'due_date']),
              results
            )
          };
        },

        setPartnerships(data = []) {
          return {
            type: 'SET_PARTNERSHIPS',
            partnerships: map(
              pick(['id', 'title', 'number', 'total_unicef_budget', 'budget_currency']),
              data
            )
          };
        },

        setPdssfas(data = []) {
          return {
            type: 'SET_PDSSFAS',
            pdssfas: data
          };
        },

        setTripsYears() {
          return {
            type: 'SET_TRIPS_YEARS',
            tripsYears: range(2015, moment().year() + 1)
          };
        },

        setSectors(data = []) {
          return {
            type: 'SET_SECTORS',
            sectors: map(
              (s) => ({ value: parseInt(s.id), label: s.name }),
              data
            )
          };
        },

        setUnicefUsers(data = []) {
          return {
            type: 'SET_UNICEF_USERS',
            unicefUsers: map(
              (s) => ({ value: parseInt(s.id), label: s.name }),
              data
            )
          };
        },

        setStatic(data = []) {
          return {
            type: 'SET_STATIC_DATA',
            static: data
          };
        },

        setUserCountry(data = []) {
          return {
            type: 'SET_USER_COUNTRY',
            userCountry: head(data)
          };
        },

        setHactGraphs(data = {}) {
          return {
            type: 'SET_HACT_GRAPHS',
            hactGraphs: propOr([], 'partner_values', data)
          };
        },

        setAgreements(data = []) {
          return {
            type: 'SET_AGREEMENTS',
            agreements: data.filter((a)=>a.agreement_type==='PCA').map((ag)=>({
              label: ag.agreement_number,
              value: ag.id
            }))
          };
        },

        setInterventions(data = []) {
          return {
            type: 'SET_INTERVENTIONS',
            interventions: data.map((inter)=>({
              label: inter.number,
              value: inter.id
            }))
          };
        },

        setGrants(data) {
          return {
            type: 'SET_GRANTS',
            grants: data.grants.map((grant)=>({
              label: grant.label,
              value: grant.value
            }))
          };
        },

        setDonors(data = []) {
          return {
            type: 'SET_DONORS',
            donors: data.map((donor)=>({
              label: donor.name,
              value: donor.id
            }))
          };
        },

        setResults(data = []) {
          return {
            type: 'SET_RESULTS',
            results: data.map((res)=>({
              label: res.name,
              value: res.id
            }))
          };
        },
        setClusters(data=[]) {
          return {
            type: 'SET_CLUSTERS',
            clusters: data.filter((f)=>!isEmpty(f.cluster_name)).map((cluster)=>({
              label: cluster.cluster_name,
              value: cluster.cluster_name
              }))
          };
        }

      };
    }

    static get observers() {
      return [
        '_handleRequiredAssets(user)'
      ];
    }

    ready() {
      super.ready();
    }

    _handleRequiredAssets(user) {
      if (isEmpty(user)) {
        return;
      }
      // @ts-ignore
      const props = this.constructor.properties;

      const requiredAssets = keys(props)
        .filter((key)=> props[key].statePath)
        .map((key)=>props[key].statePath);

      map(this._handleAssetState.bind(this), requiredAssets);
    }

    _handleAssetState(asset) {
      asset = asset.split('.')[0];

      const state = this.getState();
      if (falsy(state[asset])) {
        this._fetchData(asset);
      }
    }

    _createConfigObject(data) {
      let endpoint = data.endpointProps;
      if (typeof endpoint === 'function') {
        endpoint = endpoint.bind(this)();
      }

      endpoint = isEmpty(endpoint) ? endpoint
          : isEmpty(endpoint.templateProps) ? this.getEndpoint(endpoint.name)
            : this.getEndpoint(endpoint.name, endpoint.templateProps);
        let { propName } = data;
        return {
          handler: concat('set', propName.charAt(0).toUpperCase() + propName.slice(1)),
          endpoint: { endpoint },
          type: `SET_${propName.toUpperCase()}`
        };

    }

    _fetchData(asset: string) {
      // const { ReduxProps } = EtoolsDashboard;
      const endpointData = ReduxProps.find((collection) => collection.propName === asset);
      if (!endpointData) {throw new Error(`Could not find endpoint data for prop ${asset}`); }

      const assetConfig = this._createConfigObject(endpointData);

      this._performRequest(assetConfig);
    }

    _performRequest(config) {

      this.fireEvent('global-loading', {
        active: true,
        loadingSource: config.handler
      });

      if(isEmpty(config.endpoint.endpoint)) {
        // for items without api calls
        this.dispatch(config.handler, null);
        this.fireEvent('global-loading', {
            active: false,
            loadingSource: config.handler
          });
      }else {
        this.sendRequest(config.endpoint).then(
          (res)=>this._handleResponse(res, config)
        )
        .catch((err)=>this._handleError(err, config))
        .finally(()=>{
          this.fireEvent('global-loading', {
            active: false,
            loadingSource: config.handler
          });
        });
      }
    }

    _handleResponse(res, config) {
      this.dispatch(config.handler, res);
    }

    _handleError(err, requestDetail) {
      this.fireEvent('toast', { text: `Error ${err.status} failed request for url, ${requestDetail.endpoint.endpoint.url}. ${err.response.detail}`, showCloseBtn: true });
      this._handleResponse([], []);
    }


  };
