import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
import EtoolsPageRefreshMixin from '@unicef-polymer/etools-behaviors/etools-page-refresh-mixin.js';
import {logError} from '@unicef-polymer/etools-behaviors/etools-logging.js';
import {fireEvent} from '../components/utils/fire-custom-event';
import {path} from 'ramda';
import {customElement, property, observe} from '@polymer/decorators';
import {GenericObject} from '../typings/globals.types';
import {EndpointsMixin} from '../endpoints/endpoints-mixin';

@customElement('countries-dropdown')
export class CountriesDropdown extends EtoolsPageRefreshMixin(EndpointsMixin(EtoolsAjaxRequestMixin(PolymerElement))) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        :host(:hover) {
          cursor: pointer;
        }

        paper-dropdown-menu {
          width: 160px;
          --paper-input-container-color: var(--light-secondary-text-color);
          --paper-input-container-focus-color: var(--light-secondary-text-color);
          --paper-input-container-underline: {
            display: none;
          };

          --paper-input-container-underline-focus: {
            display: none;
          };

          --paper-input-container-underline-disabled: {
            display: none;
          };

          --paper-input-container-input: {
            color: var(--light-primary-text-color);
          };

          --paper-dropdown-menu-icon: {
            color: var(--light-icon-color);
          };

          --paper-input-container-label: {
            top: 4px;
          };

          --paper-input-container-input: {
            margin-bottom: 2px;
            color: var(--light-primary-text-color);
            cursor: pointer;
          }
        }

        paper-item {
          font-size: 15px;
          white-space: nowrap;
          cursor: pointer;
        }

        iron-icon {
          bottom: 2px;
          min-width: 24px;
          min-height: 20px;
          margin-right: 8px;
        }

        paper-item iron-icon {
          margin-right: 16px;
        }
      </style>

      <template is="dom-if" if="[[countrySelectorVisible]]">

        <paper-dropdown-menu id="menu" label="Country" noink="" no-label-float="">
          <paper-listbox slot="dropdown-content" id="countriesListbox" attr-for-selected="countryId" selected="[[current.id]]" on-iron-select="_countrySelected">
            <template id="repeat" is="dom-repeat" items="[[countries]]">
              <paper-item country-id="[[item.id]]">
                [[item.name]]
              </paper-item>
            </template>
          </paper-listbox>

        </paper-dropdown-menu>
      </template>
    `;
  }

  @property({type: Object})
  current: GenericObject;

  @property({type: Object})
  country: object;

  @property({type: Array})
  countries: object[];

  @property({type: Boolean})
  countrySelectorVisible: Boolean;

  _countrySelected(e) {
      if (e.detail.item.countryId !== this.current.id) {
        // send post request to change_coutry endpoint
        let selectedCountryId = path(['detail', 'item', 'countryId'], e);
        if(selectedCountryId) {
          this._triggerCountryChangeRequest(selectedCountryId);
        }
      }
  }

  _triggerCountryChangeRequest(countryId) {
    fireEvent(this, 'global-loading', {
      message: 'Please wait while country is changing...',
      active: true,
      loadingSource: 'country-change'
    });
    this.sendRequest({
      endpoint: this.getEndpoint('changeCountry'),
      method: 'POST',
      body: { country: countryId }
    }).then(() => {
      this._handleResponse();
    }).catch((err) => {
      this._handleError(err);
    });
  }

  _handleResponse() {
    fireEvent(this, 'update-main-path', {path: '' });
    this.refresh();
  }

  @observe('countries')
  _countrySelectorUpdate(countries) {
    if (Array.isArray(countries) && (countries.length > 1)) {
      this.set('countrySelectorVisible', true);
    }
  }

  _handleError(error) {
    logError('Country change failed!', 'countries-dropdown', error);
    // TODO: this should be a larger alert.
    let countriesListbox: any = this.$.countriesListbox;
    countriesListbox.selected = this.current;
    fireEvent(this, 'toast', { text: 'Something went wrong changing your workspace. Please try again' });
    fireEvent(this, 'global-loading', { active: false, loadingSource: 'country-change' });
  }
}
