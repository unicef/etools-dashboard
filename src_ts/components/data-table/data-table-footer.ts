import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import {property, customElement, computed} from '@polymer/decorators';

@customElement('data-table-footer')
export class DataTableFooter extends PolymerElement {
  static get template() {
    return html`
      <style include="paper-material-styles">
        :host {
          display: block;
          font-size: 12px;
          color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
        }

        #table-footer {
          @apply --layout-horizontal;
          @apply --layout-center;
          @apply --layout-end-justified;

          padding: 0 14px;
          height: 56px;
          background-color: var(--primary-background-color, #FFFFFF);
        }

        #rows {
          margin-right: 24px;
        }

        #range {
          margin: 0 32px;
        }

        paper-dropdown-menu {
          width: 40px;
          bottom: 9px;

          --paper-input-container-input: {
            font-size: 12px;
            color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
          };

          --paper-input-container-underline: {
            display: none;
          };
        }
      </style>

      <div id="table-footer" class="paper-material" elevation="1">
        <span id="rows">Rows per page:</span>

        <paper-dropdown-menu horizontal-align="left" noink="">
          <paper-listbox slot="dropdown-content" attr-for-selected="name" selected="{{pageSize}}">
            <paper-item name="5">5</paper-item>
            <paper-item name="10">10</paper-item>
            <paper-item name="25">25</paper-item>
            <paper-item name="50">50</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <span id="range">[[visibleRange.0]]-[[visibleRange.1]] of [[filteredTotalResults]]</span>

        <paper-icon-button icon="first-page" on-tap="_firstPage" disabled\$="[[_pageBackDisabled(pageNumber)]]"></paper-icon-button>

        <paper-icon-button icon="chevron-left" on-tap="_pageLeft" disabled\$="[[_pageBackDisabled(pageNumber)]]"></paper-icon-button>

        <paper-icon-button icon="chevron-right" on-tap="_pageRight" disabled\$="[[_pageForwardDisabled(pageNumber, totalPages)]]"></paper-icon-button>

        <paper-icon-button icon="last-page" on-tap="_lastPage" disabled\$="[[_pageForwardDisabled(pageNumber, totalPages)]]"></paper-icon-button>

      </div>
    `;
  }

  @property({type: Number, notify: true})
  pageSize: number;

  @property({type: Number, notify: true})
  pageNumber: number;

  @property({type: Number})
  filteredTotalResults: number;

  @property({type: Number})
  totalPages: number;

  @property({type: Array, notify: true})
  visibleRange: string[];

  _pageLeft() {
    if (this.pageNumber > 1) {
      this.set('pageNumber', this.pageNumber - 1);
    }
  }

  _pageRight() {
    if (this.pageNumber < this.totalPages) {
      this.set('pageNumber', this.pageNumber + 1);
    }
  }

  _firstPage() {
    if (this.pageNumber > 1) {
      this.set('pageNumber', 1);
    }
  }

  _lastPage() {
    if (this.pageNumber < this.totalPages) {
      this.set('pageNumber', this.totalPages);
    }
  }

  @computed('pageSize', 'filteredTotalResults')
  get _computeTotalPages() {
    var result = 1;
    if (this.pageSize < this.filteredTotalResults) {
      result = Math.ceil(this.filteredTotalResults / this.pageSize);
    }
    return result;
  }

  @computed('pageNumber', 'pageSize', 'filteredTotalResults', 'totalPages')
  get _computeVisibleRange() {
    var start = !this.filteredTotalResults ? 0 : 1;
    var end = this.filteredTotalResults;
    if (this.pageNumber !== 1) {
      start = (this.pageNumber - 1) * this.pageSize + 1;
    }
    if (this.pageNumber !== this.totalPages) {
      end = start + this.pageSize - 1;
    }
    return [start, end];
  }

  _pageBackDisabled(pageNumber) {
    return pageNumber === 1;
  }

  _pageForwardDisabled(pageNumber, totalPages) {
    return pageNumber === totalPages;
  }
}

