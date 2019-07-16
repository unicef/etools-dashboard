import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-styles/element-styles/paper-material-styles';
import {LegacyElementMixin} from '@polymer/polymer/lib/legacy/legacy-element-mixin';

/**
* @polymer
* @customElement
* @extends PolymerElement
*/
class DataTableHeader extends LegacyElementMixin(PolymerElement) {
  static get template() {
    return html`
      <custom-style>
        <style include="iron-flex iron-flex-factors paper-material-styles">

          :host {
            display: block;
            border-bottom: 1px solid var(--dark-divider-color, rgba(0, 0, 0, 0.12));
          }

          .paper-material {
            padding: var(--paper-material-padding, 20px 24px 0 24px);
            background-color: var(--primary-background-color, #FFFFFF);
            @apply --data-table-header;
          }

          #title {
            width: 100%;
            line-height: 64px;
            font-size: 20px;
            color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
            @apply --header-title;
          }

          #columns {
            @apply --layout-horizontal;
            @apply --layout-center;
            /* margin-left: 48px; */
            /* height: 56px; */
            @apply --header-columns;
            @apply --header-height;
          }

          #columns.end {
            @apply --layout-end;
          }
        </style>
      </custom-style>

      <div class="paper-material" elevation="0">
        <div id="title">
          <span>[[label]]</span>
        </div>

        <div id="columns">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get is() { return 'data-table-header' }

  static get properties() {
    return {
      sortOrder: {
        type: Object,
        observer: '_sortOrderChanged',
      },
      _lastSelectedCol: {
        type: Object,
      },
      noTitle: {
        type: Boolean,
        observer: '_noTitle',
      },
      noCollapse: {
        type: Boolean,
        observer: '_noCollapse'
      },
    }
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();
    this.addEventListener('sort-changed', this._handleSortChanged);
  }

  connectedCallback() {
    super.connectedCallback();
    //detect if any column is a group of columns with heading
    Array.prototype.slice.call(this.children).map(col => {
      if (col.attributes.getNamedItem('group-heading')) {
        this._noHeight();
        this.$.columns.classList.add('end');
      }
    });
  }

  _handleSortChanged(e) {
    var column = e.target;
    this._clearSelected(column);
    this.set('sortOrder.field', e.detail.field);
    this.set('sortOrder.direction', e.detail.field);
  }

  _sortOrderChanged(sortOrder) {
    var column = this.queryEffectiveChildren('*[field="' + sortOrder.field + '"]');
    this._clearSelected(column);
    column.selected = true;
    column.direction = sortOrder.direction;
  }

  _clearSelected(column) {
    if (this._lastSelectedCol && this._lastSelectedCol !== column) {
      this._lastSelectedCol.set('selected', null);
    }
    this._lastSelectedCol = column;
  }

  _noTitle() {
    this.updateStyles({
      '--data-table-header': 'height: auto',
      '--header-title': 'display: none'
    });
  }

  _noCollapse() {
    this.updateStyles({['--header-columns']: 'margin-left : 0; flex: 1'});
  }

  _noHeight() {
    this.updateStyles({['--header-height']: 'height: auto'});
    this.updateStyles({['--data-table-header']: 'height: auto'});
  }
}

window.customElements.define(DataTableHeader.is, DataTableHeader)
