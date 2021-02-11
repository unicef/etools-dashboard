import {property} from '@polymer/decorators';
import {PolymerElement} from '@polymer/polymer';
import isEmpty from 'lodash-es/isEmpty';
import {Constructor} from '../typings/globals.types';
import DatePickerLite from '@unicef-polymer/etools-date-time/datepicker-lite';
import {EtoolsDropdownMultiEl} from '@unicef-polymer/etools-dropdown/etools-dropdown-multi';
declare const dayjs: any;

/**
 * @polymer
 * @mixinFunction
 */
function ListFiltersMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class ListFiltersClass extends baseClass {

    @property({type: Array})
    listFilterOptions!: any[] ;

    @property({type: Array})
    selectedFilters!: any[];

    /**
     * Init filter options properties.
     * `filterOptions` object is particular for each list (see partners-list for example)
     */
    initListFiltersData(filterOptions) {
      // init add filter menu options
      this.setProperties({
        listFilterOptions: filterOptions,
        selectedFilters: []
      });
    }

    _isAlreadySelected(filter: any) {
      return Boolean(
        this.selectedFilters.find((sF: any) => sF.filterName === filter.filterName)
      );
    }

    // select a filter from ADD FILTER menu
    selectFilter({model: {item: selectedOption, index: selectedIdx}}) {
      if (!this._isAlreadySelected(selectedOption)) {
        this.push('selectedFilters', selectedOption);
        this.set(['listFilterOptions', selectedIdx, 'selected'], true);
      } else {
        let paredFilters = this.selectedFilters.filter(fil => fil.filterName != selectedOption.filterName);
        this._clearFilterSelection(selectedOption);
        this.set('selectedFilters', paredFilters);
        this.set(['listFilterOptions', selectedIdx, 'selected'], false);
      }
    }

    _clearFilterSelection(filter) {
      if (filter) {
        if (filter.singleSelection) {
          this.set(filter.path, null);
        } else {
          this.set(filter.path, (filter.type === 'esmm') ? [] : (filter.type === 'datepicker' ? '' : null));
        }
      }
    }

    _validateFilterSelectedValue(value) {
      return value && !isEmpty(value);
    }

    // remove already selected filter, also reset filter path value
    removeFilter(event) {
      let filterName = event.target.getAttribute('data-filter-name');
      let path = event.target.getAttribute('data-reset-path');

      let selectedFilterIndex = -1;
      for (let i = 0; i < this.selectedFilters.length; i++) {
        if (this.selectedFilters[i].filterName === filterName) {
          selectedFilterIndex = i;
          this.selectedFilters[i].selectedValue = null;
          break;
        }
      }

      if (selectedFilterIndex > -1) {
        // remove filter
        this.splice('selectedFilters', selectedFilterIndex, 1);
        const resetValue = Array.isArray(this[path]) ? []: null;
        this.set(path, resetValue);
      }
    }

    // filter value changed, update filter path with the new value
    filterValueChanged(event) {
      let filterPath = event.target.getAttribute('data-filter-path');
      let filterVal = event.target.selected;
      this.set(filterPath, filterVal);
    }

    /**
     * Check filter type. Filter type can be:
     *  - 'dropdown'(dropdown created using polymer catalog elements)
     *  - 'esmm' (etools-searchable-multiselection-menu)
     *  - 'datepicker' (datepicker-lite)
     */
    filterTypeIs(expentedType, checkedTypeValue) {
      return expentedType === checkedTypeValue;
    }

    // 'esmm' (etools-searchable-multiselection-menu) filter value changed
    esmmValueChanged(event) {
      const dropdownMultiEl = event.target as EtoolsDropdownMultiEl;
      const filterPath = dropdownMultiEl.getAttribute('data-filter-path')!;
      const filterVal = event.detail.selectedItems.map((v: any) => v[dropdownMultiEl.optionValue!]);
      this.set(filterPath, filterVal);
    }

    // for esmm on pages without url params
    esmmValueChangedForValues(event) {
      let filterPath = event.target.getAttribute('data-filter-path');
      const valueProp = event.target.getAttribute('option-value');

      let filterVal = event.detail.selectedItems;
      if (Array.isArray(filterVal)) {
        filterVal = filterVal.map((xs)=> {
          if (typeof xs === 'object') {
            return xs[valueProp];
          }
          return xs;
        });
      }
      this.set(filterPath, filterVal);
    }

    // change event for a etools-datepicker filter
    _filterDateHasChanged(event: CustomEvent) {
      if (!event.detail.date) {
        return;
      }
      let filterPath = (event.target as DatePickerLite).getAttribute('data-filter-path')!;
      const selectedDate = new Date(event.detail.date);
      this.set(filterPath, dayjs(selectedDate).format('YYYY-MM-DD'));
    }

    // update shown filters
    updateShownFilters(filters) {
      filters = Array.isArray(filters) ? filters : [];
      if (filters.length) {
        filters.forEach((filter) => {
          // check available filters
          const filterObj = this._findInListFilterOptions(filter.filterName);
          if (!filterObj) {
            return;
          }

          const idxInFilterOptions = this.listFilterOptions.findIndex((f) => f.filterName === filter.filterName);
          if (
            (filter.selected || this.filterHasSelectedValue(filter.selectedValue, filterObj.type)) &&
            !this._isAlreadySelected(filterObj)
          ) {
            // filter not selected => select filter
            this.push('selectedFilters', JSON.parse(JSON.stringify(filterObj)));
            this.set(['listFilterOptions', idxInFilterOptions, 'selected'], true);
          }

          if (this._validateFilterSelectedValue(filter.selectedValue)) {
            // search it in selected filters lists and update selected value
            if (this.selectedFilters instanceof Array && this.selectedFilters.length > 0) {
              const idxInSelFilters = this.selectedFilters.findIndex((f) => f.filterName === filter.filterName);

              if (idxInSelFilters > -1) {
                this.updateSelectedValueInFilter(filterObj.type, ['selectedFilters', idxInSelFilters], filter.selectedValue);
                this._disableFilter(filter, idxInSelFilters);
              }
            }
          }
        });
      }
    }

    updateSelectedValueInFilter(filterType: string, filterPath: [string, number], selectedValue: any) {
      this.set([...filterPath, 'selectedValue'], selectedValue);
      if (filterType === 'paper-toggle') {
        this.notifyPath([...filterPath, 'selectedValue'].join('.'));
      }
    }

    _findInListFilterOptions(filterName: string) {
      return this.listFilterOptions instanceof Array
        ? this.listFilterOptions.find((f) => f.filterName === filterName)
        : null;
    }

    filterHasSelectedValue(selectedValue: any, filterType: string) {
      switch (filterType) {
        case 'esmm':
          return (
            selectedValue &&
            ((typeof selectedValue === 'string' && selectedValue !== '') ||
              (Array.isArray(selectedValue) && selectedValue.length > 0))
          );
        case 'toggle':
          return selectedValue === true;
        default:
          return false;
      }
    }

    _disableFilter(filter: any, idxInSelFilters: number) {
      if (Object.prototype.hasOwnProperty.call(filter, 'disabled')) {
        this.set(['selectedFilters', idxInSelFilters, 'disabled'], filter.disabled);
      }
    }
  }
  return ListFiltersClass;
}

export default ListFiltersMixin;
