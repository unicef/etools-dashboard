import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/paper-item/paper-item.js';
import {connect} from 'pwa-helpers/connect-mixin.js';
import moment from 'moment';
import Dexie from 'dexie';
import {store} from '../../store';
import '../../styles/shared-styles';
import '../../styles/list-styles';
import '../../styles/page-layout-styles';
import '../../styles/grid-layout-styles';
import '../../styles/buttons-styles';
import '../../components/data-table/data-table-header';
import '../../components/data-table/data-table-column';
import '../../components/data-table/data-table-row';
import '../../styles/dash-icons';
import { CommonGeneralMixin } from '../../mixins/common-general-mixin';
import '../../config/config';
// import personalizedData from '../../reducers/personalized-data';
import LoadingMixin from '@unicef-polymer/etools-loading/etools-loading-mixin.js';
import PersonalizedDataMixin from '../../mixins/personalized-data-mixin';
import { fireEvent } from '../../components/utils/fire-custom-event';
import '../../components/etools-progress-bar';
import { prop, isEmpty, equals, uniq, any } from 'ramda';
import { property, customElement } from '@polymer/decorators';

// store.addReducers({
//   personalizedData
// })

@customElement('view-personalized')
export class ViewPersonalized extends connect(store)(CommonGeneralMixin(LoadingMixin(PersonalizedDataMixin(PolymerElement)))) {
  static get template() {
    return html`
      <custom-style>
        <style include="shared-styles grid-layout-styles list-styles iron-flex iron-flex-factors page-layout-styles paper-material-styles buttons-styles">
          :host {
            width: 100%;
          }

          div.paper-material {
            -ms-overflow-style: -ms-autohiding-scrollbar;
          }

          .greeting {
            padding: 0 24px;
            font-size: 24px;
            color: var(--secondary-text-color);
            margin: 5px 0 30px 0;
          }

          .management-toolbar {
            position: relative;
            min-height: 54px;
            box-sizing: border-box;
            padding: 0 24px 0 0;
          }

          .toolbar-icon-container {
            width: 54px;
            height: 54px;
            color: var(--light-primary-text-color);
            @apply --layout;
            @apply --layout-center-justified;
            @apply --layout-center;
          }

          .map-icon {
            color: var(--dark-icon-color);
            position: absolute;
            right: 24px;
            transform: translateY(-50%);
            display: none;
            cursor: pointer;
          }

          data-table-row:hover .map-icon {
            display: block;
          }

          .trip-management {
            background: rgba(0, 97, 233, 1.0); /* Temporary until design confirmed */
          }

          .partnership-management {
            background: rgba(0, 153, 255, 1.0); /* Temporary until design confirmed */
          }

          .toolbar-icon {
            width: 42px;
            height: 42px;
          }

          .toolbar-item {
            margin-left: 24px;
          }

          .list-title {
            font-weight: 500;
          }

          div.title {
            font-size: 18px;
          }

          .capitalize {
            text-transform: capitalize;
          }

          .red-icon {
            fill: rgb(231, 66, 45);
          }

          .blue-icon {
            fill: rgb(26, 154, 250);
          }

          .end-justified {
            justify-content: flex-end;
            text-align: right;
          }

          .small-text {
            font-size: 12px;
            color: var(--secondary-text-color)
          }

          .right-padded {
            padding-right: 24px;
          }

          .list-panel paper-button a {
            padding-right: 0;
          }

          div.partnership-buttons paper-button:last-child {
            padding-right: 0;
            margin-right: 0;
          }

          .list-content {
            padding-left: 24px;
            padding-right: 24px;
          }

          .grouping {
            padding-left: 24px;
            padding-right: 24px;
          }
          
          .group {
            display: flex;
            align-items: center;
            border-bottom: 1px solid var(--dark-divider-color, rgba(0, 0, 0, 0.12));
          }

          data-table-row.pdssfa-row {
            border-left: 1px solid var(--dark-divider-color, rgba(0, 0, 0, 0.12));
          }

          .pdssfa-row > *[slot="row-data"] {
            margin-top: inherit;
            margin-block-end: inherit;
          }

          .bold {
            font-weight: 500;
          }

          .number-column {
            text-align: right;
            padding-right: 8px;
          }

          .partner-name > a {
            white-space: normal;
          }

          .pd-ref {
            line-height: 24px;
          }

          .repeat-group > :nth-last-child(2) {
            border-bottom: none;
          }

          data-table-column.partner-name,
          data-table-row.pdssfa-row > [slot="row-data"],
          .repeat-group > data-table-row:first-of-type:last-of-type {
            height: 48px;
          }

          .trips-ap {
            display: flex;
            justify-content: space-between;
            padding: 0 24px;
            height: 64px;
            align-items: center;
            border-bottom: 1px solid var(--dark-divider-color, rgba(0, 0, 0, 0.12));
          }

          data-table-header.double {
            --paper-material-padding: 6.5px 24px;
            height: 56px;
          }

          data-table-header.single {
            --paper-material-padding: 18px 24px;
          }

          div.inherit-width {
            width: inherit;
          }

          .bar-info-container {
            display: flex;
          }

          .bar-info {
            width: 100px;
            font-size: 10px;
          }

          .bar-info.right {
            text-align: right;
          }

          .bar-info.left {
            text-align: left;
          }

          @media print {
            .list-content {
              max-height: 100%;
              overflow: visible;
            }

            .partner-name > a {
              white-space: normal
            }
          }
        </style>
      </custom-style>

      <h1 class="greeting">Welcome, [[user.first_name]]!</h1>

      <!--MY PARTNERSHIPS-->
      <div class="paper-material list-panel clear-pad" elevation="1">
        <div no-title="" no-collapse="" class="list-title layout horizontal center main trips-ap">
          <div class="flex-2 title">My PD/SSFAs</div>
        </div>
        <template is="dom-if" if="[[!pdSSFAsLoaded]]">
          <etools-loading active=""></etools-loading>
        </template>

        <data-table-header class="single">
          <div class="col-data small-text col-2">Partner</div>
          <div class="grouping col-10 layout-horizontal">
            <div class="col-data small-text col-2">PD/SSFA<br>Status</div>
            <div class="col-data small-text flex-2">Start - End Dates</div>
            <div class="col-data small-text col-1">FR Flags</div>
            <div class="col-data small-text flex-2">Disbursement to Date / <br> UNICEF Cash</div>
            <div class="col-data small-text number-column col-1">Outstanding DCT</div>
            <div class="col-data small-text number-column col-1">Action Points</div>
            <div class="col-data small-text number-column col-1">Days Since Last PV</div>
            <div class="col-data small-text col-1">Status of Last Report</div>
          </div>
        </data-table-header>

        <div class="list-content">
          <template is="dom-if" if="[[!pdSSFAs.length]]">
            <div class="paper-material inherit-width">No results to show.</div>
          </template>
          <template is="dom-repeat" items="[[reorganizedData]]" as="partner" hidden="[[!pdSSFAsLoaded]]">
            <div class="layout-horizontal group">
              <data-table-column class="col-data col-2 partner-name">
                <a class="bold" on-tap="goToPage" href="[[baseSite]]/pmp/partners/[[getPartnerId(partner)]]/details" app-name="pmp" page="interventions" id="[[getPartnerId(partner)]]/details">
                  [[getName(partner)]]
                  <paper-tooltip position="right">[[getName(partner)]]</paper-tooltip>
                </a>
              </data-table-column>

                <div class="col-10 repeat-group">
                  <template is="dom-repeat" items="[[getValues(partner)]]" as="pd">
                    <data-table-row class="pdssfa-row" no-collapse="">
                      <div slot="row-data">
                        <span class="col-2">
                          <a class="bold pd-ref" on-tap="goToPage" href="[[basesSite]]/pmp/interventions/[[pd.intervention_id]]/details" app-name="pmp">
                            [[_getTruncated(pd.number)]]
                            <paper-tooltip position="right">[[pd.number]]</paper-tooltip>
                          </a><br>
                          <span class="capitalize">[[pd.status]]</span>
                        </span>
                        <span class="col-data flex-2">
                          <etools-progress-bar value="[[_getPercentFromDate(pd.start, pd.end)]]"></etools-progress-bar>
                          <div class="bar-info-container">
                            <div class="bar-info left">[[formatDate(pd.start)]]</div>
                            <div class="bar-info right">[[formatDate(pd.end)]]</div>
                          </div>
                        </span>
                        <span class="col-data col-1">
                          <span>
                            <iron-icon hidden="[[_checkSigned(pd.status, pd.all_currencies_are_consistent)]]" icon="dash-custom-icons:not-equal" class="blue-icon"></iron-icon>
                            <paper-tooltip hidden="[[_checkSigned(pd.status, pd.all_currencies_are_consistent)]]">
                              FR currency does not match PD currency.
                              <br> Disbursement to date % cannot calculate.
                            </paper-tooltip>
                            <iron-icon hidden="[[_checkAllCurrenciesConsistent(pd.status, pd.all_currencies_are_consistent, pd.fr_currencies_are_consistent)]]" icon="dash-custom-icons:1+" class="blue-icon">
                            </iron-icon>
                            <paper-tooltip hidden="[[_checkAllCurrenciesConsistent(pd.status, pd.all_currencies_are_consistent, pd.fr_currencies_are_consistent)]]">
                              More than 1 FR currency is available. FR Amount
                              <br> and Actual Disbursements cannot be displayed.
                            </paper-tooltip>
                          </span>
                          <span>
                            <iron-icon hidden="[[_hideRedIcon(pd)]]" icon="dash-custom-icons:not-equal" class="red-icon">
                            </iron-icon>
                            <paper-tooltip hidden="[[_hideRedIcon(pd)]]">
                              FR amount does not equal to planned UNICEF cash
                            </paper-tooltip>
                          </span>
                        </span>
                        <span class="col-data flex-2">
                          <etools-progress-bar value="[[_getPercent(pd.disbursement, pd.unicef_cash)]]"></etools-progress-bar>
                          <div class="bar-info-container">
                            <div class="bar-info left">[[pd.budget_currency]] [[currencyFormat(pd.disbursement)]]</div>
                            <div class="bar-info right">[[currencyFormat(pd.unicef_cash)]]</div>
                          </div>
                        </span>
                        <span class="col-data number-column col-1">
                          [[currencyFormat(pd.outstanding_dct)]]
                        </span>
                        <span class="col-data number-column col-1">
                          <a href="[[baseSite]]/apd/action-points/list?partner=[[pd.partner_id]]&amp;status=open">[[pd.action_points]]</a>
                        </span>
                        <span class="col-data number-column col-1">
                          [[pd.days_last_pv]]
                        </span>
                        <span class="col-data col-1">
                            <iron-icon on-click="goToMaps" class="map-icon" icon="maps:map"></iron-icon>
                        </span>
                      </div>
                    </data-table-row>
                  </template>
                </div>

              </div>
          </template>
        </div>
      </div>
      
      <div class="layout horizontal double">
        <!-- ACTION POINTS -------------------------->
        <div class="paper-material list-panel half-paper clear-pad" elevation="1">
          <div class="list-title layout horizontal main trips-ap" no-title="" no-collapse="">
            <div class="title">Action Points</div>
            <paper-button class="primary-btn with-prefix" on-tap="_goToAddActionPoint">
              <iron-icon icon="add"></iron-icon>
              Add Action Point
            </paper-button>
          </div>
          <div class="top-content-row tabs-header">
            <paper-tabs selected="{{actionsTab}}" attr-for-selected="name" fallback-selection="actionPointsForMe" noink="" bottom-item="">
              <paper-tab name="actionPointsForMe" link="">
                <span class="tab-content">Assigned To Me</span>
              </paper-tab>
              <paper-tab name="actionPointsByMe" link="">
                <span class="tab-content">Assigned By Me</span>
              </paper-tab>
            </paper-tabs>
          </div>
          <data-table-header class="double">
            <div class="col small-text right-padded col-data col-10">Description<br>Status</div>
            <div class="col-2 small-text col-data">Due Date<br>[[_principal(actionsTab)]]</div>
          </data-table-header>
          <div class="list-content">
            <template is="dom-if" if="[[!actionPointsItems.length]]">
              <div class="paper-material inherit-width">No results to show.</div>
            </template>
            <template is="dom-repeat" items="[[actionPointsItems]]" as="action">
              <data-table-row no-collapse="">
                <div slot="row-data">
                  <div class="layout vertical col-10">
                    <span class="col-data description">
                      <a on-tap="_goToActionPoint" href="[[baseSite]]/apd/action-points/detail/[[action.id]]">[[action.description]]</a>
                    </span>
                    <span class="suppData">[[capitalizeWord(action.status)]]</span>
                  </div>
                  <div class="layout vertical start col-data col-2 ">
                    <span class="col-data">[[_dateFormatted(action.due_date)]]</span>
                    <span class="suppData">[[_getDisplayName('actions',action)]]</span>
                  </div>
                </div>
              </data-table-row>
            </template>
          </div>
        </div>

        <!-- TRIPS -------------------------->
        <div class="paper-material list-panel half-paper clear-pad" elevation="1">
          <div class="list-title layout horizontal main trips-ap" no-title="" no-collapse="">
            <div class="title">Trips</div>
            <paper-button class="primary-btn with-prefix" on-tap="_goToAddTrip">
              <iron-icon icon="add"></iron-icon>
              Add New Trip
            </paper-button>
          </div>
          <div class="top-content-row tabs-header">
            <paper-tabs selected="{{tripsTab}}" attr-for-selected="name" fallback-selection="myTrips" noink="" bottom-item="">
              <paper-tab name="myTrips" link="">
                <span class="tab-content">My Trips</span>
              </paper-tab>
              <paper-tab name="tripsSupervised" link="">
                <span class="tab-content">Supervised</span>
              </paper-tab>
            </paper-tabs>
          </div>
          <data-table-header class="double">
            <div class="col small-text right-padded col-data col-2">Reference No.</div>
            <div class="flex-2 small-text right-padded col-data">Purpose of Trip</div>
            <div class="col-2 small-text col-data">Start Date<br>[[_principal(tripsTab)]]</div>
          </data-table-header>
          <div class="list-content">
            <template is="dom-if" if="[[!tripsItems.length]]">
              <div class="paper-material inherit-width">No results to show.</div>
            </template>
            <template is="dom-repeat" items="[[tripsItems]]" as="trip">
              <data-table-row no-collapse="">
                <div slot="row-data">
                  <a on-tap="goToPage" href="[[baseSite]]/t2f/edit-travel/[[trip.id]]" app-name="t2f" page="edit-travel" id="[[trip.id]]" class="col-data col col-2">
                    [[trip.reference_number]]
                  </a>
                  <span class="description description-size col-data flex-2">
                  [[trip.purpose]]
                </span>
                  <div class="layout vertical start col-data col-2 ">
                    <span class="col-data">[[_dateFormatted(trip.start_date)]]</span>
                    <span class="suppData">[[_getDisplayName('trips',trip)]]</span>
                  </div>
                </div>
              </data-table-row>
            </template>
          </div>
        </div>
      </div>
    `;
  }

  @property({type: Array, notify: true})
  reorganizedData: object[];

  @property({type: Array})
  allPDSSFAs: object[];

  @property({type: Array})
  parthers: object[];

  @property({type: Number})
  totalPdSSFAs: number;

  @property({type: Array, notify: true})
  tripsItems: object[]

  @property({type: Array})
  requiredAssets: string[] = ['tripsSupervised'];

  // @ts-ignore
  @property({type: Array, statePath: 'trips'})
  myTrips: object[];

  // @ts-ignore
  @property({type: Array, statePath: 'tripsSupervised'})
  tripsSupervised: object[];

  @property({type: Array, notify: true})
  actionPointsItems: object[]

  // @ts-ignore
  @property({type: Array, statePath: 'actionPointsByMe'})
  actionPointsByMe: object[];

  // @ts-ignore
  @property({type: Array, statePath: 'actionPointsForMe'})
  actionPointsForMe: object[];

  @property({type: Boolean, notify: true})
  pdSSFAsLoaded: boolean = false;

  @property({type: Object})
  route: object;

  @property({type: Object})
  user: object = {};

  @property({type: String})
  tripsTab: string;

  @property({type: String})
  actionsTab: string;

  @property({type: Boolean})
  active: boolean;

  public stateChanged(state) {
    this.set('allPDSSFAs', state.commonData.pdssfas);
    this.set('actionPointsByMe', state.commonData.actionPointsByMe);
    this.set('actionPointForMe', state.commonData.actionPointForMe);
    this.set('tripsSupervised', state.commonData.tripsSupervised);
    this.set('myTrips', state.commonData.trips);
  }

  ready() {
    super.ready();
  }

  static get observers() {
    return [
      '_updateTrips(tripsTab,myTrips)',
      '_updateActionPoints(actionsTab,actionPointsForMe)',
      '_staticDataLoaded(myTrips,tripsSupervised, actionPointsItems, actionPointsForMe)',
      'queryCsoDashboard(allPDSSFAs, user)',
      '_getData(user)'
    ];
  }

  _updateTrips() {
    this._setItems(this.tripsTab, 'tripsItems');
  }

  _updateActionPoints() {
    this._setItems(this.actionsTab, 'actionPointsItems');
  }

  _checkPdSSFAsData(data) {
    if ((data && data.length) || !data.length) {
      this.set('pdSSFAsLoaded', true);
      this.reorganizeData(data);
    }
  }

  _getData() {
    if (!isEmpty(this.user)) {
      // @ts-ignore
      this.loadPersonalizedData({id: this.user.user});
    }
  }

  _staticDataLoaded() {
    if(!this.active) {
      return;
    }
    if (this.myTrips && this.tripsSupervised && this.actionPointsItems && this.actionPointsForMe) {
      fireEvent(this, 'global-loading', {});
    } else {
      fireEvent(this, 'global-loading', {
        active: true
      });
    }
  }

  _principal(tab: string) {
    switch(tab) {
      case 'myTrips':
        return 'Trip Supervisor';
        break;
      case 'tripsSupervised':
        return 'Traveler';
        break;
      case 'actionPointsForMe':
        return 'Assigned By';
        break;
      case 'actionPointsByMe':
        return 'Assignee';
        break;
      default:
        return '';
    }
  }

  _setItems(tab, itemsProp) {
    const items = prop(tab, this);
    this.set(itemsProp, items);
  }

  _getDisplayName(type, item) {
    if (type === 'trips') {
      return item.supervisor_name || item.traveler;
    } else {
      if (this.actionsTab === 'actionPointsByMe') {
        return item.person_responsible_name;
      }
      return item.assigned_by_name;
    }
  }

  _dateFormatted(str) {
    return str ? moment(str).format('DD MMM YYYY') : '';
  }

  _updateUrl(active) {
    if (active) {
      this.updateAppState('dashboard/personalized', [], true);
    }
  }

  _goToAddActionPoint() {
    window.location.href = '/apd/action-points/new';
  }

  _goToAddTrip() {
    window.location.href = '/t2f/edit-travel/-1';
  }

  _goToActionPoint(e) {
    var origin = window.location.origin;
    const path = origin + '/t2f/action-point/' + e.model.action.id;
    this.manageClickEvent(e, path);
  }

  _displayDisbursement(val, multiCurrFlag) {
    if (multiCurrFlag) {
        return '';
      }
    let nonZero = this.displayNonZero(val);
    return Number(nonZero) ? this.currencyFormat(nonZero) : nonZero;
  }

  _isEqual(status, first, second) {
    return status === 'signed' ? true : (first === second);
  }

  _checkAllCurrenciesConsistent(status, all_currencies_are_consistent, fr_currencies_are_consistent) {
    return status === 'signed' ? true :
      (!all_currencies_are_consistent) ? true :
        (!fr_currencies_are_consistent) ? false : true;
  }

  _checkSigned(status, value) {
    return status === 'signed' ? true : value;
  }

  _hideRedIcon(row) {
    if (
      this._checkSigned(row.status, row.all_currencies_are_consistent) &&
      this._checkAllCurrenciesConsistent(row.status, row.all_currencies_are_consistent, row.fr_currencies_are_consistent)
    ) {
      return this._isEqual(row.status, row.unicef_cash, row.frs_total_frs_amt);
    } else {
      return true;
    }
  }

  _getPercentFromDate(start: string, end: string) {
    // @ts-ignore
    let baseMS = Date.parse(new Date(start));
    let todayMS = Date.now() - baseMS;
    // @ts-ignore
    let endMS = Date.parse(new Date(end)) - baseMS;
    return (todayMS / endMS) * 100;
  }

  _getPercent(first, second) {
    return (first / second) * 100;
  }

  queryCsoDashboard(allPDSSFAs, user) {
    if (!allPDSSFAs || isEmpty(user)) {
      return;
    }
    fireEvent(this, 'global-loading', { active: true, loadingSource: 'view-personalized' });

    window.EtoolsDashboard.DexieDb.transaction(
      'r',
      window.EtoolsDashboard.DexieDb.csoDashboard,
      () => {
        let queryResult = window.EtoolsDashboard.DexieDb.csoDashboard.orderBy('partner_name');
        queryResult = queryResult.filter((int) => any(equals(user.user))(int.unicef_focal_points));
        return Dexie.Promise.all([queryResult.toArray()]);
      }).then((countAndResult) => {
        this._checkPdSSFAsData(countAndResult[0]);
      }).catch((err) => console.error('Error querying partnerships: ', err))
      .finally(() => fireEvent(this, 'global-loading', { loadingSource: 'view-personalized' }));
  }

  reorganizeData(data) {
    let names = uniq(data.map((pd) => pd.partner_name));
    let newDataArray = names.map((name: string) => {
      let obj = {};
      obj[name] = data.filter((pd) => pd.partner_name === name)
                      .sort((a, b) => Date.parse(a.end) - Date.parse(b.end));
      return obj;
    });
    this.set('reorganizedData', newDataArray);
  }

  getName(partner) {
    return Object.keys(partner);
  }

  getValues(partner) {
    return Object.values(partner)[0];
  }

  formatDate(date) {
    let m = moment(date, 'YYYY-MM-DD');
    return m.format('DD MMM YY');
  }

  goToMaps(event) {
    let partnerId = event.model.__data.pd.partner_id;
    window.location.href = `/dash/map?&partners=${partnerId}`;
  }

  getPartnerId(partner) {
    return Object.values(partner)[0][0].partner_id;
  }

  _getTruncated(pdssfa) {
    if (pdssfa.length > 16) {
      return '...' + pdssfa.split('/').slice(-1)[0];
    } else {
      return '...' + pdssfa.slice(pdssfa.length - 9);
    }
  }
}
