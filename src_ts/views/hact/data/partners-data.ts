// import { PolymerElement } from '@polymer/polymer/polymer-element.js';
// import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
// import '../../../mixins/data-element-mixin';
// import { fireEvent } from '../../../components/utils/fire-custom-event';
// // import { db } from '../../../config/dexie-db-config';
// import Dexie from 'dexie';
// // import { Mixins } from '../../../mixins/redux-store-mixin';
// import { isEmpty, contains } from 'ramda';
// // import * as _ from 'lodash-es';

// /**
// * @polymer
// * @mixinFunction
// */
// const PartnersDataMixin = EtoolsMixinFactory.combineMixins([
//   window.EtoolsDashboard.Mixins.DataElement,
//   EventHelperMixin
// ], PolymerElement);
// /**
// * @polymer
// * @customElement
// * @appliesmixin PartnersDataMixin
// */
// class PartnersData extends PartnersDataMixin {
//   static get is() { return 'partners-data'; }

//   static get properties() {
//     return {
//       endpointName: {
//         type: String,
//         value: 'partners'
//       },
//       currentQuery: {
//         type: Object,
//         value: null
//       },
//       filteredPartners: {
//         type: Array,
//         readOnly: true,
//         notify: true
//       },
//       totalResults: {
//         type: Number,
//         readOnly: true,
//         notify: true
//       },
//       filteredTotalResults: {
//         type: Number,
//         readOnly: true,
//         notify: true
//       },
//       totals: {
//         type: Array,
//         notify: true,
//         readOnly: true
//       },
//       dataLoadedEventName: {
//         type: String,
//         value: 'partners-loaded'
//       },
//       loadedInitially: {
//         type: Boolean,
//         value: false
//       },
//       resultsTotals: {
//         type: Boolean,
//         value: false
//       }
//     };
//   }

//   // constructor() {
//   //   super();
//   // }

//   // ready() {
//   //   super.ready();
//   //     if (!this.loadedInitially) {
//   //     fireEvent(this, 'global-loading', { message: 'Loading partners data...', active: true, loadingSource: 'partners-data' });
//   //     this.set('loadedInitially', true);
//   //   }
//   // }

//   refreshList() {
//     this._requestData();
//   }

//   query(searchString, order, pageSize, pageNumber) {
//     fireEvent(this, 'global-loading', { message: 'Loading partners data...', active: true, loadingSource: 'partners-data' });
//     window.EtoolsDashboard.DexieDb.partners.toArray().then((res) => {
//       this._setTotals(this._computeTotals(res));
//       this._setTotalResults(res.length);
//     });
//     window.EtoolsDashboard.DexieDb.transaction('r', window.EtoolsDashboard.DexieDb.partners, () => {
//       let queryResult = window.EtoolsDashboard.DexieDb.partners.orderBy('name');
//       if (order === 'desc') {
//         queryResult = queryResult.reverse();
//       }
//       if (!isEmpty(searchString)) {
//         // @ts-ignore
//         queryResult = queryResult.filter((partner) => {
//           return contains(searchString.toLowerCase(), partner.name.toLowerCase()) ||
//             contains(searchString, partner.vendor_number);
//         });
//       }
//       return Dexie.Promise.all([
//         queryResult.count(),
//         // Use clone() as offset() and limit() otherwise mutates the same query that is counted
//         queryResult.clone()
//             .offset((pageNumber - 1) * pageSize)
//             .limit(pageSize)
//             .toArray()]);
//     }).then((countAndResult) => {
//       fireEvent(this, 'global-loading', { loadingSource: 'partners-data' });
//       this._setFilteredTotalResults(countAndResult[0]);
//       this._setFilteredPartners(countAndResult[1]);
//     }).catch((error) => {
//       console.error('Error querying partners: ', error);
//     });
//   }

//   _computeTotals(results) {
//     let _flattenObject = (ob) => {
//       let toReturn = {};
//       for (let i in ob) {
//         if (!ob.hasOwnProperty(i)) continue;
//         if ((typeof ob[i]) == 'object') {
//           let flatObject = _flattenObject(ob[i]);
//           for (let x in flatObject) {
//             if (!flatObject.hasOwnProperty(x)) continue;
//             toReturn[i + '_' + x] = flatObject[x];
//           }
//         } else {
//           toReturn[i] = ob[i];
//         }
//       }
//       return toReturn;
//     };
//     this.set('resultsTotals', true);
//     // @ts-ignore
//     return _(results).reduce((sum, obj)=> {
//       // @ts-ignore
//       let picked = _(obj).pick([
//         'shared_with',
//         'total_ct_ytd',
//         'hact_values',
//         'net_ct_cy',
//         'hact_min_requirements',
//         'outstanding_findings',
//         'reported_cy',
//         'planned_engagement'
//       ]).value();
//       // @ts-ignore
//       picked = _flattenObject(picked);
//       picked['shared_with'] = obj['shared_with'];
//       // @ts-ignore
//       _(picked).each((val, key)=> {
//         let currValue = sum[key] ? sum[key] : 0;
//         if (key === 'shared_with') {
//           sum[key] = currValue + (val === null ? 0 : 1);
//         } else {
//           sum[key] = currValue + Number(val);
//         }
//       });
//       return sum;
//     }, {});
//   }
// }

// window.customElements.define(PartnersData.is, PartnersData);
