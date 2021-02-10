/* eslint-disable max-len */
import {PolymerElement} from '@polymer/polymer';
import {customElement, property} from '@polymer/decorators';
import DataElementMixin from '../../../mixins/data-element-mixin';
import DateMixin from '../../../mixins/date-mixin';
import {fireEvent} from '../../../components/utils/fire-custom-event';
import Dexie from 'dexie';
import {isEmpty, intersection, trim, keys, contains} from 'ramda';

@customElement('partnership-data')
export class PartnershipData extends DateMixin(DataElementMixin(PolymerElement)) {

    @property({type: Boolean})
    active = false;

    @property({type: Object})
    currentQuery = null;

    @property({type: Array, readOnly: true, notify: true})
    filteredPartnerships!: [];

    @property({type: Number, readOnly: true, notify: true})
    totalResults!: number;

    @property({type: String})
    dataLoadedEventName = 'partnerships-loaded';

    @property({type: Array})
    presetResults = [];

    @property({type: Boolean})
    loadedInitially = false;

    @property({type: Boolean, notify: true})
    presetsLoaded = false;

    endpointName = 'csoDashboard';

    @property({type: Array, notify: true})
    presetFilters: [
        { total: 0, id: '1',
         title: 'PD/SSFA with passed start date and no FR was added', status: '(signed)',
         filteredPartnerships: [] },
        { total: 0, id: '2',
         title: 'PD/SSFA with planned amount not equal to FR amount', status: '(active, ended, suspended)',
         filteredPartnerships: [] },
        { total: 0, id: '3',
          title: 'PD with no recent programmatic visit', status: '(active, ended)', filteredPartnerships: [] },
        { total: 0, id: '4',
          title: 'PD/SSFA expiring in the next 30 days', status: '(active, suspended)', filteredPartnerships: [] },
        { total: 0, id: '5',
          title: 'PD/SSFA with  actual disbursement amount less than FR planned amount', status: '(ended)',
          filteredPartnerships: [] },
        { total: 0, id: '6',
         title: 'PD/SSFA with missing Final Partnership Review', status: '(ended)', filteredPartnerships: [] }
      ];

    @property({type: Object})
    predicates = {
      searchString: (qs, partner) => {
        return qs.length && partner.partner_vendor_number ?
          contains(qs.toLowerCase(), partner.partner_name.toLowerCase()) || contains(qs.toLowerCase(), partner.partner_vendor_number) :
            qs.length ? contains(qs.toLowerCase(), partner.partner_name.toLowerCase()) : true;
      },
      sectors: (sectors, partner)=> sectors.length ? !!intersection(sectors, [trim(partner.sections)]).length : true,
      offices: (offices, partner)=> offices.length ? !!intersection(offices, partner.offices_names.split(',')).length : true,
      status: (status, partner)=> status.length ? (contains(partner.status, status) ? true : false) : true

    };

  createPresetFilters(results) {
    return [
      results.clone().filter(
        partner => (partner.status === 'signed')
          && (Date.parse(partner.start) < new Date().getTime())
          && !partner.frs_total_frs_amt
      ),
      results.clone().filter(
        partner => (partner.status === 'active' || partner.status === 'ended' || partner.status === 'suspended')
          && (partner.unicef_cash !== partner.frs_total_frs_amt)
      ),
      results.clone().filter(
        partner => (partner.status === 'active' || partner.status === 'ended')
          && (parseInt(partner.days_last_pv) > 180)
      ),
      results.clone().filter(
        partner => (partner.status === 'active' || partner.status === 'suspended')
          && (Date.parse(partner.end) < (new Date().getTime() + 2592000000))
          && (Date.parse(partner.end) > new Date().getTime())
      ),
      results.clone().filter(
        partner => (partner.status === 'ended')
          && (partner.disbursement < partner.frs_total_frs_amt)
      ),
      results.clone().filter(
        partner => (partner.status === 'ended')
          && !partner.has_final_partnership_review
          && parseInt(partner.disbursement_usd) >= 100000
      )
    ];
  }

  query(params) {
    const {order, sortBy} = params;
    const predKeys = keys(this.predicates);
    fireEvent(this, 'global-loading', {active: true, loadingSource: 'partnership-data'});
    window.EtoolsDashboard.DexieDb.transaction(
      'r',
      window.EtoolsDashboard.DexieDb.csoDashboard,
      () => {
        let queryResult = window.EtoolsDashboard.DexieDb.csoDashboard.orderBy('partner_name');
        if (order === 'desc') {
          queryResult = queryResult.reverse();
        }
        let queryResultCopy = queryResult.clone();
        this.set('presetResults', this.createPresetFilters(queryResultCopy));
        const callPred = (pred, partner) => this.predicates[pred](params[pred], partner);
        queryResult = queryResult.filter(
          partner => predKeys.reduce((acc, pred) => acc && callPred(pred, partner), true)
        );
        return Dexie.Promise.all([
          queryResult.count(),
          queryResult.sortBy(sortBy || 'partner_name'),
          ...this.presetResults.map((res: any) => res.sortBy(sortBy || 'partner_name'))
        ]);
      }).then((countAndResult) => {

        this._setTotalResults(countAndResult[0]);
        this._setFilteredPartnerships(countAndResult[1]);
        let presetFilterResults = countAndResult.slice(2);
        presetFilterResults.forEach((elem, indx) => {
          this.set(`presetFilters.${indx}.filteredPartnerships`, elem);
          this.set(`presetFilters.${indx}.total`, elem.length);
        });
        if (this.presetsLoaded) {
          this.set('presetsLoaded', false);
        } else {
          this.set('presetsLoaded', true);
        }
        fireEvent(this, 'global-loading', {loadingSource: 'partnership-data'});
      }).catch((err) => {
        console.error('Error querying partnerships-dash: ', err);
        fireEvent(this, 'global-loading', {active: false, loadingSource: 'partnership-data'});
      });
  }
}
