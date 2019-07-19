/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@unicef-polymer/etools-dropdown/etools-dropdown.js';
// import '@unicef-polymer/etools-loading/etools-loading.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
// import LoadingMixin from '@unicef-polymer/etools-loading/etools-loading-mixin.js';
// import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
import 'etools-piwik-analytics/etools-piwik-analytics.js';
import './styles/buttons-styles';
import './styles/page-layout-styles';
import './styles/shared-styles';
import './styles/app-theme';
import './components/toast/toast-notifications-mixin';
import './mixins/event-helper-mixin';
import './mixins/user-profile-data-mixin';
import './config/dexie-db-config';
// import R from 'ramda';
import './scripts/es6-polyfills';
import './views/hact/view-hact';
import './views/personalized/view-personalized';
import './views/partnerships/view-partnerships';
import './views/attachments/view-attachments';
import './views/trips/view-trips';
import './views/map/view-map';
import './components/page-header';
import './components/page-footer';
import { Mixins } from './mixins/redux-store-mixin';
import { Config } from './config/config';

/**
   * @polymer
   * @mixinFunction
   * @appliesMixin EtoolsDashboard.Mixins.EventHelper
   * @appliesMixin EtoolsDashboard.Mixins.ToastNotifications
   * @appliesMixin EtoolsMixins.LoadingMixin
   */
// const EtoolsShellMixin = EtoolsMixinFactory.combineMixins([
//   Mixins.EventHelper,
//   Mixins.ToastNotifications,
//   Mixins.UserProfileData,
//   // LoadingMixin
// ], (PolymerElement));
/**
* @customElement
* @polymer
* @extends {Polymer.Element}
*/
class AppShell extends Mixins.EventHelper(Mixins.ToastNotifications(Mixins.UserProfileData(PolymerElement))) {
  static get template() {
    return html`
    <style include="page-layout-styles shared-styles buttons-styles">
      :host {
        display: block;
        --paper-tab-content: {
          height: auto;
        }
      }

      .top-content-actions-wrapper {
        display: flex;
        align-items: flex-end;
        height: 32px;
      }

      .top-content-action paper-button {
        padding-bottom: 4px
      }

      etools-dropdown {
        max-width: 100px;
      }

      .page[name="hact"] {
        padding-top: 12px;
      }

      .action-button {
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      iron-pages {
        display: flex;
      }

      paper-menu-button {
        padding: 0;
      }

      app-header {
        background-color: var(--header-bg-color);
      }
    </style>

    <etools-piwik-analytics page="[[subroute.prefix]]" user="[[user]]" toast="[[currentToastMessage]]"></etools-piwik-analytics>

    <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
    </app-location>

    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
    </app-route>
    <app-route route="{{subroute}}" pattern="/:tab" data="{{subrouteData}}"></app-route>

    <app-drawer-layout id="layout" force-narrow="" fullbleed="">
      <!-- Main content -->
      <app-header-layout has-scrolling-region="">

        <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <page-header id="pageheader" title="eTools" user="[[user]]"></page-header>
        </app-header>
        <div class="page-top-content with-tabs">
          <div class="top-content">
            <div class="top-content-row title-row">
              <h1 main-title="">
                Dashboard
              </h1>

              <div class="top-content-actions-wrapper">
                <div class="top-content-action" hidden\$="[[!_isActive(page,'personalized')]]">
                  <paper-button class="action-button" on-tap="_print">
                    <iron-icon class="dark" icon="print"></iron-icon>
                    Print
                  </paper-button>
                </div>

                <div class="top-content-action" hidden\$="[[!_isActive(page,'partnerships')]]">
                  <a target="_blank" href="[[csvUrl]]">
                    <paper-button class="action-button">
                      <iron-icon class="dark" icon="file-download"></iron-icon>
                      Export
                    </paper-button>
                  </a>
                </div>

                <div class="top-content-action" hidden\$="[[!_isActive(subroute.path, '/charts')]]">
                  <paper-menu-button>
                    <paper-button class="action-button" icon="file-download" slot="dropdown-trigger">
                      <iron-icon class="dark" icon="file-download"></iron-icon>
                      Export
                    </paper-button>
                    <paper-listbox slot="dropdown-content">
                      <template is="dom-repeat" items="[[chartsExport]]">
                        <paper-item on-tap="_export">{{item.name}}</paper-item>
                      </template>
                    </paper-listbox>
                  </paper-menu-button>
                </div>

                <div class="top-content-action" hidden\$="[[!_isActive(subroute.path, '/assurance')]]">
                  <paper-menu-button>
                    <paper-button class="action-button" icon="file-download" slot="dropdown-trigger">
                      <iron-icon class="dark" icon="file-download"></iron-icon>
                      Export
                    </paper-button>
                    <paper-listbox slot="dropdown-content">
                      <template id="hactExport" is="dom-repeat" items="[[availableDetailYears]]">
                        <paper-item on-tap="_export">{{item.name}}</paper-item>
                      </template>
                    </paper-listbox>
                  </paper-menu-button>
                </div>

                <div class="top-content-action" hidden\$="[[!_isActive(page,'trips')]]">
                  <paper-button class="primary-btn with-prefix" on-tap="_goToAddTrip">
                    <iron-icon icon="add"></iron-icon>
                    Add New Trip
                  </paper-button>
                </div>

              </div>
            </div>
            <div class="top-content-row">
              <paper-tabs selected="{{page}}" attr-for-selected="name" noink="" bottom-item="">

                <paper-tab name="personalized" link="">
                  <a href="[[rootPath]]personalized" class="tab-content">My Dashboard</a>
                </paper-tab>

                <paper-tab name="hact" link="">
                  <a href="[[rootPath]]hact/assurance" class="tab-content">HACT</a>
                </paper-tab>

                <paper-tab name="trips" link="">
                  <a href="[[rootPath]]trips" class="tab-content">Trips</a>
                </paper-tab>

                <paper-tab name="partnerships" link="">
                  <a href="[[rootPath]]partnerships/overview" class="tab-content">Partnerships</a>
                </paper-tab>

                <paper-tab name="map" link="">
                  <a href="[[rootPath]]map" class="tab-content">Map</a>
                </paper-tab>

                <paper-tab name="attachments" link="">
                  <a href="[[rootPath]]attachments" class="tab-content">Document Library</a>
                </paper-tab>

              </paper-tabs>
            </div>
          </div>
        </div>
        
        <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="personalized" role="main">
          <view-personalized user="[[user]]" class="page" name="personalized" route="{{route}}"></view-personalized>
          <view-hact route="{{subroute}}" class="page" display-detail="{{displayDetail}}" user="[[user]]" name="hact"></view-hact>
          <view-partnerships route="{{subroute}}" class="page" user="[[user]]" name="partnerships" csv-download-url="{{csvUrl}}"></view-partnerships>
          <view-trips route="{{route}}" class="page" name="trips" user="[[user]]"></view-trips>
          <view-map route="{{route}}" user="[[user]]" class="page" name="map"></view-map>
          <view-attachments route="{{route}}" class="page" user="[[user]]" name="attachments"></view-attachments>
        </iron-pages>
        <page-footer></page-footer>
      </app-header-layout>
    </app-drawer-layout>
`;
  }

  static get is() {
    return 'app-shell';
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      // This shouldn't be neccessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String,

      hideExport: Boolean,

      availableDetailYears: {
        type: Array,
        value: [
          { name: '2017', endpoint: '/api/v2/hact/history/?year=2017&format=csv' },
          { name: '2018', endpoint: '/api/v2/hact/history/?year=2018&format=csv' },
          { name: '2019', endpoint: '/api/v2/partners/hact?&format=csv' }
        ]
      },
      availableGeneralYears: {
        type: Array,
        value: [
          { name: '2018', endpoint: '/api/v2/hact/history/?year=2018&format=csv' },
          { name: '2019', endpoint: '/api/v2/partners/hact/simple?&format=csv' }
        ]
      },
      chartsExport: {
        type: Array,
        value: [
          { name: '2018', endpoint: '/api/v2/hact/graph/2018/export' },
          { name: '2019', endpoint: '/api/v2/hact/graph/2019/export' }
        ]
      },
      displayDetail: {
        type: Boolean,
        value: false,
        observer: '_assuranceSelected'
      },
      user: {
        type: Object
      },
      currentToastMessage: {
        type: String
      }
    };
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  ready() {
    super.ready();
    debugger
    this._initListeners();
  }

  _initListeners() {
    this._onForbidden = this._onForbidden.bind(this);
    this.addEventListener('forbidden', this._onForbidden);
  }

  _removeListeners() {
    this.removeEventListener('forbidden', this._onForbidden);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeListeners();
  }

  _onForbidden() {
    let redirectNotification = document.createElement('etools-loading');
    // @ts-ignore
    redirectNotification.loadingText = 'Your login session has expired, you are being redirected to login.';
    // redirectNotification.absolute = true;
    // @ts-ignore
    redirectNotification.active = true;
    document.querySelector('body').appendChild(redirectNotification);
    setTimeout(() => {
      window.location.href = Config.loginPath;
    }, 3000);
  }

  _routePageChanged(page) {
    // If no page was found in the route data, page will be an empty string.
    // Default to 'personalized' in that case.
    this.set('page', page || 'personalized');
  }

  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    // const resolvedPageUrl = this.resolveUrl(`app/views/${page}/view-${page}.html`);
    // importHref(
    //   resolvedPageUrl,
    //   this._onPageLoad(page).bind(this),
    //   this._showPage404.bind(this),
    //   true);
    import(`app/views/${page}/view-${page}.html`).then(this._onPageLoad(page).bind(this), this._showPage404.bind(this));
  }

  _onPageLoad(page) {
    return () => {
      this.fireEvent('page-changed-hact', { page });};
  }

  _showPage404() {
    this.set('page', 'view404');
    this.fireEvent('toast', { text: 'Oops you hit a 404!', showCloseBtn: true });
  }

  _isActive(page, tab) {
    return page === tab;
  }

  _updateUrlTab(tab) {
    this.set('hideHactExport', tab === 'hact' ? false : true);
    this.set('hidePartnershipExport', tab === 'partnerships' ? false : true);
    if (!tab) { return; }
    this.set('hideExport', !(tab === 'hact' || tab === 'partnerships'));
  }

  _goToAddTrip() {
    window.location.href = '/t2f/edit-travel/-1';
  }

  _export(event) {
    var endpoint = event.model.item.endpoint;
    window.open(
      `${endpoint}`,
      '_blank'
    );
  }

  _print() {
    window.print();
  }

  // sets export endpoints based on assurance view (detailed/general)
  _assuranceSelected() {
    this.$.hactExport.items = this.displayDetail ? this.availableDetailYears : this.availableGeneralYears;
  }
}

window.customElements.define(AppShell.is, AppShell);
