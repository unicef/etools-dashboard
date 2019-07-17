import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/paper-styles/element-styles/paper-material-styles';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-collapse/iron-collapse';

/**
* @polymer
* @customElement
* @extends Polymer.Element
*/
class DataTableRow extends PolymerElement {
  static get template() {
    return html`
    <style include="paper-material-styles">
      *[hidden] {
        display: none !important;
      }

      :host {
        display: block;
        border-bottom: 1px solid var(--dark-divider-color, rgba(0, 0, 0, 0.12));
      }

      :host(:hover) .paper-material {
        background-color: var(--medium-theme-background-color);
        @apply --hover-setting;
        @apply --custom-style;
      }

      .paper-material {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --custom-style;
        /* height: 48px; */
        padding-right: 24px;
        font-size: 13px;
        color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
        background-color: var(--primary-background-color, #FFFFFF);
      }

      .paper-material ::slotted(*) {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      #iconWrapper {
        height: 48px;
        line-height: 48px;
        padding: 0 24px;
        cursor: pointer;
      }

      iron-icon {
        color: var(--dark-icon-color, rgba(0, 0, 0, 0.54));
      }

      #collapse-wrapper {
        padding: 15px 24px 15px 72px;
        background-color: var(--medium-theme-background-color);
        border-top: 1px solid var(--dark-divider-color, rgba(0, 0, 0, 0.12));
      }

      *[slot="row-data-details"] {
          @apply --row-data-details;
      }
    </style>

    <div class="paper-material" id="wrapper" elevation="0">
      <div id="iconWrapper">
        <iron-icon id="more" icon="expand-more" hidden\$="[[detailsOpened]]" on-tap="_toggleRowDetails"></iron-icon>
        <iron-icon id="less" icon="expand-less" hidden\$="[[!detailsOpened]]" on-tap="_toggleRowDetails"></iron-icon>
      </div>
      <slot name="row-data"></slot>
    </div>

    <iron-collapse id="details" opened="{{detailsOpened}}">
      <div id="collapse-wrapper">
        <slot name="row-data-details"></slot>
      </div>
    </iron-collapse>
`;
  }

  static get is() { return 'data-table-row'; }

  static get properties() {
    return {
      detailsOpened: {
        type: Boolean,
        value: false
      },
      noCollapse: {
        type: Boolean,
        observer: '_noCollapse'
      }
    };
  }

  _toggleRowDetails() {
    // @ts-ignore
    this.$.details.toggle();
  }

  // disables collapsable content when no-collapse attribute set
  _noCollapse() {
    // @ts-ignore
    this.$.details.style.display = 'none';
    // @ts-ignore
    this.$.wrapper.style.padding = '0 24px';
    // @ts-ignore
    this.$.iconWrapper.style.display = 'none';
    this.updateStyles({ ['--hover-setting']: 'background : transparent' });
  }
}

window.customElements.define(DataTableRow.is, DataTableRow);
