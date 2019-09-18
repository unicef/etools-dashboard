import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-route.js';
import '@unicef-polymer/etools-dropdown/etools-dropdown-multi.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
// import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
// import '@unicef-polymer/etools-datepicker/etools-datepicker-button.js';
import '../../styles/dash-icons';
import './data/attachments-data';
import '../../styles/shared-styles';
import '../../styles/list-styles';
import '../../styles/grid-layout-styles';
import '../../components/data-table/data-table-column';
import '../../components/data-table/data-table-header';
import '../../components/data-table/data-table-row';
import '../../components/data-table/data-table-footer';
import '../../config/config';
import { ListFiltersMixin } from '../../mixins/list-filters-mixin';
import { DropdownMixin } from '../../mixins/dropdown-mixin';
import { DateMixin} from '../../mixins/date-mixin';
import { CommonGeneralMixin } from '../../mixins/common-general-mixin';
import { PaginationWithFiltersMixin } from '../../mixins/pagination-with-filters-mixin';
// import { FetchAssetMixin } from '../../mixins/fetch-assets-mixin';
// import { Mixins } from '../../mixins/redux-store-mixin';
import './elements/attachments-grouped';
import { compose, identity, join, map, prop, isEmpty, union, merge, reject } from 'ramda';
import { customElement, property } from '@polymer/decorators';

@customElement('view-attachments')
export class ViewAttachments extends DateMixin(CommonGeneralMixin(PaginationWithFiltersMixin(DropdownMixin(ListFiltersMixin(PolymerElement))))) {
//  ListFilters(
//   DateMixin(
//     CommonGeneralMixin(
//       PaginationWithFiltersMixin(
//         DropdownMixin(PolymerElement))))) {

  static get template() {
    return html`
    <style include="shared-styles grid-layout-styles page-layout-styles paper-material-styles list-styles">
      :host {
        --col: {
          @apply --layout-horizontal;
          box-sizing: border-box;
        };
        --col-first: {
          padding-left: 0;
        };
        --col-1: {
          flex: 0 0 8.33333333%;
          max-width: 8.33333333%;
        };
        --col-2: {
          flex: 0 0 16.66666667%;
          max-width: 16.66666667%;
        };
        --flex-1: {
          flex: 1;
        }
        --esmm-external-wrapper: {
          width: 280px;
        }
      }

      /* Table Columns Start */

      .partner-column {
        width: 10%;
        @apply --col;
        @apply --col-first;
      }

      .vendor-column {
        @apply --col;
        @apply --col-1;
      }

      .pd-column {
        @apply --col;
        @apply --col-1;
      }

      .pca-column {
        @apply --col;
        @apply --col-1;
      }

      .partner-type-column {
        @apply --col;
        @apply --col-2;
      }

      .source-column {
        @apply --col;
        width: 144px;
      }

      .doctype-column {
        @apply --col;
        width: 10%;
      }

      .download-column {
        @apply --col;
        @apply --col-2;
      }

      .created-column {
        @apply --col;
        @apply --col-1;
      }

      /* Table Columns End */

      #filterMenu paper-icon-item {
        --paper-item-selected: {
            background-color: rgb(220, 220, 220);
        };
        --paper-item-focused: {
            background-color: rgb(198, 198, 198);
        };
      }

      paper-icon-item {
        --paper-item-icon-width: 32px;
      }

      paper-menu-button {
        padding: 0;
      }
      
      data-table-column:not(:first-child),data-table-row >div > div:not(:first-child) {
        padding-left: 24px;
      }

      .wrap-controls paper-input {
        min-width: 280px;
      }
  
      .custom-width {
        width: 176px;
      }
      
      .wrap-controls {
        padding-left: 24px;
      }

      .view-toggle {
        display: flex;
        justify-content: flex-end;
        align-items: center;
          padding-bottom: 12px;
      }

      paper-button.curved-left {
        border-radius: 50px 0 0 50px;
        height: 36px;
        margin-right: 0;
        padding-right: 1em;
        padding-left: 16px;
        cursor: pointer;
      }

      paper-button.curved-right {
        border-radius: 0 50px 50px 0;
        height: 36px;
        margin-left: 0;
        padding-left: 1em;
        padding-right: 16px;
        cursor: pointer;
      }

      .dark-button {
        background: rgb(216, 216, 216);
        color: rgba(0, 0, 0, 0.54);
      }

      .light-button {
        background: rgb(255, 255, 255);
        color: rgba(0, 0, 0, 0.87);
      }

      paper-button {
        margin: 0;
      }
    </style>
  
    <app-route route="{{route}}"
               pattern="/dash/attachments"
               active="{{active}}"
               query-params="{{queryParams}}">
    </app-route>
  
    <attachments-data id="attachments"
                      filtered-total="{{filteredTotal}}"
                      filtered-attachments="{{filteredAttachments}}"
                      ordered-results="{{orderedResults}}"
                      fire-data-loaded=""
                      on-attachments-loaded="_attachmentsLoaded">
    </attachments-data>

    <div class="view-toggle">
      <paper-button id="allDocs" on-tap="_toggleDocsView" name="allDocs" noink="" class="curved-left light-button">
        <iron-icon id="allDocsIcon" name="allDocs" icon="list"></iron-icon>
        ALL DOCUMENTS
      </paper-button>
      <paper-button id="grouped" on-tap="_toggleDocsView" name="grouped" noink="" class="curved-right dark-button">
        <iron-icon id="groupedIcon" name="grouped" icon="dash-custom-icons:list-alt"></iron-icon>
        GROUPED BY PARTNER/AGREEMENT
      </paper-button>
    </div>

    <iron-pages id="docPages" attr-for-selected="name" fallback-selection="allDocs">
  
      <div name="allDocs">
        <div class="paper-material list-panel listControls" elevation="1">
          <div class="wrap-controls">
            <paper-input type="search" autocomplete="off" value="{{qs}}" placeholder="Search" always-float-label="">
              <iron-icon icon="search" slot="prefix"></iron-icon>
            </paper-input>
            <template is="dom-repeat" items="[[selectedFilters]]" as="filter">
              <!-- dropdown filters  -->
              <template is="dom-if" if="[[filterTypeIs('esmm', filter.type)]]">
                <div class="filter esmm">
                  <etools-dropdown-multi label="[[filter.filterName]]"
                                         placeholder="—" disabled\$="[[!filter.selectionOptions.length]]"
                                         options="[[filter.selectionOptions]]"
                                         option-value="[[filter.optionValue]]"
                                         option-label="[[filter.optionLabel]]"
                                         selected-values="[[filter.alreadySelected]]"
                                         trigger-value-change-event=""
                                         on-etools-selected-items-changed="esmmValueChanged"
                                         data-filter-path\$="[[filter.path]]"
                                         min-width="300px"
                                         horizontal-align="left"
                                         no-dynamic-align="">
                  </etools-dropdown-multi>
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
            <data-table-column class="partner-column" field="partner" sortable="">
              Partner
            </data-table-column>
            <data-table-column class="vendor-column">
              Vendor #
            </data-table-column>
            <data-table-column field="pd_ssfa_number" sortable="" class="pd-column">
              PD SSFA #
            </data-table-column>
            <data-table-column field="agreement_reference_number" sortable="" class="pca-column">
              PCA #
            </data-table-column>
            <data-table-column class="partner-type-column" field="partner_type" sortable="">
              Partner Type
            </data-table-column>
            <data-table-column class="source-column" field="source">
              Source
            </data-table-column>
            <data-table-column class="doctype-column" sortable="" field="file_type">
              Document Type
            </data-table-column>
            <data-table-column class="download-column">
              File Download
            </data-table-column>
            <data-table-column class="created-column" sortable="" field="created">
              Date Uploaded
            </data-table-column>
          </data-table-header>
      
          <template is="dom-repeat" items="[[filteredAttachments]]">
            <data-table-row no-collapse="">
              <div slot="row-data">
                <div class="partner-column">
                  <span class="col-data">
                    [[item.partner]]
                    <paper-tooltip fit-to-visible-bounds="">[[item.partner]]</paper-tooltip>
                  </span>
                </div>
                <div class="vendor-column">
                  <span class="col-data">[[item.vendor_number]]</span>
                </div>
                <div class="pd-column">
                  <span class="col-data">[[item.pd_ssfa_number]]
                    <paper-tooltip fit-to-visible-bounds="">[[item.pd_ssfa_number]]</paper-tooltip>
                  </span>
                </div>
                <div class="pca-column">
                  <span class="col-data">[[item.agreement_reference_number]]
                    <paper-tooltip fit-to-visible-bounds="">[[item.agreement_reference_number]]</paper-tooltip>
                  </span>
                </div>
                <div class="partner-type-column">
                  <span class="col-data">[[item.partner_type]]</span>
                </div>
                <div class="source-column">
                  <span class="col-data">[[item.source]]</span>
                </div>
                <div class="doctype-column">
                  <span class="col-data">
                    [[item.file_type]]
                    <paper-tooltip fit-to-visible-bounds="">[[item.file_type]]</paper-tooltip>
                  </span>
                </div>
                <div class="download-column">
                  <a href\$="[[item.file_link]]" target="_blank" class="col-data">[[item.filename]]</a>
                </div>
                <div class="created-column">
                  <span class="col-data">[[item.created]]</span>
                </div>
              </div>
            </data-table-row>
          </template>
          <data-table-footer page-size="[[pageSize]]" page-number="[[pageNumber]]" visible-range="{{visibleRange}}" on-page-size-changed="pageSizeChanged" filtered-total-results="[[filteredTotal]]" on-page-number-changed="pageNumberChanged">
          </data-table-footer>
        </div>
      </div>

      <div name="grouped">
        <attachments-grouped ordered-results="[[orderedResults]]">
        </attachments-grouped>
      </div>
    </iron-pages>
  `;
  }

  static get observers() {
    return [
      '_updateUrl(qs, pageNumber, pageSize, initComplete, sortOrder, orderBy, selectedAttachmentTypes, selectedPDs, selectedPCAs, requiredDataLoaded)',
      '_initListFilters(attachmentTypes,agreements,interventions)',
      '_init(active, attachmentTypes, agreements, interventions)'
    ];
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  @property({type: Array})
  filteredAttachments: object[] = [];

  @property({type: Number})
  filteredTotal: number;

  @property({type: Array})
  qs: string;

  @property({type: Array})
  attachmentTypes: any

  @property({type: Object})
  static: object

  @property({type: Array})
  agreements: object[]

  @property({type: Array})
  interventions: object[]

  @property({type: Array})
  selectedAttachmentTypes: object[]

  @property({type: Boolean})
  requiredDataLoaded: boolean = false;

  @property({type: Array})
  formattedTypes: any = [];

  @property({type: Array})
  params: object[] = function() {
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
        qName: 'type',
        propName: 'selectedAttachmentTypes',
        xf: compose(join('|'), map(prop('value')))
      },
      {
        qName: 'pca',
        propName: 'selectedPCAs',
        xf: compose(join('|'), map(prop('value')))
      },
      {
        qName: 'pd',
        propName: 'selectedPDs',
        xf: compose(join('|'), map(prop('value')))
      }
    ];
  }();

  @property({type: Object})
  route: object;

  @property({type: Array, notify: true})
  docsPage: string;

  @property({type: Boolean})
  docsActive: boolean;
  
  @property({type: Object})
  queryParams: object;

  @property({type: Object})
  updateFiltersDebouncer: any;

  @property({type: Object})
  selectedPDs: object;

  @property({type: Object})
  selectedPCAs: object;

  @property({type: String})
  orderBy: string;

  @property({type: String})
  pageNumber: string;

  @property({type: String})
  pageSize: string;

  @property({type: String})
  sortOrder: string;

  // static get observers() {
  //   return [
  //     '_tabChanged(routeData.docsTab, docsActive)'
  //   ];
  // }

  _init(active, attachmentTypes, interventions, agreements) {
    let params = this.queryParams;
      if (!active || !attachmentTypes || !interventions || !agreements) {
        return;
      }
      if (isEmpty(this.formattedTypes)) {
        this._formatAttachmentTypes();
      }
      this.set('initComplete', false);
      // @ts-ignore
      this.set('qs', params.qs || '');
      // @ts-ignore
      this.set('pageNumber', params.page ? parseInt(params.page) : 1);
      // @ts-ignore
      this.set('pageSize', params.size ? parseInt(params.size) : 10);
      // @ts-ignore
      this.set('sortOrder', params.sort || 'desc');
      // @ts-ignore
      this.set('orderBy', params.sortBy || '');
      // @ts-ignore
      this.set('selectedAttachmentTypes', params.type ? this._setSelectedFromCollection(params.type, this.formattedTypes) : []);
      // @ts-ignore
      this.set('selectedPCAs', params.pca ? this._setSelectedFromCollection(params.pca, this.agreements): [] );
      // @ts-ignore
      this.set('selectedPDs', params.pd ? this._setSelectedFromCollection(params.pd, this.interventions): [] );
      this.set('initComplete', true);
      this._updateSelectedFiltersValues();
  }

  _formatAttachmentTypes() {
    // @ts-ignore
    const formattedTypes = union(this.attachmentTypes, this.static.partner_file_types).map((type) => ({
      label: type,
      value: type
    }));
    this.set('formattedTypes', formattedTypes);
  }

  _attachmentsLoaded(e) {
    e.stopImmediatePropagation();
      this.set('requiredDataLoaded', true);
  }

  _initListFilters(attachmentTypes, agreements, interventions) {
    if (!attachmentTypes || !agreements || !interventions) {
      return;
    }
    // @ts-ignore
    this.initListFiltersData([
      {
        filterName: 'Document Type',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        path: 'selectedAttachmentTypes',
        // @ts-ignore
        selectionOptions: union(this.attachmentTypes, this.static.partner_file_types).map((type) => ({
          label: type,
          value: type
        })),
        alreadySelected: [],
        selected: false
      },
      {
        filterName: 'PD/SSFA',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        path: 'selectedPDs',
        selectionOptions: this.interventions,
        alreadySelected: [],
        selected: false
      },
      {
        filterName: 'PCA',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        path: 'selectedPCAs',
        selectionOptions: this.agreements,
        alreadySelected: [],
        selected: false
      }
    ]);
  }

  _updateSelectedFiltersValues() {
    this.set('updateFiltersDebouncer', Debouncer.debounce(
      this.updateFiltersDebouncer,
      timeOut.after(20), () => {
        let filtersValues = [
          {
            filterName: 'Document Type',
            selectedValue: map(prop('value'), this.selectedAttachmentTypes)
          },
          {
            filterName: 'PD/SSFA',
            selectedValue: map(prop('value'), this.selectedPDs)
          },
          {
            filterName: 'PCA',
            selectedValue: map(prop('value'), this.selectedPCAs)
          }
        ];
        // @ts-ignore
        this.updateShownFilters(filtersValues);
      }));
  }

  _filterDocuments() {
    const selectedParams = {
      searchString: this.qs,
      attachmentType: map(prop('value'), this.selectedAttachmentTypes),
      pca: map(prop('label'), this.selectedPCAs),
      pd: map(prop('label'), this.selectedPDs),
      orderBy: this.orderBy
    };
    const query = merge(reject(isEmpty, selectedParams), {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      order: this.sortOrder
    });
    // @ts-ignore
    this.$.attachments.query(query);
  }

  _updateUrl() {
    // @ts-ignore
    if (!this.initComplete || !this.requiredDataLoaded) {
      return;
    }
    // @ts-ignore
    const currentRoute = this.route.prefix + this.route.path;
    // @ts-ignore
    const qs = this.buildQueryString();
    this.updateAppState(currentRoute, qs, true);
    if (this.requiredDataLoaded) {
      this._filterDocuments();
    }
  }

  _setSelectedFromCollection(param, collection) {
    const itemsFromParam = param.split('|');
    if (!isEmpty(itemsFromParam)) {
      const res = collection.filter((u) => itemsFromParam.indexOf(u.value.toString()) > -1);
      return res;
    }
    return [];
  }

  _toggleDocsView() {
    let pages = this.$.docPages;
    // @ts-ignore
    pages.selectNext();
    this.$.allDocs.classList.toggle('light-button');
    this.$.allDocs.classList.toggle('dark-button');
    this.$.grouped.classList.toggle('dark-button');
    this.$.grouped.classList.toggle('light-button');
  }
}
