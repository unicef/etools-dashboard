import { PolymerElement } from '@polymer/polymer/polymer-element';
import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory';
import '../../../mixins/data-element-mixin';
import '../../../mixins/date-mixin';
import '../../../mixins/event-helper-mixin';
import { DexieDb } from '../../../config/dexie-db-config';
import { Mixins } from '../../../mixins/redux-store-mixin';
import { contains, equals, without, keys, isEmpty, sortBy, prop, uniq } from '../../../scripts/ramda-utils';

// import {compose} from '../../../scripts/ramda-utils';
const AttachmentsDataMixin = EtoolsMixinFactory.combineMixins([
  Mixins.DataElement,
  Mixins.Date,
  Mixins.EventHelper
], (PolymerElement));
/**
 * `attachments-data` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class AttachmentsData extends AttachmentsDataMixin {
  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'attachments-data';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      endpointName: {
        type: String,
        value: 'attachments'
      },
      filteredTotal: {
        type: Number,
        readOnly: true,
        notify: true
      },
      filteredAttachments: {
        type: Array,
        readOnly: true,
        notify: true
      },
      orderedResults: {
        type: Array,
        value: [],
        notify: true
      },
      dataLoadedEventName: {
        type: String,
        value: 'attachments-loaded'
      },
      loadedInitially: {
        type: Boolean,
        value: false
      },
      currentParams: {
        type: Object,
        value: {}
      },
      predicates: {
        type: Object,
        value: function() {
          return {
            searchString: ({ partner, vendor_number, pd_ssfa_number, agreement_reference_number }, query) => {
              partner = partner.toLowerCase();
              vendor_number = vendor_number.toLowerCase();
              pd_ssfa_number = pd_ssfa_number.toLowerCase();
              agreement_reference_number = agreement_reference_number.toLowerCase();
              query = query.toLowerCase();
              return contains(query, partner)
                || contains(query, vendor_number)
                || contains(query, pd_ssfa_number)
                || contains(query, agreement_reference_number);
            },
            attachmentType: ({ file_type }, type) => contains(file_type, type),
            pca: ({ agreement_reference_number }, selectedPCA) => contains(agreement_reference_number, selectedPCA),
            pd: ({ pd_ssfa_number }, selectedPD) => contains(pd_ssfa_number, selectedPD)
          };
        }
      }
    };
  }

  query(params) {
    if (equals(params, this.currentParams)) {
      return;
    }
    this.fireEvent('global-loading', { active: true, loadingSource: 'attachments-data' });
    this.set('currentParams', params);
    const { pageNumber, pageSize, order, orderBy } = params;
    DexieDb.transaction('r', DexieDb.attachments, () => {
      let queryResult = DexieDb.attachments;
      let allResults = queryResult.orderBy('partner');
      queryResult = queryResult.orderBy(orderBy || 'created');
      if (order === 'asc') {
        queryResult = queryResult.reverse();
      }
      const fieldsToFilter = without(['pageNumber', 'pageSize', 'order', 'orderBy'], keys(params));
      queryResult = queryResult.filter((file) => !isEmpty(fieldsToFilter) ?
        fieldsToFilter.reduce(
          (acc, field) => acc && this.predicates[field](file, params[field]), true)
        : !!file.file_link && !!file.partner
      );
      queryResult = queryResult.filter((file) => !isEmpty(file.filename));

      return Dexie.Promise.all([
        queryResult.count(),
        // Use clone() as offset() and limit() otherwise mutates the same query this is counted
        queryResult.clone()
          .offset((pageNumber - 1) * pageSize)
          .limit(pageSize)
          .toArray(),
        allResults.toArray()
      ]).then((countAndResult) => {
        this.fireEvent('global-loading', { loadingSource: 'attachments-data' });

        this._setFilteredTotal(countAndResult[0]);
        this._setFilteredAttachments(countAndResult[1]);
        countAndResult[2].forEach((file) => {
          if (!this.orderedResults.some((item) => item.keys === `${file.partner} - ${file.vendor_number}`)) {
            let obj = {};
            let vend = countAndResult[2].filter((file2) => file2.vendor_number === file.vendor_number);
            vend = sortBy(prop('created'))(vend);
            let key = `${file.partner} - ${file.vendor_number}`;
            obj['value'] = file.vendor_number;
            obj['label'] = key;
            obj['files'] = vend;
            this.orderedResults.push(obj);
          }
        });
        this.orderedResults = uniq(this.orderedResults);
      });
    });
  }
}

window.customElements.define(AttachmentsData.is, AttachmentsData);
