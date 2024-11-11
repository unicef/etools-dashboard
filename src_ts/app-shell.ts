import {html, LitElement} from 'lit';

import {property, customElement} from 'lit/decorators.js';
import '@unicef-polymer/etools-unicef/src/etools-app-layout/app-drawer';
import '@unicef-polymer/etools-unicef/src/etools-app-layout/app-drawer-layout';
import '@unicef-polymer/etools-unicef/src/etools-app-layout/app-header';
import '@unicef-polymer/etools-unicef/src/etools-app-layout/app-header-layout';
import '@unicef-polymer/etools-unicef/src/etools-app-layout/app-footer';
import '@unicef-polymer/etools-unicef/src/etools-toasts/etools-toasts';
import '@unicef-polymer/etools-unicef/src/etools-icons/etools-icons';
import '@unicef-polymer/etools-unicef/src/etools-button/etools-button';
import '@unicef-polymer/etools-modules-common/dist/layout/page-content-header/page-content-header';

// eslint-disable-next-line max-len
import {pageContentHeaderSlottedStyles} from '@unicef-polymer/etools-modules-common/dist/layout/page-content-header/page-content-header-slotted-styles';

import {EtoolsLoading} from '@unicef-polymer/etools-unicef/src/etools-loading/etools-loading.js';
import {LoadingMixin} from '@unicef-polymer/etools-unicef/src/etools-loading/etools-loading-mixin';
import '@unicef-polymer/etools-unicef/src/etools-loading/etools-loading.js';
import {sendRequest} from '@unicef-polymer/etools-ajax/etools-ajax-request';
import '@unicef-polymer/etools-piwik-analytics/etools-piwik-analytics.js';
import './components/appshell/page-header';
import {Endpoints} from './endpoints/endpoints';
import {RootState, store} from './redux/store';

import './config/config';
import './config/dexie-db-config';
import {EtoolsRouteDetails} from '@unicef-polymer/etools-utils/dist/interfaces/router.interfaces';
import {navigate} from './redux/actions/app';
import {connect, installRouter} from '@unicef-polymer/etools-utils/dist/pwa.utils';
import './routing/routes';
import {Environment} from '@unicef-polymer/etools-utils/dist/singleton/environment';
import {createDynamicDialog} from '@unicef-polymer/etools-unicef/src/etools-dialog/dynamic-dialog';
import {initializeIcons} from '@unicef-polymer/etools-unicef/src/etools-icons/etools-icons';
import '@unicef-polymer/etools-modules-common/dist/layout/etools-tabs';

import dayjs from 'dayjs';
import dayJsUtc from 'dayjs/plugin/utc';
import dayJsIsSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import dayJsIsBetween from 'dayjs/plugin/isBetween';
import {EtoolsRouter} from '@unicef-polymer/etools-utils/dist/singleton/router';
import {sharedStyles} from './components/styles/shared-styles';
import {buttonsStyles} from './components/styles/buttons-styles';
import {gridLayoutStylesLit} from './components/styles/grid-layout-styles';
import {pageLayoutStyles} from './components/styles/page-layout-styles';

dayjs.extend(dayJsUtc);
dayjs.extend(dayJsIsSameOrBefore);
dayjs.extend(dayJsIsBetween);

initializeIcons();
@customElement('app-shell')
export class AppShell extends LoadingMixin(connect(store)(LitElement)) {
  static get styles() {
    return [pageContentHeaderSlottedStyles, buttonsStyles, pageLayoutStyles];
  }
  render() {
    return html`
      ${sharedStyles} ${gridLayoutStylesLit}
      <style>
        :host {
          --app-drawer-width: 0;
          --ecp-header-bg: #ffffff;
          --ecp-header-color: var(--primary-text-color);
        }

        .top-content-actions-wrapper {
          display: flex;
          align-items: flex-end;
          height: 32px;
        }

        .action-button {
          color: var(--secondary-text-color);
          font-weight: 500;
        }

        app-header {
          background-color: var(--header-bg-color);
        }
        :host-context([dir='rtl']) reason-display {
          --text-padding: 26px 80px 26px 24px;
        }
        sl-tab-group {
          --indicator-color: var(--primary-color);
          max-width: calc(100% - 2px);
        }
        sl-tab-group::part(tabs) {
          border-bottom: 0;
        }
        sl-tab-group::part(active-tab-indicator) {
          bottom: 0;
        }
        sl-tab:not([active])::part(base) {
          color: var(--secondary-text-color);
        }
        sl-tab::part(base) {
          text-transform: uppercase;
          min-width: 120px;
          place-content: center;
          opacity: 0.8;
        }
        sl-tab::part(base):focus-visible {
          outline: 0;
          opacity: 1;
          font-weight: 700;
        }
      </style>

      <etools-piwik-analytics .page="${Environment.basePath + this.mainPage}" .user="${this.user}">
      </etools-piwik-analytics>

      <etools-toasts></etools-toasts>

      <app-drawer-layout id="layout" force-narrow="" fullbleed>
        <!-- Main content -->
        <app-header-layout has-scrolling-region fullbleed>
          <app-header slot="header" condenses reveals>
            <page-header id="pageheader" title="eTools" .profile="${this.user}"></page-header>
          </app-header>
          <div class="page-top-content with-tabs">
            <div class="top-content">
              <page-content-header .withTabsVisible="true">
                <h1 slot="page-title">Dashboard</h1>

                <div slot="title-row-actions" class="content-header-actions">
                  <div class="action">
                    <div ?hidden="${!this.isActivePage(this.mainPage, 'hact')}">
                      <sl-dropdown id="pdExportMenuBtn" class="hidden" close-on-activate>
                        <etools-button slot="trigger" variant="text" class="neutral" caret>
                          <etools-icon name="file-download" slot="prefix"></etools-icon>
                          Historical Exports
                        </etools-button>
                        <sl-menu>
                          ${this.historicalHactExports.map(
                            (item: any) =>
                              html`<sl-menu-item @click="${() => this._export(item)}">${item.name}</sl-menu-item>`
                          )}
                        </sl-menu>
                      </sl-dropdown>
                    </div>

                    <a
                      target="_blank"
                      .href="${this.csvUrl}"
                      ?hidden="${!this.isActivePage(this.mainPage, 'partnerships')}"
                    >
                      <etools-button variant="text" class="neutral">
                        <etools-icon class="dark" name="file-download"></etools-icon>
                        Export
                      </etools-button>
                    </a>
                    <div ?hidden="${!this.isActivePage(this.mainPage, 'trips')}">
                      <etools-button variant="primary" @click="${this.goToAddTrip}">
                        <etools-icon name="add"></etools-icon>
                        Add New Trip
                      </etools-button>
                    </div>
                  </div>
                </div>
                <div slot="tabs">
                  <sl-tab-group @sl-tab-show="${this.tabChanged}" no-scroll-controls>
                    ${this.tabs?.map(
                      (t) =>
                        html` <sl-tab
                          ?hidden="${t.hidden}"
                          slot="nav"
                          panel="${t.tab}"
                          ?active="${this.mainPage === t.tab}"
                          >${t.tabLabel}</sl-tab
                        >`
                    )}
                  </sl-tab-group>
                </div>
              </page-content-header>
            </div>
          </div>

          ${this.isActivePage(this.mainPage, 'personalized')
            ? html` <view-personalized .user="${this.user}" class="page" name="personalized"></view-personalized>`
            : html``}
          ${this.isActivePage(this.mainPage, 'hact')
            ? html` <view-hact name="hact" .user="${this.user}"></view-hact>`
            : html``}
          ${this.isActivePage(this.mainPage, 'partnerships')
            ? html` <view-partnerships
                class="page"
                name="partnerships"
                csv-download-url="${this.csvUrl}"
                country-code="${this.countryDetails?.business_area_code}"
              >
              </view-partnerships>`
            : html``}
          ${this.isActivePage(this.mainPage, 'fam')
            ? html` <view-fam class="page" name="fam" country-code="${this.countryDetails?.business_area_code}">
              </view-fam>`
            : html``}
          ${this.isActivePage(this.mainPage, 'fmm')
            ? html` <view-fmm class="page" name="fmm" country-code="${this.countryDetails?.business_area_code}">
              </view-fmm>`
            : html``}
          ${this.isActivePage(this.mainPage, 'fmp')
            ? html` <view-fmp class="page" name="fmp" country-code="${this.countryDetails?.business_area_code}">
              </view-fmp>`
            : html``}
          ${this.isActivePage(this.mainPage, 'trips')
            ? html` <view-trips class="page" name="trips" .user="${this.user}"></view-trips>`
            : html``}
          ${this.isActivePage(this.mainPage, 'map')
            ? html` <view-map .user="${this.user}" class="page" name="map"></view-map>`
            : html``}
          ${this.isActivePage(this.mainPage, 'attachments')
            ? html` <view-attachments class="page" .user="${this.user}" name="attachments"></view-attachments>`
            : html``}
          ${this.isActivePage(this.mainPage, 'custom')
            ? html` <view-custom class="page" .user="${this.user}" name="custom"></view-custom>`
            : html``}
          ${this.isActivePage(this.mainPage, 'page-not-found') ? html` <page-not-found></page-not-found>` : html``}
          <app-footer></app-footer>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }

  @property({type: Object})
  routeDetails!: EtoolsRouteDetails;

  @property({type: String})
  mainPage = ''; // routeName

  @property({type: String})
  subPage: string | null = null; // subRouteName

  @property({type: String})
  public rootPath!: string;

  @property({type: Array})
  public currentYearHactExports!: object[];

  @property({type: Array})
  public historicalHactExports!: object[];

  @property({type: Boolean})
  public displayDetail = false;

  @property({type: Object})
  public user!: any;

  @property({type: String})
  public embedSource!: string;

  @property({type: Object})
  countryDetails!: any;

  @property({type: String})
  csvUrl = '';

  @property({type: Array})
  tabs: any[] = [];

  public setTabs() {
    this.tabs = [
      {
        tab: 'personalized',
        tabLabel: 'My Dashboard'
      },
      {
        tab: 'hact',
        tabLabel: 'HACT'
      },
      {
        tab: 'trips',
        tabLabel: 'Trips'
      },
      {
        tab: 'partnerships',
        tabLabel: 'Partnerships'
      },
      {
        tab: 'fam',
        tabLabel: 'Financial Assurance'
      },
      {
        tab: 'fmm',
        tabLabel: 'FM Management'
      },
      {
        tab: 'fmp',
        tabLabel: 'FM Programme'
      },
      {
        tab: 'map',
        tabLabel: 'Map'
      },
      {
        tab: 'attachments',
        tabLabel: 'Document Library'
      },
      {
        tab: 'custom',
        tabLabel: 'Custom',
        hidden: !this.embedSource
      }
    ];
    this.requestUpdate();
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

    this.checkAppVersion();
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname + location.search))));

    const currentYear = new Date().getFullYear();
    this.getAppStaticData();
    this.historicalHactExports = this._setHactExport(2017);
    this.currentYearHactExports = [
      {name: 'Table', endpoint: '/api/v2/partners/hact?format=csv'},
      {name: 'Charts', endpoint: `/api/v2/hact/graph/${currentYear}/export`}
    ];
    this.setTabs();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removeListeners();
  }

  stateChanged(state: RootState) {
    this.routeDetails = state.app!.routeDetails;
    this.mainPage = state.app!.routeDetails!.routeName;
    this.subPage = state.app!.routeDetails!.subRouteName;
  }

  updated(changedProperties: any) {
    if (
      changedProperties.prototype?.hasOwnProperty.call('user') &&
      this.embedSource !== this.user.country.custom_dashboards.bi_url
    ) {
      this.embedSource = this.user.country.custom_dashboards.bi_url;
      this.setTabs();
    }
  }

  tabChanged(e: CustomEvent) {
    const newTabName: string = e.detail.name;
    if (newTabName === this.activeTab) {
      return;
    }
    EtoolsRouter.updateAppLocation(Environment.basePath + newTabName);
  }

  getCurrentUser() {
    return sendRequest({endpoint: Endpoints.myProfile})
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        if ([403, 401].includes(error.status)) {
          window.location.href = window.location.origin + '/login';
        }
        throw error;
      });
  }

  getAppStaticData() {
    this.getCurrentUser().then((user: any) => {
      if (user) {
        this.user = user;
        this.getCountryDetails();

        // Seems to not be used
        // this.getSectors();
        // this.getDropdownsStaticData();
        // this.getOffices();
      }
    });
  }

  getCountryDetails() {
    sendRequest({endpoint: Endpoints.userCountry}).then(
      (resp) => (this.countryDetails = resp && resp.length ? resp[0] : {})
    );
  }

  // Seems to not be used
  // getSectors() {
  //   sendRequest({ endpoint: Endpoints.sectors }).then((resp) =>
  //     store.dispatch(setSectors(resp))
  //   );
  // }
  // getDropdownsStaticData() {
  //   sendRequest({ endpoint: Endpoints.static }).then((resp) =>
  //     store.dispatch(setStatic(resp))
  //   );
  // }
  // getOffices() {
  //   sendRequest({ endpoint: Endpoints.offices }).then((resp) =>
  //     store.dispatch(setOffices(resp))
  //   );
  // }

  goToAddTrip() {
    window.location.href = '/t2f/edit-travel/-1';
  }

  public _export(item: any) {
    const endpoint = item.endpoint;
    window.open(`${endpoint}`, '_blank');
  }

  private _onForbidden(): void {
    const redirectNotification = document.createElement('etools-loading') as EtoolsLoading;
    redirectNotification.loadingText = 'Your login session has expired, you are being redirected to login.';
    // redirectNotification.absolute = true;
    redirectNotification.active = true;
    document.querySelector('body')?.appendChild(redirectNotification);
    setTimeout(() => {
      window.location.href = window.location.origin + '/login/';
    }, 3000);
  }

  protected isActiveMainPage(currentPageName: string, expectedPageName: string): boolean {
    return currentPageName === expectedPageName;
  }

  protected isActiveSubPage(currentSubPageName: string, expectedSubPageNames: string): boolean {
    const subPages: string[] = expectedSubPageNames.split('|');
    return subPages.indexOf(currentSubPageName) > -1;
  }

  protected isActivePage(
    pageName: string,
    expectedPageName: string,
    currentSubPageName?: string | null,
    expectedSubPageNames?: string
  ): boolean {
    if (!this.isActiveMainPage(pageName, expectedPageName)) {
      return false;
    }
    if (currentSubPageName && expectedSubPageNames) {
      return this.isActiveSubPage(currentSubPageName, expectedSubPageNames);
    }
    return true;
  }

  // calculates export links for hact general, detail, and charts views, with new links added each calendar year
  private _setHactExport(startYear: number) {
    const currentYear = new Date().getFullYear();
    const array = [];

    // handles all charts links
    for (let year: number = startYear; year < currentYear; year++) {
      const yearObj = {name: '', endpoint: ''};
      yearObj.name = 'Charts ' + year.toString();
      yearObj.endpoint = `/api/v2/hact/graph/${year}/export`;
      array.push(yearObj);
    }

    // adds detail links
    for (let year: number = startYear; year < currentYear; year++) {
      const yearObj = {name: '', endpoint: ''};
      yearObj.name = 'Table ' + year.toString();
      yearObj.endpoint = `/api/v2/hact/history/?year=${year}&format=csv`;
      array.push(yearObj);
    }

    return array;
  }

  checkAppVersion() {
    fetch('version.json')
      .then((res) => res.json())
      .then((version) => {
        if (version.revision != document.getElementById('buildRevNo')!.innerText) {
          console.log('version.json', version.revision);
          console.log('buildRevNo ', document.getElementById('buildRevNo')!.innerText);
          this._showConfirmNewVersionDialog();
        }
      });
  }

  _showConfirmNewVersionDialog() {
    const msg = document.createElement('span');
    msg.innerText = 'A new version of the app is available. Refresh page?';
    const conf: any = {
      size: 'md',
      closeCallback: this._onConfirmNewVersion.bind(this),
      content: msg
    };
    const confirmNewVersionDialog = createDynamicDialog(conf);
    setTimeout(() => {
      const dialog = confirmNewVersionDialog.shadowRoot?.querySelector('#dialog') as any;
      if (dialog) {
        dialog.style.zIndex = 9999999;
      }
    }, 0);
    confirmNewVersionDialog.opened = true;
  }

  _onConfirmNewVersion(e: CustomEvent) {
    if (e.detail.confirmed) {
      if (navigator.serviceWorker) {
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            caches.delete(cacheName);
          });
          location.reload();
        });
      }
    }
  }
}
