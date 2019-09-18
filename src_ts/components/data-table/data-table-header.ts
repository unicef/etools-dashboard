import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import {LegacyElementMixin} from '@polymer/polymer/lib/legacy/legacy-element-mixin.js';
import {property, observe, customElement} from '@polymer/decorators';
import {GenericObject} from '../../typings/globals.types';

@customElement('data-table-header')
export class DataTableHeader extends LegacyElementMixin(PolymerElement) {
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

  @property({type: Object})
  sortOrder: object;

  @property({type: Object})
  _lastSelectedCol: GenericObject;

  @property({type: Object})
  noTitle: Boolean;

  @property({type: Object})
  noCollapse: Boolean;

  ready() {
    super.ready();
    this.addEventListener('sort-changed', this._handleSortChanged);
  }

  connectedCallback() {
    super.connectedCallback();
    // detect if any column is a group of columns with heading
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

  @observe('sortOrder')
  _sortOrderChanged(sortOrder) {
    var column: GenericObject = this.queryEffectiveChildren('*[field="' + sortOrder.field + '"]');
    this._clearSelected(column);
    column.selected = true;
    column.direction = sortOrder.direction;
  }

  _clearSelected(column) {
    if (this._lastSelectedCol && this._lastSelectedCol !== column) {
      this._lastSelectedCol.set('selected', null);
    }
    this.set('_lastSelectedCol', column);
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
