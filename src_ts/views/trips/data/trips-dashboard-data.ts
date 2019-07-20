// import { PolymerElement } from '@polymer/polymer/polymer-element.js';
// import '@polymer/polymer/lib/utils/async.js';
// import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
// import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
// import '../../../endpoints/endpoints-mixin';
// import '../../../mixins/event-helper-mixin';
// import { Mixins } from '../../../mixins/redux-store-mixin';
// import { isEmpty, keys, equals } from 'ramda';

// /**
// * @polymer
// * @mixinFunction
// */
// const TripsDashboardDataMixin = EtoolsMixinFactory.combineMixins([
//   Mixins.EventHelper,
//   EtoolsAjaxRequestMixin,
//   Mixins.Endpoints
// ], PolymerElement);

// /**
//  * @polymer
//  * @customElement
//  * @appliesmixin TripsDashboardDataMixin
//  */
// class TripsDashboardData extends TripsDashboardDataMixin {
//   static get is() { return 'trips-dashboard-data'; }

//   static get properties() {
//     return {
//       reqOptions: {
//         type: Object,
//         value: {
//           endpoint: null,
//           csrf: null
//         }
//       },
//       tripsData: {
//         type: Object,
//         readOnly: true,
//         notify: true
//       },
//       filter: {
//         type: Object,
//         observer: '_filterChanged'
//       }
//     };
//   }

//   _filterChanged(filter) {
//     if (!isEmpty(filter)) {
//       var endpointParams = keys(filter).filter((key) => {
//         return filter[key];
//       }).
//       map((k: string) => {
//         return k + '=' + filter[k];
//       }).
//       join('&');
//       var endpoint = this.getEndpoint('tripsDashboard');
//       endpoint.url += endpointParams;
//       if (!equals(endpoint, this.endpoint)) {
//         this.fireEvent('global-loading', { message: 'Loading trips chart data...', loadingSource: 'trips-dashboard-data', active: true });
//         this.set('reqOptions.endpoint', endpoint);
//       }
//     } else {
//       this.reqOptions.endpoint.url = null;
//     }
//     this.sendRequest(this.reqOptions).then((response) => this._handleResponse(response));
//   }

//   _handleResponse(response) {
//     this._setTripsData(response);
//     this.fireEvent('global-loading', { loadingSource: 'trips-dashboard-data' });
//   }
// }

// window.customElements.define(TripsDashboardData.is, TripsDashboardData);
