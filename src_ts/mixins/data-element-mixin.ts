import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin';
import '../endpoints/endpoints-mixin';
import './ajax-server-errors-mixin';
import './event-helper-mixin';
import { Mixins as Mixins$0 } from './redux-store-mixin';
export const Mixins = Mixins$0 || {};

/**
 * @polymer
 * @mixinFunction
 */
Mixins$0.DataElement = (superClass) =>
  class extends Mixins$0.Endpoints(
    Mixins$0.AjaxServerErrors(
      Mixins$0.EventHelper(
        EtoolsAjaxRequestMixin(superClass)))) {

    constructor() {
      super();
    }

    static get properties() {
      return {
        options: {
          type: Object,
          value: {
            endpoint: null,
            csrf: true
          }
        },
        data: {
          type: Array,
          readOnly: true,
          notify: true
        },
        globalMessage: {
          type: String,
          value: 'An error occurred while trying to fetch the data!'
        },
        fireDataLoaded: {
          type: Boolean,
          value: false
        },
        _refreshInterval: {
          type: Object,
          value: null
        },
        endpointName: {
          type: String
        }
      };
    }

    static get observers() {
      return [
        '_endpointChanged(options.endpoint)'
      ];
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this._removeAutomaticDataRefreshLoop();
    }

    ready() {
      super.ready();
      this._elementReady();
    }

    _elementReady() {
      if (!this.endpointName) {
        console.warn('Please specify an endpointName property');
      } else {
        this.set('options.endpoint', this.getEndpoint(this.endpointName));
        this._requestData();
      }
    }

    _requestData() {
      this.fireEvent('global-loading', {
        active: true,
        loadingSource: this.endpointName
      });

      this.sendRequest(this.options)
        .then((resp) => {
          this._handleMyResponse(resp);
        }).catch((err) => {
          if (this.options.endpoint.template.indexOf('profile') && err.status === 403) {
            this.fireEvent('forbidden', { bubbles: true, composed: true });
          }
          this.handleErrorResponse(err);
        })
        .finally(() => {
          this.fireEvent('global-loading', {
            active: false,
            loadingSource: this.endpointName
          });
        });
    }

    _handleMyResponse(res) {
      this._setData(res);
      if (this.fireDataLoaded) {
        if (!this.dataLoadedEventName) {
          console.warn('Please specify data loaded event name(dataLoadedEventName property)');
        } else {
          this.fireEvent(this.dataLoadedEventName);
        }
      }
    }

    _endpointChanged(newEndpoint) {
      if (newEndpoint === undefined) {
        return;
      }
      if (newEndpoint && newEndpoint.hasOwnProperty('exp') && newEndpoint.exp > 0) {
        this._removeAutomaticDataRefreshLoop();
        this._setAutomaticDataRefreshLoop(newEndpoint);
      }
    }

    _removeAutomaticDataRefreshLoop() {
      if (this._refreshInterval !== null) {
        clearInterval(this._refreshInterval);
        this.set('_refreshInterval', null);
      }
    }

    _setAutomaticDataRefreshLoop(newEndpoint) {
      this.set('_refreshInterval', setInterval(() => {
        this._requestData();
      }, newEndpoint.exp));
    }
  };
