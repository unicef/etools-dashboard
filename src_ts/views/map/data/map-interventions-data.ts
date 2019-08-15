// import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
// import { EndpointsMixin } from '../../../endpoints/endpoints-mixin';
// import { fireEvent } from '../../../components/utils/fire-custom-event';
// import { AjaxServerErrors } from '../../../mixins/ajax-server-errors-mixin';
// // import { Mixins } from '../../../mixins/redux-store-mixin';
// import {compose, assoc, isEmpty, prop, map, pick, filter, uniq, flatten, merge, reduce } from 'ramda';
// // export const Mixins = Mixins || {};

// window.EtoolsDashboard = window.EtoolsDashboard || {};
// window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};

// /**
//  *
//  * @polymerMixin
//  * @mixinFunction
//  */
// window.EtoolsDashboard.Mixins.MapInterventionsData = (superclass) =>
//   class extends EventHelperMixin(
//     EndpointsMixin(
//       AjaxServerErrors(
//         EtoolsAjaxRequestMixin(superclass)))) {
//     static get properties() {
//       return {
//         reqOptions: {
//           type: Object,
//           value: {
//             endpoint: null,
//             csrf: true
//           }
//         },
//         filteredInterventions: {
//           type: Array,
//           readOnly: true,
//           notify: true
//         },
//         mapFilter: {
//           type: Object,
//           observer: 'queryMapInterventions',
//           notify: true
//         },
//         locationsDictCreated: {
//           type: Boolean,
//           value: false
//         },
//         locationsDict: {
//           type: Object,
//           readOnly: true,
//           notify: true
//         }

//       };
//     }

//     ready() {
//       super.ready();
//     }

//     queryMapInterventions(filter) {
//       this.set('reqOptions.endpoint', this.getEndpoint('mapInterventions'));
//       this.set('reqOptions.params', filter);
//       this._requestMapData();
//     }

//     _requestMapData() {
//       fireEvent(this, 'global-loading', { active: true, loadingSource: 'map-data' });
//       this.sendRequest(this.reqOptions)
//         .then((resp) => {
//           this._formatInterventions(resp);
//         }).catch((err) => {
//           fireEvent(this, 'global-loading', { loadingSource: 'map-data' });
//           this.handleErrorResponse(err);
//         });
//     }

//     _formatInterventions(data) {
//       fireEvent(this, 'global-loading', { loadingSource: 'map-data' });

//       if (!this.locationsDictCreated) {
//         this._mapLocationsToInterventions(data);
//         this.set('loadedInitially', true);
//       }
//       const addParsedPoint = (p)=> assoc('point', this.parseMapPoint(p.geo_point), p);
//       const hasGeoPoint = (g)=> !isEmpty(prop('geo_point', g));

//       // locations are the locations from each intervention combined into a single flattened array of uniques
//       let locations = compose(
//         map(compose(addParsedPoint, pick(['id', 'geo_point']))),
//         filter(hasGeoPoint),
//         uniq,
//         flatten,
//         map(prop('locations'))
//       )(data);
//       this._setFilteredInterventions(locations);
//     }

//     parseMapPoint(point) {
//       if (point) {
//         var pt = point.split('(').pop().slice(0, -1).split(' ');
//         return {
//           latitude: parseFloat(pt[1]),
//           longitude: parseFloat(pt[0])
//         };
//       } else {
//         return null;
//       }
//     }

//     // Filters interventions with locations and geo points, creates a mapping from location id to all interventions
//     // at that location
//     _mapLocationsToInterventions(data) {
//       const hasLocationsAndGeopoint = (x)=> !isEmpty(prop('locations', x)) && !isEmpty(prop('geo_point', x));
//       const addDataToDict = (acc, inter)=> {
//         inter.locations.map((location)=>{
//           const locationObj = acc[location.id] || {
//             interventions: [],
//             name: location.name
//           };
//           locationObj.interventions = uniq([
//              inter,
//             ...locationObj.interventions
//           ]);
//           acc = merge(acc, { [location.id]: locationObj });
//         });
//         return acc;
//       };
//       const getInterventionsFromLocations = compose(
//         reduce(addDataToDict, {}),
//         filter(hasLocationsAndGeopoint)
//       );
//       const locationsDict = getInterventionsFromLocations(data);
//       this._setLocationsDict(locationsDict);
//     }
//   };
