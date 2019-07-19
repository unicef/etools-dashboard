import '@polymer/polymer/polymer-element.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import './date-mixin';
import { isEmpty } from 'ramda';
import { Mixins as Mixins$0 } from './redux-store-mixin';
export const Mixins = Mixins$0 || {};

/**
 * @polymer
 * @mixinFunction
 * @appliesMixin EtoolsDashboard.Mixins.Date
 */
Mixins$0.CommonGeneral = dedupingMixin(
  (superClass) => class extends Mixins$0.Date(superClass) {
    constructor() {
      super();
    }

    /**
     * Prepare and return the string value we have to display on the interface.
     * Ex: partners and agreements lists data values.
     */
    getDisplayValue(value, isDate, separator) {
      if (typeof value === 'string' && value !== '') {
        if (isDate) {
          return this.prettyDate(value);
        } else {
          return value;
        }
      } else if (Array.isArray(value) && value.length > 0) {
        if (!separator) {
          separator = ', ';
        }
        return value.join(separator);
      } else if (typeof value === 'number') {
        return value;
      }
      return '-';
    }

    /**
     * Update URL params
     */
    updateAppState(routePath, qs, dispatchLocationChange) {
      // Using replace state to change the URL here ensures the browser's
      // back button doesn't take you through every query
      var currentState = window.history.state;
      window.history.replaceState(currentState, null,
        routePath + (qs && !isEmpty(qs) ? '?' + qs : ''));

      if (dispatchLocationChange) {
        // This event lets app-location and app-route know
        // the URL has changed
        window.dispatchEvent(new CustomEvent('location-changed'));
      }
    }

    prepareEtoolsFileDataFromUrl(fileUrl) {
      var files = [];
      if (typeof fileUrl === 'string' && fileUrl !== '') {
        var fileName = this.getFileNameFromURL(fileUrl);
        files = [{
          id: null,
          file_name: fileName,
          path: fileUrl
        }];
      }
      return files;
    }

    getFileNameFromURL(url) {
      return url.substr(url.lastIndexOf('/') + 1);
    }

    /**
     * Validate string value
     */
    validateStringValue(stringValue) {
      if (typeof stringValue === 'string' && stringValue !== '') {
        return true;
      }
      return false;
    }

    /**
     * Validate integer value
     */
    validateIdValue(idValue) {
      var id = parseInt(idValue, 10);
      if (isNaN(id) || (!isNaN(id) && id <= 0)) {
        return false;
      }
      return true;
    }

    /**
     * Reset field validation
     */
    fieldValidationReset(selector) {
      var field = this.$$(selector);
      if (field) {
        field.invalid = false;
      }
      return field;
    }

    currencyFormat(num) {
      if (!num) {
        return '0';
      }
      num = parseInt(num);
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    getCurrencyPrefix(type) {
      return type === 'USD' ? '$': '';
    }

    capitalizeWord(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    manageClickEvent(e, path) {
      if (!e.detail.sourceEvent.ctrlKey && !e.detail.sourceEvent.metaKey) {
        window.location.href = path;
      }
    }

    goToPage(e) {
      var path = [this.baseSite, e.target.getAttribute('app-name'),
        e.target.getAttribute('page')].join('/') + '/' + e.target.id;
      this.manageClickEvent(e, path);
    }

    _allHaveValues(...args) {
      const self = this;
      const result = args.reduce(function(hasVal, prop) {
        return !isEmpty(self[prop]) && !!self[prop] && hasVal;
      }, true);
      return result;
    }

    displayNonZero(val) {
      return Number(val) ? val : '-';
    }

    commaSplit(str) {
      return str ? str.split(',') : [];
    }

    strippedSpace(str) {
      return str.split(',')
        .map((item) => {
          return item[0] === ' ' ? item.slice(1) : item;
        });
    }

    paramStrParseToArray(str, optionsCollection, valueProp = 'value') {
      if (!str) {
        return null;
      }
      const arr = str.split('|').map((val) => Number(val) || val);
      return optionsCollection.filter((option) => arr.indexOf(option[valueProp]) > -1);
    }
  }
);
