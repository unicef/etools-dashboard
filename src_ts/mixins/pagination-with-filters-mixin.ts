import {property} from '@polymer/decorators';
import {PolymerElement} from '@polymer/polymer';
import isEmpty from 'lodash-es/isEmpty';
import {Constructor, GenericObject} from '../typings/globals.types';

/**
 * @polymer
 * @mixinFunction
 */
function PaginationWithFiltersMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class PaginationWithFiltersClass extends baseClass {

    @property({type: Number})
    pageNumber!: number;

    @property({type: Number})
    pageSize!: number;

    @property({type: String})
    sortOrder!: string;

    @property({type: String})
    qs!: string;

    @property({type: Number})
    debounceTime: {
      type: Number,
      value: 100
    }


    ready() {
      this.addEventListener('sort-changed', this.sortOrderChanged as any);
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

    sortOrderChanged({detail: {direction, field}}) {
      this.set('debounceTime', 150);
      this.set('sortOrder', direction);
      if (field) {
        this.set('orderBy', field);
      }
    }

    buildQueryString(hasPagination=true) {
      // @ts-ignore
      return this.params.reduce((acc, {qName, propName, xf}) => {
        return isEmpty(this[propName]) ? acc
          : `${acc}&${qName}=${xf(this[propName])}`;
      }, hasPagination ? `page=${this.pageNumber}&size=${this.pageSize}` : '');
    }
  }
  return PaginationWithFiltersClass;
}
export default PaginationWithFiltersMixin;
