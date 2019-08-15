/* <link rel="import" href="../../bower_components/polymer/polymer.html"> */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
// import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { Constructor } from '../typings/globals.types';
import moment from 'moment';
// import { Mixins } from './redux-store-mixin';
// export const Mixins = Mixins || {};

/**
 * @polymer
 * @mixinFunction
 */
export function DateMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class DateMixinClass extends baseClass {

    /**
     * Format date string to any format supported by momentjs
     */
    prettyDate(dateString, format?) {
      let date = this._convertDate(dateString);
      return (!date) ? '' : this._utcDate(date, format);
    }

    prettyDateWithoutOffset(dateString, format) {
      let date = this.prepareDate(dateString);
      return (!date) ? '' : this._utcDate(date, format);
    }

    _utcDate(date, format) {
      return (!date) ? '' : moment.utc(date).format(format ? format : 'D MMM YYYY');
    }


    _convertDate(dateString: string, noZTimezoneOffset?: Boolean) {
      if (typeof dateString === 'string' && dateString !== '') {
        dateString = (dateString.indexOf('T') === -1) ? (dateString + 'T00:00:00') : dateString;
        /**
         * `Z` (zero time offset) will ensure `new Date` will create the date in UTC and then it will apply local timezone
         * and will have the same result in all timezones (for the UTC date).
         * Example:
         *  d = new Date('2018-04-25T00:00:00Z');
         *  d.toString() == "Wed Apr 25 2018 03:00:00 GMT+0300 (EEST)"
         *  d.toGMTString() == "Wed, 25 Apr 2018 00:00:00 GMT"
         * @type {string}
         */
        dateString += (noZTimezoneOffset || dateString.indexOf('Z') >= 0) ? '' : 'Z';
        let date = new Date(dateString);
        let isValid = this.isValidDate(date);
        if (!isValid) {
          console.warn('Date conversion unsuccessful: ' + dateString);
        }
        return isValid ? date : null;
      }
      return null;
    }

    _getDateWithoutTimezoneOffset(date) {
      let userTimezoneOffset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() + userTimezoneOffset);
    }

    /*
    * Prepare date from string
    */
    prepareDate(dateString) {
      let date = this._convertDate(dateString);
      return date ? this._getDateWithoutTimezoneOffset(date) : new Date();
    }

    prepareDatepickerDate(dateString) {
      let date = this._convertDate(dateString);
      if (!date) {
        return new Date();
      }
      return this._getDateWithoutTimezoneOffset(date);
    }

    /*
    * Open input field assigned(as prefix or suffix) etools-datepicker on tap.
    * Make sure you also have the data-selector attribute set on the input field.
    */
    openDatePicker(event) {
      let id = event.target.getAttribute('data-selector');
      if (id) {
        let datePicker = this.shadowRoot.querySelector('#' + id);
        if (datePicker) {
          // @ts-ignore
          datePicker.open = true;
        }
      }
    }

    /*
    * Diff between 2 dates
    */
    dateDiff(firstDateString, secondDateString, unit) {
      if (!unit) {
        unit = 'days';
      }
      if (typeof firstDateString === 'string' && firstDateString !== '' &&
          typeof secondDateString === 'string' && secondDateString !== '') {
        let firstDate = new Date(firstDateString);
        let secondDate = new Date(secondDateString);

        if (this.isValidDate(firstDate) && this.isValidDate(secondDate)) {
          let mFirstDate = moment.utc(firstDate);
          let mSecondDate = moment.utc(secondDate);
          return mSecondDate.diff(mFirstDate, unit);
        }
      }
      return null;
    }

    getMaxDateStr(d1Str, d2Str) {
      // TODO: optimize this
      let d1 = new Date(d1Str);
      let d2 = new Date(d2Str);
      if (!this.isValidDate(d1) && this.isValidDate(d2)) {
        return d2Str;
      } else if (this.isValidDate(d1) && !this.isValidDate(d2)) {
        return d1Str;
      } else if (!this.isValidDate(d1) && !this.isValidDate(d2)) {
        return null;
      } else {
        if (moment.utc(d1).isSameOrBefore(d2)) {
          return d2Str;
        } else {
          return d1Str;
        }
      }
    }

    isFutureDate(dateStr) {
      return moment.utc().isBefore(moment.utc(new Date(dateStr)));
    }

    dateIsBetween(start, end, current) {
      let startDate = new Date(start);
      let endDate = new Date(end);
      if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
        throw new Error('Both start and end dates must valid.');
      }
      let date = new Date(current);
      let currentDate = this.isValidDate(date) ? moment() : moment(date);
      return currentDate.isBetween(moment(startDate), moment(endDate), null, '[]');
    }

    isValidDate(date) {
      return (date instanceof Date === false) ? false : (date.toString() !== 'Invalid Date');
    }

    getTodayDateStr() {
      return moment().format('YYYY-MM-DD');
    }

    dateIsBefore(dateToCheckStr, dateStr) {
      return moment(dateToCheckStr).isBefore(dateStr);
    }

    dateIsAfter(dateToCheckStr, dateStr) {
      return moment(dateToCheckStr).isAfter(dateStr);
    }
  }
  return DateMixinClass;
}