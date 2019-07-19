import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@unicef-polymer/etools-dialog/etools-dialog.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@unicef-polymer/etools-dropdown/etools-dropdown-multi.js';
import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
import '../data/partner-item-data';
import '../../../mixins/event-helper-mixin';
import '../../../styles/grid-layout-styles';
import { Mixins } from '../../../mixins/redux-store-mixin';
import { compose, pick, merge, clone, map, prop, filter, contains } from 'ramda';
/**
 * `hact-edit-dialog` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */

const EtoolsHactEditBaseMixin = EtoolsMixinFactory.combineMixins([
  Mixins.EventHelper,
  Mixins.PartnerItemData
], PolymerElement);

class HactEditDialog extends EtoolsHactEditBaseMixin {
  static get template() {
    return html`
    <style include="grid-layout-styles">
      :host {
        display: block;
        --paper-input-container-label: {
          font-size: 12px;
          text-align: center;
        }
        ;
        --paper-input-container-input-webkit-spinner: {
          -webkit-appearance: none;
          margin: 0;
        }
        ;
      }
  
      .heading {
        border-bottom: var(--header-bottom-line, 1px solid rgba(0, 0, 0, 0.12));
        padding-bottom: 10px;
        padding-top: 10px;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        color: var(--secondary-text-color);
        font-weight: 500;
      }
  
      .partner-name {
        height: 48px;
        line-height: 48px;
        text-transform: uppercase;
        font-size: 20px;
        color: var(--primary-color);
      }
  
      paper-input {
        max-width: 32px;
        text-align: center;
      }
    </style>
    <etools-dialog id="editPartnersDialog" size="lg" dialog-title="Edit HACT Assurance Plan" ok-btn-text="Save" keep-dialog-open="" spinner-text="Saving..." on-confirm-btn-clicked="_saveChanges">
      <div class="layout-vertical">
        <div class="layout-horizontal">
          <div class="partner-name">
            [[partner.name]]
          </div>
        </div>
  
        <div class="layout-horizontal space-between">
  
          <template is="dom-if" if="{{isGovPartner}}">
            <div class="layout-vertical col-3">
              <div class="heading">Planned Programmatic Visits</div>
              <div class="layout-horizontal space-around">
                <paper-input type="number" value="{{editableValues.planned_visits.programmatic_q1}}" label="Q1"></paper-input>
                <paper-input value="{{editableValues.planned_visits.programmatic_q2}}" type="number" label="Q2"></paper-input>
                <paper-input value="{{editableValues.planned_visits.programmatic_q3}}" type="number" label="Q3"></paper-input>
                <paper-input type="number" value="{{editableValues.planned_visits.programmatic_q4}}" label="Q4"></paper-input>
              </div>
            </div>
          </template>

          <div class="layout-vertical col-2">
            <div class="heading">Follow-up Spot Checks</div>
            <div class="layout-horizontal space-around">
              <paper-input value="{{editableValues.planned_engagement.spot_check_follow_up}}" type="number"></paper-input>
            </div>  
          </div>
  
          <div class="layout-vertical col-3">
            <div class="heading">Planned Spot Checks</div>
            <div class="layout-horizontal space-around">
              <paper-input type="number" value="{{editableValues.planned_engagement.spot_check_planned_q1}}" label="Q1"></paper-input>
              <paper-input type="number" value="{{editableValues.planned_engagement.spot_check_planned_q2}}" label="Q2"></paper-input>
              <paper-input type="number" value="{{editableValues.planned_engagement.spot_check_planned_q3}}" label="Q3"></paper-input>
              <paper-input type="number" value="{{editableValues.planned_engagement.spot_check_planned_q4}}" label="Q4"></paper-input>
            </div>
          </div>
  
          <div class="layout-veritcal col-4">
            <div class="heading">Required Audits</div>
            <etools-dropdown-multi placeholder="—" selected-values="{{selectedAudits}}" options="[[auditOptions]]" trigger-value-change-event="" on-etools-selected-items-changed="_auditsChanged">
            </etools-dropdown-multi>
          </div>
  
        </div>
  
      </div>
  
    </etools-dialog>
`;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return 'hact-edit-dialog';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      partner: {
        type: Object,
        observer: '_partnerChanged'
      },
      isGovPartner: {
        type: Boolean,
      },
      // Spot Checks and Audits changes get put here for PATCH request
      editableValues: {
        type: Object
      },
      // Programmatic Visits changes here due to different endpoint for PATCH
      selectedAudits: {
        type: Array
      },
      auditOptions: {
        type: Array,
        value: [
          {
            label: 'Scheduled Audit',
            value: 'Scheduled Audit'
          }, {
            label: 'Special Audit',
            value: 'Special Audit'
          }
        ]
      },
      auditMap: {
        type: Array,
        value: [
          {
            label: 'Special Audit',
            prop: 'special_audit'
          },
          {
            label: 'Scheduled Audit',
            prop: 'scheduled_audit'
          }
        ]
      }
    };
  }

  ready() {
    super.ready();
  }

  openDialog() {
    this.$.editPartnersDialog.opened = true;
    this.set('isGovPartner', this.partner.partner_type_slug === "Gov")
  }

  _partnerChanged(partner) {
    if (!partner) {
      return;
    }
    const planned = clone(partner.hact_values.programmatic_visits.planned);
    const planned_visits = {
      'programmatic_q1': planned.q1,
      'programmatic_q2': planned.q2,
      'programmatic_q3': planned.q3,
      'programmatic_q4': planned.q4
    };
    const editableValues = this.isGovPartner ? 
                           merge(
                             clone(pick(['planned_engagement'], partner)),
                             { planned_visits }
                           ) :
                           clone(pick(['planned_engagement'], partner));

    const hasAudit = (auditType) => partner.planned_engagement[auditType.prop];
    const selectedAudits = compose(map(prop('label')), filter(hasAudit))(this.auditMap);
    this.setProperties({ editableValues, selectedAudits });
  }

  _auditsChanged() {
    this.auditMap.map((audit)=>
      this.set(`editableValues.planned_engagement.${audit.prop}`, contains(audit.label, this.selectedAudits))
    );
  }

  _saveChanges() {
    this.$.editPartnersDialog.startSpinner();
    this.savePartnerDetails(this.editableValues, this.partner.id, this._handleSaveResponse.bind(this));
  }

  _handleSaveResponse() {
    this.$.editPartnersDialog.stopSpinner();
    this.fireEvent('notify-list-change');
    this._closeDialog();
  }

  _closeDialog() {
    this.setProperties({ editableValues: null, selectedAudits: null, partner: null });
    this.$.editPartnersDialog.opened = false;
  }
}


window.customElements.define(HactEditDialog.is, HactEditDialog);
