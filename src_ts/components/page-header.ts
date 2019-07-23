import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@unicef-polymer/etools-app-selector/etools-app-selector.js';
import '@unicef-polymer/etools-profile-dropdown/etools-profile-dropdown.js';
import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
import EtoolsPageRefreshMixin from '@unicef-polymer/etools-behaviors/etools-page-refresh-mixin.js';
import './countries-dropdown';
import '../mixins/event-helper-mixin';
// import { Mixins } from '../mixins/redux-store-mixin';
import '../mixins/user-profile-data-mixin';
// import { db } from '../config/dexie-db-config';
import '../styles/shared-styles';
import { Config } from '../config/config';
import {sortBy} from 'ramda';

const RequiredMixins = EtoolsMixinFactory.combineMixins([
  EtoolsPageRefreshMixin,
  // window.EtoolsDashboard.Mixins.ReduxStore
], (PolymerElement));
/**
 * `page-header` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
export class PageHeader extends RequiredMixins {
  static get template() {
    return html`
    <style include="shared-styles">
      app-toolbar {
        padding: 0 16px 0 0;
        background-color: var(--header-bg-color, #233944);
      }

      div[main-title] {
        position: relative;
        bottom: 1px;
        margin-left: 24px;
        min-height: 30px;
        background: url('../../../images/etools_logo_icon.png') no-repeat center left;
        background-size: auto 48px;
        padding-left: 48px;
        font-size: 30px;
        color: var(--light-primary-text-color);
      }

      #refresh,
      #profile {
        color: var(--title-toolbar-secondary-text-color);
      }

      #profile.open,
      #accountProfile,
      #powerSettings {
        color: var(--dark-secondary-text-color);
      }

      paper-icon-button#profile {
        width: 60px;
        height: 60px;
        padding: 12px 16px;
      }

      #menuButton {
        display: block;
      }

      .right-side {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      etools-page-refresh {
        margin-left: 24px;
      }

      .titlebar {
        flex: 1;
        font-size: 28px;
        font-weight: 300;
        color: var(--light-primary-text-color);
      }

      .titlebar img {
        width: 34px;
        margin: 0 8px 0 24px;
      }

      .content-align {
        @apply --layout-horizontal;
        @apply --layout-center;
        height: 60px;
      }

      #second-logo {
        height: 32px;
        width: auto;
      }

      .envWarning {
        color: var(--nonprod-text-warn-color);
        font-weight: 700;
        font-size: 18px;
      }

      @media (min-width: 850px) {
        #menuButton {
          display: none;
        }

        div[main-title] {
          margin-left: 32px;
        }
      }
    </style>
    
   
    <app-toolbar sticky="" class="content-align">
      <paper-icon-button id="menuButton" class="light" icon="menu" on-tap="openDrawer"></paper-icon-button>
      <div class="titlebar content-align">
        <etools-app-selector id="selector" user="[[user]]"></etools-app-selector>
        <img id="second-logo" src\$="[[importPath]]images/etools-logo-color-white.svg">
        <template is="dom-if" if="[[environment]]">
          <div class="envWarning"> - [[environment]] TESTING ENVIRONMENT</div>
        </template>
      </div>
      <div class="content-align">
        <countries-dropdown id="countries" countries="[[countries]]" current="[[user.country]]"></countries-dropdown>
        <etools-profile-dropdown sections="[[allSections]]" offices="[[allOffices]]" users="[[allUsers]]" profile="{{user}}" on-save-profile="_saveProfile" on-sign-out="_signOut"></etools-profile-dropdown>
        <paper-icon-button icon="refresh" id="refresh" on-tap="refresh" disabled="[[refreshInProgress]]"></paper-icon-button>
    
      </div>
    </app-toolbar>
`;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'page-header';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      countries: {
        type: Array
      },
      user: {
        type: Object
      },
      allOffices: {
        type: Object,
        notify: true,
        computed: '_convertCollection(offices)'
      },
      offices: {
        type: Array,
        statePath: 'offices'
      },
      allSections: {
        type: Array,
        statePath: 'sectors'
      },
      allUsers: {
        type: Array,
        statePath: 'unicefUsers'
      },
      environment: {
        type: String,
        value: () => Config._checkEnvironment()
      },
      userProfileDialog: Object
    };
  }

  static get observers() {
    return ['_updateCountriesList(user.countries_available)'];
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
    this._setBgColor();
  }

  openDrawer() {
    this.fireEvent('drawer');
  }

  _getFlagIconClass(id) {
    let flagIdMap = {
      '0': 'us',
      '234R': 'syxb',
      '2490': 'lb',
      '4020': 'su',
      '4140': 'sy',
      '2070': 'in'
    };
    return 'flag-icon ' + 'flag-icon-' + flagIdMap[id];
  }

  _updateCountriesList(countries) {
    if (!countries) {
      return;
    }
    let arrayObj = countries.map((arrayItem) => {
      return {
        id: arrayItem.id,
        name: arrayItem.name,
        imgClass: this._getFlagIconClass(arrayItem.business_area_code)
      };
    });
    // @ts-ignore
    arrayObj = sortBy((c) => { c.name; })(arrayObj);
    this.set('countries', arrayObj);
  }

  _convertCollection(data) {
    return data.map((item) => {
      return { label: item.name, value: item.id };
    });
  }

  _saveProfile(e) {
    this.set('profile', e.detail.profile);
    this.saveProfile(this.profile);
  }
  _signOut() {
    this._clearDexieDbs();
    this._clearLocalStorage();
    window.location.href = window.location.origin + '/logout';
  }

  _clearDexieDbs() {
    window.EtoolsDashboard.DexieDb.delete();
  }

  _clearLocalStorage() {
    localStorage.clear();
  }

  _setBgColor() {
    // If not production environment, changing header color to red
    if (this.environment) {
      this.updateStyles({'--header-bg-color': 'var(--nonprod-header-color)'});
    }
  }
}

window.customElements.define(PageHeader.is, PageHeader);
