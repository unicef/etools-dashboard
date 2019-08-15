import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';
import { property, customElement } from '@polymer/decorators'
// import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';

// const DataTableFooterMixin = EtoolsMixinFactory.combineMixins([], PolymerElement);

/**
* @polymer
* @customElement
* @extends {PolymerElement}
*/
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

  // static get is() { return 'data-table-footer'; }

  @property({type: String, notify: true})
  pageSize: string;

  @property({type: Number, notify: true})
  pageNumber: number;

  @property({type: Number})
  filteredTotalResults: number;

  @property({type: Number})
  totalPages: number;

  @property({type: Array, notify: true})
  visibleRange: string[];

  // static get properties() {
  //   return {
  //     pageSize: {
  //       type: String,
  //       notify: true
  //     },
  //     pageNumber: {
  //       type: Number,
  //       notify: true
  //     },
  //     filteredTotalResults: {
  //       type: Number
  //     },
  //     totalPages: {
  //       type: Number,
  //       computed: '_computeTotalPages(pageSize, filteredTotalResults)',
  //     },
  //     visibleRange: {
  //       type: Array,
  //       notify: true,
  //       computed: '_computeVisibleRange(pageNumber, pageSize, filteredTotalResults, totalPages)'
  //     }
  //   }
  // }

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

  // @computed('pageSize', 'filteredTotalResults')
  _computeTotalPages(pageSize, filteredTotalResults) {
    var result = 1;
    if (pageSize < filteredTotalResults) {
      result = Math.ceil(filteredTotalResults / pageSize);
    }
    return result;
  }

  // @computed('pageNumber', 'pageSize', 'filteredTotalResults', 'totalPages')
  _computeVisibleRange(pageNumber, pageSize, filteredTotalResults, totalPages) {
    var start = !filteredTotalResults ? 0 : 1;
    var end = filteredTotalResults;
    if (pageNumber !== 1) {
      start = (pageNumber - 1) * pageSize + 1;
    }
    if (pageNumber !== totalPages) {
      end = start + pageSize - 1;
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

// window.customElements.define(DataTableFooter.is, DataTableFooter)
