import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {Constructor} from '../typings/globals.types';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
import {EndpointsMixin} from '../endpoints/endpoints-mixin';
import {AjaxServerErrorsMixin} from './ajax-server-errors-mixin';
import {fireEvent} from '../components/utils/fire-custom-event';
import {property} from '@polymer/decorators';

export function DataElementMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class DataElementMixinClass extends
      EndpointsMixin(
        AjaxServerErrorsMixin(
          EtoolsAjaxRequestMixin(baseClass))) {

    @property({type: Object})
    public options: object | any = {
      endpoint: null,
      csrf: true,
    };

    @property({type: Array, notify: true, readOnly: true})
    public data: object[];

    @property({type: Array})
    public globalMessage: string = 'An error occurred while trying to fetch the data!';

    @property({type: Boolean})
    private fireDataLoaded: boolean = false;

    @property({type: Object})
    public _refreshInterval: object = null;

    @property({type: String})
    private endpointName: string;

    public static get observers() {
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

    private _elementReady() {
      if (!this.endpointName) {
        console.warn('Please specify an endpointName property');
      } else {
        this.set('options.endpoint', this.getEndpoint(this.endpointName));
        this._requestData();
      }
    }

    private _requestData() {
      fireEvent(this, 'global-loading', {
        active: true,
        loadingSource: this.endpointName
      });

      this.sendRequest(this.options)
          .then((resp) => {
            this._handleMyResponse(resp);
          }).catch((err) => {
            if (this.options.endpoint.template.indexOf('profile') && err.status === 403) {
              fireEvent(this, 'forbidden', { bubbles: true, composed: true });
            }
            // @ts-ignore
            this.handleErrorResponse(err);
          })
          .finally(() => {
            fireEvent(this, 'global-loading', {
              active: false,
              loadingSource: this.endpointName
            });
          });
    }

    private _handleMyResponse(res) {
      this.set('data', res);
      if (this.fireDataLoaded) {
        // @ts-ignore
        if (!this.dataLoadedEventName) {
          console.warn('Please specify data loaded event name(dataLoadedEventName property)');
        } else {
          // @ts-ignore
          fireEvent(this, this.dataLoadedEventName);
        }
      }
    }

    public _endpointChanged(newEndpoint) {
      if (newEndpoint === undefined) {
        return;
      }
      if (newEndpoint && newEndpoint.hasOwnProperty('exp') && newEndpoint.exp > 0) {
        this._removeAutomaticDataRefreshLoop();
        this._setAutomaticDataRefreshLoop(newEndpoint);
      }
    }

    private _removeAutomaticDataRefreshLoop() {
      if (this._refreshInterval !== null) {
        // @ts-ignore
        clearInterval(this._refreshInterval);
        this.set('_refreshInterval', null);
      }
    }

    private _setAutomaticDataRefreshLoop(newEndpoint) {
      this.set('_refreshInterval', setInterval(() => {
        this._requestData();
      }, newEndpoint.exp));
    }
  }
  return DataElementMixinClass;
}
