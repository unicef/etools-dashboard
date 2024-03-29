/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
/* eslint-disable camelcase */

import { customElement, property } from '@polymer/decorators';
import { html, PolymerElement } from '@polymer/polymer';
import { compose, map, prop, join, identity, isEmpty } from 'ramda';
import '@polymer/paper-tooltip/paper-tooltip';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-input/paper-input';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-styles/element-styles/paper-material-styles';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

import '@unicef-polymer/etools-dropdown/etools-dropdown-multi';
import '@unicef-polymer/etools-date-time/datepicker-lite';
import '@unicef-polymer/etools-info-tooltip/etools-info-tooltip';

import { GenericObject } from '../../../typings/globals.types';
import CommonGeneralMixin from '../../../common/mixins/common-general-mixin';
import ListFiltersMixin from '../../../common/mixins/list-filters-mixin';
import PaginationWithFiltersMixin from '../../../common/mixins/pagination-with-filters-mixin';
import DateMixin from '../../../common/mixins/date-mixin';
import '../../../common/data-table/data-table-header';
import '../../../common/data-table/data-table-column';
import '../../../common/data-table/data-table-row';
import '../../../common/data-table/data-table-footer';

import '../../../endpoints/endpoints-mixin';

import '../data/partnership-data';
import { GridLayoutStyles } from '../../../styles/grid-layout-styles';
import { ListStyles } from '../../../styles/list-styles';
import { FilterStyles } from '../../../styles/filter-styles';
import { dashIcons } from '../../../styles/dash-icons';
import { PartnershipsStyles } from '../../../styles/partnerships-styles';
import { connect } from 'pwa-helpers/connect-mixin';
import { RootState, store } from '../../../redux/store';
import get from 'lodash-es/get';
import { EndpointsMixin } from '../../../endpoints/endpoints-mixin';
import { PartnershipData } from '../data/partnership-data';
import { DataTableFooter } from '../../../common/data-table/data-table-footer';

@customElement('cso-dashboard')
export class CsoDashboard extends connect(store)(
  CommonGeneralMixin(
    ListFiltersMixin(
      PaginationWithFiltersMixin(DateMixin(EndpointsMixin(PolymerElement)))
    )
  )
) {
  orderBy: any;

  static get template() {
    return html`
      ${GridLayoutStyles} ${ListStyles} ${FilterStyles} ${PartnershipsStyles}
      ${dashIcons}
      <style
        include="shared-styles iron-flex page-layout-styles
                    paper-material-styles"
      >
        .no-header-line {
          --header-bottom-line: none;
        }

        span.title {
          color: var(--accent-color);
          font-weight: 500;
        }

        data-table-header * {
          box-sizing: border-box;
        }

        data-table-row div[slot='row-data'] div:not(:first-child) span,
        data-table-header div data-table-column data-table-column {
          justify-content: flex-end;
        }

        data-table-row div[slot='row-data'] div span {
          display: flex;
          align-items: center;
        }

        data-table-header {
          height: 95px;
        }

        .blue-col {
          background-color: rgb(222, 242, 254);
          max-width: 100%;
        }

        .green-col {
          background-color: rgb(237, 247, 223);
          max-width: 100%;
        }

        .justify-end {
          justify-content: flex-end;
        }

        .to-date {
          background-image: -webkit-linear-gradient(
            135deg,
            rgb(222, 242, 254) 50%,
            rgb(237, 247, 223) 50%
          );
          height: 48px;
          max-width: 48px;
        }

        .red-icon {
          fill: rgb(231, 66, 45);
        }

        .blue-icon {
          fill: rgb(26, 154, 250);
        }

        data-table-row div div span.ip-pd {
          display: block;
          padding-top: 4px;
          padding-right: 8px;
        }

        .status {
          padding-left: 8px;
        }
        .blocked-partner-container {
          background-color: #ffa149;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 50%;
        }

        .delete-partner {
          color: #ea4022;
          position: relative;
          bottom: 3px;
        }

        .delete-partner::after {
          content: '\\00d7';
          color: rgba(255, 255, 255, 1);
          position: absolute;
          z-index: 1;
          bottom: 4.5px;
          width: 12px;
          height: 12px;
          left: 5.5px;
          font-weight: bold;
          font-size: xx-small;
        }

        .blocked-partner-container,
        .delete-partner {
          height: 16px;
          width: 16px;
          flex-basis: auto;
          align-items: center;
        }

        iron-icon.blocked-partner {
          color: rgba(255, 255, 255, 1);
          height: 12px;
          width: 12px;
        }

        .title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--primary-color);
        }

        .partner-icons-group {
          display: inline-flex;
        }

        @media screen and (-ms-high-contrast: active),
          (-ms-high-contrast: none) {
          data-table-header {
            height: 110px;
            padding-bottom: 0;
          }

          div.paper-material.listControls {
            height: 48px;
          }
        }
      </style>

      <partnership-data
        id="partnerships"
        filtered-partnerships="{{filteredPartnerships}}"
        fire-data-loaded
        active="[[active]]"
        total-results="{{totalResults}}"
        on-partnerships-loaded="_requiredDataLoaded"
        list-data-path="filteredPartnerships"
        preset-filters="{{presetFilters}}"
        presets-loaded="{{presetsLoaded}}"
      >
      </partnership-data>

      <div class="paper-material list-panel" elevation="1">
        <span class="alerts-title">Alerts </span
        ><span class="alerts-comment">(click to filter the list)</span>
        <div class="alerts-panel" id="alertsPanel">
          <template is="dom-repeat" items="[[presetFilters]]" as="presets">
            <div on-tap="_showPresetFilter" class="alert-row" no-collapse>
              <div slot="row-data">
                <div class="col-1 alerts-total">
                  [[presets.filteredPartnerships.length]]
                </div>
                <div class="col-10 filter-name">
                  [[presets.title]] <i>[[presets.status]]</i>
                </div>
                <paper-icon-button
                  class="remove-field remove red clear-button col-1"
                  icon="clear"
                >
                </paper-icon-button>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div
        id="customFilterPanel"
        class="paper-material list-panel listControls"
        elevation="1"
      >
        <div class="wrap-controls">
          <paper-input
            id="query"
            type="search"
            autocomplete="off"
            value="{{qs}}"
            placeholder="Search"
            always-float-label
          >
            <iron-icon icon="search" slot="prefix"></iron-icon>
          </paper-input>

          <template is="dom-repeat" items="[[selectedFilters]]" as="filter">
            <!-- dropdown filters  -->
            <template is="dom-if" if="[[filterTypeIs('esmm', filter.type)]]">
              <div class="filter esmm">
                <etools-dropdown-multi
                  label="[[filter.filterName]]"
                  placeholder="&#8212;"
                  disabled$="[[!filter.selectionOptions.length]]"
                  options="[[filter.selectionOptions]]"
                  option-value="[[filter.optionValue]]"
                  option-label="[[filter.optionLabel]]"
                  selected-values="[[filter.alreadySelected]]"
                  trigger-value-change-event
                  on-etools-selected-items-changed="esmmValueChanged"
                  data-filter-path$="[[filter.path]]"
                  min-width="300px"
                  horizontal-align="left"
                  no-dynamic-align
                >
                </etools-dropdown-multi>
              </div>
            </template>

            <!-- date pickers -->
            <template
              is="dom-if"
              if="[[filterTypeIs('datepicker', filter.type)]]"
            >
              <div class="filter">
                <datepicker-lite
                  id$="datepicker_[[filter.path]]"
                  label="[[filter.filterName]]"
                  placeholder="&#8212;"
                  value="{{filter.dateSelected}}"
                  on-date-has-changed="_filterDateHasChanged"
                  data-filter-path$="[[filter.path]]"
                  fire-date-has-changed
                  selected-date-display-format="D MMM YYYY"
                >
                </datepicker-lite>
              </div>
            </template>
          </template>
        </div>
        <div class="fixed-controls">
          <div class="filters-divider"></div>
          <paper-menu-button id="filterMenu" ignore-select dynamic-align>
            <paper-button class="button" slot="dropdown-trigger">
              <iron-icon icon="filter-list"></iron-icon>
              filters
            </paper-button>
            <paper-listbox multi slot="dropdown-content" selected-values="[2]">
              <template is="dom-repeat" items="[[listFilterOptions]]">
                <paper-icon-item on-tap="selectFilter">
                  <iron-icon
                    icon="check"
                    slot="item-icon"
                    hidden$="[[!item.selected]]"
                  ></iron-icon>
                  [[item.filterName]]
                </paper-icon-item>
              </template>
            </paper-listbox>
          </paper-menu-button>
        </div>
      </div>

      <div class="paper-material" id="list" elevation="1">
        <data-table-header no-collapse>
          <data-table-column
            class="col-6 no-header-line"
            group-heading="blank"
            transparent
          >
            <data-table-column class="col-4" sortable>
              Vendor No.
              <br />IP Name
            </data-table-column>
            <div class="col-6 layout horizontal">
              <data-table-column class="col-4 status">
                PD/SSFA Ref #
                <br />Status
              </data-table-column>
              <data-table-column class="col-4"> Section </data-table-column>
              <data-table-column class="col-4">
                Field Office
              </data-table-column>
            </div>
            <data-table-column class="col-2">
              Start Date
              <br />End Date
            </data-table-column>
          </data-table-column>
          <div class="col-6 layout horizontal">
            <data-table-column class="col-4" group-heading="PLANNED BUDGET">
              <data-table-column class="col-2 right-align">
                PD Cur.
              </data-table-column>
              <data-table-column class="col-5 right-align">
                UNICEF
                <br />Supplies
              </data-table-column>
              <data-table-column class="col-5 right-align">
                UNICEF
                <br />Cash
              </data-table-column>
            </data-table-column>
            <data-table-column
              class="col-6"
              group-heading="FUNDS RESERVED & DISBURSED"
            >
              <data-table-column class="col-3 right-align">
                FR Cur.
              </data-table-column>
              <data-table-column class="col-5 right-align">
                FR
                <br />Amount
              </data-table-column>
              <data-table-column class="col-4 right-align">
                Actual
                <br />Disbursm.
              </data-table-column>
            </data-table-column>
            <data-table-column
              class="col-2 no-header-line"
              group-heading="blank"
              transparent
            >
              <data-table-column class="col-6 right-align">
                Disburs.
                <br />To Date
              </data-table-column>
              <data-table-column class="col-6 right-align">
                Days
                <br />Since <br />Last PV
              </data-table-column>
            </data-table-column>
          </div>
        </data-table-header>

        <template
          id="csoListTemplate"
          items="{{filteredPartnerships}}"
          filter="{{computeFilter(currentFilter)}}"
          is="dom-repeat"
          as="row"
        >
          <data-table-row no-collapse>
            <div slot="row-data">
              <div class="col-6 layout horizontal">
                <span class="col-data layout-horizontal col-4 ip-pd">
                  <div
                    class="partner-icons-group"
                    hidden="[[!_eitherTrue(row.partner_blocked, row.partner_marked_for_deletion)]]"
                  >
                    <div
                      class="blocked-partner-container"
                      hidden="[[!row.partner_blocked]]"
                    >
                      <iron-icon
                        class="blocked-partner"
                        icon="block"
                      ></iron-icon>
                      <paper-tooltip fit-to-visible-bounds
                        >"Partner blocked"</paper-tooltip
                      >
                    </div>
                    <div
                      class="delete-container"
                      hidden="[[!row.partner_marked_for_deletion]]"
                    >
                      <iron-icon
                        class="delete-partner"
                        icon="delete"
                      ></iron-icon>
                      <paper-tooltip fit-to-visible-bounds
                        >"Partner marked for deletion"</paper-tooltip
                      >
                    </div>
                  </div>
                  [[row.partner_vendor_number]]<br />
                  <a
                    href="[[baseSite]]/pmp/partners/[[row.partner_id]]/details"
                    app-name="pmp"
                    page="partners"
                    id="[[row.partner_id]]/details"
                    class="title"
                  >
                    [[row.partner_name]]
                    <paper-tooltip fit-to-visible-bounds>
                      [[row.partner_name]]
                    </paper-tooltip>
                  </a>
                </span>
                <span class="col-6">
                  <div class="col-data col-4 status">
                    <a
                      href="[[baseSite]]/pmp/interventions/[[row.intervention_id]]/details"
                      app-name="pmp"
                      page="interventions"
                      id="[[row.intervention_id]]/details"
                      class="title"
                    >
                      [[_getTruncated(row.number)]]
                      <paper-tooltip fit-to-visible-bounds
                        >[[row.number]]</paper-tooltip
                      >
                    </a>
                    <br />[[capitalizeWord(row.status)]]
                  </div>
                  <div class="col-data col-4 sections">
                    <template
                      is="dom-repeat"
                      items="{{commaSplit(row.sections)}}"
                    >
                      [[item]]
                      <br />
                    </template>
                  </div>
                  <div class="col-data col-4 sections status">
                    <template
                      is="dom-repeat"
                      items="{{commaSplit(row.offices_names)}}"
                    >
                      [[item]]
                      <br />
                    </template>
                  </div>
                </span>
                <span class="col-data col-2 date status">
                  [[prettyDate(row.start)]]
                  <br />
                  [[prettyDate(row.end)]]
                </span>
              </div>
              <div class="col-6 layout horizontal">
                <div class="col-4 layout horizontal">
                  <span class="col-data col-2 right-align">
                    [[row.budget_currency]]
                  </span>
                  <span class="col-data col-5 right-align">
                    [[currencyFormat(row.unicef_supplies)]]
                  </span>
                  <span class="col-data col-5 right-align blue-col">
                    [[currencyFormat(row.unicef_cash)]]
                  </span>
                </div>
                <div class="col-6 layout horizontal">
                  <span class="col-data col-3 right-align">
                    <iron-icon
                      hidden="[[_checkSigned(row.status, row.all_currencies_are_consistent)]]"
                      icon="dash-custom-icons:not-equal"
                      class="blue-icon"
                    ></iron-icon>
                    <paper-tooltip
                      hidden="[[_checkSigned(row.status, row.all_currencies_are_consistent)]]"
                    >
                      FR currency does not match PD currency.
                      <br />
                      Disbursement to date % cannot calculate.
                    </paper-tooltip>
                    <iron-icon
                      hidden="[[_checkAllCurrenciesConsistent(row.status, row.all_currencies_are_consistent, row.fr_currencies_are_consistent)]]"
                      icon="dash-custom-icons:1+"
                      class="blue-icon"
                    >
                    </iron-icon>
                    <paper-tooltip
                      hidden="[[_checkAllCurrenciesConsistent(row.status, row.all_currencies_are_consistent, row.fr_currencies_are_consistent)]]"
                    >
                      More than 1 FR currency is available. FR Amount
                      <br />
                      and Actual Disbursements cannot be displayed.
                    </paper-tooltip>
                    [[row.fr_currency]]
                  </span>
                  <span class="col-data col-5 right-align">
                    <iron-icon
                      hidden="[[_hideRedIcon(row)]]"
                      icon="dash-custom-icons:not-equal"
                      class="red-icon"
                    >
                      [[_displayDisbursement(row.disbursement)]]
                    </iron-icon>
                    <paper-tooltip hidden="[[_hideRedIcon(row)]]">
                      FR amount does not equal to planned UNICEF cash
                    </paper-tooltip>
                    [[currencyFormat(row.frs_total_frs_amt)]]
                  </span>
                  <span class="col-data col-4 right-align green-col">
                    <iron-icon
                      hidden="[[!row.multi_curr_flag]]"
                      icon="dash-custom-icons:not-equal"
                      class="blue-icon"
                    >
                    </iron-icon>
                    <paper-tooltip hidden="[[!row.multi_curr_flag]]">
                      There are multiple transaction currencies in VISION
                    </paper-tooltip>
                    [[_displayDisbursement(row.disbursement,
                    row.multi_curr_flag)]]
                  </span>
                </div>
                <div class="col-2 layout horizontal justify-end">
                  <span class="col-data col-6 right-align to-date">
                    [[_getDisbPercent(row.disbursement_percent)]]
                  </span>
                  <span class="col-data col-6 right-align">
                    [[displayNonZero(row.days_last_pv)]]
                  </span>
                </div>
              </div>
            </div>
          </data-table-row>
        </template>
        <data-table-footer
          id="csoDashboardFooter"
          page-size="[[pageSize]]"
          page-number="[[pageNumber]]"
          visible-range="{{visibleRange}}"
          on-page-size-changed="pageSizeChanged"
          filtered-total-results="[[totalResults]]"
          on-page-number-changed="pageNumberChanged"
        >
        </data-table-footer>
      </div>
    `;
  }

  @property({ type: Boolean })
  active = false;

  @property({ type: Array, observer: 'rangeChanged', notify: true })
  filteredPartnerships!: [];

  @property({ type: String })
  currentFilter = 'custom';

  @property({ type: Boolean })
  forceDataRefresh = false;

  @property({ type: Boolean })
  requiredDataLoaded = false;

  @property({ type: Boolean })
  initComplete = false;

  @property({ type: Boolean, observer: 'rangeChanged' })
  presetsLoaded = false;

  @property({ type: String, notify: true })
  csvDownloadUrl!: boolean;

  @property({ type: Object })
  queryParams!: GenericObject;

  @property({ type: Array })
  sectors!: [];
  //  statePath: 'sectors'

  @property({ type: Array })
  statuses!: [];
  //  statePath: 'static.intervention_status'

  @property({ type: Array })
  offices!: [];
  //  statePath: 'offices'

  @property({ type: Array })
  totalResults!: [];

  @property({ type: Array, observer: 'filterChanged' })
  selectedSectors!: [];

  @property({ type: Array, observer: 'filterChanged' })
  selectedOffices!: [];

  @property({ type: Array, observer: 'filterChanged' })
  selectedStatuses!: [];

  @property({ type: String, observer: 'dateChanged' })
  startAfterDate!: [];

  @property({ type: String, observer: 'dateChanged' })
  startBeforeDate!: string;

  @property({ type: String, observer: 'dateChanged' })
  endBeforeDate!: string;

  @property({ type: String, observer: 'dateChanged' })
  endAfterDate!: string;

  @property({ type: Array, observer: 'rangeChanged' })
  visibleRange!: [];

  @property({ type: Number })
  pageNumber!: number;

  @property({ type: Object })
  route!: GenericObject;

  @property({ type: Array })
  params = [
    {
      qName: 'qs',
      propName: 'qs',
      xf: identity,
    },
    {
      qName: 'sort',
      propName: 'sortOrder',
      xf: identity,
    },
    {
      qName: 'sortBy',
      propName: 'orderBy',
      xf: identity,
    },
    {
      qName: 'sectors',
      propName: 'selectedSectors',
      xf: compose(join('|'), map(prop('value'))),
    },
    {
      qName: 'offices',
      propName: 'selectedOffices',
      xf: compose(join('|'), map(prop('id'))),
    },
    {
      qName: 'status',
      propName: 'selectedStatuses',
      xf: compose(join('|'), map(prop('value'))),
    },
    {
      qName: 'startAfter',
      propName: 'startAfterDate',
      xf: (xs) => this.prettyDate(xs, 'YYYY-MM-DD'),
    },
    {
      qName: 'endBefore',
      propName: 'endBeforeDate',
      xf: (xs) => this.prettyDate(xs, 'YYYY-MM-DD'),
    },
    {
      qName: 'startBefore',
      propName: 'startBeforeDate',
      xf: (xs) => this.prettyDate(xs, 'YYYY-MM-DD'),
    },
    {
      qName: 'endAfter',
      propName: 'endAfterDate',
      xf: (xs) => this.prettyDate(xs, 'YYYY-MM-DD'),
    },
  ];

  presetFilters: any;

  stateChanged(state: RootState) {
    this.sectors = state.sectors;
    this.offices = state.offices;
    this.statuses = get(state, 'static.intervention_status');
  }

  _updateFiltersDebouncer!: Debouncer | null;

  static get observers() {
    return [
      '_updateUrl(qs, pageNumber, pageSize, sortOrder, orderBy, requiredDataLoaded, initComplete, selectedSectors, selectedOffices, selectedStatuses, startAfterDate, endBeforeDate, startBeforeDate, endAfterDate, active)',
      '_init(active, sectors, statuses, offices, requiredDataLoaded)',
    ];
  }

  _init(active, sectors, statuses, offices, requiredDataLoaded) {
    if (!active || !sectors || !statuses || !offices || !requiredDataLoaded) {
      return;
    }
    let params = this.queryParams;
    this.set('initComplete', false);
    this.set('qs', params.qs ? params.qs : '');
    this.set('pageNumber', params.page ? parseInt(params.page) : 1);
    this.set('pageSize', params.size ? parseInt(params.size) : 10);
    this.set('sortOrder', params.sort ? params.sort : 'asc');
    this.set('orderBy', params.sortBy || '');
    this.set(
      'selectedSectors',
      params.sectors ? this._setSelectedSectors(params.sectors) : []
    );
    this.set(
      'selectedOffices',
      params.offices ? this._setSelectedOffices(params.offices) : []
    );
    this.set(
      'selectedStatuses',
      params.status
        ? this._setSelectedStatuses(params.status)
        : this._setSelectedStatuses('signed|active|ended|suspended|terminated')
    );
    this.set('startAfterDate', params.startAfter ? params.startAfter : '');
    this.set('endBeforeDate', params.endBefore ? params.endBefore : '');
    this.set('startBeforeDate', params.startBefore ? params.startBefore : '');
    this.set('endAfterDate', params.endAfter ? params.endAfter : '');

    (this.$.alertsPanel as HTMLElement).style.height =
      ((this.$.alertsPanel.childElementCount - 1) / 2) * 36 + 'px';
    this._initListFilters();
    this.set('initComplete', true);
    this._updateSelectedFiltersValues();
    this.set('csvDownloadUrl', this._buildCsvDownloadUrl());
  }

  _allHaveValues() {}

  _initListFilters() {
    this.initListFiltersData([
      {
        filterName: 'Section/Cluster',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        selectionOptions: this.sectors,
        alreadySelected: [],
        path: 'selectedSectors',
        selected: false,
      },
      {
        filterName: 'Field Office',
        type: 'esmm',
        optionValue: 'id',
        optionLabel: 'name',
        selectionOptions: this.offices,
        alreadySelected: [],
        path: 'selectedOffices',
        selected: false,
      },
      {
        filterName: 'Status',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        selectionOptions: this.statuses.slice(1), // exclude closed status per business req.
        alreadySelected: [],
        path: 'selectedStatuses',
        selected: false,
      },
      {
        filterName: 'Starts After',
        type: 'datepicker', // etools-datepicker
        path: 'startAfterDate',
        dateSelected: '',
        selected: false,
      },
      {
        filterName: 'Ends Before',
        type: 'datepicker', // etools-datepicker
        path: 'endBeforeDate',
        dateSelected: '',
        selected: false,
      },
      {
        filterName: 'Starts Before',
        type: 'datepicker', // etools-datepicker
        path: 'startBeforeDate',
        dateSelected: '',
        selected: false,
      },
      {
        filterName: 'Ends After',
        type: 'datepicker', // etools-datepicker
        path: 'endAfterDate',
        dateSelected: '',
        selected: false,
      },
    ]);
  }

  _updateSelectedFiltersValues() {
    this._updateFiltersDebouncer = Debouncer.debounce(
      this._updateFiltersDebouncer,
      timeOut.after(20),
      () => {
        let filtersValues = [
          {
            filterName: 'Section/Cluster',
            selectedValue: map(prop('value'), this.selectedSectors),
          },
          {
            filterName: 'Field Office',
            selectedValue: map(prop('id'), this.selectedOffices),
          },
          {
            filterName: 'Status',
            selectedValue: map(prop('value'), this.selectedStatuses),
          },
          {
            filterName: 'Starts After',
            selectedValue: this.startAfterDate,
          },
          {
            filterName: 'Starts Before',
            selectedValue: this.startBeforeDate,
          },
          {
            filterName: 'Ends Before',
            selectedValue: this.endBeforeDate,
          },
          {
            filterName: 'Ends After',
            selectedValue: this.endAfterDate,
          },
        ];
        this.updateShownFilters(filtersValues);
      }
    );
  }

  rangeChanged() {
    if (this.currentFilter !== 'custom') {
      // @ts-ignore
      (this.$.csoListTemplate as any).items = this.presetFilters[
        // @ts-ignore
        this.currentFilter - 1
      ].filteredPartnerships.slice(
        // @ts-ignore
        this.visibleRange[0] - 1,
        // @ts-ignore
        this.visibleRange[1]
      );
    } else if (this.filteredPartnerships) {
      // @ts-ignore
      this.$.csoListTemplate.items = this.filteredPartnerships.slice(
        // @ts-ignore
        this.visibleRange[0] - 1,
        // @ts-ignore
        this.visibleRange[1]
      );
    }
  }

  // @ts-ignore
  _updateUrl(
    // @ts-ignore
    initComplete
  ) {
    if (!this.active || !this.initComplete || !this.requiredDataLoaded) {
      return;
    }
    this.set('csvDownloadUrl', this._buildCsvDownloadUrl());
    const qs = this.buildQueryString();
    const currentRoute = this.route.prefix + this.route.path;
    if (qs !== null) {
      this.updateAppState(currentRoute, qs, true);
      if (this.requiredDataLoaded) {
        this._filterPartnershipsData();
      }
    } else {
      if (location.search === '') {
        this.updateAppState(currentRoute, qs, false);
      }
      if (this.forceDataRefresh && this.requiredDataLoaded) {
        this._filterPartnershipsData();
        this.set('forceDataRefresh', false);
      }
    }
  }

  _buildCsvDownloadUrl() {
    let query;
    if (this.currentFilter === 'custom') {
      query = this.params.reduce((acc, { qName, propName, xf }) => {
        return isEmpty(this[propName])
          ? acc
          : `${acc}${qName}=${xf(this[propName])}&`;
      }, '');
      query = query.split('|').join(',');
    } else {
      // @ts-ignore
      let pks = this.presetFilters[
        // @ts-ignore
        this.currentFilter - 1
      ].filteredPartnerships.map((partner) => prop('intervention_id', partner));
      pks.join(',');
      query = `pk=${pks}&`;
    }
    // @ts-ignore
    return `${this.getEndpoint('csoDashboard').url}?${query}format=csv`;
  }

  _filterPartnershipsData() {
    (this.$.partnerships as PartnershipData).query({
      searchString: this.qs,
      sectors: map(prop('label'), this.selectedSectors),
      offices: map(prop('name'), this.selectedOffices),
      status: map(prop('value'), this.selectedStatuses),
      startAfterDate: this.startAfterDate,
      endBeforeDate: this.endBeforeDate,
      startBeforeDate: this.startBeforeDate,
      endAfterDate: this.endAfterDate,
      sortBy: this.orderBy,
      order: this.sortOrder,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    });
  }

  _requiredDataLoaded(event) {
    event.stopImmediatePropagation();
    const listDataPath = event.target.getAttribute('list-data-path');
    const list = this.get(listDataPath);
    if (
      typeof list === 'undefined' ||
      (Array.isArray(list) && list.length === 0)
    ) {
      this.set('forceDataRefresh', true);
    }
    this.set('requiredDataLoaded', true);
  }

  _setSelectedOffices(officesStr) {
    let officesIdsArr = officesStr.split('|');
    if (!isEmpty(officesIdsArr)) {
      officesIdsArr = officesIdsArr.map((n) => parseInt(n, 10));
      return this.offices.filter((o: any) =>
        officesIdsArr.includes(parseInt(o.id, 10))
      );
    }
    return [];
  }

  _setSelectedSectors(sectorsStr) {
    const sectorsArr = sectorsStr.split('|');
    if (!isEmpty(sectorsArr)) {
      const selectedSectors = this.sectors.filter((s: any) => {
        return sectorsArr.indexOf(s.value) > -1;
      });
      return selectedSectors;
    }
    return [];
  }

  _setSelectedStatuses(statuses) {
    const statusesStrArr = statuses.split('|');
    if (isEmpty(this.statuses)) {
      return [];
    }
    return this.statuses.filter((status: any) => {
      return statusesStrArr.indexOf(status.value) > -1;
    });
  }

  _getDisbPercent(perc) {
    return perc === '0.00'
      ? '0'
      : perc === '!Error! (currencies do not match)'
      ? 'N/A'
      : `${Number(perc).toFixed(0)}%`;
  }

  _displayDisbursement(val, multiCurrFlag) {
    if (multiCurrFlag) {
      return '';
    }
    let nonZero = this.displayNonZero(val);
    return Number(nonZero) ? this.currencyFormat(nonZero) : nonZero;
  }

  _isEqual(status, first, second) {
    return status === 'signed' ? true : first === second;
  }

  _checkAllCurrenciesConsistent(
    status,
    all_currencies_are_consistent,
    fr_currencies_are_consistent
  ) {
    return status === 'signed'
      ? true
      : !all_currencies_are_consistent
      ? true
      : !fr_currencies_are_consistent
      ? false
      : true;
  }

  _checkSigned(status, value) {
    return status === 'signed' ? true : value;
  }

  _hideRedIcon(row) {
    if (
      this._checkSigned(row.status, row.all_currencies_are_consistent) &&
      this._checkAllCurrenciesConsistent(
        row.status,
        row.all_currencies_are_consistent,
        row.fr_currencies_are_consistent
      )
    ) {
      return this._isEqual(row.status, row.unicef_cash, row.frs_total_frs_amt);
    } else {
      return true;
    }
  }

  _eitherTrue(flag1, flag2) {
    return flag1 || flag2 ? true : false;
  }

  _getTruncated(pdssfa) {
    if (pdssfa.length > 16) {
      return '...' + pdssfa.split('/').slice(-1)[0];
    } else {
      return '...' + pdssfa.slice(pdssfa.length - 9);
    }
  }

  _showPresetFilter(event) {
    let filterDiv = event.currentTarget.lastElementChild;
    let clickedFilter = event.model.__data.presets;

    // reset styling for all filter buttons
    this.shadowRoot
      .querySelectorAll('paper-icon-button.clear-button')
      .forEach((b: HTMLElement) => (b.style.opacity = '0'));
    this.shadowRoot
      .querySelectorAll('.filter-name')
      .forEach((r: HTMLElement) => (r.style.color = ''));

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
    this.pageNumber = 1;

    // toggle custom filters visibility and footer totals source
    if (this.currentFilter === 'custom') {
      (this.$.customFilterPanel as HTMLElement).hidden = false;
      (this.$.csoDashboardFooter as DataTableFooter).filteredTotalResults =
        this.totalResults;
    } else {
      (this.$.customFilterPanel as HTMLElement).hidden = true;
      (this.$.csoDashboardFooter as DataTableFooter).filteredTotalResults =
        clickedFilter.total;
    }
    this.set('csvDownloadUrl', this._buildCsvDownloadUrl());
  }

  computeFilter(filter) {
    return function (row) {
      let eq = (stts) => stts === row.status;
      switch (filter) {
        case 'custom':
          return true;
        case '1':
          return (
            row.status === 'signed' &&
            Date.parse(row.start) < new Date().getTime() &&
            !row.frs_total_frs_amt
          );
        case '2':
          return (
            ['active', 'ended', 'suspended'].some(eq) &&
            row.unicef_cash !== row.frs_total_frs_amt
          );
        case '3':
          return (
            ['active', 'ended'].some(eq) && parseInt(row.days_last_pv) > 180
          );
        case '4':
          return (
            ['active', 'suspended'].some(eq) &&
            Date.parse(row.end) < new Date().getTime() + 2592000000
          );
        case '5':
          return (
            row.status === 'ended' && row.disbursement < row.frs_total_frs_amt
          );
        case '6':
          return (
            row.status === 'ended' &&
            !row.has_final_partnership_review &&
            parseInt(row.disbursement_usd) >= 100000
          );
        default:
          return '';
      }
    };
  }
}
