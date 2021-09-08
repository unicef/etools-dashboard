import { PolymerElement, html } from '@polymer/polymer';
import { customElement, property } from '@polymer/decorators';
import '@polymer/iron-pages/iron-pages';
import '@polymer/app-route/app-route';
import '@polymer/paper-styles/element-styles/paper-material-styles';
import './partnerships/elements/cso-dashboard';
import './partnerships/elements/partnerships-overview';
import CommonGeneralMixin from '../common/mixins/common-general-mixin';
import { IronPagesElement } from '@polymer/iron-pages';
import { GenericObject } from '../typings/globals.types';

@customElement('view-partnerships')
export class ViewPartnerships extends CommonGeneralMixin(PolymerElement) {
  public static get template(): HTMLTemplateElement {
    return html`
      <style include="paper-material-styles">
        :host {
          padding: 24px;
        }
        .view-toggle {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-bottom: 12px;
        }
        .curved-left {
          border-radius: 50px 0 0 50px;
          background: rgb(255, 255, 255);
          height: 36px;
          margin-right: 0;
          padding-right: 1em;
          padding-left: 16px;
          cursor: pointer;
        }
        .curved-right {
          border-radius: 0 50px 50px 0;
          background: rgb(216, 216, 216);
          height: 36px;
          margin-left: 0;
          padding-left: 1em;
          padding-right: 16px;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.54);
        }
        .dark-button {
          background: rgb(216, 216, 216);
          color: rgba(0, 0, 0, 0.54);
        }
        .light-button {
          background: rgb(255, 255, 255);
          color: rgba(0, 0, 0, 0.87);
        }
        iron-icon[name='overview'],
        iron-icon[name='csoDash'] {
          padding-right: 4px;
        }
      </style>

      <app-route
        route="[[route]]"
        pattern="/:partnershipsTab"
        data="{{routeData}}"
        active="{{active}}"
        query-params="{{queryParams}}"
        tail="{{subroute}}"
      >
      </app-route>

      <div class="view-toggle">
        <paper-button
          id="overview"
          on-tap="_toggleDashView"
          name="overview"
          noink
          class="curved-left"
        >
          <iron-icon
            id="overviewIcon"
            name="overview"
            icon="reorder"
          ></iron-icon>
          OVERVIEW
        </paper-button>
        <paper-button
          id="csoDash"
          on-tap="_toggleDashView"
          name="cso"
          noink
          class="curved-right"
        >
          <iron-icon id="csoIcon" name="csoDash" icon="list"></iron-icon>
          CSO DASHBOARD
        </paper-button>
      </div>

      <iron-pages
        id="partnershipsPages"
        selected="{{routeData.partnershipsTab}}"
        attr-for-selected="name"
        fallback-selection="overview"
      >
        <div name="overview">
          <partnerships-overview
            active="[[overviewActive]]"
            total-results="{{totalResults}}"
            list-data-path="filteredPartnershipsOverview"
            query-params="{{queryParams}}"
            route="{{route}}"
            user="[[user]]"
            csv-download-url="{{csvDownloadUrlOverview}}"
          ></partnerships-overview>
        </div>

        <div name="cso">
          <cso-dashboard
            active="[[csoActive]]"
            total-results="{{totalResults}}"
            list-data-path="filteredPartnershipsDashboard"
            query-params="{{queryParams}}"
            route="{{route}}"
            user="[[user]]"
            csv-download-url="{{csvDownloadUrlCso}}"
          ></cso-dashboard>
        </div>
      </iron-pages>
    `;
  }

  @property({ type: String, notify: true })
  csvDownloadUrl: string;

  @property({ type: String, observer: '_setDownloadOverview' })
  csvDownloadUrlOverview = '';

  @property({ type: String, observer: '_setDownloadCso' })
  csvDownloadUrlCso = '';

  @property({ type: Boolean, notify: true })
  csoActive = false;

  @property({ type: Boolean, notify: true })
  overviewActive = false;

  @property({ type: Object, notify: true })
  route!: GenericObject;

  static get observers(): string[] {
    return ['_tabChanged(routeData.partnershipsTab, active)'];
  }

  _tabChanged(tab, active) {
    if (!tab || !active) {
      return;
    }
    if (tab === 'overview') {
      this.set('overviewActive', true);
      this.set('csoActive', false);
      this.set('csvDownloadUrl', this.csvDownloadUrlOverview);
      this.$.overview.classList.remove('dark-button');
      this.$.csoDash.classList.remove('light-button');
    } else if (tab === 'cso') {
      this.set('csoActive', true);
      this.set('overviewActive', false);
      this.set('csvDownloadUrl', this.csvDownloadUrlCso);
      this.$.overview.classList.add('dark-button');
      this.$.csoDash.classList.add('light-button');
    }
  }

  _setDownloadOverview() {
    if (this.overviewActive) {
      this.set('csvDownloadUrl', this.csvDownloadUrlOverview);
    }
  }

  _setDownloadCso() {
    if (this.csoActive) {
      this.set('csvDownloadUrl', this.csvDownloadUrlCso);
    }
  }

  _toggleDashView(_target) {
    let ironPages = this.$.partnershipsPages as IronPagesElement;
    ironPages.selectNext();
  }
}
