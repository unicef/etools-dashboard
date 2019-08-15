import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import { IronPagesElement } from '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-tooltip/paper-tooltip.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import { property, customElement, query, observe } from '@polymer/decorators';
import '@unicef-polymer/etools-dropdown/etools-dropdown.js';
// import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
import '@collaborne/paper-chip/dist/paper-chip.js';
import '../../../styles/shared-styles';
import '../../../styles/list-styles';
import '../../../styles/grid-layout-styles';
import '../../../components/data-table/data-table-column';
import '../../../components/data-table/data-table-header';
import '../../../components/data-table/data-table-row';
import '../../../components/data-table/data-table-footer';
import './sub-attachments';
import { isEmpty, uniq, sortWith, ascend, prop, descend } from 'ramda';

// const AttachmentsGroupedMixin = EtoolsMixinFactory.combineMixins([], PolymerElement);

/**
 * `attachments-grouped` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 */
@customElement('attachments-grouped')
export class AttachmentsGrouped extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles grid-layout-styles page-layout-styles paper-material-styles list-styles">
        :host {
          --col: {
            @apply --layout-horizontal;
            box-sizing: border-box;
          };
          --col-2: {
            flex: 0 0 16.66666667%;
            max-width: 16.66666667%;
          };
          --col-3: {
            flex: 0 0 25%;
            max-width: 25%;
          };
          --col-4: {
            flex: 0 0 33.3333333%;
            max-width: 33.3333333%;
          };
          --col-5: {
            flex: 0 0 41.66666667%;
            max-width: 41.66666667%;
          };
          --col-10: {
            flex: 0 0 83.333333%;
            max-width: 0 0 83.333333%;
          }
          --col-20: {
            flex: 0 0 20%;
            max-width: 20%;
          };
          --col-30: {
            flex: 0 0 30%;
            max-width: 30%;
          };
          --col-40: {
            flex: 0 0 40%;
            max-width: 40%;
          };
        }
        
        /* Grouped Columns */
        .doctype-group {
          @apply --col;
          @apply --col-2;
        }

        .doctype-group-alt {
          @apply --col;
          @apply --col-20;
        }

        .file-download-group {
          @apply --col;
          @apply --col-5;
          overflow: hidden;
          white-space: nowrap;
        }

        .file-download-group-alt {
          @apply --col;
          @apply --col-40;
        }

        .col-4 {
          @apply --col;
          @apply --col-4;
        }

        .date-uploaded-group {
          @apply --col;
          @apply --col-2;
          padding-left: 10px;
        }

        .date-uploaded-group-alt {
          @apply --col;
          @apply --col-20;
        }

        .source-group {
          @apply --col;
          @apply --col-3;
          padding-left: 10px;
        }

        .source-group-alt {
          @apply --col;
          @apply --col-30;
        }

        .related-group {
          @apply --col;
          @apply --col-2;
        }

        .big-group {
          @apply --col;
          @apply --col-10;
        }
        /* Grouped Columns End */

        .second-header {
          padding-left: 24px;
        }

        paper-chip {
          margin-left: 7px;
          font-weight: 500;
          --paper-chip-background: rgb(243, 238, 233);
          --paper-chip-color: --primary-text-color;
        }

        paper-chip.selected {
          --paper-chip-background: #0099FF;
          --paper-chip-color: #FFFFFF;
          font-weight: 500;
        }

        etools-dropdown {
          width: 50%;
        }

        div.paper-material.list {
          padding: 0;
        }

        data-table-header {
          --primary-background-color: rgb(243, 238, 233);
          --paper-material-padding: 0 24px;
        }
        
        #superHeader {
          padding: 11px 24px;
          font-size: 20px;
        }

        .layout-horizontal {
          padding: 0 24px;
        }

        .pd-group {
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--dark-divider-color, rgba(0, 0, 0, 0.12));
        }

        #down {
          width: 16px;
          height: 16px;
        }

        .no-overflow {
          overflow: hidden;
        }

        .padding-left {
          padding-left: 10px;
        }
      </style>

      <div class="paper-material list-panel listControls" elevation="1">
        <etools-dropdown label="Partner - Vendor No." options="[[orderedResults]]" selected="{{selectedIndex}}" selected-item="{{selectedPartner}}">
        <etools-dropdown>
      </etools-dropdown></etools-dropdown></div>
      <div class="paper-material list" elevation="1">
        <div id="superHeader">Select a partner to see related documents.</div>

        <iron-pages id="docSelector" attr-for-selected="name" fallback-selection="assessments">

          <div name="assessments">
            <data-table-header no-collapse="">
              <data-table-column class="doctype-group">
                Document Type
              </data-table-column>
              <data-table-column class="file-download-group">
                File Download
              </data-table-column>
              <data-table-column class="date-uploaded-group">
                Date Uploaded
                <iron-icon id="down" icon="arrow-downward"></iron-icon>
              </data-table-column>
              <data-table-column class="source-group">
                Source
              </data-table-column>
            </data-table-header>

            <template is="dom-if" if="[[!assessmentsAudits.length]]">
              <div class="paper-material">No results to show.</div>
            </template>
            <template is="dom-repeat" items="[[assessmentsAudits]]">
              <data-table-row no-collapse="">
                <div slot="row-data">
                  <data-table-column class="doctype-group">
                    [[item.file_type]]
                  </data-table-column>
                  <data-table-column class="file-download-group no-overflow">
                    <a href\$="[[item.file_link]]" target="_blank" class="col-data">[[item.filename]]</a>
                    <paper-tooltip>[[item.filename]]</paper-tooltip>
                  </data-table-column>
                  <data-table-column class="date-uploaded-group">
                    [[item.created]]
                  </data-table-column>
                  <data-table-column class="source-group">
                    [[item.source]]
                  </data-table-column>
                </div>
              </data-table-row>
            </template>
          </div>

          <div name="pdssfa">
            <data-table-header no-collapse="">
              <data-table-column class="related-group">
                Related To
              </data-table-column>
              <div class="second-header layout-horizontal big-group">
                <data-table-column class="doctype-group-alt">
                  Document Type
                </data-table-column>
                <data-table-column class="file-download-group-alt">
                  File Download
                </data-table-column>
                <data-table-column class="date-uploaded-group-alt padding-left">
                  Date Uploaded
                  <iron-icon id="down" icon="arrow-downward"></iron-icon>
                </data-table-column>
                <data-table-column class="source-group-alt">
                  Source
                </data-table-column>
              </div>
            </data-table-header>

            <template is="dom-if" if="[[!selectedPDSSFA.length]]">
              <div class="paper-material">No results to show.</div>
            </template>
            <template is="dom-repeat" items="[[selectedPDSSFA]]">
              <div class="layout-horizontal pd-group">
                <data-table-column class="related-group">
                  [[item.pdssfa]]
                </data-table-column>
                <div class="big-group">
                  <sub-attachments related-to="[[item.files]]">
                  </sub-attachments>
                </div>
              </div>
            </template>
          </div>

          <div name="otherFilesChip">
            <data-table-header no-collapse="">
              <data-table-column class="related-group">
                PD/SSFA Number
              </data-table-column>
              <data-table-column class="related-group">
                Document Type
              </data-table-column>
              <data-table-column class="col-4">
                File Download
              </data-table-column>
              <data-table-column class="related-group padding-left">
                Date Uploaded
                <iron-icon id="down" icon="arrow-downward"></iron-icon>
              </data-table-column>
              <data-table-column class="related-group">
                Source
              </data-table-column>
            </data-table-header>

            <template is="dom-repeat" items="[[otherFiles]]">
              <data-table-row no-collapse="">
                <div slot="row-data">
                  <data-table-column class="related-group">
                    [[item.pd_ssfa_number]]
                  </data-table-column>
                  <data-table-column class="related-group">
                    [[item.file_type]]
                  </data-table-column>
                  <data-table-column class="col-4 no-overflow">
                    <a href\$="[[item.file_link]]" target="_blank" class="col-data">[[item.filename]]</a>
                    <paper-tooltip>[[item.filename]]</paper-tooltip>
                  </data-table-column>
                  <data-table-column class="related-group padding-left">
                    [[item.created]]
                  </data-table-column>
                  <data-table-column class="related-group">
                    [[item.source]]
                  </data-table-column>
                </div>
              </data-table-row>
            </template>
          </div>

        </iron-pages>
      </div>
    `;
  }

  // static get is() {
  //   return 'attachments-grouped';
  // }

  @property({type: Array})
  orderedResults: object[];

  @property({type: Object})
  selectedPartner: any;

  @property({type: String})
  groupView: string = 'Assessments & Audits';

  @property({type: Array})
  assessmentsAudits: string[];
  
  @property({type: Array})
  pDSSFA: object[];

  @property({type: Array})
  selectedPDSSFA: object[]

  @property({type: Array, notify: true})
  otherFiles: string[] = [];

  @query('docSelector')
  docSelector: IronPagesElement;

  // static get properties() {
  //   return {
  //     orderedResults: {
  //       type: Array
  //     },
  //     selectedPartner: {
  //       type: Object
  //     },
  //     groupView: {
  //       type: String,
  //       value: 'Assessments & Audits'
  //     },
  //     assessmentsAudits: {
  //       type: Array
  //     },
  //     pDSSFA: {
  //       type: Array
  //     },
  //     selectedPDSSFA: {
  //       type: Array
  //     },
  //     otherFiles: {
  //       type: Array,
  //       value: [],
  //       notify: true
  //     }
  //   };
  // }

  // private _reorganizeData(selectedPartner: object)
  
  // static get observers() {
  //   return [
  //     '_reorganizeData(selectedPartner)',
  //     '_appendChips(pDSSFA)'
  //   ]
  // }
  
  @observe('selectedPartner')
  _reorganizeData() {
    if (!this.selectedPartner) {
      return;
    }
    // separate assessments/audits from files with agreement_reference_number and from those without
    let assessmentsAudits = [];
    let pDFiles = [];
    let otherFiles = [];
    this.selectedPartner.files.forEach(file => {
      if (file.file_type.indexOf('Assessment') > -1 || file.file_type.indexOf('Audit') > -1) {
        assessmentsAudits.push(file);
      } else if (isEmpty(file.agreement_reference_number)) {
        otherFiles.push(file);
      } else {
        pDFiles.push(file);
      }
    })
    this.set('otherFiles', otherFiles);
    this.set('assessmentsAudits', assessmentsAudits);

    // get unique agreement_reference_numbers
    let aRNKeys = uniq(pDFiles.map(file => file.agreement_reference_number));
    // create nested group object for each agreement_reference_number
    let nestedGroups = aRNKeys.map(k => {
      pDFiles = sortWith([
        ascend(prop('agreement_reference_number')),
        // @ts-ignore
        descend(prop('created'))
      ])(pDFiles)
      let obj: any = {};
      let obj2: any = {};
      let relevantFiles = pDFiles.filter(file => file.agreement_reference_number === k);
      let pdssfaKeys = uniq(relevantFiles.map(file => file.pd_ssfa_number));
      obj["agreementReference"] = k;
      obj["pdssfas"] = [];
      pdssfaKeys.forEach(r => {
        obj2 = {};
        obj2["pdssfa"] = r;
        obj2["files"] = relevantFiles.filter(file => file.pd_ssfa_number === r);
        obj["pdssfas"].push(obj2);
      })
      return obj;
    })
    this.set('pDSSFA', nestedGroups);
  }

  _appendAssessmentChip() {
    this.docSelector.selected = "assessments";
    let header = this.$.superHeader;
    // create a paper-chip for assessments and audits
    let assessments = document.createElement('paper-chip');
    assessments.className = 'selected';
    assessments.innerText = 'Assessments & Audits';
    // @ts-ignore
    assessments.selectable = true;
    assessments.addEventListener('tap', () => {
      for(let i = 0; i < header.children.length; i++) {
        header.children[i].classList.remove('selected')
      };
      assessments.className = 'selected';
      if (this.docSelector.selected != "assessments") {
        this.docSelector.selected = "assessments"
      };
    });
    header.innerHTML = "";
    header.appendChild(assessments);
  }

  _createPDChips() {
    let header = this.$.superHeader;
    // create a paper-chip for each agreement_reference_number
    this.pDSSFA.forEach((pd: any) => {
      let pdChip = document.createElement('paper-chip');
      pdChip.innerText = pd.agreementReference;
      // @ts-ignore
      pdChip.selectable = true;
      pdChip.addEventListener('tap', () => {
        for(let i = 0; i < header.children.length; i++) {
          header.children[i].classList.remove('selected')
        };
        pdChip.className = 'selected';
        this.set('selectedPDSSFA', pd.pdssfas);
        if (this.docSelector.selected != "pdssfa") {
          this.docSelector.selected = "pdssfa"
        };
      });
      header.appendChild(pdChip);
    })
  }

  _handleOtherFiles() {
    let header = this.$.superHeader;
    if (!this.otherFiles.length) {
      return;
    }
    let otherFilesChip = document.createElement('paper-chip');
    otherFilesChip.innerText = 'Other Documents';
    // @ts-ignore
    otherFilesChip.selectable = true;
    otherFilesChip.addEventListener('tap', () => {
      for(let i = 0; i < header.children.length; i++) {
        header.children[i].classList.remove('selected');
      } 
      otherFilesChip.className = 'selected';
      if (this.docSelector.selected != "otherFilesChip") {
        this.docSelector.selected = "otherFilesChip";
      }
    });
    header.appendChild(otherFilesChip);
  }

  @observe('pDSSFA')
  _appendChips() {
   this._appendAssessmentChip();
   this._createPDChips();
   this._handleOtherFiles();
  }
}

// window.customElements.define(AttachmentsGrouped.is, AttachmentsGrouped);
