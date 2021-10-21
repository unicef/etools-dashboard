import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {customElement, observe, property} from '@polymer/decorators/lib/decorators';
import {IronCollapseElement} from '@polymer/iron-collapse/iron-collapse';
import '@polymer/iron-icons';

@customElement('data-table-row')
export class DataTableRow extends PolymerElement {
  @property({type: Boolean})
  detailsOpened = false;

  @property({type: Boolean})
  noCollapse;

  static get template(): HTMLTemplateElement {
    return html`
    <style>
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
        <iron-icon id="more" icon="expand-more" hidden$="[[detailsOpened]]" on-tap="_toggleRowDetails"></iron-icon>
        <iron-icon id="less" icon="expand-less" hidden$="[[!detailsOpened]]" on-tap="_toggleRowDetails"></iron-icon>
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

  _toggleRowDetails() {
    (this.$.details as IronCollapseElement).toggle();
  }

  // disables collapsable content when no-collapse attribute set
  @observe('noCollapse')
  _noCollapse() {
    (this.$.details as HTMLElement).style.display = 'none';
    (this.$.wrapper as HTMLElement).style.padding = '0 24px';
    (this.$.iconWrapper as HTMLElement).style.display = 'none';
    this.updateStyles({['--hover-setting']: 'background : transparent'});
  }
}
