import {html, PolymerElement} from '@polymer/polymer/polymer-element';
import {customElement, observe, property} from '@polymer/decorators/lib/decorators';
import {DataTableColumn} from './data-table-column';

@customElement('data-table-header')
export class DataTableHeader extends PolymerElement {
  @property({type: Boolean})
  noCollapse;

  @property({type: Boolean})
  noTitle;

  @property({type: Object})
  sortOrder;

  @property({type: Object})
  _lastSelectedCol;

  static get template(): HTMLTemplateElement {
    return html`
      <style>

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

  ready() {
    super.ready();
    this.addEventListener('sort-changed', this._handleSortChanged);
  }

  connectedCallback() {
    super.connectedCallback();
    // detect if any column is a group of columns with heading
    Array.prototype.slice.call(this.children).map((col) => {
      if (col.attributes.getNamedItem('group-heading')) {
        this._noHeight();
        this.$.columns.classList.add('end');
      }
    });
  }

  _handleSortChanged(e) {
    const column = e.target;
    this._clearSelected(column);
    const oldOrder = this.sortOrder || {};
    this.sortOrder = {
      ...oldOrder,
      field: e.detail.field,
      direction: e.detail.direction
    };
  }

  @observe('sortOrder')
  _sortOrderChanged(sortOrder) {
    const column: DataTableColumn = this.querySelector(`[field="${sortOrder.field}"]`);
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

  @observe('noTitle')
  _noTitle() {
    this.updateStyles({
      '--data-table-header': 'height: auto',
      '--header-title': 'display: none'
    });
  }

  @observe('noCollapse')
  _noCollapse() {
    this.updateStyles({['--header-columns']: 'margin-left : 0; flex: 1'});
  }

  _noHeight() {
    this.updateStyles({['--header-height']: 'height: auto'});
    this.updateStyles({['--data-table-header']: 'height: auto'});
  }
}
