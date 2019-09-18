import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-collapse/iron-collapse.js';
import {customElement, property, observe} from '@polymer/decorators';

@customElement('data-table-row')
export class DataTableRow extends PolymerElement {
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

  @property({type: Boolean})
  detailsOpened: boolean = false;

  @property({type: Boolean})
  noCollapse: boolean;

  _toggleRowDetails() {
    // @ts-ignore
    this.$.details.toggle();
  }

  // disables collapsable content when no-collapse attribute set
  @observe('noCollapse')
  _noCollapse() {
    this.shadowRoot.getElementById('details').style.display = 'none';
    this.shadowRoot.getElementById('wrapper').style.padding = '0 24px';
    this.shadowRoot.getElementById('iconWrapper').style.display = 'none';
    // // @ts-ignore
    // this.$.details.style.display = 'none';
    // // @ts-ignore
    // this.$.wrapper.style.padding = '0 24px';
    // // @ts-ignore
    // this.$.iconWrapper.style.display = 'none';
    this.updateStyles({ ['--hover-setting']: 'background : transparent' });
  }
}
