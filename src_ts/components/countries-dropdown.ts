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
import {customElement, property, observe} from '@polymer/decorators';
import {GenericObject} from '../typings/globals.types';
import {EndpointsMixin} from '../endpoints/endpoints-mixin';

@customElement('countries-dropdown')
export class CountriesDropdown extends EtoolsPageRefreshMixin(EndpointsMixin(EtoolsAjaxRequestMixin(PolymerElement))) {
  static get template(): HTMLTemplateElement {
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
          <paper-listbox slot="dropdown-content"
                         id="countriesListbox"
                         attr-for-selected="countryId"
                         selected="[[current.id]]"
                         on-iron-select="_countrySelected">
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
  public current: GenericObject;

  @property({type: Object})
  public country: object;

  @property({type: Array})
  public countries: object[];

  @property({type: Boolean})
  public countrySelectorVisible: Boolean;

  public _countrySelected(e: CustomEvent): void {
    if (e.detail.item.countryId !== this.current.id) {
      // send post request to change_coutry endpoint
      const selectedCountryId = e.detail.item.countryId;
      if (selectedCountryId) {
        this._triggerCountryChangeRequest(selectedCountryId);
      }
    }
  }

  @observe('countries')
  public _countrySelectorUpdate(countries: object[]): void {
    if (Array.isArray(countries) && (countries.length > 1)) {
      this.set('countrySelectorVisible', true);
    }
  }

  private _triggerCountryChangeRequest(countryId: number): void {
    fireEvent(this, 'global-loading', {
      active: true,
      loadingSource: 'country-change',
      message: 'Please wait while country is changing...'
    });
    this.sendRequest({
      body: {country: countryId},
      endpoint: this.getEndpoint('changeCountry'),
      method: 'POST'
    }).then(() => {
      this._handleResponse();
    }).catch((err) => {
      this._handleError(err);
    });
  }

  private _handleResponse(): void {
    localStorage.clear();
    this.refresh();
  }

  private _handleError(error: object): void {
    logError('Country change failed!', 'countries-dropdown', error);
    // TODO: this should be a larger alert.
    const countriesListbox: any = this.$.countriesListbox;
    countriesListbox.selected = this.current;
    fireEvent(this, 'toast', {text: 'Something went wrong changing your workspace. Please try again'});
    fireEvent(this, 'global-loading', {active: false, loadingSource: 'country-change'});
  }
}
