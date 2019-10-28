import {PolymerElement} from '@polymer/polymer/polymer-element';
import {Constructor} from '../../typings/globals.types';
import EtoolsLogsMixin from '@unicef-polymer/etools-behaviors/etools-logs-mixin.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
import {property} from '@polymer/decorators';
import './etools-toast';
import {EtoolsToast} from './etools-toast';

export function ToastNotificationsMixin<T extends Constructor<PolymerElement>>(superClass: T) {
  class ToastNotificationsClass extends EtoolsLogsMixin(superClass as Constructor<PolymerElement>) {

    @property({type: Object})
    public _toast: EtoolsToast = null;

    @property({type: Array})
    public _toastQueue: object[] = [];

    @property({type: String})
    public currentToastMessage = '';

    public connectedCallback() {
      super.connectedCallback();
      this.addEventListener('toast', this.queueToast);
    }

    public disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('toast', this.queueToast);
    }

    public queueToast(e: CustomEvent) {
      e.stopPropagation();
      const detail = e.detail;
      if (!this._toast) {
        this._createToastElement();
      }

      if (!this._toastQueue.length) {
        this.push('_toastQueue', detail);
        let toastProperties = this._toast.prepareToastAndGetShowProperties(detail);
        this._showToast(toastProperties);
      } else {
        let alreadyInQueue = this._toastQueue.filter((toastDetail) => {
          return JSON.stringify(toastDetail) === JSON.stringify(detail);
        });
        if (alreadyInQueue.length === 0) {
          this.push('_toastQueue', detail);
        } // else already in the queue
      }
    }

    private _createToastElement() {
      this.set('_toast', document.createElement('etools-toast'));
      this._toast.set('fitInto', this.$.appHeadLayout);
      this._toast.addEventListener('toast-confirm', this._toggleToast.bind(this, this._toast));
      document.querySelector('body').appendChild(this._toast);

      this._toastAfterRenderSetup();
    }

    private _toastAfterRenderSetup() {
      afterNextRender(this._toast, () => {
        // alter message wrapper css
        let messageWrapper = this._toast.getMessageWrapper();
        if (messageWrapper) {
          messageWrapper.style.whiteSpace = 'pre-wrap';
        }
        // add close listener
        this._toast.addEventListener('toast-closed', this.dequeueToast.bind(this));
      });
    }

    private dequeueToast() {
      this.shift('_toastQueue');
      if (this._toastQueue.length) {
        const toastProperties = this._toast.prepareToastAndGetShowProperties(this._toastQueue[0]);
        this._showToast(toastProperties);
      }
    }

    private _toggleToast(toast) {
      if (toast) {
        toast.toggle();
      }
    }

    private _showToast(toastProperties) {
      this.set('currentToastMessage', toastProperties.text);
      this._toast.show(toastProperties);
    }
  }
  return ToastNotificationsClass;
}
