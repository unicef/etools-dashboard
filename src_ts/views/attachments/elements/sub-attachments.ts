import { PolymerElement } from '@polymer/polymer/polymer-element';
import '../../../components/data-table/data-table-column';
import '../../../components/data-table/data-table-header';
import '../../../components/data-table/data-table-row';
import '@polymer/paper-tooltip/paper-tooltip';
import '../../../styles/shared-styles';
import '../../../styles/list-styles';
import '../../../styles/grid-layout-styles';
import { html } from '@polymer/polymer/lib/utils/html-tag';
class SubAttachments extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles grid-layout-styles page-layout-styles list-styles">
      :host {
        --col: {
          @apply --layout-horizontal;
          box-sizing: border-box;
        };
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
      .col-20 {
        @apply --col;
        @apply --col-20;
      }

      .col-40 {
        @apply --col;
        @apply --col-40;
        overflow: hidden;
      }

      .col-30 {
        @apply --col;
        @apply --col-30;
      }
      /* Grouped Columns End */

      .padding-left {
        padding-left: 10px;
      }

      data-table-row {
        border-left: 1px solid var(--dark-divider-color, rgba(0, 0, 0, 0.12));
      }
    </style>

    <template is="dom-repeat" items="[[relatedTo]]">
      <data-table-row no-collapse="">
        <div slot="row-data">
          <data-table-column class="col-20">
            [[item.file_type]]
          </data-table-column>
          <data-table-column class="col-40">
            <a href\$="[[item.file_link]]" target="_blank" class="col-data">[[item.filename]]
            </a>
            <paper-tooltip>[[item.filename]]</paper-tooltip>
          </data-table-column>
          <data-table-column class="col-20 padding-left">
            [[item.created]]
          </data-table-column>
          <data-table-column class="col-30">
            [[item.source]]
          </data-table-column>
        </div>
      </data-table-row>
    </template>
`;
  }

  static get is() {
    return 'sub-attachments'
  }

  static get properties() {
    return {
      relatedTo: {
        type: Array
      }
    }
  }
}

window.customElements.define(SubAttachments.is, SubAttachments);
