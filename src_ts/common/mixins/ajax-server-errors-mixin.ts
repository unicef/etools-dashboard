import { AjaxErrorsParserMixin } from './ajax-errors-parser-mixin';
import { fireEvent } from '../../utils/fire-custom-event';
import { PolymerElement } from '@polymer/polymer/polymer-element';
import { Constructor } from '../../typings/globals.types';
import { property, observe } from '@polymer/decorators';

export function AjaxServerErrorsMixin<T extends Constructor<PolymerElement>>(
  baseClass: T
) {
  class AjaxServerErrorsClass extends AjaxErrorsParserMixin(baseClass) {
    @property({ type: Array, notify: true })
    public serverErrors: object[];

    @property({ type: Object })
    public options: object;

    @property({ type: String })
    public errorEventName: string = null;

    @property({ type: Boolean })
    private useToastEvent = true;

    @property({ type: String })
    private ajaxLoadingMsgSource: string = '';

    public handleErrorResponse(
      response,
      ajaxMethod,
      redirectOn404: boolean
    ): void {
      let method = ajaxMethod;

      if (redirectOn404 && response.status === 404) {
        fireEvent(this, '404');
        return;
      }

      fireEvent(this, 'global-loading', {
        active: false,
        loadingSource: this.ajaxLoadingMsgSource
          ? this.ajaxLoadingMsgSource
          : null,
      });

      const errors = this.tryGetResponseError(response);

      let errorMessage = response.message || this.globalMessage;

      if (!ajaxMethod) {
        method = 'GET';
      }

      if (['POST', 'PATCH', 'DELETE'].indexOf(method) > -1) {
        this.set(
          'serverErrors',
          this._getErrorsArray(errors, this.useToastEvent)
        );
      }
      this.set('serverErrors', this.serverErrors ? this.serverErrors : []);
      if (this.useToastEvent) {
        if (this.serverErrors.length > 1) {
          errorMessage = this.serverErrors.join('\n');
        }
        fireEvent(this, 'toast', { text: errorMessage, showCloseBtn: true });
      } else {
        if (this.serverErrors.length === 0) {
          this._fireAjaxErrorEvent(errorMessage);
        } else {
          this._fireAjaxErrorEvent(this.serverErrors);
        }
      }
    }

    @observe('errorEventName')
    public _errorEventNameChange(eventName: string): void {
      if (typeof eventName === 'string' && eventName !== '') {
        // disable toasts error notifications if eventName is given
        this.set('useToastEvent', false);
      }
    }

    private _fireAjaxErrorEvent(errors: string | object): void {
      let errorsObj: object;
      if (
        typeof this.errorEventName === 'string' &&
        this.errorEventName !== ''
      ) {
        if (typeof errors === 'string') {
          errorsObj = [errors];
        }
        fireEvent(this, this.errorEventName, errorsObj);
      }
    }
  }
  return AjaxServerErrorsClass;
}