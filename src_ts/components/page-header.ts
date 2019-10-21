import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@unicef-polymer/etools-app-selector/etools-app-selector.js';
import '@unicef-polymer/etools-profile-dropdown/etools-profile-dropdown.js';
import './countries-dropdown';
import '../mixins/user-profile-data-mixin';
import '../styles/shared-styles';
import {Config} from '../config/config';
import sortBy from 'lodash-es/sortBy';
import {fireEvent} from '../components/utils/fire-custom-event';
import {customElement, property} from '@polymer/decorators';
import {UserProfileDataMixin} from '../mixins/user-profile-data-mixin';
import './support-btn';

@customElement('page-header')
export class PageHeader extends UserProfileDataMixin(PolymerElement) {
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

      support-btn {
        color: var(--light-secondary-text-color);
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
        <support-btn></support-btn>
        <etools-profile-dropdown profile="{{user}}" on-save-profile="_saveProfile" on-sign-out="_signOut"></etools-profile-dropdown>
      </div>
    </app-toolbar>
`;
  }

  @property({type: Array})
  countries: object[];

  @property({type: Object})
  user: object;

  @property({type: String})
  environment: string = function() {return Config._checkEnvironment()}();

  @property({type: Object})
  profile: object;

  static get observers() {
    return ['_updateCountriesList(user.countries_available)'];
  }

  ready() {
    super.ready();
    this._setBgColor();
  }

  openDrawer() {
    fireEvent(this, 'drawer');
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
    arrayObj = sortBy(arrayObj, (c) => c.name);
    this.set('countries', arrayObj);
  }

  _convertCollection(data) {
    return data.map((item) => {
      return {label: item.name, value: item.id};
    });
  }

  _saveProfile(e) {
    this.set('profile', e.detail.profile);
    this.saveProfile(this.profile);
  }

  _signOut() {
    this._clearLocalStorage();
    window.location.href = window.location.origin + '/logout';
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
