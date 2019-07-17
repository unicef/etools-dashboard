import './ajax-errors-parser-mixin';
import './event-helper-mixin';
import { Mixins as Mixins$0 } from './redux-store-mixin';
export const Mixins = Mixins$0 || {};
/**
* @polymer
* @mixinFunction
* @appliesMixin EtoolsDashboard.Mixins.EventHelper
* @appliesMixin EtoolsDashboard.Mixins.AjaxErrorsParser
*/
Mixins$0.AjaxServerErrors = (baseClass) => class extends
    Mixins$0.AjaxErrorsParser(
      Mixins$0.EventHelper(baseClass)
    ) {

  static get properties() {
    return {
      serverErrors: {
        type: Array,
        notify: true
      },
      options: Object,
      useToastEvent: {
        type: Boolean,
        value: true
      },
      errorEventName: {
        value: null,
        observer: '_errorEventNameChange'
      },
      ajaxLoadingMsgSource: {
        type: String,
        value: ''
      }
    };
  }

  handleErrorResponse(response, ajaxMethod, redirectOn404) {
    if (redirectOn404 && response.status === 404) {
      this.fireEvent('404');
      return;
    }

    this.fireEvent('global-loading', {
      active: false,
      loadingSource: this.ajaxLoadingMsgSource ? this.ajaxLoadingMsgSource : null
    });

    let errors = this.tryGetResponseError(response);

    let errorMessage = response.message || this.globalMessage;
    
    if (!ajaxMethod) {
      ajaxMethod = 'GET';
    }

    if (['POST', 'PATCH', 'DELETE'].indexOf(ajaxMethod) > -1) {
      this.set('serverErrors', this._getErrorsArray(errors, this.useToastEvent));
    }
    this.set('serverErrors', this.serverErrors ? this.serverErrors : []);
    if (this.useToastEvent) {
      if (this.serverErrors.length > 1) {
        errorMessage = this.serverErrors.join('\n');
      }
      this.fireEvent('toast', {text: errorMessage, showCloseBtn: true});
    } else {
      if (this.serverErrors.length === 0) {
        this._fireAjaxErrorEvent(errorMessage);
      } else {
        this._fireAjaxErrorEvent(this.serverErrors);
      }
    }
  }

  _fireAjaxErrorEvent(errors) {
    if (typeof this.errorEventName === 'string' && this.errorEventName !== '') {
      if (typeof errors === 'string') {
        errors = [errors];
      }
      this.fireEvent(this.errorEventName, errors);
    }
  }

  _errorEventNameChange(eventName) {
    if (typeof eventName === 'string' && eventName !== '') {
      // disable toasts error notifications if eventName is given
      this.set('useToastEvent', false);
    }
  }

};
