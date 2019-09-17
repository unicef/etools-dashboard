import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
// import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
// import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
// import '@polymer/paper-styles/element-styles/paper-material-styles.js';
// import '@polymer/paper-input/paper-input.js';
// import '@polymer/paper-tooltip/paper-tooltip.js';
// import '@polymer/iron-icon/iron-icon.js';
// import '@polymer/iron-icons/av-icons.js';
// import '@polymer/iron-meta/iron-meta.js';
// import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/app-route/app-route.js';
// import '@polymer/iron-pages/iron-pages.js';
// import '@polymer/paper-button/paper-button.js';
// import { timeOut } from '@polymer/polymer/lib/utils/async.js';
// import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
// import '@unicef-polymer/etools-dropdown/etools-dropdown.js';
// import '../../styles/shared-styles';
// import '../../styles/list-styles';
// import '../../styles/grid-layout-styles';
// import '../../styles/app-theme';
// import '../../styles/page-layout-styles';
// import './elements/hact-detail';
// import './elements/hact-charts';
// import './elements/hact-general';
// import './elements/hact-edit-dialog';
// import '../../components/data-table/data-table-footer';
// import './data/partners-data';
// import '../../mixins/common-general-mixin';
// import '../../mixins/pagination-mixin';
// import '../../endpoints/endpoints-mixin';
// import { Mixins } from '../../mixins/redux-store-mixin';
// import { prop, propOr, isEmpty } from 'ramda';
import {customElement, property} from '@polymer/decorators';

/**
 * @polymer
 * @mixinFunction
 */
// const ViewHactMixins = EtoolsMixinFactory.combineMixins([
  // Mixins.Endpoints,
  // Mixins.CommonGeneral,
  // Mixins.Pagination,
  // Mixins.FetchAsset
// ], PolymerElement);

/**
 * `hact` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @appliesmixin ViewHactMixins
 */
@customElement('view-hact')
export class ViewHact extends PolymerElement {
  static get template() {
    return html`
      <style>
        div.container {
          height: 100vh;
          width: 100vw
        }
      </style>
      <div class="container">
        <iframe width="100%"
                height="100%"
                src="[[embedSource]]"
                frameborder="0"
                allowFullScreen="true">
        </iframe>
      </div>
    `;
    // return html`
//     <style include="shared-styles list-styles paper-material-styles">
//       :host {
//         --paper-input-container-label: {
//           margin-left: 34px;
//         };
//         --paper-tooltip-opacity: 1;
//       }

//       #query {
//         padding-bottom: 8px;
//       }

//       .hact-list {
//         min-width: 1150px;
//       }

//       .detail-btn {
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         height: 36px;
//       }

//       .paper-material.detail-btn {
//         padding-top: 0;
//         padding-bottom: 0;
//       }

//       .search-bar {
//         padding-bottom: 8px;
//         padding-top: 8px;
//         padding-left: 24px;
//         box-sizing: border-box;
//       }

//       .toggle {
//         font-size: 12px;
//         cursor: pointer;
//         font-weight: 500;
//         top: 10px;
//         z-index: 1;
//       }

//       .view-toggle {
//         display: flex;
//         justify-content: flex-end;
//         align-items: center;
//         padding-bottom: 12px;
//       }

//       .curved-left {
//         border-radius: 50px 0 0 50px;
//         background: rgb(255, 255, 255);
//         height: 36px;
//         margin-right: 0;
//         padding-right: 1em;
//         padding-left: 16px;
//         cursor: pointer;
//       }

//       .curved-right {
//         border-radius: 0 50px 50px 0;
//         background: rgb(216, 216, 216);
//         height: 36px;
//         margin-left: 0;
//         padding-left: 1em;
//         padding-right: 16px;
//         cursor: pointer;
//         color: rgba(0, 0, 0, 0.54);
//       }

//       .dark-button {
//         background: rgb(216, 216, 216);
//         color: rgba(0, 0, 0, 0.54);
//       }

//       .light-button {
//         background: rgb(255, 255, 255);
//         color: rgba(0, 0, 0, 0.87);
//       }

//       iron-icon[name="assurance"],
//       iron-icon[name="charts"] {
//         padding-right: 4px;
//       }

//       paper-button.detailed-assurance {
//         border-radius: 50px;
//         background: rgb(255, 255, 255);
//         cursor: pointer;
//       }

//       .wrap-controls {
//         padding-left: 24px;
//       }
//     </style>

//     <app-route route="{{route}}" pattern="/:hactTab" data="{{routeData}}" active="{{hactActive}}" query-params="{{queryParams}}"></app-route>

//     <partners-data id="partners" filtered-partners="{{filteredPartners}}" total-results="{{totalResults}}" totals="{{totals}}" filtered-total-results="{{filteredTotalResults}}" fire-data-loaded="" show-loading="" on-partners-loaded="_requiredDataHasBeenLoaded">
//     </partners-data>

//     <div class="view-toggle">
//       <paper-button id="assurancePlan" on-tap="_toggleChartsView" name="assurance" noink="" class="curved-left">
//         <iron-icon id="assuranceIcon" name="assurance" icon="list"></iron-icon>
//         ASSURANCE PLAN
//       </paper-button>
//       <paper-button id="dashboardCharts" on-tap="_toggleChartsView" name="charts" noink="" class="curved-right">
//         <iron-icon id="chartsIcon" name="charts" icon="av:equalizer"></iron-icon>
//         DASHBOARD
//       </paper-button>
//     </div>

//     <iron-pages id="hactPages" selected="{{routeData.hactTab}}" attr-for-selected="name" fallback-selection="assurance">

//       <div name="assurance">
//         <div class="paper-material list-panel search-bar hact-list" elevation="1">
//           <div class="wrap-controls">
//             <paper-input id="query" type="search" autocomplete="off" value="[[queryString]]" on-keyup="setQuery" placeholder="Type and search" label="Keywords" always-float-label="" on-search="setQuery">
//               <iron-icon icon="search" slot="prefix"></iron-icon>
//             </paper-input>
//           </div>
//         </div>
        
//         <div class="paper-material hact-list detail-btn" elevation="1">
//           <paper-button on-tap="_detailToggle" class="toggle" noink="">
//             <a id="detailedAssurance" class="detailed-assurance">SHOW DETAILED ASSURANCE</a>
//           </paper-button>
//         </div>

//         <iron-pages id="assurance" selected="[[subName]]" attr-for-selected="sub-name" fallback-selection="hact-general">
//           <div sub-name="hact-general">
//             <hact-general filtered-partners="[[filteredPartners]]" totals="[[totals]]" user="[[user]]" total-results="[[totalResults]]" filtered-total-results="[[filteredTotalResults]]">
//             </hact-general>
//           </div>
//           <div sub-name="hact-detail">
//             <hact-detail filtered-partners="[[filteredPartners]]" totals="[[totals]]" user="[[user]]" total-results="[[totalResults]]" filtered-total-results="[[filteredTotalResults]]">
//             </hact-detail>
//           </div>
//         </iron-pages>

//         <data-table-footer page-size="[[pageSize]]" page-number="[[pageNumber]]" visible-range="{{visibleRange}}" filtered-total-results="[[filteredTotalResults]]" on-page-size-changed="pageSizeChanged" on-page-number-changed="pageNumberChanged">
//         </data-table-footer>
//       </div>

//       <div name="charts">
//         <hact-charts user="[[user]]" active="[[_isActive(routeData.hactTab,'charts')]]"></hact-charts>
//       </div>
//     </iron-pages>
// `;
  }

//   /**
//    * String providing the tag name to register the element under.
//    */
  // static get is() {
  //   return 'view-hact';
  // }
@property({type: String})
embedSource: string

@property({type: Object})
user: object

static get observers() {
  return [
    'setEmbedSource(user)'
  ];
}

connectedCallback() {
  super.connectedCallback();

  
}

setEmbedSource() {
  let country = this.user.country.name;

  let embedSource = "https://app.powerbi.com/reportEmbed" +
    "?reportId=cb3c63d4-8cf7-42c7-b94d-0950082c68de&appId=2c83563f-d6fc-4ade-9c10-bbca57ed1ece" +
    "&autoAuth=true" +
    "&ctid=77410195-14e1-4fb8-904b-ab1892023667" +
    "&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLW5vcnRoLWV1cm9wZS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCJ9" +
    `&$filter=actionpoints/country_name eq '${country}'` +
    ` and engagement/country_name eq '${country}'` +
    ` and interventions/country_name eq '${country}'` +
    ` and interventions_offices_sections/country_name eq '${country}'` +
    ` and partners/country_name eq '${country}'` +
    ` and partners_interventions/country_name eq '${country}'` +
    ` and travelactivities/country_name eq '${country}'` +
    ` and travels/country_name eq '${country}'`;
    console.log(embedSource)
  this.set('embedSource', embedSource);
}
//   /**
//    * Object describing property-related metadata used by Polymer features
//    */
//   static get properties() {
//     return {
//       filteredPartners: {
//         type: Array,
//         notify: true
//       },
//       csvDownloadUrl: {
//         type: String,
//         notify: true
//       },
//       forceDataRefresh: {
//         type: Boolean,
//         value: false
//       },
//       requiredDataLoaded: {
//         type: Boolean,
//         value: false
//       },
//       initComplete: {
//         type: Boolean,
//         value: false
//       },
//       debounceTime: {
//         type: Number,
//         value: 50
//       },
//       totals: {
//         type: Array
//       },
//       displayDetail: {
//         type: Boolean,
//         notify: true
//       },
//       showDash: {
//         type: Boolean,
//         value: false
//       },
//       graphsActive: {
//         type: Boolean,
//         value: false
//       },
//       routeData: {
//         type: Object,
//         notify: true
//       },
//       route: {
//         type: Object,
//         notify: true
//       },
//       user: {
//         type: Object
//       },
//       hactActive: {
//         type: Boolean
//       },
//       editDialogEl: {
//         type: Object
//       }
//     };
//   }

//   static get observers() {
//     return [
//       '_updateUrl(queryString, pageNumber, pageSize, sortOrder, requiredDataLoaded, initComplete)',
//       '_tabChanged(routeData.hactTab, hactActive)'
//     ];
//   }

//   /**
//    * Instance of the element is created/upgraded. Use: initializing state,
//    * set up event listeners, create shadow dom.
//    * @constructor
//    */
//   constructor() {
//     super();
//     this.addEventListener('edit-partner', this._openEditDialog);
//   }

//   /**
//    * Use for one-time configuration of your component after local DOM is initialized.
//    */
//   ready() {
//     super.ready();
//   }

//   connectedCallback() {
//     super.connectedCallback();
//     this._createEditDialog();
//   }

//   _createEditDialog() {
//     this.set('editDialogEl', document.createElement('hact-edit-dialog'));
//     this.editDialogEl.setAttribute('id', 'editHactPlanDialog');
//     this.editDialogEl.addEventListener('notify-list-change', this._handleSaveHact.bind(this));
//     document.querySelector('body').appendChild(this.editDialogEl);
//   }

//   _handleSaveHact() {
//     this._requiredDataHasBeenLoaded();
//   }

//   _tabChanged(tab, hactActive) {
//     this.set('active', hactActive);
//     if (!tab || !hactActive) { return; }
//     if (tab === 'charts') {
//       this.updateAppState(this.route.prefix+this.route.path, '', true);
//       this.$.assurancePlan.classList.add('dark-button');
//       this.$.dashboardCharts.classList.add('light-button');
//     } else if (tab === 'assurance') {
//       this.updateAppState(this.route.prefix+this.route.path+'?'+this.buildQueryString(), '', true);
//       this.$.assurancePlan.classList.remove('dark-button');
//       this.$.dashboardCharts.classList.remove('light-button');
//     }
//   }

//   _filterPartnersData() {
//     // @ts-ignore
//     Debouncer.debounce('query',
//       timeOut.after(50),
//       () => this.$.partners.query(
//         this.queryString,
//         this.sortOrder,
//         this.pageSize,
//         this.pageNumber)
//     );
//   }

//   _updateUrl() {
//     if (!this.initComplete || !this.hactActive) {
//       return;
//     }
//     this.set('csvDownloadUrl', this._buildCsvDownloadUrl());
//     const qs = this.buildQueryString();
//     const currentRoute = this.route.prefix+this.route.path;
//     if (qs !== null && this.route.path != '/charts') {
//       this.updateAppState(currentRoute, qs, true);
//       if (this.requiredDataLoaded) {
//         this._filterPartnersData();
//       }
//     } else {
//       if (location.search === '' && this.route.path != '/charts') {
//         this.updateAppState(currentRoute, qs, false);
//       }
//       if (this.forceDataRefresh && this.requiredDataLoaded) {
//         this._filterPartnersData();
//         this.set('forceDataRefresh', false);
//       }
//     }
//   }

//   _buildCsvDownloadUrl() {
//     return this.queryString
//       ? this.getEndpoint('partners').url + '?' + 'search=' + this.queryString + '&format=csv'
//       : this.getEndpoint('partners').url + '?' + '&format=csv';
//   }

//   _getProp(obj, propStr) {
//     if (propStr === 'partner_type') {
//       return this._getAbbr(this.get(obj, propStr));
//     }
//     return prop(propStr, obj);
//   }

//   _getAbbr(str) {
//     return str.length > 12
//       ? str
//         .split(' ')
//         .map(function(word) {
//           return word[0].toUpperCase();
//         }).join('') : str;
//   }

//   _requiredDataHasBeenLoaded() {
//     let filtered = propOr([], 'filteredPartners', this );
//     if (isEmpty(filtered)) {
//       this.set('forceDataRefresh', true);
//     }
//     this.set('requiredDataLoaded', true);
//     this.init(this.active);
//   }

//   _toggleChartsView() {
//     let pages = this.$.hactPages;
//     pages.selectNext();
//   }

//   _detailToggle() {
//     this.$.assurance.selectNext();
//     let button = this.$.detailedAssurance;
//     button.innerText = !this.displayDetail ? 'HIDE DETAILED ASSURANCE' : 'SHOW DETAILED ASSURANCE';
//     this.set('displayDetail', !this.displayDetail);
//   }

//   _isActive(current, target) {
//     return current === target;
//   }

//   _openEditDialog({ detail }) {
//     this.editDialogEl.partner = detail;
//     this.editDialogEl.openDialog();
//   }
}

// window.customElements.define(ViewHact.is, ViewHact);
