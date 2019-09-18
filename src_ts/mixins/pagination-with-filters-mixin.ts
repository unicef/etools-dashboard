import {isEmpty} from 'ramda';
import {Constructor, GenericObject} from '../typings/globals.types';
import {PolymerElement} from '@polymer/polymer/polymer-element';
import {property} from '@polymer/decorators';

export function PaginationWithFiltersMixin<T extends Constructor<PolymerElement>>(superClass: T) {
  class PaginationWithFiltersMixinClass extends (superClass as Constructor<PolymerElement>) {

    @property({type: Number})
    pageNumber: number;

    @property({type: Number})
    pageSize: number;

    @property({type: String})
    sortOrder: string;

    @property({type: String})
    qs: string;

    @property({type: Number})
    debounceTime: number = 100;

    @property({type: Object})
    params: GenericObject;

    connectedCallback() {
      super.connectedCallback();
      // @ts-ignore
      this.addEventListener('sort-changed', this.sortOrderChanged);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      // @ts-ignore
      this.removeEventListener('sort-changed', this.sortOrderChanged);
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
  }
  return PaginationWithFiltersMixinClass;
}
