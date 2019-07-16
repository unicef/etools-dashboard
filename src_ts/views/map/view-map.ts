import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/iron-icon/iron-icon';
import '@polymer/app-route/app-route';
import '@polymer/paper-styles/element-styles/paper-material-styles';
import '@polymer/iron-flex-layout/iron-flex-layout';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { timeOut } from '@polymer/polymer/lib/utils/async';
import '@unicef-polymer/etools-dropdown/etools-dropdown-multi';
import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory';
import '../../mixins/common-general-mixin';
import '../../mixins/list-filters-mixin';
import '../../mixins/pagination-with-filters-mixin';
import { Mixins } from '../../mixins/redux-store-mixin';
import '../../mixins/fetch-assets-mixin';
import '../../mixins/event-helper-mixin';
import './data/partners-dropdown-data-mixin';
import './data/map-interventions-data';
import 'leaflet-map/leaflet-map';
import './elements/marker-dialog';
import '../../styles/shared-styles';
import '../../styles/list-styles';
import '../../styles/filter-styles';
import '../../styles/page-layout-styles';
import { compose, join, map, prop, clone, find, keys, isEmpty, equals } from '../../scripts/ramda-utils';

/**
 * @polymer
 * @mixinFunction
 * @appliesMixin EtoolsDashboard.Mixins.CommonGeneral
 * @appliesMixin EtoolsDashboard.Mixins.PartnersDropdownData
 * @appliesMixin EtoolsDashboard.Mixins.ReduxStore
 * @appliesMixin EtoolsDashboard.Mixins.MapInterventionsData
 * @appliesMixin EtoolsDashboard.Mixins.ListFilters
 */
const EtoolsMapMixin = EtoolsMixinFactory.combineMixins([
  Mixins.ReduxStore,
  Mixins.PartnersDropdownData,
  Mixins.MapInterventionsData,
  Mixins.ListFilters,
  Mixins.PaginationWithFilters,
  Mixins.CommonGeneral,
  Mixins.EventHelper,
  Mixins.FetchAsset
], PolymerElement);

/**
 * `view-map` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 */
class ViewMap extends EtoolsMapMixin {
  static get template() {
    return html`
    <style include="shared-styles paper-material-styles list-styles page-layout-styles filter-styles">
      :host {
        --paper-toggle-button-checked-bar-color: #88D4F7;
        /* TODO: replace with app-theme var */
        --paper-toggle-button-checked-button-color: #3baaee;
        /* TODO: replace with app-theme var */
      }
  
      leaflet-map {
        height: 630px;
      }
  
      paper-menu {
        max-width: 266px;
      }
  
  
      .map {
        display: block;
      }
  
      .toggler {
        display: flex;
        bottom: 8px;
        margin-bottom: 20px;
        padding-left: 24px;
      }
  
      p {
        margin: 0;
      }
  
      paper-toggle-button {
        margin-left: 16px;
      }
  
      paper-menu-button {
        padding: 0;
      }
      
      .error-msg {
        color: var(--error-color);
      }
  
      .warning-box {
        min-width: 228px;
        @apply --layout-vertical;
        @apply --layout-center-justified;
        @apply --layout-start;
      }
    </style>
    <app-route route="{{route}}" pattern="/dash/map" active="{{active}}" query-params="{{queryParams}}"></app-route>
    <div class="paper-material list-panel listControls" elevation="1">
      <div class="wrap-controls warning-box">
        <div class="title-row">
          <h1 sub-title="">Partnerships</h1>
        </div>
        <template is="dom-if" if="[[hasWarning]]">
          <p class="error-msg">[[warningMessage]]</p>
        </template>
  
      </div>
      <div class="filters-divider"></div>
      <div class="wrap-controls">
        <template is="dom-repeat" items="[[selectedFilters]]" as="filter">
  
          <template is="dom-if" if="[[filterTypeIs('esmm', filter.type)]]">
            <div class="filter esmm">
  
              <etools-dropdown-multi label="[[filter.filterName]]" placeholder="—" disabled\$="[[!filter.selectionOptions.length]]" options="[[filter.selectionOptions]]" option-value\$="[[filter.optionValue]]" option-label="[[filter.optionLabel]]" selected-values="[[filter.alreadySelected]]" trigger-value-change-event="" on-etools-selected-items-changed="esmmValueChanged" data-filter-path\$="[[filter.path]]" min-width="300px" horizontal-align="left" no-dynamic-align="">
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
    <div class="paper-material map" elevation="1">
      <leaflet-map fit-to-markers="[[fitToMarkers]]" id="map" zoom="[[country.initial_zoom]]" longitude="[[country.longitude]]" latitude="[[country.latitude]]">
        <leaflet-tilelayer url="[[leafletUrl]]">
        </leaflet-tilelayer>
        <template is="dom-repeat" items="[[markers]]" as="marker">
          <leaflet-marker id="[[marker.id]]" latitude="[[marker.point.latitude]]" longitude="[[marker.point.longitude]]" on-click="_openModal"></leaflet-marker>
        </template>
      </leaflet-map>

    </div>
`;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'view-map';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      hasWarning: {
        type: Boolean,
        value: true
      },
        warningMessage: {
        type: String
      },
      countryProgrammes: {
        type: Array,
        statePath: 'countryProgrammes'
      },
      selectedCps: {
        type: Array
      },
      selectedSections: {
        type: Array
      },
      selectedDonors: {
        type: Array
      },
      selectedGrants: {
        type: Array
      },
      selectedFocalPoints: {
        type: Array
      },
      selectedInterventions: {
        type: Array
      },
      selectedStatuses: {
        type: Array
      },
      selectedOffices: {
        type: Array
      },
      selectedResults: {
        type: Array
      },
      sections: {
        type: Array,
        statePath: 'sectors'
      },
      interventions: {
        type: Array,
        statePath: 'interventions'
      },
      donors: {
        type: Array,
        statePath: 'donors'
      },
      grants: {
        type: Array,
        statePath: 'grants'
      },
      unicefUsers: {
        type: Array,
        statePath: 'unicefUsers'
      },
      offices: {
        type: Array,
        statePath: 'offices'
      },
      results: {
        type: Array,
        statePath: 'results'
      },
      clusters: {
        type: Array,
        statePath: 'clusters'
      },
      section: {
        type: String
      },
      fitToMarkers: {
        type: Boolean,
        value: true
      },
      statuses: {
        type: Array,
        statePath: 'static.intervention_status'
      },
      userCountry: {
        type: Object,
        statePath: 'userCountry'
      },
      country: {
        type: Object
      },
      status: {
        type: String
      },
      selectedFilters: {
        type: Array
      },
      dashMap: {
        type: Object
      },
      mapFilter: {
        type: Object
      },
      filteredInterventions: {
        type: Array,
        observer: '_plotMarkers'
      },
      selectedPartners: {
        type: Array
      },
      selectedClusters: {
        type: Array
      },
      partners: {
        type: Array,
        observer: '_partnersReceived'
      },
      partnersList: {
        type: Array
      },
      availableListFilterOptions: {
        type: Array,
        value: []
      },
      markerDialog: Object,
      leafletUrl: {
        type: String,
        value: 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZXRvb2xzIiwiYSI6ImNqMGw4N3NtejAyMDIzMnBocHBsYjBsbXoifQ.VA-gzjqtTu-vr-8Ex9oEpA'
      },
      route: {
        type: Object
      },
      initComplete: {
        type: Boolean,
        value: false
      },
      currentCp: {
        type: Object
      },
      currentCountryProgrammeCriteria: {
        tpye: Object,
        value: {
          active: true,
          special: false,
          invalid: false
        }
      },
      params: {
        type: Array,
        value: function() {
          return [
            {
              qName: 'cp',
              propName: 'selectedCps',
              xf: compose(join('|'), map(prop('value')))
            },
            {
              qName: 'sections',
              propName: 'selectedSections',
              xf: compose(join('|'), map(prop('value')))
            },
            {
              qName: 'status',
              propName: 'selectedStatuses',
              xf: compose(join('|'), map(prop('value')))
            },
            {
              qName: 'partners',
              propName: 'selectedPartners',
              xf: compose(join('|'), map(prop('value')))
            },
            {
              qName: 'donors',
              propName: 'selectedDonors',
              xf: compose(join('|'), map(prop('label')))
            },
            {
              qName: 'offices',
              propName: 'selectedOffices',
              xf: compose(join('|'), map(prop('value')))
            },
            {
              qName: 'grants',
              propName: 'selectedGrants',
              xf: compose(join('|'), map(prop('value')))
            },
            {
              qName: 'focalPoints',
              propName: 'selectedFocalPoints',
              xf: compose(join('|'), map(prop('value')))
            },
            {
              qName: 'pdssfa',
              propName: 'selectedInterventions',
              xf: compose(join('|'), map(prop('value')))
            },
            {
              qName: 'results',
              propName: 'selectedResults',
              xf: compose(join('|'), map(prop('value')))
            },
            {
              qName: 'clusters',
              propName: 'selectedClusters',
              xf: compose(join('|'), map(prop('value')))
            }
          ];
        }
      }
    };
  }
  /* globals keys, clone */

  _partnersReceived(partners) {
    this.set('partnersList', partners);
  }

  static get observers() {
    return [
      '_init(active,userCountry, countryProgrammes, sections, statuses, offices, partners, donors, grants, interventions, clusters, unicefUsers, results)',
      '_filterChanged(initComplete, selectedCps, selectedSections, selectedStatuses, selectedPartners, selectedDonors, selectedGrants, selectedInterventions, selectedFocalPoints, selectedOffices, selectedResults, selectedClusters)',
      '_setWarnings(country_programme, section, status, partner)'
    ];
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();
    L.Icon.Default.imagePath = '../../../dash/images';
    let markerEl = document.createElement('marker-dialog');
    markerEl.setAttribute('id', 'markerDialog');
    dom(document.querySelector('body')).appendChild(markerEl);
    this.set('markerDialog', document.querySelector('#markerDialog'));
  }

  _openModal(e) {
    let { id } = e.model.marker;
    let data = clone(this.locationsDict[id]);
    this.markerDialog.data = data;
    this.markerDialog.opened = true;
  }

  _init(active, userCountry) {
    const staticDataLoaded = [...arguments].reduce(
      (allLoaded, xs) => Boolean(xs) && allLoaded,
      true
    );

    if (!active || !staticDataLoaded) {
      return;
    }

    this._validateUserCountry(userCountry);
    // find the current country programme based on criteria in property currentCountryProgrammeCriteria
    const currentCp = find(
      (cp) => keys(this.currentCountryProgrammeCriteria).reduce(
        (curr, next) => {
          return cp[next] === this.currentCountryProgrammeCriteria[next] && curr;
        }, true
      ), this.countryProgrammes);

    this.set('currentCp', currentCp);

    this._setFiltersFromParams(this.queryParams);

    this._initListFilters();
    this.set('initComplete', true);
    this._updateSelectedFiltersValues();
  }

  _getDefaultFilter(filterName) {
    switch (filterName) {
      case 'cp':
        return this.countryProgrammes.filter((cp) => cp.value === this.currentCp.value);
      case 'status':
        return this.statuses.filter((s)=>s.value==='active');
    }
 }

  _initListFilters() {
    this.initListFiltersData([
      {
        filterName: 'Country Programme',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: this.countryProgrammes,
        path: 'selectedCps'
      },
      {
        filterName: 'Sections',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: this.sections,
        path: 'selectedSections'
      },
      {
        filterName: 'Status',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: this.statuses,
        path: 'selectedStatuses'
      },
      {
        filterName: 'Partners',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: this.partners,
        path: 'selectedPartners'
      },
      {
        filterName: 'Donors',
        type: 'esmm',
        optionValue: 'label',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: this.donors,
        path: 'selectedDonors'
      },
      {
        filterName: 'Offices',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: map(({ name, id }) => ({ label: name, value: id }), this.offices),
        path: 'selectedOffices'
      },
      {
        filterName: 'Grants',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: this.grants,
        path: 'selectedGrants'
      },
      {
        filterName: 'Clusters',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: this.clusters,
        path: 'selectedClusters'
      },
      {
        filterName: 'Focal Points',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: this.unicefUsers,
        path: 'selectedFocalPoints'
      },
      {
        filterName: 'CP Outputs',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: this.results,
        path: 'selectedResults'
      },
      {
        filterName: 'PD/SSFA',
        type: 'esmm',
        optionValue: 'value',
        optionLabel: 'label',
        alreadySelected: [],
        selectionOptions: this.interventions,
        path: 'selectedInterventions'
      }

    ]);
  }

  _setFiltersFromParams(params) {
    this.setProperties({
      selectedCps: this.paramStrParseToArray(params.cp, this.countryProgrammes) || (params.partners ? []: this._getDefaultFilter('cp')),
      selectedSections: this.paramStrParseToArray(params.sections, this.sections) || [],
      selectedStatuses: this.paramStrParseToArray(params.status, this.statuses) || (params.partners ? []: this._getDefaultFilter('status')),
      selectedPartners: this.paramStrParseToArray(params.partners, this.partners) || [],
      selectedDonors: this.paramStrParseToArray(params.donors, this.donors, 'label') || [],
      selectedOffices: this.paramStrParseToArray(params.offices, this.offices.map((o)=>({ value: o.id, label: o.name }))) || [],
      selectedGrants: this.paramStrParseToArray(params.grants, this.grants) || [],
      selectedClusters: this.paramStrParseToArray(params.clusters, this.clusters) || [],
      selectedFocalPoints: this.paramStrParseToArray(params.focalPoints, this.unicefUsers) || [],
      selectedInterventions: this.paramStrParseToArray(params.pdssfa, this.interventions) || [],
      selectedResults: this.paramStrParseToArray(params.results, this.results) || []
    });

  }

  _updateSelectedFiltersValues() {
    this.set('updateFiltersDebouncer', Debouncer.debounce(
      this.updateFiltersDebouncer,
      timeOut.after(20), () => {
      let filtersValues = [
        {
          filterName: 'Country Programme',
          selectedValue: map(prop('value'), this.selectedCps)
        },
        {
          filterName: 'Status',
          selectedValue: map(prop('value'), this.selectedStatuses)
        },
        {
          filterName: 'Sections',
          selectedValue: map(prop('value'), this.selectedSections)
        },
        {
          filterName: 'Partners',
          selectedValue: map(prop('value'), this.selectedPartners)
        },
        {
          filterName: 'Donors',
          selectedValue: map(prop('label'), this.selectedDonors)
        },
        {
          filterName: 'Offices',
          selectedValue: map(prop('id'), this.selectedOffices)
        },
        {
          filterName: 'Grants',
          selectedValue: map(prop('value'), this.selectedGrants)
        },
        {
          filterName: 'Clusters',
          selectedValue: map(prop('value'), this.selectedClusters)
        },
        {
          filterName: 'Focal Points',
          selectedValue: map(prop('value'), this.selectedFocalPoints)
        },
        {
          filterName: 'CP Outouts',
          selectedValue: map(prop('value'), this.selectedResults)
        },
        {
          filterName: 'PD/SSFA',
          selectedValue: map(prop('value'), this.selectedInterventions)
        }

      ];

      this.updateShownFilters(filtersValues);
      // this.fireEvent('global-loading', {});
    }))
  }

  _filterChanged(initComplete, ...args) {
    if (!initComplete) {
      return;
    }
    // these must be in same order as arguments to function defined in observer
    let fieldToOptionMap = {
      'country_programmes': map(prop('value')),
      'sections': map(prop('value')),
      'status': map(prop('value')),
      'partners': map(prop('value')),
      'donors': map(prop('label')),
      'grants': map(prop('value')),
      'interventions': map(prop('value')),
      'unicef_focal_points': map(prop('value')),
      'offices': map(prop('value')),
      'results': map(prop('value')),
      'clusters': map(prop('value'))
    };
    let newFilter = {};
    const fieldNames= keys(fieldToOptionMap);
    args.forEach((xs, i)=>{
      if (xs && !isEmpty(xs)) {
        const fieldVal = fieldToOptionMap[fieldNames[i]](xs);
        newFilter[fieldNames[i]] = fieldVal.join(',');
      }
    });

    if (equals(this.mapFilter, newFilter)) {
      return;
    }

    if (isEmpty(newFilter)) {
      this.set('markers', []);
      this.set('showActive', false);
      return;
    }
    this.set('hasWarning', false);
    const qs = this.buildQueryString(false);
    const currentRoute = this.route.prefix + this.route.path;
    if (qs !== null) {
      this.updateAppState(currentRoute, qs, true);
    }
    this.set('mapFilter', newFilter);
  }

  _plotMarkers(locations) {
    if (!locations.length) {
      this.setProperties({
        hasWarning: true,
        warningMessage: 'No results for this query.'
      });
    }
    if (locations.length === 1) {
      this.set('fitToMarkers', false);
    }else {
      this.set('fitToMarkers', true);
    }
    this.set('markers', locations);
  }


  _setWarnings(country_programme, sector, status, partner) {
    if (!country_programme && !sector && !status && !partner) {
      this.setProperties({
        hasWarning: true,
        warningMessage: 'Select filters to show results on map'
      });
    }
  }

  _validateUserCountry(userCountry) {
    if (userCountry) {
      if (!userCountry.longitude || !userCountry.latitude) {
        this.set('country', {
          latitude: '40',
          longitude: '38',
          initial_zoom: 2
        });
        console.warn('The current user country does not provide map coordinates');
      } else {
        this.set('country', userCountry);
      }
    }
  }
}

window.customElements.define(ViewMap.is, ViewMap);
