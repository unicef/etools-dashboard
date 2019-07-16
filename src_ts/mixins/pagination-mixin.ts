/* <link rel="import" href="../../bower_components/polymer/polymer.html"> */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import { Mixins as Mixins$0 } from './redux-store-mixin';

export const Mixins = Mixins$0 || {};

/**
 * @polymer
 * @mixinFunction
 */
Mixins$0.Pagination = (superClass) => class extends superClass {
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
      queryString: {
        type: String,
        notify: true,
        observer: 'qChanged'
      }
    };
  }

  static get observers() {
    return [
      'init(active)'
    ];
  }

  ready() {
    this.addEventListener('sort-changed', this.sortOrderChanged);
    super.ready();
  }

  init(active) {
    var params = this.queryParams;
    if (!active || !params) {
      return;
    }
    this.set('initComplete', false);
    this.set('queryString', params.q ? params.q : '');
    this.set('pageSize', params.size ? parseInt(params.size) : 10);
    this.set('pageNumber', params.page ? parseInt(params.page) : 1);
    this.set('sortOrder', params.sort ? params.sort : 'asc');
    this.set('initComplete', true);
  }

  buildQueryString() {
    var qs = [];
    if (this.pageNumber > 1) {
      qs.push('page=' + this.pageNumber);
    }
    if (this.pageSize) {
      qs.push('size=' + this.pageSize);
    }
    if (this.queryString) {
      qs.push('q=' + this.queryString);
    }
    if (this.sortOrder) {
      qs.push('sort=' + this.sortOrder);
    }
    return qs.join('&');
  }


  qChanged() {
    this.set('debounceTime', 300);
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

  sortOrderChanged(e) {
    this.set('debounceTime', 150);
    this.set('sortOrder', e.detail.direction);
  }

  setQuery() {
    this.set('queryString', this.$.query.value);
  }
};
