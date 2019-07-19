import { PolymerElement } from '@polymer/polymer/polymer-element.js';
// import '@polymer/app-route/app-route.js';
// import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
// import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
// import '@polymer/paper-styles/element-styles/paper-material-styles.js';
// import '@polymer/paper-icon-button/paper-icon-button.js';
// import '@polymer/paper-listbox/paper-listbox.js';
// import '@polymer/paper-button/paper-button.js';
// import '@polymer/paper-item/paper-item.js';
// import '@unicef-polymer/etools-dropdown/etools-dropdown-multi.js';
import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
// import moment from 'moment';
// import '../../styles/shared-styles';
// import '../../styles/list-styles';
// import '../../styles/page-layout-styles';
// import '../../styles/buttons-styles';
// import 'google-chart/google-chart';
// import 'google-chart/google-chart-loader';
// import '../../mixins/dropdown-mixin';
// import { Mixins } from '../../mixins/redux-store-mixin';
// import '../../mixins/event-helper-mixin';
// import '../../mixins/fetch-assets-mixin';
// import './data/trips-dashboard-data';
// import './data/action-pts-by-section-data';
// import { range, isEmpty, without, prop } from 'ramda';
// import * as _ from 'lodash-es';

/**
* @polymer
* @mixinFunction
*/
const ViewTripsMixins = EtoolsMixinFactory.combineMixins([
  // Mixins.ReduxStore,
  // Mixins.Dropdown,
  // Mixins.EventHelper,
  // Mixins.FetchAsset
], PolymerElement);

/**
 * `view-trips` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends ViewTripsMixins
 */
class ViewTrips extends ViewTripsMixins {
//   static get template() {
//     return html`
//     <custom-style>
//       <style include="list-styles iron-flex-factors shared-styles page-layout-styles buttons-styles iron-flex-alignment paper-material-styles">
        
//         .by-type {
//           padding: 0;
//           @apply --layout-horizontal;
//         }
  
//         .viz {
//           width: 100%;
//           @apply --tripsChart;
//         }
  
//         .viz-actions {
//           width: 100%;
//           @apply --actionPointsChart;
//         }
  
//         .chart-title {
//           font-size: 16px;
//           margin: 0;
//           line-height: 48px;
//           font-weight: 500;
//         }
  
//         .wrap-controls paper-dropdown-menu.sm-dropdown {
//           min-width: 88px;
//         }
//       </style>
//     </custom-style>

//       <app-route route="{{route}}" pattern="/dash/trips" active="{{active}}" query-params="{{queryParams}}"></app-route>
//       <trips-dashboard-data trips-data="{{tripsData}}" active="[[active]]" filter="[[tripsFilter]]"></trips-dashboard-data>
//       <action-pts-by-section-data action-points-data="{{actionPointsData}}" filter="[[actionPtsFilter]]"></action-pts-by-section-data>
//       <google-chart-loader id="google"></google-chart-loader>

//       <div class="paper-material list-panel listControls" elevation="1">
//         <div class="controls-wrapper flex">
//           <div class="title-row">
//             <h1 sub-title="">Trips</h1>
//           </div>
//           <div class="filters-divider"></div>
//           <div class="wrap-controls flex">
//             <div class="dropdown-with-clear-btn">
//               <paper-dropdown-menu label="Year" id="tripsYear" class="sm-dropdown" placeholder="Select from list" error-message="Must select a year" noink="">
//                 <paper-listbox slot="dropdown-content" attr-for-selected="id" selected="{{year}}">
//                   <template is="dom-repeat" items="[[years]]" as="year">
//                     <paper-item id="[[year]]">[[year]]</paper-item>
//                   </template>
//                 </paper-listbox>
//               </paper-dropdown-menu>
//             </div>
//             <div class="dropdown-with-clear-btn">
//               <etools-dropdown-multi label="Month" id="tripsMonth" placeholder="Select from list" error-message="Must select at least one month" selected-values="{{month}}" trigger-value-change-event="" options="[[months]]"></etools-dropdown-multi>
//             </div>
//             <div class="dropdown-with-clear-btn">
//               <etools-dropdown-multi label="Office" id="tripsOffice" placeholder="Select from list" selected-items="{{tripsOffice}}" option-label="name" option-value="id" trigger-value-change-event="" options="[[offices]]"></etools-dropdown-multi>
//             </div>
//           </div>
//           <paper-button class="primary-btn" on-tap="_setFilter" disabled="[[fetchDisabled]]">
//             Get Chart
//           </paper-button>
//         </div>
//       </div>

//       <div class="paper-material list-panel by-type" elevation="1">
//         <div class="trip title-row flex-2">
//           <h2 sub-title="">Trips in country programme</h2>
//         </div>
//         <div class="trips flex-3">
//           <div class="trip trip-type-one flex-c">
//             <h1>Planned</h1>
//             [[tripsData.planned]]
//           </div>
//           <div class="trip trip-type-two flex-c">
//             <h1>Approved</h1>
//             [[tripsData.approved]]
//           </div>
//           <div class="trip trip-type-three flex-c">
//             <h1>Completed</h1>
//             [[tripsData.completed]]
//           </div>
//         </div>
//       </div>

//       <div class="paper-material list-panel" elevation="1">
//         <h2 class="chart-title">Trips by section</h2>
//         <google-chart id="tripsChart" class="viz" type="bar">
//         </google-chart>
//       </div>

//       <!--ACTION POINTS-->

//       <div class="paper-material list-panel listControls" elevation="1">
//         <div class="controls-wrapper">
//           <div class="title-row">
//             <h1 sub-title="">Action Points</h1>
//           </div>
//           <div class="filters-divider"></div>
//           <div class="wrap-controls">
//             <div class="dropdown-with-clear-btn">
//               <etools-dropdown-multi label="Office" id="actionPtsOffice" placeholder="Select from list" error-message="Must select at least one office" selected-values="{{apOffice}}" option-label="name" option-value="id" trigger-value-change-event="" on-etools-selected-items-changed="_apOfficeChanged" options="[[offices]]"></etools-dropdown-multi>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div class="paper-material list-panel" elevation="1">
//         <h2 class="chart-title">Action points by section</h2>
//         <google-chart id="actionPointsChart" class="viz-actions" type="bar">
//         </google-chart>
//       </div>
// `;
//   }

//   /**
//    * String providing the tag name to register the element under.
//    */
//   static get is() {
//     return 'view-trips';
//   }

//   /**
//    * Object describing property-related metadata used by Polymer features
//    */
//   static get properties() {
//     return {
//       tripsData: {
//         type: Object,
//         observer: '_tripsDataChanged'
//       },
//       tripsFilter: {
//         type: Object,
//         notify: true
//       },
//       offices: {
//         type: Array,
//         statePath: 'offices'
//       },
//       tripsOffice: {
//         type: Array,
//         observer: '_monthChanged'
//       },
//       tripsChart: {
//         type: Array,
//         notify: true,
//         value: []
//       },
//       actionPointsData: {
//         type: Object,
//         observer: '_actionPointsDataChanged'
//       },
//       apOffice: {
//         type: String,
//         notify: true,
//         observer: '_apOfficeChanged'
//       },
//       actionPtsFilter: {
//         type: Object,
//         notify: true
//       },
//       months: {
//         type: Array
//       },
//       years: {
//         type: Array,
//         statePath: 'tripsYears'
//       },
//       year: {
//         type: String,
//         observer: '_setYear'
//       },
//       month: {
//         type: String,
//         notify: true,
//         observer: '_monthChanged'
//       },
//       fetchDisabled: {
//         type: Boolean,
//         value: false
//       },
//       staticDataLoaded: {
//         type: Boolean,
//         value: false
//       },
//       tripsChartOptions: {
//         type: Object,
//         value: {
//           colors: ['#FCF39F', '#BFE58A', '#64BD00'],
//           legend: { position: 'none' },
//           animation: {
//             startup: true,
//             duration: 300,
//             easing: 'in'
//           },
//           chartArea: {
//             top: '16',
//             bottom: '32',
//             width: '75%'
//           },
//           isStacked: true,
//           hAxis: {
//             minValue: 1,
//             gridlineColor: '#E8E8E8'
//           },
//           vAxis: {
//             minValue: 0,
//             textStyle: {
//               fontSize: 14,
//               lineHeight: 30
//             }
//           },
//           bar: { groupWidth: '22' }
//         }
//       },
//       actionPointsChart: {
//         type: Object,
//         notify: true
//       },
//       actionPointsChartOptions: {
//         type: Object,
//         value: {
//           colors: ['#8AD0FF', '#EEEEEE'],
//           chartArea: {
//             top: '16',
//             bottom: '32',
//             width: '75%',
//             height: '75%'
//           },
//           isStacked: 'percent',
//           animation: {
//             startup: true,
//             duration: 300,
//             easing: 'in'
//           },
//           hAxis: {
//             textPosition: 'none',
//             minValue: 0,
//             gridlineColor: '#E8E8E8',
//             format: 'percent',
//             ticks: []
//           },
//           vAxis: {
//             minValue: 0,
//             textStyle: {
//               fontSize: 14,
//               lineHeight: 30
//             }
//           },
//           bar: { groupWidth: '22' },
//           legend: {
//             position: 'top',
//             alignment: 'end'
//           }
//         }
//       },
//       noDataOptions: {
//         type: Object,
//         value: {
//           legend: { position: 'none' },
//           colors: ['transparent'],
//           chartArea: {
//             width: '50%',
//             left: '5%',
//             height: '75%',
//             top: '16'
//           },
//           vAxis: {
//             baselineColor: 'transparent',
//             gridlineColor: 'transparent'
//           },
//           hAxis: {
//             minValue: 1,
//             gridlineColor: 'transparent',
//             textStyle: {
//               color: 'transparent'
//             }
//           },
//           annotations: {
//             alwaysOutside: true,
//             textStyle: {
//               color: '#979797',
//               fontSize: 28
//             },
//             stem: {
//               color: 'transparent',
//               length: '50%'
//             }
//           },
//           bar: { groupWidth: '22' }
//         }
//       },
//       noDataMessage: {
//         type: Array,
//         value: [['Bar', 'Time', { role: 'annotation' }],
//           ['', 2, 'No chart data']
//         ]
//       },
//       route: {
//         type: Object
//       },
//       user: {
//         type: Object
//       }
//     };
//   }

//   static get observers() {
//     return [
//       '_init(active)',
//       '_alertStaticDataLoaded(offices,months,years)'
//     ];
//   }

//   _init(active) {
//     if (active) {
//       if (!this.staticDataLoaded) {
//         this.fireEvent('global-loading', { message: 'Loading page data...', active: true });
//       }
//       this._initTripsChart();
//       if (!this.actionPtsFilter) {
//         this.set('actionPtsFilter', {});
//       }
//     }
//   }

//   _initTripsChart() {
//     this.set('year', moment().year());
//     this.set('months', moment.months().map((month, i) => {
//       return {
//         label: month,
//         value: ('0' + (i + 1)).slice(-2)
//       };
//     }));
//     var monthsToDate = range(1, moment().month() + 2).map((month) => {
//       return ('0' + (month)).slice(-2);
//     });
//     this.set('month', monthsToDate);
//     this._setFilter();
//   }

//   _setFilter() {
//     this.set('fetchDisabled', true);
//     if (!this.year) {
//       this._setInvalid('tripsYear');
//       return;
//     }
//     var filter = { year: this.year };
//     if (this.month) {
//       var monthObj = { months: this.month.join(',') };
//       _.assign(filter, monthObj);
//     }
//     if (this.tripsOffice) {
//       var officeObj = { office_id: this.tripsOffice.map((off) => off.id).join(',') };
//       _.assign(filter, officeObj);
//     }
//     this.set('tripsFilter', filter);
//   }

//   _setYear(year) {
//     if (year) {
//       this._monthChanged();
//       this.$.tripsYear.invalid = false;
//     } else {
//       this._setInvalid('tripsYear');
//       this.set('fetchDisabled', true);
//     }
//   }

//   _monthChanged() {
//     if (this.year) {
//       this.set('fetchDisabled', false);
//     }
//   }

//   _alertStaticDataLoaded(...args) {
//     var allHaveValues = args.reduce((allHaveValues, item) => {
//       return !isEmpty(item) && allHaveValues;
//     }, true);
//     if (allHaveValues) {
//       this.set('staticDataLoaded', true);
//       this.fireEvent('global-loading', {});
//     }
//   }

//   _setInvalid(field) {
//     this.set('tripsFilter', {});
//     this.set('tripsData', {});
//     var fields = [
//       {
//         name: 'year',
//         id: 'tripsYear'
//       },
//       {
//         name: 'month',
//         id: 'tripsMonth'
//       },
//       {
//         name: 'tripsOffice',
//         id: 'tripsOffice'
//       }
//     ];
//     // @ts-ignore
//     fields = without({ id: field }, fields);
//     var invalid = fields.reduce((isValid, _field) => {
//       return this[_field.name] || isValid;
//     }, false);
//     if (invalid && field !== 'tripsOffice') {
//       this.shadowRoot.querySelector('#' + field).invalid = true;
//     } else {
//       fields.forEach((f) => {
//         this.shadowRoot.querySelector('#' + f.id).invalid = false;
//       });
//     }
//   }

//   _formatChartData(formatted, chartName) {
//     this.$.google.dataTable(formatted).then((dt) => {
//       // magic ratio number 32.71
//       this.shadowRoot.querySelector('#' + chartName).style = `height: ${Math.round(dt.getNumberOfRows() * 32.71)}px; min-height: 300px`;
//       this.shadowRoot.querySelector('#' + chartName).options = this[chartName + 'Options'];
//       this.shadowRoot.querySelector('#' + chartName).data = dt;
//     });
//   }

//   _tripsDataChanged(data) {
//     if (!isEmpty(data) && data != null) {
//       var travels = prop('travels_by_section', data);
//       if (!travels.length && this.active) {
//         this.fireEvent('global-loading', {});
//         this._setNoData('tripsChart');
//       } else {
//         var formatted = [
//           ['Trips', 'Planned', 'Approved', 'Completed']
//         ];
//         travels.map((section) => {
//           formatted.push([section.section_name,
//             section.planned_travels,
//             section.approved_travels,
//             section.completed_travels]);
//         });
//         this._formatChartData(formatted, 'tripsChart');
//       }
//     }
//   }

//   _filterValid() {
//     this.$.tripsYear.invalid = this.year ? false : true;
//     this.$.tripsMonth.invalid = this.month ? false : true;
//     return this.year && this.month;
//   }

//   _apOfficeChanged() {
//     var filter = {office: ''};
//     if (this.apOffice && this.apOffice.length) {
//       filter.office = this.apOffice;
//     }
//     this.set('actionPtsFilter', filter);
//   }

//   _actionPointsDataChanged(data) {
//     if (!isEmpty(data)) {
//       var actionPoints = prop('action_points_by_section', data).filter((ap) => {
//         return prop('total_action_points', ap);
//       });
//       if (!actionPoints.length && this.active) {
//         this._setNoData('actionPointsChart');
//       } else {
//         var formatted = [['Action Points', 'Closed', 'Open']];
//         actionPoints.forEach((ap) => {
//           formatted.push([ap.section_name,
//             ap.completed_action_points,
//             (ap.total_action_points - ap.completed_action_points)
//           ]);
//         });
//         this._formatChartData(formatted, 'actionPointsChart');
//       }
//     }
//   }

//   _setNoData(chartName) {
//     this.$.google.dataTable(this.noDataMessage).then((dt) => {
//       this.shadowRoot.querySelector('#' + chartName).style = 'height: 300px';
//       this.shadowRoot.querySelector('#' + chartName).options = this.noDataOptions;
//       this.shadowRoot.querySelector('#' + chartName).data = dt;
//       this.shadowRoot.querySelector('#' + chartName).redraw();
//     });
//   }
}

window.customElements.define(ViewTrips.is, ViewTrips);
