import {PolymerElement} from '@polymer/polymer';
import {customElement, property} from '@polymer/decorators';
import DataElementMixin from '../../../mixins/data-element-mixin';
import {fireEvent} from '../../../components/utils/fire-custom-event';
import Dexie from 'dexie';
import intersection from 'lodash-es/intersection';
import keys from 'lodash-es/keys';
import includes from 'lodash-es/includes';


@customElement('partnership-overview-data')
export class PartnershipOverviewData extends DataElementMixin(PolymerElement) {

    @property({type: Boolean})
    active = false;

    @property({type: Object})
    currentQuery = null;

    @property({type: Array, readOnly: true, notify: true})
    filteredPartnershipsOverview!: [];

    @property({type: Number, readOnly: true, notify: true})
    totalResults!: number;

    @property({type: Array, notify: true})
    allPartners!: [];

    @property({type: String})
    dataLoadedEventName = 'partnerships-overview-loaded';

    @property({type: Array})
    presetResults = [];

    @property({type: Boolean})
    loadedInitially = false;

    @property({type: Boolean, notify: true})
    presetsLoaded = false;

    @property({type: String})
    displayOrder = 'asc';

    endpointName = 'partnershipsOverview';

    @property({type: Array, notify: true})
    presetFilters = [
      {total: 0, id: '1', title: 'IPs with no recent Programmatic Visits (in the past 180 days)', status: '', filteredPartnershipsOverview: []},
      {total: 0, id: '2', title: 'IPs with no Programmatic Visits', status: '', filteredPartnershipsOverview: []},
      {total: 0, id: '3', title: 'IPs requiring new PCA in the coming CP', status: '', filteredPartnershipsOverview: []},
      {total: 0, id: '4', title: 'IPs with active PD without a signed PCA', status: '', filteredPartnershipsOverview: []}
    ];

    @property({type: Object})
    predicates = {
      searchString: (qs, partner) => qs.length ? includes(qs.toLowerCase(), partner.name.toLowerCase()) || includes(qs.toLowerCase(), partner.vendor_number) : true,
      sectors: (sectors, partner) => sectors.length && partner.sections ? !!intersection(sectors, partner.sections.split('|')).length : true,
      name: (name, partner) => name.length ? name.includes(partner) : true,
      outstanding: (outstanding, partner) => outstanding ? !!parseInt(partner.outstanding_dct_amount_more_than_9_months_usd) : true,
      partnerType: (type, partner) => type.length ? !!intersection(type, partner.partner_type).length : true
    };

    createPresetFilters(results) {
      return [
        results.clone().filter(partner => partner.alert_no_recent_pv),
        results.clone().filter(partner => partner.alert_no_pv),
        results.clone().filter(partner => partner.alert_pca_required),
        results.clone().filter(partner => partner.alert_active_pd_for_ended_pca)
      ];
    }

    query(params) {
      fireEvent(this, 'global-loading', {active: true, loadingSource: 'partnership-overview-data'});

      const {order, sortBy} = params;
      const predKeys = keys(this.predicates);
      window.EtoolsDashboard.DexieDb.transaction(
        'r',
        window.EtoolsDashboard.DexieDb.partnershipsOverview,
        () => {
          let queryResult = window.EtoolsDashboard.DexieDb.partnershipsOverview.orderBy('name');
          let allPartners = queryResult.clone();
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
            queryResult.sortBy(sortBy || 'name'),
            allPartners.clone().toArray(),
            ...this.presetResults.map(res => res.sortBy(sortBy || 'name'))
          ]);
        }).then((countAndResult) => {
          this._setTotalResults(countAndResult[0]);
          this._setFilteredPartnershipsOverview(countAndResult[1]);
          this.set('allPartners', countAndResult[2]);
          let presetFilterResults = countAndResult.slice(3);
          presetFilterResults.forEach((elem, indx) => {
            this.set(`presetFilters.${indx}.filteredPartnershipsOverview`, elem);
            this.set(`presetFilters.${indx}.total`, elem.length);
          });
          if (this.presetsLoaded) {
            this.set('presetsLoaded', false);
          } else {
            this.set('presetsLoaded', true);
          }
        }).catch(err => console.error('Error querying partnerships-overview: ', err))
        .finally(() => {
          fireEvent(this, 'global-loading', {loadingSource: 'partnership-overview-data'});
        });
    }
}
