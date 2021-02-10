import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {Constructor, GenericObject} from '../typings/globals.types';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
import {EndpointsMixin} from '../endpoints/endpoints-mixin';
import {AjaxServerErrorsMixin} from './ajax-server-errors-mixin';
import {fireEvent} from '../components/utils/fire-custom-event';
import {property} from '@polymer/decorators';

export function DataElementMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class DataElementMixinClass extends EndpointsMixin(AjaxServerErrorsMixin(EtoolsAjaxRequestMixin(baseClass))) {

    @property({type: Object})
    public options: GenericObject = {
      csrf: true,
      endpoint: null
    };

    @property({type: Array, notify: true, readOnly: true})
    public data: object[];

    @property({type: Array})
    public globalMessage = 'An error occurred while trying to fetch the data!';

    @property({type: Object})
    public _refreshInterval: object = null;

    @property({type: Boolean})
    private fireDataLoaded = false;

    @property({type: String})
    endpointName: string;

    public static get observers(): string[] {
      return [
        '_endpointChanged(options.endpoint)'
      ];
    }

    public disconnectedCallback(): void {
      super.disconnectedCallback();
      this._removeAutomaticDataRefreshLoop();
    }

    public ready(): void {
      super.ready();
      this._elementReady();
    }

    public _endpointChanged(newEndpoint: GenericObject): void {
      if (newEndpoint === undefined) {
        return;
      }
      if (newEndpoint && newEndpoint.hasOwnProperty('exp') && newEndpoint.exp > 0) {
        this._removeAutomaticDataRefreshLoop();
        this._setAutomaticDataRefreshLoop(newEndpoint);
      }
    }

    private _elementReady(): void {
      if (!this.endpointName) {
        console.warn('Please specify an endpointName property');
      } else {
        this.set('options.endpoint', this.getEndpoint(this.endpointName));
        this._requestData();
      }
    }

    private _requestData(): void {
      fireEvent(this, 'global-loading', {
        active: true,
        loadingSource: this.endpointName
      });

      this.sendRequest(this.options)
          .then((resp) => {
            this._handleMyResponse(resp);
          }).catch((err) => {
            if (this.options.endpoint.template.indexOf('profile') && err.status === 403) {
              fireEvent(this, 'forbidden', {bubbles: true, composed: true});
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

    private _handleMyResponse(res: GenericObject): void {
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

    private _removeAutomaticDataRefreshLoop(): void {
      if (this._refreshInterval !== null) {
        // @ts-ignore
        clearInterval(this._refreshInterval);
        this.set('_refreshInterval', null);
      }
    }

    private _setAutomaticDataRefreshLoop(newEndpoint: GenericObject): void {
      this.set('_refreshInterval', setInterval(() => {
        this._requestData();
      }, newEndpoint.exp));
    }
  }
  return DataElementMixinClass;
}

export default DataElementMixin;
