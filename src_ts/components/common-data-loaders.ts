import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {EtoolsMixinFactory} from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
import moment from 'moment';
import * as R from 'ramda';
// import {Mixins} from '../mixins/redux-store-mixin';
import '../mixins/ajax-server-errors-mixin';
import '../endpoints/endpoints-mixin';
import '../config/dexie-db-config';
import { ReduxProps } from './reduxProps';

/**
 * @polymer
 * @mixinFunction
 */
const CommonDataMixin = EtoolsMixinFactory.combineMixins([
  window.EtoolsDashboard.Mixins.Endpoints,
  window.EtoolsDashboard.Mixins.ReduxStore,
  window.EtoolsDashboard.Mixins.AjaxServerErrors,
  window.EtoolsDashboard.Mixins.ToastNotifications,
  EtoolsAjaxRequestMixin
], PolymerElement);

/**
 * `common-data-loaders` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
class CommonDataLoaders extends CommonDataMixin {
  static get template() {
    return html`
      <style>
        :host {
          display: block
        }
      </style>
    `;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'common-data-loaders';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      nextAction: {
        type: Object
      },
      _reduxActions: {
        type: Object,
        value: {}
      },
      toDispatch: {
        type: Array,
        value: []
      },
      user: {
        type: Object,
        observer: '_init'
      }
    };
  }

  static get actions() {
    return {

      setCountryProgrammes(data = []) {
        return {
          type: 'SET_COUNTRY_PROGRAMMES',
          countryProgrammes: R.map(
            R.compose(({ id, name, active, special, invalid })=>({
            active, special, invalid,
            label: name,
            value: id
          }),
          R.pick(['id', 'name', 'active', 'special', 'invalid'])), data)
        };
      },

      setOffices(data = []) {
        return {
          type: 'SET_OFFICES',
          offices: R.map(R.pick(['id', 'name']), data)
        };
      },

      // next 4 actions destructure data due to corresponding format from backend

      setTrips({ data= [] } ) {
        return {
          type: 'SET_TRIPS',
          trips: R.map(
            R.pick(['id', 'start_date', 'purpose', 'reference_number', 'supervisor_name']),
            data
          )
        };
      },

      setTripsSupervised({ data = [] }) {
        return {
          type: 'SET_TRIPS_SUPERVISED',
          tripsSupervised: R.map(
            R.pick(['id', 'start_date', 'purpose', 'reference_number', 'traveler']),
            data
          )
        };
      },

      setActionPointsByMe({ results = [] }) {
        return {
          type: 'SET_ACTION_PTS_BY_ME',
          actionPointsByMe: R.map(
            R.pick(['status', 'description', 'created_at', 'person_responsible_name', 'id', 'due_date']),
            results
          )
        };
      },

      setActionPointsForMe({ results = [] } ) {
        return {
          type: 'SET_ACTION_PTS_FOR_ME',
          actionPointsForMe: R.map(
            R.pick(['status', 'description', 'created_at', 'assigned_by_name', 'id', 'due_date']),
            results
          )
        };
      },

      setPartnerships(data = []) {
        return {
          type: 'SET_PARTNERSHIPS',
          partnerships: R.map(
            R.pick(['id', 'title', 'number', 'total_unicef_budget', 'budget_currency']),
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
          tripsYears: R.range(2015, moment().year() + 1)
        };
      },

      setSectors(data = []) {
        return {
          type: 'SET_SECTORS',
          sectors: R.map(
            (s) => ({ value: parseInt(s.id), label: s.name }),
            data
          )
        };
      },

      setUnicefUsers(data = []) {
        return {
          type: 'SET_UNICEF_USERS',
          unicefUsers: R.map(
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
          userCountry: R.head(data)
        };
      },

      setHactGraphs(data = {}) {
        return {
          type: 'SET_HACT_GRAPHS',
          hactGraphs: R.propOr([], 'partner_values', data)
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
          clusters: data.filter((f)=>!R.isEmpty(f.cluster_name)).map((cluster)=>({
            label: cluster.cluster_name,
            value: cluster.cluster_name
            }))
        };
      }

    };
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();
  }

  _init(user) {
    if (!user) {
      return;
    }
    this.actionsToDispatch();
    this._callNext();
  }

  actionsToDispatch() {
    // const { ReduxProps } = EtoolsDashboard;
    let mappedItems = ReduxProps.map((a) => {
      let endpoint = a.endpointProps;
      if (typeof endpoint === 'function') {
        // @ts-ignore
        endpoint = endpoint.bind(this)();
      }
      endpoint = R.isEmpty(endpoint) ? endpoint
        : R.isEmpty(endpoint.templateProps) ? this.getEndpoint(endpoint.name)
          : this.getEndpoint(endpoint.name, endpoint.templateProps);

      let actionObj = {
        handler: R.concat('set', a.propName.charAt(0).toUpperCase() + a.propName.slice(1)),
        endpoint: { endpoint },
        type: `SET_${a.propName.toUpperCase()}`
      };

      return actionObj;
    });
    this.set('toDispatch', mappedItems);
  }

  _callNext() {
    if (this.toDispatch.length) {
      let next = this.shift('toDispatch');
      let action = {};
      action[next.type] = next.action;
      this.set('nextAction', next);
      this.set('_reduxActions', Object.assign({}, this._reduxActions, action));
      if (R.isEmpty(next.endpoint.endpoint)) {
        // for items without api calls
        this.dispatch(next.handler, null);
        this._callNext();
      } else {
        this.sendRequest(next.endpoint).then((res)=>this._handleResponse(res))
        .catch((err)=>this._handleError(err, next));
      }
    }
  }

  _handleResponse(response) {
    this.dispatch(this.nextAction.handler, response);
    this._callNext();
  }

  _handleError(err, requestDetail) {
    this.fireEvent('toast', { text: `Error ${err.status} failed request for url, ${requestDetail.endpoint.endpoint.url}. ${err.response.detail}`, showCloseBtn: true });
    this._handleResponse([]);
  }

}

window.customElements.define(CommonDataLoaders.is, CommonDataLoaders);
