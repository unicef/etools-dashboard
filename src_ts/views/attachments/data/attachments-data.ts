import { PolymerElement } from '@polymer/polymer/polymer-element.js';
// import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
import { DataElementMixin } from '../../../mixins/data-element-mixin';
import { DateMixin } from '../../../mixins/date-mixin';
import { fireEvent } from '../../../components/utils/fire-custom-event';
// import { db } from '../../../config/dexie-db-config';
// import { Mixins } from '../../../mixins/redux-store-mixin';
import { contains, equals, without, keys, isEmpty, sortBy, prop, uniq } from 'ramda';
import { customElement, property } from '@polymer/decorators';
import { GenericObject } from '../../../typings/globals.types';

@customElement('attachments-data')
export class AttachmentsData extends DataElementMixin(DateMixin(PolymerElement)) {

  @property({type: String})
  endpointName: string = 'attachments';

  @property({type: Number, readOnly: true, notify: true})
  filteredTotal: number;

  @property({type: Array, readOnly: true, notify: true})
  filteredAttachments: object[];

  @property({type: Array, notify: true})
  orderedResults: object[] = [];

  @property({type: String})
  dataLoadedEventName: string = 'attachments-loaded';

  @property({type: Boolean})
  loadedInitially: boolean = false;

  @property({type: Object})
  currentParams: object = {};

  @property({type: Object})
  predicates: object = function() {
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
  }();

  query(params) {
    if (equals(params, this.currentParams)) {
      return;
    }

    fireEvent(this, 'global-loading', { active: true, loadingSource: 'attachments-data' });
    this.set('currentParams', params);
    const { pageNumber, pageSize, order, orderBy } = params;
    window.EtoolsDashboard.DexieDb.transaction('r', window.EtoolsDashboard.DexieDb.attachments, () => {
      let queryResult = window.EtoolsDashboard.DexieDb.attachments.orderBy(orderBy || 'created');
      let allResults = window.EtoolsDashboard.DexieDb.attachments.orderBy('partner');
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

      return Promise.all([
        queryResult.count(),
        // Use clone() as offset() and limit() otherwise mutates the same query this is counted
        queryResult.clone()
          .offset((pageNumber - 1) * pageSize)
          .limit(pageSize)
          .toArray(),
        allResults.toArray()
      ]).then((countAndResult) => {
        fireEvent(this, 'global-loading', { loadingSource: 'attachments-data' });
        this.set('filteredTotal', countAndResult[0]);
        this.set('filteredAttachments', countAndResult[1]);
        countAndResult[2].forEach((file) => {
          if (!this.orderedResults.some((item: GenericObject) => item.keys === `${file.partner} - ${file.vendor_number}`)) {
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
        this.set('orderedResults', uniq(this.orderedResults));
      });
    });
  }
}
