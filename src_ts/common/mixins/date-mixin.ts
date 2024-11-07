import { PolymerElement } from '@polymer/polymer';
import { Constructor } from '../../typings/globals.types';
import dayjs from "dayjs";
import dayJsUtc from "dayjs/plugin/utc";

dayjs.extend(dayJsUtc);

/**
 * @polymer
 * @mixinFunction
 */
function DateMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class DateClass extends baseClass {
    /**
     * Format date string to any format supported by dayjs
     */
    prettyDate(dateString: string, format?: string | undefined) {
      let date = this._convertDate(dateString);
      return !date ? "" : this._utcDate(date, format);
    }

    prettyDateWithoutOffset(dateString: any, format: any) {
      let date = this.prepareDate(dateString);
      return !date ? "" : this._utcDate(date, format);
    }

    _utcDate(
      date: string | number | Date | dayjs.Dayjs | null | undefined,
      format: string | undefined
    ) {
      return !date
        ? ""
        : dayjs.utc(date).format(format ? format : "D MMM YYYY");
    }

    _convertDate(
      dateString: string | number | Date | string[],
      noZTimezoneOffset?: undefined
    ) {
      if (typeof dateString === "string" && dateString !== "") {
        dateString =
          dateString.indexOf("T") === -1
            ? dateString + "T00:00:00"
            : dateString;
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
        dateString +=
          noZTimezoneOffset || dateString.indexOf("Z") >= 0 ? "" : "Z";
        let date = new Date(dateString);
        let isValid = this.isValidDate(date);
        if (!isValid) {
          console.warn("Date conversion unsuccessful: " + dateString);
        }
        return isValid ? date : null;
      }
      return null;
    }

    _getDateWithoutTimezoneOffset(date: Date) {
      let userTimezoneOffset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() + userTimezoneOffset);
    }

    /*
     * Prepare date from string
     */
    prepareDate(dateString: any) {
      let date = this._convertDate(dateString);
      return date ? this._getDateWithoutTimezoneOffset(date) : new Date();
    }

    /*
     * Diff between 2 dates
     */
    dateDiff(
      firstDateString: string | number | Date,
      secondDateString: string | number | Date,
      unit: string | undefined
    ) {
      if (!unit) {
        unit = "days";
      }
      if (
        typeof firstDateString === "string" &&
        firstDateString !== "" &&
        typeof secondDateString === "string" &&
        secondDateString !== ""
      ) {
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

    getMaxDateStr(
      d1Str: string | number | Date,
      d2Str: string | number | Date
    ) {
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

    isFutureDate(dateStr: string | number | Date) {
      return dayjs.utc().isBefore(dayjs.utc(new Date(dateStr)));
    }

    dateIsBetween(
      start: string | number | Date,
      end: string | number | Date,
      current: string | number | Date
    ) {
      let startDate = new Date(start);
      let endDate = new Date(end);
      if (!this.isValidDate(startDate) || !this.isValidDate(endDate)) {
        throw new Error("Both start and end dates must valid.");
      }
      let date = new Date(current);
      let currentDate = this.isValidDate(date) ? dayjs() : dayjs(date);
      return currentDate.isBetween(
        dayjs(startDate),
        dayjs(endDate),
        null,
        "[]"
      );
    }

    isValidDate(date: Date) {
      return date instanceof Date === false
        ? false
        : date.toString() !== "Invalid Date";
    }

    getTodayDateStr() {
      return dayjs().format("YYYY-MM-DD");
    }

    dateIsBefore(
      dateToCheckStr: string | number | Date | dayjs.Dayjs | null | undefined,
      dateStr: string | number | Date | dayjs.Dayjs | null | undefined
    ) {
      return dayjs(dateToCheckStr).isBefore(dateStr);
    }

    dateIsAfter(
      dateToCheckStr: string | number | Date | dayjs.Dayjs | null | undefined,
      dateStr: string | number | Date | dayjs.Dayjs | null | undefined
    ) {
      return dayjs(dateToCheckStr).isAfter(dateStr);
    }
  }
  return DateClass;
}
export default DateMixin;
