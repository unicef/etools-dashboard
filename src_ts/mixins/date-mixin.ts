import {PolymerElement} from '@polymer/polymer';
import {Constructor} from '../typings/globals.types';

declare const dayjs: any;

/**
 * @polymer
 * @mixinFunction
 */
function DateMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class DateClass extends baseClass {
     /**
     * Format date string to any format supported by dayjs
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
      return (!date) ? '' : dayjs.utc(date).format(format ? format : 'D MMM YYYY');
    }


    _convertDate(dateString, noZTimezoneOffset?) {
      if (typeof dateString === 'string' && dateString !== '') {
        dateString = (dateString.indexOf('T') === -1) ? (dateString + 'T00:00:00') : dateString;
        /**
         * `Z` (zero time offset) will ensure `new Date` will create the date in UTC,
         *  and then it will apply local timezone
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
          let mFirstDate = dayjs.utc(firstDate);
          let mSecondDate = dayjs.utc(secondDate);
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
        if (dayjs.utc(d1).isSameOrBefore(d2)) {
          return d2Str;
        } else {
          return d1Str;
        }
      }
    }

    isFutureDate(dateStr) {
      return dayjs.utc().isBefore(dayjs.utc(new Date(dateStr)));
    }

    dateIsBetween(start, end, current) {
      let startDate = new Date(start);
      let endDate = new Date(end);
      if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
        throw new Error('Both start and end dates must valid.');
      }
      let date = new Date(current);
      let currentDate = this.isValidDate(date) ? dayjs() : dayjs(date);
      return currentDate.isBetween(dayjs(startDate), dayjs(endDate), null, '[]');
    }

    isValidDate(date) {
      return (date instanceof Date === false) ? false : (date.toString() !== 'Invalid Date');
    }

    getTodayDateStr() {
      return dayjs().format('YYYY-MM-DD');
    }

    dateIsBefore(dateToCheckStr, dateStr) {
      return dayjs(dateToCheckStr).isBefore(dateStr);
    }

    dateIsAfter(dateToCheckStr, dateStr) {
      return dayjs(dateToCheckStr).isAfter(dateStr);
    }
  }
  return DateClass;
}
export default DateMixin;
