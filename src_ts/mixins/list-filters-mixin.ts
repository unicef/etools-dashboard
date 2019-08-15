import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { isEmpty } from 'ramda';
import moment from 'moment';
// import { Mixins } from './redux-store-mixin';
// export const Mixins = Mixins || {};

// window.EtoolsDashboard = window.EtoolsDashboard || {};
// window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};

/**
* @polymer
* @mixinFunction
*/
export const ListFilters = (superClass) => class extends superClass {
  constructor() {
    super();
  }

  static get properties() {
    return {
      listFilterOptions: {
        type: Array
      },
      selectedFilters: {
        type: Array
      }
    };
  }

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

  _isAlreadySelected(filter) {
    return Boolean(
      this.selectedFilters.find((sF) => sF.filterName === filter.filterName)
    );
  }

  // select a filter from ADD FILTER menu
  selectFilter({ model: { item: selectedOption, index: selectedIdx } }) {
    if (!this._isAlreadySelected(selectedOption)) {
      this.push('selectedFilters', selectedOption);
      this.set(['listFilterOptions', selectedIdx, 'selected'], true);
    } else {
      let paredFilters = this.selectedFilters.filter((fil) => fil.filterName != selectedOption.filterName);
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
        this.selectedFilters[i].alreadySelected = null;
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
   *  - 'datepicker' (etools-datepicker)
   */
  filterTypeIs(expentedType, checkedTypeValue) {
    return expentedType === checkedTypeValue;
  }

  // 'esmm' (etools-searchable-multiselection-menu) filter value changed
  esmmValueChanged(event) {
    // @ts-ignore
    let filterPath = dom(event).localTarget.getAttribute('data-filter-path');
    let filterVal = event.detail.selectedItems;
    this.set(filterPath, filterVal);
  }

  // for esmm on pages without url params
  esmmValueChangedForValues(event) {
    // @ts-ignore
    let filterPath = dom(event).localTarget.getAttribute('data-filter-path');
    // @ts-ignore
    const valueProp = dom(event).localTarget.getAttribute('option-value');

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
  _filterDateHasChanged(event) {
    if (!event.detail.jsonDate) {
      return;
    }
    let filterPath = event.target.getAttribute('data-filter-path');
    let selectedDate = new Date(event.detail.jsonDate);
    this.set(filterPath, moment(selectedDate).format('YYYY-MM-DD'));
  }

  // update shown filters
  updateShownFilters(filters) {
    let i;
    filters = isEmpty(filters) ? [] : filters;
    if (filters.length) {
      filters.forEach((filter) => {
        // check available filters
        if (this._validateFilterSelectedValue(filter.selectedValue)) {
          let foundInAvailable = false;
          if (this.listFilterOptions instanceof Array && this.listFilterOptions.length > 0) {
            for (i = 0; i < this.listFilterOptions.length; i++) {
              if (this.listFilterOptions[i].filterName === filter.filterName) {
                const type = this.listFilterOptions[i].type;
                let filterPath = 'listFilterOptions.' + i;
                if (type === 'esmm' || type === 'dropdown') {
                  // update esmm dropdown selection
                  this.set(filterPath + '.alreadySelected', filter.selectedValue);
                } else if (type === 'datepicker') {
                  // update datepicker selection
                  this.set(filterPath + '.dateSelected', filter.selectedValue);
                }
                this.set(filterPath + '.selected', true);
                this._disableFilter(filter, filterPath);
                // add filter to selected filters list
                this.push('selectedFilters', this.listFilterOptions[i]);
                foundInAvailable = true;
                break;
              }
            }
          }
          // if the filter is not in available filters lists,
          // search it in selected filters lists and update selected value
          if (!foundInAvailable) {
            if (this.selectedFilters instanceof Array && this.selectedFilters.length > 0) {
              for (i = 0; i < this.selectedFilters.length; i++) {
                if (this.selectedFilters[i].filterName === filter.filterName) {
                  let filterPath = '';
                  if (this.selectedFilters[i].type === 'esmm' || this.selectedFilters[i].type === 'dropdown') {
                    // update esmm dropdown selection
                    filterPath = 'selectedFilters.' + i;
                    this.set(filterPath + '.alreadySelected', filter.selectedValue);
                  } else if (this.selectedFilters[i].type === 'datepicker') {
                    // update datepicker selection
                    filterPath = 'selectedFilters.' + i;
                    this.set(filterPath + '.dateSelected', filter.selectedValue);
                  }
                  this._disableFilter(filter, filterPath);
                  break;
                }
              }
            }
          }
        }
      });
      // refresh available filters and remove those selected
    }
  }

  _disableFilter(filterUpdateData, filterPath) {
    if (filterUpdateData.hasOwnProperty('disabled') && filterPath !== '') {
      this.set(filterPath + '.disabled', filterUpdateData.disabled);
    }
  }
};
