// import '@polymer/polymer/polymer-legacy';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/editor-icons.js';
import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
import '../../../styles/shared-styles';
import '../../../styles/list-styles';
import '../../../styles/grid-layout-styles';
import '../../../styles/hact-tables-styles';
import '../../../styles/page-layout-styles';
import '../../../config/config';
import '../../../components/data-table/data-table-header';
import '../../../components/data-table/data-table-column';
import '../../../components/data-table/data-table-row';
import '../data/partners-data';
import '../../../mixins/common-general-mixin';
import '../../../mixins/pagination-mixin';
import '../mixins/edit-partner-mixin';
import { Mixins } from '../../../mixins/redux-store-mixin';

/**
 * @polymer
 * @mixinFunction
 * @appliesMixin EtoolsDashboard.Mixins.CommonGeneral
 * @appliesMixin EtoolsDashboard.Mixins.Pagination
 */
const HactDetailMixins = EtoolsMixinFactory.combineMixins([
  Mixins.CommonGeneral,
  Mixins.Pagination,
  Mixins.HactEditPartner
], PolymerElement);

/**
 * @polymer
 * @customElement
 * @appliesMixin HactDetailMixins
 */
class HactDetail extends HactDetailMixins {
  static get template() {
    return html`
    <custom-style>
      <style include="shared-styles list-styles grid-layout-styles hact-tables-styles page-layout-styles paper-material-styles">
        :host {
          /* --paper-material-padding: 0 24px 0 24px; */
          --cell-style: {
            border-left: 1px solid rgba(0, 0, 0, 0.24);
            box-sizing: border-box;
          }
        }
        
        .hact-list {
          width: 100%;
          overflow: scroll;
          padding: 0;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 5px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
          -ms-overflow-style: none;
        }

        .detail-list {
          min-width: 1800px;
          width: 100%;
          overflow-x: scroll;
          overflow-y: visible;
          -ms-overflow-style: none;
        }

        .no-overflow {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
        }

        .group {
          padding-right: 16px;
          box-sizing: border-box;
        }

        .center {
          justify-content: center;
        }

        .quarter-heading {
          display: flex;
          align-items: flex-end !important;
        }
        

        .quarter-heading-item {
          @apply --cell-style;
        }

        .quarter-item {
          @apply --cell-style;
        }

        .right-side {
          @apply --cell-style;
          text-align: center;
        }

        .left-align {
          justify-content: flex-start !important;
        }

        .border-box {
          box-sizing: border-box;
        }

        data-table-row.totals > div > div,
        data-table-row.totals div div {
          font-weight: 500;
        }

        data-table-row.totals div div div span {
          display: flex;
          align-items: center;
        }

        data-table-header {
          height: 95px;
        }

        data-table-row > div[slot="row-data"] > div > div > span,
        data-table-row > div[slot="row-data"] > div > span > span,
        data-table-header > div > data-table-column > data-table-column,
        data-table-row div[slot="row-data"] div div span,
        data-table-row div[slot="row-data"] div:not(:first-child) div,
        data-table-row div[slot="row-data"] div span span:not(:first-child),
        data-table-row div[slot="row-data"] div div span:not(:first-child) {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        data-table-row > div[slot="row-data"] > div > div > span > span:not(:first-child),
        data-table-row > div[slot="row-data"] > div > div > div > span > span:not(:first-child),
        data-table-row > div[slot="row-data"] > div > span > span:not(:first-child),
        data-table-row div[slot="row-data"] div span span:not(:first-child),
        data-table-row div[slot="row-data"] div div span:not(:first-child) {
         @apply --cell-style;
        }

        .col-75-px {
          width: 75px;
        }

        .col-555-px {
          max-width: 555px;
        }

        .col-10-px {
          min-width: 10px;
        }

        .col-40-px {
          min-width: 40px;
        }

        .col-100-px {
          min-width: 100px;
        }

        .col-215-px {
          min-width: 215px;
        }

        .col-160-px {
          min-width: 160px;
        }

        .col-460-px {
          min-width: 460px;
        }

        .col-225-px {
          min-width: 225px;
        }

        @supports (-ms-ime-align:auto) {
          :host {
            --paper-material-padding: 12px 24px 0 24px;
          }
          .quarter-heading {
            align-items: inherit !important;
          }
        }
        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
          :host {
            --paper-material-padding: 12px 24px 0 24px;
          }
          .quarter-heading {
            align-items: inherit !important;
          }
        }
      </style>
    </custom-style>

    <div class="paper-material hact-list" id="detail-list" elevation="1">
      <div id="detail-table" class="detail-list">
        <data-table-header no-collapse="">
          <data-table-column class="col-2 left-align layout-horizontal" group-heading="blank" transparent="">
            <data-table-column class="col-12 layout padding-right-10 horizontal" id="name" sortable="">
              IP Name
            </data-table-column>
          </data-table-column>
          <data-table-column class="col-215-px layout-horizontal" group-heading="blank" transparent="">
            <data-table-column class="col-75-px layout-horizontal align-center no-overflow nowrap" id="total_ct_cp">
              Risk Rating
            </data-table-column>
            <data-table-column class="col-40-px layout-horizontal align-center nowrap" id="hact_values.planned_cash_transfer">
              Flags
            </data-table-column>
            <data-table-column class="col-100-px monetary layout-horizontal align-center padding-right-10 nowrap border-box" id="total_ct_cy">
              Cash Transfers<br>1 JAN-31 DEC
            </data-table-column>
          </data-table-column>
          <data-table-column class="col-460-px nowrap" group-heading="PROGRAMMATIC VISITS">
            <data-table-column class="col-100-px layout-horizontal align-center monetary padding-right-10 horizontal right-side right">
              Cash Transfers<br>1 OCT-30 SEP
            </data-table-column>
            <data-table-column class="col-160-px layout-horizontal align-center right-side quarter-heading" id="hact_values.micro_assessment_needed">
              Planned<br>
              <div class="quarter-heading">
                <span class="col-3">Q1</span>
                <span class="col-3 quarter-heading-item">Q2</span>
                <span class="col-3 quarter-heading-item">Q3</span>
                <span class="col-3 quarter-heading-item">Q4</span>
              </div>
            </data-table-column>
            <data-table-column class="col-40-px nowrap layout-horizontal align-center right-side" id="rating">
              MR
              <paper-tooltip>Minumum Requirement</paper-tooltip>
            </data-table-column>
            <data-table-column class="col-160-px layout-horizontal align-center right-side quarter-heading">
              Completed<br>
              <div class="quarter-heading">
                <span class="col-3">Q1</span>
                <span class="col-3 quarter-heading-item">Q2</span>
                <span class="col-3 quarter-heading-item">Q3</span>
                <span class="col-3 quarter-heading-item">Q4</span>
              </div>
            </data-table-column>
          </data-table-column>
          <data-table-column class="col-555-px layout-horizontal" group-heading="SPOT CHECKS">
              <data-table-column class="col-10-px buffer"></data-table-column>
            <data-table-column class="col-100-px layout-horizontal align-center monetary right-side padding-right-10 right">
              Liquidations<br>1 OCT-30 SEP
            </data-table-column>
              <data-table-column class="col-160-px layout-horizontal align-center right-side quarter-heading">
                Planned <br>
                <div class="quarter-heading">
                  <span class="col-3">Q1</span>
                  <span class="col-3 quarter-heading-item">Q2</span>
                  <span class="col-3 quarter-heading-item">Q3</span>
                  <span class="col-3 quarter-heading-item">Q4</span>
                </div>
              </data-table-column>
                <data-table-column class="col-40-px layout-horizontal align-center right-side">
                  MR
                  <paper-tooltip>Minumum Requirement</paper-tooltip>
                </data-table-column>
                <data-table-column class="col-75-px layout-horizontal align-center right-side">
                  Follow-up<br>Required
                </data-table-column>
              <data-table-column class="col-160-px layout-horizontal align-center right-side quarter-heading">
                Completed<br>
                <div class="quarter-heading">
                  <span class="col-3">Q1</span>
                  <span class="col-3 quarter-heading-item">Q2</span>
                  <span class="col-3 quarter-heading-item">Q3</span>
                  <span class="col-3 quarter-heading-item">Q4</span>
                </div>
              </data-table-column>
            <data-table-column class="col-10-px buffer"></data-table-column>
          </data-table-column>
          <data-table-column class="col-225-px layout-horizontal" group-heading="AUDITS">
            <data-table-column class="col-75-px right-side" id="hact_values.audits_mr">
              Required
            </data-table-column>
            <data-table-column class="col-75-px right-side" id="hact_values.audits_done">
              Completed
            </data-table-column>
            <data-table-column class="col-75-px right-side monetary right">
              Outstanding<br>Findings
            </data-table-column>
          </data-table-column>
        </data-table-header>

        <!--Row of Totals-->
        <data-table-row class="totals" no-collapse="">
          <div slot="row-data">
            <div class="col-2 col-data layout-horizontal">
              <div class="col-12 horizontal layout padding-right-10">
                Total of [[totalResults]] IPs
              </div>
            </div>
            <div class="col-215-px layout-horizontal">
              <div class="col-75-px nowrap no-overflow layout-horizontal align-center"></div>
              <div class="col-40-px nowrap layout-horizontal align-center"></div>
              <div class="col-100-px monetary padding-right-10 nowrap layout-horizontal align-center">\$[[currencyFormat(totals.total_ct_ytd)]]</div>
            </div>
            <div class="col-460-px layout-horizontal">
              <div class="col-100-px nowrap monetary layout-horizontal align-center padding-right-10 right-side">\$[[currencyFormat(totals.net_ct_cy)]]</div>
              <div class="col-160-px layout-horizontal align-center right-side">
                <span class="col-3">[[totals.hact_values_programmatic_visits_planned_q1]]</span>
                <span class="col-3 right-side">[[totals.hact_values_programmatic_visits_planned_q2]]</span>
                <span class="col-3 right-side">[[totals.hact_values_programmatic_visits_planned_q3]]</span>
                <span class="col-3 right-side">[[totals.hact_values_programmatic_visits_planned_q4]]</span>
              </div>
              <div class="col-40-px nowrap layout-horizontal align-center center right-side">[[totals.hact_min_requirements_programme_visits]]</div>
              <div class="col-160-px layout-horizontal align-center right-side">
                <span class="col-3">[[totals.hact_values_programmatic_visits_completed_q1]]</span>
                <span class="col-3 right-side">[[totals.hact_values_programmatic_visits_completed_q2]]</span>
                <span class="col-3 right-side">[[totals.hact_values_programmatic_visits_completed_q3]]</span>
                <span class="col-3 right-side">[[totals.hact_values_programmatic_visits_completed_q4]]</span>
              </div>
            </div>
            <div class="col-555-px layout-horizontal">
              <div class="col-10-px buffer"></div>
              <div class="col-100-px right-side right padding-right-10 monetary layout-horizontal align-center">\$[[currencyFormat(totals.reported_cy)]]</div>
                <div class="col-160-px right-side right layout-horizontal align-center">
                  <span class="col-3">[[totals.planned_engagement_spot_check_planned_q1]]</span>
                  <span class="col-3 right-side">[[totals.planned_engagement_spot_check_planned_q2]]</span>
                  <span class="col-3 right-side">[[totals.planned_engagement_spot_check_planned_q3]]</span>
                  <span class="col-3 right-side">[[totals.planned_engagement_spot_check_planned_q4]]</span>
                </div>
                  <span class="col-40-px right-side center layout-horizontal align-center">[[totals.hact_min_requirements_spot_checks]]</span>
                  <span class="col-75-px right-side center layout-horizontal align-center">[[totals.planned_engagement_spot_check_follow_up]]</span>
                <div class="col-160-px right-side layout-horizontal align-center">
                  <span class="col-3">[[totals.hact_values_spot_checks_completed_q1]]</span>
                  <span class="col-3 right-side">[[totals.hact_values_spot_checks_completed_q2]]</span>
                  <span class="col-3 right-side">[[totals.hact_values_spot_checks_completed_q3]]</span>
                  <span class="col-3 right-side">[[totals.hact_values_spot_checks_completed_q4]]</span>
                </div>
              <div class="col-10-px buffer"></div>
            </div>
            <div class="col-225-px layout-horizontal">
              <div class="col-75-px right-side center layout-horizontal align-center">[[totals.planned_engagement_required_audit]]</div>
              <div class="col-75-px right-side center layout-horizontal align-center">[[totals.hact_values_audits_completed]]</div>
              <div class="col-75-px right-side center layout-horizontal align-center last-col">\$[[totals.hact_values_outstanding_findings]]</div>
            </div>
          </div>
        </data-table-row>

        <template is="dom-repeat" items="[[filteredPartners]]" as="partner">
          <data-table-row no-collapse="">
            <div slot="row-data">
              <div class="col-2 layout-horizontal">
                <span class="col-12 padding-right-10 col-data name padded">
                  <a href="[[baseSite]]/pmp/partners/[[partner.id]]/details" id="[[partner.id]]">
                    [[partner.name]]
                    <paper-tooltip>[[partner.name]]</paper-tooltip>
                  </a>
                </span>
              </div>
              <div class="col-215-px layout-horizontal">
                <span class="col-75-px nowrap no-overflow layout-horizontal align-center">[[partner.rating]]</span>
                <span class="col-40-px nowrap layout-horizontal align-center">
                  <div>
                    <iron-icon id="expiring" class="hact-icon" icon="icons:schedule" hidden="[[!partner.flags.expiring_assessment_flag]]"></iron-icon>
                    <paper-tooltip hidden="[[!partner.flags.expiring_assessment_flag]]">Assessment is expiring this year</paper-tooltip>
                  </div>
                  <div>
                    <iron-icon id="threshold" class="hact-icon" icon="icons:report-problem" hidden="[[!partner.flags.approaching_threshold_flag]]"></iron-icon>
                    <paper-tooltip hidden="[[!partner.flags.approaching_threshold_flag]]">Micro assessment will be required if more than \$100,000</paper-tooltip>
                  </div>
                </span>
                <span class="col-100-px monetary padding-right-10 nowrap layout-horizontal align-center">\$[[currencyFormat(partner.total_ct_ytd)]]</span>
              </div>
              <div class="col-460-px layout-horizontal">
                <span class="col-100-px nowrap monetary padding-right-10 right-side layout-horizontal align-center">\$[[currencyFormat(partner.net_ct_cy)]]</span>
                <span class="col-160-px nowrap layout-horizontal align-center right-side">
                  <span class="col-3">[[partner.hact_values.programmatic_visits.planned.q1]]</span>
                  <span class="col-3 quarter-item">[[partner.hact_values.programmatic_visits.planned.q2]]</span>
                  <span class="col-3 quarter-item">[[partner.hact_values.programmatic_visits.planned.q3]]</span>
                  <span class="col-3 quarter-item">[[partner.hact_values.programmatic_visits.planned.q4]]</span>
                </span>
                <span class="col-40-px nowrap right-side center layout-horizontal align-center">[[partner.hact_min_requirements.programme_visits]]</span>
                <span class="col-160-px right-side layout-horizontal align-center">
                  <span class="col-3">[[partner.hact_values.programmatic_visits.completed.q1]]</span>
                  <span class="col-3 quarter-item">[[partner.hact_values.programmatic_visits.completed.q2]]</span>
                  <span class="col-3 quarter-item">[[partner.hact_values.programmatic_visits.completed.q3]]</span>
                  <span class="col-3 quarter-item">[[partner.hact_values.programmatic_visits.completed.q4]]</span>
                </span>
              </div>
              <div class="col-555-px layout-horizontal"> 
                  <span class="col-10-px buffer"></span>
                <span class="col-100-px right-side padding-right-10 monetary layout-horizontal align-center">\$[[currencyFormat(partner.reported_cy)]]</span>
                  <span class="col-160-px right-side layout-horizontal align-center">
                    <span class="col-3">[[partner.planned_engagement.spot_check_planned_q1]]</span>
                    <span class="col-3 layout-horizontal align-center quarter-item">[[partner.planned_engagement.spot_check_planned_q2]]</span>
                    <span class="col-3 quarter-item">[[partner.planned_engagement.spot_check_planned_q3]]</span>
                    <span class="col-3 quarter-item">[[partner.planned_engagement.spot_check_planned_q4]]</span>
                  </span>
                  <span class="col-40-px right-side center layout-horizontal align-center">[[partner.hact_min_requirements.spot_checks]]</span>
                  <span class="col-75-px right-side center layout-horizontal align-center">[[partner.planned_engagement.spot_check_follow_up]]</span>
                <span class="col-160-px right-side layout-horizontal align-center">
                  <span class="col-3">[[partner.hact_values.spot_checks.completed.q1]]</span>
                  <span class="col-3 quarter-item">[[partner.hact_values.spot_checks.completed.q2]]</span>
                  <span class="col-3 quarter-item">[[partner.hact_values.spot_checks.completed.q3]]</span>
                  <span class="col-3 quarter-item">[[partner.hact_values.spot_checks.completed.q4]]</span>
                </span>
                <span class="col-10-px buffer"></span>
              </div>
              <div class="col-225-px layout-horizontal align-center">
                <span class="col-75-px right-side center layout-horizontal align-center">[[partner.planned_engagement.required_audit]]</span>
                <span class="col-75-px right-side center layout-horizontal align-center">[[partner.hact_values.audits.completed]]</span>
                <span class="col-75-px right-side center layout-horizontal align-center last-col">\$[[partner.hact_values.outstanding_findings]]</span>
                <iron-icon on-click="dispatchEditRequest" class="edit-icon" hidden\$="[[!canEditPartner]]" icon="editor:mode-edit"></iron-icon>
              </div>
            </div>
          </data-table-row>
        </template>
        
      </div>
    </div>
`;
  }

  static get is() { return 'hact-detail'; }

  static get properties() {
    return {
      filteredPartners: {
        type: Array,
        notify: true
      },
      totals: {
        type: Array
      }
    };
  }

  _checkForValueYesBlank(val) {
    return val ? 'Yes' : '';
  }
}

window.customElements.define(HactDetail.is, HactDetail);
