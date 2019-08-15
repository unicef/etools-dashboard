// import { fireEvent } from '../components/utils/fire-custom-event';
import {PolymerElement} from '@polymer/polymer/polymer-element';
import {Constructor} from '../typings/globals.types'
import { property } from '@polymer/decorators';
// interface AjaxErrorsParserType {
  // globalMessage: string
  // httpStatus413Msg: string
// }

export function AjaxErrorsParserMixin<T extends Constructor<PolymerElement>>(superClass: T) {
  class AjaxErrorsParserClass extends (superClass as Constructor<PolymerElement>) {

    @property({type: String})
    globalMessage: string = 'An error occurred. Please try again later.';

    @property({type: String})
    httpStatus413Msg: string = 'The uploaded file is too large!';

    tryGetResponseError(response) {
      if (response.status === 413) {
        return this.httpStatus413Msg;
      }
      if (response.status >= 401) {
        return this.globalMessage;
      }
      return response.response || this.globalMessage;
    }

    _getErrorsArray(errors, prepareForToastMsg?: Boolean) {
      let errorsArray = [];
      if (!errors) {
        return errorsArray;
      }

      if (prepareForToastMsg) {
        errorsArray.push('Errors occurred:');
      }

      if (typeof errors === 'string') {
        errorsArray.push(errors);
        return errorsArray;
      }
      if (typeof errors === 'object' && errors.error && typeof errors.error === 'string') {
        errorsArray.push(errors.error);
        return errorsArray;
      }

      if (typeof errors === 'object' && errors.errors && Array.isArray(errors.errors)) {
        errors.errors.forEach(err => {
          if (typeof err === 'object') {
            let errKeys = Object.keys(err);
            if (errKeys.length > 0) {
              errKeys.forEach(k => {
                errorsArray.push(err[k]); // will work only for strings
              });
            }
          } else {
            errorsArray.push(err);
          }
        });
        return errorsArray;
      }

      if (typeof errors === 'object' && errors.non_field_errors && Array.isArray(errors.non_field_errors)) {
        [].push.apply(errorsArray, errors.non_field_errors);
        return errorsArray;
      }

      if (Array.isArray(errors) && errors.length > 0 && this._isArrayOfStrings(errors)) {
        Array.prototype.push.apply(errorsArray, errors);
        return errorsArray;
      }

      if (typeof errors === 'object' && Object.keys(errors).length > 0) {
        let errField;
        for (errField in errors) {

          if (typeof errors[errField] === 'string') {
            errorsArray.push('Field ' + errField + ' - ' + errors[errField]);
            continue;
          }
          if (Array.isArray(errors[errField]) && errors[errField].length > 0) {
            let parentErr = 'Field ' + errField + ': ';
            let nestedErrs = this._getErrorsArray(errors[errField]);
            if (nestedErrs.length === 1) {
              parentErr += nestedErrs[0];
              errorsArray.push(parentErr);
            } else {
              errorsArray.push(parentErr);
              // * The marking is used for display in etools-error-messages-box
              // * and adds a welcomed identations when displayed as a toast message
              nestedErrs = this._markNestedErrors(nestedErrs);
              Array.prototype.push.apply(errorsArray, nestedErrs);
            }
            continue;
          }
          if (typeof errors[errField] === 'object' && Object.keys(errors[errField]).length > 0) {
            let errF;
            for (errF in errors[errField]) {
              errorsArray.push('Field ' + errField + '(' + errF + ') - ' + errors[errField][errF]);
            }
          }

        }
      }

      return errorsArray;
    }

    _markNestedErrors(errs) {
      return errs.map(er => ' ' + er);
    }

    _isArrayOfStrings(arr) {
      let allStrings = true;
      let i;
      for (i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'string') {
          allStrings = false;
          break;
        }
      }
      return allStrings;
    }

    formatServerErrorAsText(errors) {
      let errorsArray = this._getErrorsArray(errors, false);
      if (errorsArray && errorsArray.length) {
        return errorsArray.join('\n');
      }
      return errors;
    }

    parseRequestErrorsAndShowAsToastMsgs(error, source, redirectOn404) {
      if (redirectOn404 && error.status === 404) {
        if (!source) {
          source = this;
        }
        source.fireEvent('404');
        return;
      }

      let errorResponse = this.tryGetResponseError(error);
      let errorsString = this.formatServerErrorAsText(errorResponse);

      this.showErrorAsToastMsg(errorsString, source);
    }

    showErrorAsToastMsg(errorsString, source) {
      if (errorsString) {
        if (!source) {
          source = this;
        }
        source.fireEvent('toast', {text: errorsString, showCloseBtn: true});
      }
    }

  }
  return AjaxErrorsParserClass;
}
