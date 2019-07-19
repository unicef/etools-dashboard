import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@unicef-polymer/etools-dropdown/etools-dropdown-multi.js';
import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
import '../../../styles/shared-styles';
import '../../../styles/list-styles';
import '../../../styles/filter-styles';
import '../../../styles/partnerships-styles';
import '../../../styles/page-layout-styles';
import '../../../styles/grid-layout-styles';
import '../../../config/config';
import '../../../components/data-table/data-table-header';
import '../../../components/data-table/data-table-column';
import '../../../components/data-table/data-table-row';
import '../../../components/data-table/data-table-footer';
import '../../../mixins/common-general-mixin';
import '../../../mixins/list-filters-mixin';
import '../../../mixins/fetch-assets-mixin';
import '../../../mixins/pagination-with-filters-mixin';
import { Mixins } from '../../../mixins/redux-store-mixin';
import '../../../endpoints/endpoints-mixin';
import '../data/partnership-overview-data';
import { identity, compose, join, map, prop, isEmpty } from 'ramda';

/**
  * @polymer
  * @mixinFunction
  * @appliesMixin EtoolsDashboard.Mixins.CommonGeneral
  * @appliesMixin EtoolsDashboard.Mixins.ReduxStore
  * @appliesMixin EtoolsDashboard.Mixins.ListFilters
  * @appliesMixin EtoolsDashboard.Mixins.PaginationWithFilters
  * @appliesMixin EtoolsDashboard.Mixins.Endpoints
  */
const PartnershipsOverviewMixin = EtoolsMixinFactory.combineMixins([
Mixins.CommonGeneral,
Mixins.ReduxStore,
Mixins.ListFilters,
Mixins.Endpoints,
Mixins.PaginationWithFilters,
Mixins.FetchAsset
], PolymerElement);

/**
* @polymer
* @customElement
*/
class PartnershipsOverview extends PartnershipsOverviewMixin {
  static get template() {
    return html`
    <style include="shared-styles grid-layout-styles iron-flex page-layout-styles 
                    paper-material-styles list-styles filter-styles partnerships-styles">

     .cso-title {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 8px;
      }

      .map-icon {
        color: var(--dark-icon-color);
        position: absolute;
        right: 24px;
        transform: translateY(-50%);
        display: none;
        cursor: pointer;
      }

      .clock-icon {
        color: var(--dark-icon-color);
      }

      data-table-row:hover .last-pv {
        display: none;
      }

      data-table-row:hover .map-icon {
        display: block;
      }

      .blue-text {
        color: #24a0fc;
      }

    </style>

    <partnership-overview-data id="partnershipsOverview" filtered-partnerships-overview="{{filteredPartnershipsOverview}}" fire-data-loaded="" active="[[active]]" total-results="{{totalResults}}" on-partnerships-overview-loaded="_requiredDataLoaded" list-data-path="filteredPartnershipsOverview" preset-filters="{{presetFilters}}" presets-loaded="{{presetsLoaded}}" all-partners="{{allPartners}}"></partnership-overview-data>

    <div class="paper-material list-panel" elevation="1">
      <span class="alerts-title">Alerts </span><span class="alerts-comment">(click to filter the list)</span>
      <div class="alerts-panel" id="alertsPanel">
        <template is="dom-repeat" items="[[presetFilters]]" as="presets">
          <div on-tap="_showPresetFilter" class="alert-row" no-collapse="">
            <div slot="row-data">
              <div class="col-1 alerts-total">[[presets.filteredPartnershipsOverview.length]]</div>
              <div class="col-10 filter-name">[[presets.title]] <i>[[presets.status]]</i></div>
              <paper-icon-button class="remove-field remove red clear-button col-1" icon="clear">
              </paper-icon-button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div id="customFilterPanel" class="paper-material list-panel listControls" elevation="1">
      <div class="wrap-controls">
        <paper-input id="query" type="search" autocomplete="off" value="{{qs}}" placeholder="Search" always-float-label="">
          <iron-icon icon="search" slot="prefix"></iron-icon>
        </paper-input>

        <template is="dom-repeat" items="[[selectedFilters]]" as="filter">

          <!-- dropdown filters  -->
          <template is="dom-if" if="[[filterTypeIs('esmm', filter.type)]]">
            <div class="filter esmm">
              <etools-dropdown-multi label="[[filter.filterName]]" placeholder="—" disabled\$="[[!filter.selectionOptions.length]]" options="[[filter.selectionOptions]]" option-value="[[filter.optionValue]]" option-label="[[filter.optionLabel]]" trigger-value-change-event="" on-etools-selected-items-changed="esmmValueChanged" data-filter-path\$="[[filter.path]]" min-width="300px" horizontal-align="left" no-dynamic-align="">
              </etools-dropdown-multi>
            </div>
          </template>
          <template is="dom-if" if="[[filterTypeIs('toggle', filter.type)]]">
            <div id="hiddenToggle" class="filter">
              Outstanding DCT &gt;9?
              <paper-toggle-button checked="{{selectedOutstanding}}"></paper-toggle-button>
            </div>
          </template>
        </template>
      </div>
      <div class="fixed-controls">
        <div class="filters-divider"></div>
        <paper-menu-button id="filterMenu" ignore-select="" dynamic-align="">
          <paper-button class="button" slot="dropdown-trigger">
            <iron-icon icon="filter-list"></iron-icon>
            filters
          </paper-button>
          <paper-listbox multi="" slot="dropdown-content" selected-values="[2]">
            <template is="dom-repeat" items="[[listFilterOptions]]">
              <paper-icon-item on-tap="selectFilter">
                <iron-icon icon="check" slot="item-icon" hidden\$="[[!item.selected]]"></iron-icon>
                [[item.filterName]]
              </paper-icon-item>
            </template>
          </paper-listbox>
        </paper-menu-button>
      </div>
    </div>

    <div class="paper-material" id="list" elevation="1">
      <data-table-header no-collapse="">
        <data-table-column class="col-3" field="name" sortable="">
          Vendor No.
          <br>IP Name
        </data-table-column>
        <!-- <data-table-column class="col-1" sortable>
          Cost Centre
        </data-table-column> -->
        <data-table-column class="col-1">
          Section
        </data-table-column>
        <!-- <div class="col-5 layout horizontal"> -->
        <div class="col-6 layout horizontal">
          <data-table-column class="col-3 right-align" field="total_ct_cp" sortable="">
            Cash in the<br>
            Current CP Cycle (USD)
          </data-table-column>
          <data-table-column class="col-3 right-align" field="total_ct_ytd" sortable="">
            Cash in the<br>
            Current Year (USD)
          </data-table-column>
          <data-table-column class="col-3 right-align" field="outstanding_dct_amount_6_to_9_months_usd" sortable="">
            Outstanding<br>
            DCT &gt;6 Months
          </data-table-column>
          <data-table-column class="col-3 right-align" field="outstanding_dct_amount_more_than_9_months_usd" sortable="">
            Outstanding<br>
            DCT &gt;9 Months
          </data-table-column>
        </div>
        <data-table-column class="col-1 right-align" field="action_points" sortable="">
          Action<br>
          Points
        </data-table-column>
        <!-- <data-table-column class="col-1 right-align" field="alert_core_value_assessment" sortable>
          Flags
        </data-table-column> -->
        <data-table-column class="col-1 right-align" field="days_last_pv" sortable="">
          Days Since<br>
          Last PV
        </data-table-column>
      </data-table-header>

      <template id="partnerListTemplate" items="{{filteredPartnershipsOverview}}" filter="{{computeFilter(currentFilter)}}" is="dom-repeat" as="row">
        <data-table-row no-collapse="">
          <div slot="row-data">
            <div class="col-3">
              [[row.vendor_number]]<br>
              <a href="[[baseSite]]/pmp/partners/[[row.id]]/details" app-name="pmp" page="partners" id="[[row.id]]/details" class="cso-title">
                  [[row.name]]
                  <paper-tooltip fit-to-visible-bounds="">
                    [[row.name]]
                  </paper-tooltip>
              </a>
            </div>
            <div class="col-data col-1 sections">
              <div class="pad-top-4">
                <template is="dom-repeat" items="{{dividerSplit(row.sections)}}">
                  [[item]]
                  <br>
                </template>
              </div>
            </div>
            <!-- <div class="col-5 layout horizontal"> -->
            <div class="col-6 layout horizontal">
              <div class="col-3 right-align">
                [[currencyFormat(row.total_ct_cp)]]
              </div>
              <div class="col-3 right-align">
                [[currencyFormat(row.total_ct_ytd)]]
              </div>
              <div class="col-3 right-align">
                [[currencyFormat(row.outstanding_dct_amount_6_to_9_months_usd)]]
              </div>
              <div class="col-3 right-align">
                [[currencyFormat(row.outstanding_dct_amount_more_than_9_months_usd)]]
              </div>
            </div>
            <div class="col-1 right-align">
              <a href="[[baseSite]]/apd/action-points/list?partner=[[row.id]]&amp;status=open">[[row.action_points]]</a>
            </div>
            <!-- <div class="col-1 right-align">
              <template is="dom-if" if="[[row.alert_core_value_assessment]]">
                <iron-icon class="clock-icon"
                           icon="device:access-time">
                </iron-icon>
                <paper-tooltip>The Core Values Assessment will expire in [[row.core_value_assessment_expiring]] Days.</paper-tooltip>
              </template>
              [[row.core_value_assessment_expiring]]
            </div> -->
            <div class="col-1 col-data right-align">
              <span class="last-pv">[[row.days_last_pv]]</span>
              <iron-icon on-click="goToMaps" class="map-icon" icon="maps:map"></iron-icon>
            </div>
          </div>
        </data-table-row>
      </template>
      <data-table-footer id="partnershipsOverviewFooter" page-size="[[pageSize]]" page-number="[[pageNumber]]" visible-range="{{visibleRange}}" on-page-size-changed="pageSizeChanged" filtered-total-results="[[totalResults]]" on-page-number-changed="pageNumberChanged">
      </data-table-footer>
    </div>
`;
  }

  static get is() { return 'partnerships-overview'; }

  static get properties() {
    return {
      active: {
        type: Boolean,
        value: false
      },
      filteredPartnershipsOverview: {
        type: Array,
        notify: true,
        observer: 'rangeChanged'
      },
      allPartners: {
        type: Array,
        value: [],
        observer: '_initListFilters'
      },
      allPartnersSet: {
        type: Boolean,
        value: false
      },
      currentFilter: {
        type: String,
        value: 'custom'
      },
      forceDataRefresh: {
        type: Boolean,
        value: false
      },
      requiredDataLoaded: {
        type: Boolean,
        value: false
      },
      initComplete: {
        type: Boolean,
        value: false
      },
      presetsLoaded: {
        type: Boolean,
        value: false,
        observer: 'rangeChanged'
      },
      csvDownloadUrl: {
        type: String,
        notify: true
      },
      urlParams: {
        type: Object
      },
      totalResults: {
        type: Array
      },
      queryParams: {
        type: String
      },
      sectors: {
        type: Array,
        statePath: 'sectors'
      },
      selectedSectors: {
        type: Array,
        observer: 'filterChanged'
      },
      selectedPartners: {
        type: Array,
        observer: 'filterChanged',
        value: []
      },
      partnerTypes: {
        type: Array,
        statePath: 'static.partner_types'
      },
      selectedTypes: {
        type: Array,
        value: [],
        observer: 'filterChanged'
      },
      // selectedCostCentres: {
      //   type: Array,
      //   observer: 'filterChanged'
      // },
      selectedOutstanding: {
        type: Boolean,
        value: false
      },
      visibleRange: {
        type: Array,
        observer: 'rangeChanged'
      },
      pageNumber: {
        type: Number
      },
      route: {
        type: Object
      },
      params: {
        type: Array,
        value: function() {
          return [
            {
              qName: 'qs',
              propName: 'qs',
              xf: identity
            },
            {
              qName: 'sort',
              propName: 'sortOrder',
              xf: identity
            },
            {
              qName: 'sortBy',
              propName: 'orderBy',
              xf: identity
            },
            {
              qName: 'sectors',
              propName: 'selectedSectors',
              xf: compose(join('|'), map(prop('value')))
            },
            {
              qName: 'name',
              propName: 'selectedPartners',
              xf: compose(join('|'), map(prop('name')))
            },
            {
              qName: 'outstanding',
              propName: 'selectedOutstanding',
              xf: identity
            },
            {
              qName: 'partner_types',
              propName: 'selectedTypes',
              xf: compose(join('|'), map(prop('value')))
            }
          ];
        }
      }
    };
  }

  static get observers() {
    return [
      '_updateUrl(qs, pageNumber, pageSize, sortOrder, orderBy, requiredDataLoaded, initComplete, selectedSectors, selectedPartners, selectedOffices, selectedOutstanding, selectedTypes, active)',
      '_init(active, sectors, requiredDataLoaded)'
    ];
  }

  _init(active, sectors, requiredDataLoaded) {
    if (!active || !sectors || !requiredDataLoaded) {
      return;
    }
    let params = this.queryParams;
    this.set('initComplete', false);
    this.set('qs', params.qs ? params.qs : '');
    this.set('pageNumber', params.page ? parseInt(params.page) : 1);
    this.set('pageSize', params.size ? parseInt(params.size) : 10);
    this.set('sortOrder', params.sort ? params.sort : 'asc');
    this.set('orderBy', params.sortBy || '');
    this.set('selectedSectors', params.sectors ? this._setSelectedSectors(params.sectors) : []);
    this.set('selectedPartners', params.partners ? this._setSelectedPartners(params.partners) : []);
    this.set('selectedTypes', params.partner_types ? this._setSelectedTypes(params.partner_types) : []);
    this.$.alertsPanel.style.height = ((this.$.alertsPanel.childElementCount - 1) / 2 * 36) + 'px';
    this._initListFilters();
    this.set('initComplete', true);
    this._updateSelectedFiltersValues();
    this.set('csvDownloadUrl', this._buildCsvDownloadUrl());
  }

  _initListFilters() {
    if (!this.allPartnersSet) {
      this.initListFiltersData([
        {
          filterName: 'Partner Name',
          type: 'esmm',
          optionValue: 'id',
          optionLabel: 'name',
          selectionOptions: this.allPartners,
          alreadySelected: [],
          path: 'selectedPartners',
          selected: false
        },
        {
          filterName: 'Section/Cluster',
          type: 'esmm',
          optionValue: 'value',
          optionLabel: 'label',
          selectionOptions: this.sectors,
          alreadySelected: [],
          path: 'selectedSectors',
          selected: false
        },
        // {
        //   filterName: 'Cost Centre',
        //   type: 'esmm',
        //   optionValue: 'id',
        //   optionLabel: 'name',
        //   selectionOptions: this.offices,
        //   alreadySelected: [],
        //   path: 'selectedOffices',
        //   selected: false
        // },
        {
          filterName: 'Outstanding DCT >9?',
          type: 'toggle',
          path: 'selectedOutstanding',
          selected: false
        },
        {
          filterName: 'Partner Type',
          type: 'esmm',
          optionValue: 'value',
          optionLabel: 'label',
          selectionOptions: this.partnerTypes,
          alreadySelected: [],
          path: 'selectedTypes',
          selected: false
        }
      ]);
    }
    if (this.allPartners.length) {
      this.set('allPartnersSet', true);
    }
  }

  _updateSelectedFiltersValues() {
    this.set('updateFiltersDebouncer', Debouncer.debounce(
      this.updateFiltersDebouncer,
      timeOut.after(20), () => {
      let filtersValues = [
        {
          filterName: 'Section/Cluster',
          selectedValue: map(prop('value'), this.selectedSectors)
        },
        {
          filterName: 'Partner Name',
          selectedValue: map(prop('name'), this.selectedPartners)
        },
        {
          filterName: 'Outstanding DCT >9?',
          selectedValue: this.selectedOutstanding
        },
        {
          filterName: 'Partner Type',
          selectedValue: map(prop('value'), this.selectedTypes)
        }
      ];
      this.updateShownFilters(filtersValues);
    }));
  }

  rangeChanged() {
    if (this.presetsLoaded && this.filteredPartnershipsOverview) {
      this.set('csvDownloadUrl', this._buildCsvDownloadUrl());
    }
    this._initListFilters;
    if (this.currentFilter !== 'custom') {
      this.$.partnerListTemplate.items = this.presetFilters[this.currentFilter-1].filteredPartnershipsOverview.slice(
          this.visibleRange[0]-1,
          this.visibleRange[1]
        );
    } else if (this.filteredPartnershipsOverview) {
      this.$.partnerListTemplate.items = this.filteredPartnershipsOverview.slice(
          this.visibleRange[0]-1,
          this.visibleRange[1]
        );
    }
  }

  _updateUrl() {
    if ( !this.active || !this.initComplete || !this.requiredDataLoaded) {
      return;
    }
    const qs = this.buildQueryString();
    const currentRoute = this.route.prefix + this.route.path;
    if (qs !== null) {
      this.updateAppState(currentRoute, qs, true);
      if (this.requiredDataLoaded) {
        this._filterPartnershipsOverviewData();
      }
    } else {
      if (location.search === '') {
        this.updateAppState(currentRoute, qs, false);
      }
      if (this.forceDataRefresh && this.requiredDataLoaded) {
        this._filterPartnershipsOverviewData();
        this.set('forceDataRefresh', false);
      }
    }
  }

  _buildCsvDownloadUrl() {
    if (this.filteredPartnershipsOverview && this.active) {
      let pks = [];
      if (this.currentFilter === 'custom') {
        pks = this.filteredPartnershipsOverview.map((partner) => prop('id', partner));
      } else {
        pks = this.presetFilters[this.currentFilter-1].filteredPartnershipsOverview.map(
          (partner) => prop('id', partner)
        );
      }
      let pksString = pks.join(',');
      return `${this.getEndpoint('partnershipsOverview').url}?pk=${pksString}&format=csv`;
    }
    return false;
  }

  _filterPartnershipsOverviewData() {
    this.$.partnershipsOverview.query({
      searchString: this.qs,
      sectors: map(prop('label'), this.selectedSectors),
      name: this.selectedPartners,
      // costCentre: this.selectedOffices,
      outstanding: this.selectedOutstanding,
      sortBy: this.orderBy,
      order: this.sortOrder,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      partnerType: map(prop('label'), this.selectedTypes)
    });
  }

  _requiredDataLoaded(event) {
    event.stopImmediatePropagation();
    const listDataPath = event.target.getAttribute('list-data-path');
    const list = this.get(listDataPath);

    if (typeof list === 'undefined' ||
      (Array.isArray(list) && list.length === 0)) {
      this.set('forceDataRefresh', true);
    }
    this.set('requiredDataLoaded', true);
  }

  _setSelectedSectors(sectorsStr) {
    const sectorsArr = sectorsStr.split('|');
    if (!isEmpty(sectorsArr)) {
      return this.sectors.filter((s) => sectorsArr.indexOf(s.value) > -1);
    }
    return [];
  }

  _setSelectedTypes(typesStr) {
    const typesArr = typesStr.split('|');
    if (!isEmpty(typesArr)) {
      return this.partnerTypes.filter((s) => typesArr.indexOf(s.value) > -1);
    }
    return [];
  }

  goToMaps(event) {
    let partnerId = event.model.__data.row.id;
    // @ts-ignore
    window.location = `/dash/map?&partners=${partnerId}`;
  }

  dividerSplit(string) {
    return string ? string.split('|') : [''];
  }

  _showPresetFilter(event) {
    let filterDiv = event.currentTarget.lastElementChild;
    let clickedFilter = event.model.__data.presets;

    // reset styling for all filter buttons
    this.shadowRoot.querySelectorAll('paper-icon-button.clear-button').forEach(
      (b) => b.style.opacity = '0'
    );
    this.shadowRoot.querySelectorAll('.filter-name').forEach(
      (r) => r.style.color = ''
    );

    if (this.currentFilter === clickedFilter.id) {
      this.set('currentFilter', 'custom');
    } else {
      // style selected filter button as pressed
      filterDiv.lastElementChild.style.opacity = '1';
      filterDiv.children[1].style.color = '#0099FF';
      this.set('currentFilter', clickedFilter.id);
    }

    // reset to first results page of new filter
    this.set('visibleRange', [1, 10]);
    this.rangeChanged();
    this.set('pageNumber', 1);

    // toggle custom filters visibility and footer totals source
    if (this.currentFilter === 'custom') {
      this.$.customFilterPanel.hidden = false;
      this.$.partnershipsOverviewFooter.filteredTotalResults = this.totalResults;
    } else {
      this.$.customFilterPanel.hidden = true;
      this.$.partnershipsOverviewFooter.filteredTotalResults = clickedFilter.total;
    }
  }

  _hasValue(field) {
    return field ? this.currencyFormat(field) : '-';
  }

  computeFilter(filter) {
    return (row)=> {
      switch (filter) {
        case 'custom':
          return true;
        case '1':
          return row.alert_no_recent_pv;
        case '2':
          return row.alert_no_pv;
        case '3':
          return row.alert_pca_required;
          break;
        case '4':
          return row.alert_active_pd_for_ended_pca;
          break;
      }
    };
  }
}

window.customElements.define(PartnershipsOverview.is, PartnershipsOverview);