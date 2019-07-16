/* <link rel="import" href="../../bower_components/polymer/polymer.html"> */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { isEmpty } from '../scripts/ramda-utils';
import { Mixins as Mixins$0 } from './redux-store-mixin';
export const Mixins = Mixins$0 || {};

/**
* @polymer
* @mixinFunction
*/
Mixins$0.PaginationWithFilters = (superClass) => class extends superClass {
  constructor() {
    super();
  }


  static get properties() {
    return {
      pageNumber: {
        type: Number
      },
      pageSize: {
        type: Number
      },
      sortOrder: {
        type: String
      },
      qs: {
        type: String
      },
      debounceTime: {
        type: Number,
        value: 100
      }
    };
  }

  ready() {
    this.addEventListener('sort-changed', this.sortOrderChanged);
    super.ready();
  }

  filterChanged() {
    this.set('debounceTime', 200);
    this.set('pageNumber', 1);
  }

  pageSizeChanged(e) {
    this.set('debounceTime', 200);
    this.set('pageNumber', 1);
    this.set('pageSize', parseInt(e.detail.value));
  }

  pageNumberChanged(e) {
    this.set('debounceTime', 50);
    this.set('pageNumber', e.detail.value);
  }

  dateChanged() {
    this.set('pageNumber', 1);
  }

  sortOrderChanged({ detail: { direction, field } }) {
    this.set('debounceTime', 150);
    this.set('sortOrder', direction);
    if (field) {
      this.set('orderBy', field);
    }
  }

  buildQueryString(hasPagination=true) {
    return this.params.reduce((acc, { qName, propName, xf }) => {
      return isEmpty(this[propName]) ? acc
        : `${acc}&${qName}=${xf(this[propName])}`;
    }, hasPagination ? `page=${this.pageNumber}&size=${this.pageSize}` : '');
  }
};
