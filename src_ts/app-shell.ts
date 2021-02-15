/* eslint-disable camelcase */
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import {property, customElement} from '@polymer/decorators';
import {setRootPath} from '@polymer/polymer/lib/utils/settings.js';
import LoadingMixin from '@unicef-polymer/etools-loading/etools-loading-mixin.js';
import '@unicef-polymer/etools-loading/etools-loading.js';
import {sendRequest} from '@unicef-polymer/etools-ajax/etools-ajax-request';
import 'etools-piwik-analytics/etools-piwik-analytics.js';
import './styles/buttons-styles';
import './styles/page-layout-styles';
import './styles/shared-styles';
import './styles/app-theme';
import {ToastNotificationsMixin} from './components/toast/toast-notifications-mixin';
import {fireEvent} from './components/utils/fire-custom-event';
import {UserProfileDataMixin} from './mixins/user-profile-data-mixin';
import './components/page-header';
import './components/page-footer';
import {Config, BASE_URL} from './config/config';
import {Endpoints} from './endpoints/endpoints';
import {store} from './redux/store';
import {setOffices, setSectors, setStatic} from './redux/actions/static-data';
import './config/dexie-db-config';

declare const dayjs: any;
declare const dayjs_plugin_utc: any;
declare const dayjs_plugin_isSameOrBefore: any;
declare const dayjs_plugin_isBetween: any;

dayjs.extend(dayjs_plugin_utc);
dayjs.extend(dayjs_plugin_isSameOrBefore);
dayjs.extend(dayjs_plugin_isBetween);

setRootPath(BASE_URL);

@customElement('app-shell')
export class AppShell extends LoadingMixin(ToastNotificationsMixin(UserProfileDataMixin(PolymerElement))) {
  public static get template(): HTMLTemplateElement {
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
          padding-bottom: 4px;
        }

        .action-button {
          color: var(--secondary-text-color);
          font-weight: 500;
        }

        paper-button.action-button {
          padding: inherit;
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

      <etools-piwik-analytics page="[[subroute.prefix]]"
                              user="[[user]]"
                              toast="[[currentToastMessage]]">
      </etools-piwik-analytics>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
      <app-route route="{{subroute}}" pattern="/:tab" data="{{subrouteData}}"></app-route>

      <app-drawer-layout id="layout" force-narrow="" fullbleed="">
        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses reveals effects="waterfall">
            <page-header id="pageheader" title="eTools" user="[[user]]"></page-header>
          </app-header>
          <div class="page-top-content with-tabs">
            <div class="top-content">
              <div class="top-content-row title-row">
                <h1 main-title="">
                  Dashboard
                </h1>

                <div class="top-content-actions-wrapper">

                <div class="top-content-action" hidden$="[[!_isActive(page,'partnerships')]]">
                  <a target="_blank" href="[[csvUrl]]">
                    <paper-button class="action-button">
                      <iron-icon class="dark" icon="file-download"></iron-icon>
                      Export
                    </paper-button>
                  </a>
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
                <paper-tabs selected="{{page}}" attr-for-selected="name" noink bottom-item>

                  <paper-tab name="personalized" link>
                    <a href="[[rootPath]]personalized" class="tab-content">My Dashboard</a>
                  </paper-tab>

                  <paper-tab name="hact" link>
                    <a href="[[rootPath]]hact" class="tab-content">HACT</a>
                  </paper-tab>

                  <paper-tab name="trips" link>
                    <a href="[[rootPath]]trips" class="tab-content">Trips</a>
                  </paper-tab>

                  <paper-tab name="partnerships" link>
                    <a href="[[rootPath]]partnerships/overview" class="tab-content">Partnerships</a>
                  </paper-tab>

                  <paper-tab name="map" link>
                    <a href="[[rootPath]]map" class="tab-content">Map</a>
                  </paper-tab>

                  <paper-tab name="attachments" link>
                    <a href="[[rootPath]]attachments" class="tab-content">Document Library</a>
                  </paper-tab>
                </paper-tabs>
              </div>
            </div>
          </div>

          <iron-pages selected="[[page]]" attr-for-selected="name" fallback-selection="personalized" role="main">
            <view-personalized user="[[user]]" class="page" name="personalized" route="{{route}}"></view-personalized>
            <view-hact name="hact" user="[[user]]"></view-hact>
            <view-partnerships route="{{subroute}}"
                               class="page"
                               user="[[user]]"
                               name="partnerships"
                               csv-download-url="{{csvUrl}}">
            </view-partnerships>
            <view-trips route="{{route}}" class="page" name="trips" user="[[user]]"></view-trips>
            <view-map route="{{route}}" user="[[user]]" class="page" name="map"></view-map>
            <view-attachments route="{{route}}" class="page" user="[[user]]" name="attachments"></view-attachments>
          </iron-pages>
          <page-footer></page-footer>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  @property({observer: AppShell.prototype._pageChanged, type: String, reflectToAttribute: true})
  public page: string;

  @property({type: Object})
  public routeData: object;

  @property({type: String})
  public rootPath: string;

  @property({type: Boolean})
  public hideExport: boolean;

  @property({type: Array})
  public availableDetailYears: object[] = [
    {name: '2017', endpoint: '/api/v2/hact/history/?year=2017&format=csv'},
    {name: '2018', endpoint: '/api/v2/hact/history/?year=2018&format=csv'},
    {name: '2019', endpoint: '/api/v2/partners/hact?&format=csv'}
  ]

  @property({type: Array})
  public availableGeneralYears: object[] = [
    {name: '2018', endpoint: '/api/v2/hact/history/?year=2018&format=csv'},
    {name: '2019', endpoint: '/api/v2/partners/hact/simple?&format=csv'}
  ]

  @property({type: Array})
  public chartsExport: object[] = [
    {name: '2018', endpoint: '/api/v2/hact/graph/2018/export'},
    {name: '2019', endpoint: '/api/v2/hact/graph/2019/export'}
  ]

  @property({type: Boolean})
  public displayDetail = false;

  @property({type: Object})
  public user: object;

  @property({type: String})
  public currentToastMessage: string;

  public static get observers(): string[] {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  public ready(): void {
    super.ready();
    this._initListeners();
  }

  public _initListeners(): void {
    this._onForbidden = this._onForbidden.bind(this);
    this.addEventListener('forbidden', this._onForbidden);
  }

  public _removeListeners(): void {
    this.removeEventListener('forbidden', this._onForbidden);
  }

  connectedCallback() {
    super.connectedCallback();
    this.getAppStaticData();
  }

  getAppStaticData() {
    this.getSectors();
    this.getDropdownsStaticData();
    this.getOffices();
  }
  getSectors() {
    sendRequest({endpoint: Endpoints.sectors}).then(resp => store.dispatch(setSectors(resp)));
  }
  getDropdownsStaticData() {
    sendRequest({endpoint: Endpoints.static}).then(resp => store.dispatch(setStatic(resp)));
  }
  getOffices() {
    sendRequest({endpoint: Endpoints.offices}).then(resp => store.dispatch(setOffices(resp)));
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removeListeners();
  }

  public _updateUrlTab(tab: string) {
    this.set('hideHactExport', tab === 'hact' ? false : true);
    this.set('hidePartnershipExport', tab === 'partnerships' ? false : true);
    if (!tab) {return;}
    this.set('hideExport', !(tab === 'hact' || tab === 'partnerships'));
  }

  public _goToAddTrip() {
    window.location.href = '/t2f/edit-travel/-1';
  }

  public _export(event) {
    const endpoint = event.model.item.endpoint;
    window.open(
        `${endpoint}`,
        '_blank',
    );
  }

  public _print(): void {
    window.print();
  }

  private _onForbidden(): void {
    const redirectNotification = document.createElement('etools-loading');
    redirectNotification.loadingText = 'Your login session has expired, you are being redirected to login.';
    // redirectNotification.absolute = true;
    redirectNotification.active = true;
    document.querySelector('body').appendChild(redirectNotification);
    setTimeout(() => {
      window.location.href = Config.loginPath;
    }, 3000);
  }

  _routePageChanged(page) {
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be an empty string.
    // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
   if (!page) {
     this.set('page', 'personalized');
   } else if (['personalized', 'hact', 'attachments', 'map', 'partnerships', 'trips'].indexOf(page) !== -1) {
     this.set('page', page);
   } else {
     this.set('page', 'view404');
   }
 }

_pageChanged(page) {
 // Import the page component on demand.
 //
 // Note: `polymer build` doesn't like string concatenation in the import
 // statement, so break it up.
 switch (page) {
   case 'personalized':
     import('./views/view-personalized.js');
     break;
   case 'partnerships':
     import('./views/view-partnerships.js');
     break;
   case 'hact':
     import('./views/view-hact.js');
     break;
   case 'map':
     import('./views/view-map.js');
     break;
   case 'attachments':
     import('./views/view-attachments.js');
     break;
   case 'trips':
     import('./views/view-trips.js');
     break;
   case 'view404':
    this._showPage404.bind(this);
     break;
 }
}
  private _showPage404(): void {
    this.set('page', 'view404');
    fireEvent(this, 'toast', {text: 'Oops you hit a 404!', showCloseBtn: true});
  }

  // @ts-ignore
  private _isActive(page: string, tab: string): boolean {
    return page === tab;
  }
}
