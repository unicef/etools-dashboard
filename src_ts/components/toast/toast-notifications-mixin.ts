import EtoolsLogsMixin from '@unicef-polymer/etools-behaviors/etools-logs-mixin';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status';
import './etools-toast';
import { Mixins as Mixins$0 } from '../../mixins/redux-store-mixin';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';
export const Mixins = Mixins$0 || {};

/**
* @polymer
* @mixinFunction
*/
Mixins$0.ToastNotifications = dedupingMixin(
  superClass => class extends EtoolsLogsMixin(superClass) {
    static get properties() {
      return {
        _toast: {
          type: Object,
          value: null
        },
        _toastQueue: {
          type: Array,
          value: function() {
            return [];
          }
        },
        currentToastMessage: {
          type: String,
          value: ''
        }
      };
    }

    ready() {
      super.ready();
      this.addEventListener('toast', this.queueToast);
    }

    queueToast(e) {
      e.stopPropagation();
      let detail = e.detail;
      if (!this._toast) {
        this._createToastElement();
      }

      if (!this._toastQueue.length) {
        this.push('_toastQueue', detail);
        let toastProperties = this._toast.prepareToastAndGetShowProperties(detail);
        this._showToast(toastProperties);
      } else {
        let alreadyInQueue = this._toastQueue.filter(toastDetail => {
          return JSON.stringify(toastDetail) === JSON.stringify(detail);
        });
        if (alreadyInQueue.length === 0) {
          this.push('_toastQueue', detail);
        } // else already in the queue
      }
    }

    _createToastElement() {
      this.set('_toast', document.createElement('etools-toast'));
      this._toast.set('fitInto', this.$.appHeadLayout);
      this._toast.addEventListener('toast-confirm', this._toggleToast.bind(this, this._toast));
      document.querySelector('body').appendChild(this._toast);

      this._toastAfterRenderSetup();
    }

    _toastAfterRenderSetup() {
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

    dequeueToast() {
      this.shift('_toastQueue');
      if (this._toastQueue.length) {
        let toastProperties = this._toast.prepareToastAndGetShowProperties(this._toastQueue[0]);
        this._showToast(toastProperties);
      }
    }

    _toggleToast(toast) {
      if (toast) {
        toast.toggle();
      }
    }

    _showToast(toastProperties) {
      this.set('currentToastMessage', toastProperties.text);
      this._toast.show(toastProperties);
    }

  }
);
