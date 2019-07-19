import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
import EtoolsPageRefreshMixin from '@unicef-polymer/etools-behaviors/etools-page-refresh-mixin.js';
import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
import '../mixins/event-helper-mixin';
import '../endpoints/endpoints-mixin';
import * as R from 'ramda';
// import { Mixins } from '../mixins/redux-store-mixin';

const CountriesMixin = EtoolsMixinFactory.combineMixins([
  window.EtoolsDashboard.Mixins.Endpoints,
  window.EtoolsDashboard.Mixins.EventHelper,
  EtoolsPageRefreshMixin,
  EtoolsAjaxRequestMixin
], (PolymerElement));
/**
 * `countries-dropdown` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
class CountriesDropdown extends CountriesMixin {
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

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'countries-dropdown';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      current: Number,
      country: {
        type: Object
      },
      countries: {
        type: Array,
        observer: '_countrySelectorUpdate'
      },
      countrySelectorVisible: Boolean
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

  _countrySelected(e) {
      if (e.detail.item.countryId !== this.current.id) {
        // send post request to change_coutry endpoint
        let selectedCountryId = R.path(['detail', 'item', 'countryId'], e);
        if(selectedCountryId) {
          this._triggerCountryChangeRequest(selectedCountryId);
        }
      }
  }

  _triggerCountryChangeRequest(countryId) {
    this.fireEvent('global-loading', {
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
    this.fireEvent('update-main-path', { path: '' });
    this.refresh();
  }

  _countrySelectorUpdate(countries) {
    if (Array.isArray(countries) && (countries.length > 1)) {
      this.set('countrySelectorVisible', true);
    }
  }

  _handleError(error) {
    this.logError('Country change failed!', 'countries-dropdown', error);
    // TODO: this should be a larger alert.
    this.$.countriesListbox.selected = this.currentCountry;
    this.fireEvent('toast', { text: 'Something went wrong changing your workspace. Please try again' });
    this.fireEvent('global-loading', { active: false, loadingSource: 'country-change' });
  }
}

window.customElements.define(CountriesDropdown.is, CountriesDropdown);
