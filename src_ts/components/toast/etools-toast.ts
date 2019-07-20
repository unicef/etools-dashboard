import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-button/paper-button.js';
import '../../mixins/event-helper-mixin';
// import { Mixins } from '../../mixins/redux-store-mixin';

/**
 * @polymer
 * @customElement
 */
class EtoolsToast extends window.EtoolsDashboard.Mixins.EventHelper(PolymerElement) {
  static get template() {
    return html`
    <style>
      .toast-dismiss-btn {
        --paper-button: {
          padding: 8px;
          min-width: 16px;
          margin: 0 -8px 0 24px;
        };
      }
      .toast-dismiss-btn-general-style {
        text-transform: uppercase;
        color: var(--primary-color);
      }
      .toast-dismiss-btn-multi-line {
        --paper-button: {
          padding: 8px;
          min-width: 16px;
          margin: 16px -8px -8px 0;
          @apply --layout-self-end;
        };
      }
      .toast-general-style {
        max-width: 568px !important;
        min-height: 40px;
        max-height: 70vh !important;
      }
      .toast {
        @apply --layout-horizontal;
        @apply --layout-center;
        justify-content: space-between;
      }
      .toast-multi-line {
        @apply --layout-vertical;
        text-align: justify;
      }
    </style>
    <paper-toast id="toast" class="toast-general-style" on-iron-overlay-closed="toastClosed" fit-into="[[fitInto]]">
      <paper-button id="confirmBtn" on-click="confirmToast" class="toast-dismiss-btn-general-style">
        Ok
      </paper-button>
    </paper-toast>
`;
  }

  static get is() {
    return 'etools-toast';
  }

  static get properties() {
    return {
      fitInto: Object
    };
  }
  ready() {
    super.ready();
  }
  show(details) {
    return this.$.toast.show(details);
  }

  toggle() {
    return this.$.toast.toggle();
  }

  confirmToast() {
    this.fireEvent('toast-confirm', {
      bubbles: true,
      composed: true
    });
  }

  toastClosed() {
    this.fireEvent('toast-closed', {
      bubbles: true,
      composed: true
    });
  }

  getMessageWrapper() {
    return this.$.toast.$.label;
  }

  _isMultiLine(message) {
    if (!message) {
      return false;
    }
    return message.toString().length > 80;
  }

  prepareToastAndGetShowProperties(detail) {
    let closeToastBtn = this.$.confirmBtn;
    let toast = this.$.toast;

    if (this._isMultiLine(detail.text)) {
      toast.classList.remove('toast');
      toast.classList.add('toast-multi-line');

      closeToastBtn.classList.remove('toast-dismiss-btn');
      closeToastBtn.classList.add('toast-dismiss-btn-multi-line');
    } else {
      toast.classList.remove('toast-multi-line');
      toast.classList.add('toast');

      closeToastBtn.classList.remove('toast-dismiss-btn-multi-line');
      closeToastBtn.classList.add('toast-dismiss-btn');
    }
    closeToastBtn.updateStyles();

    // clone detail obj
    let toastProperties = JSON.parse(JSON.stringify(detail));

    toastProperties.duration = 0;
    if (typeof detail === 'object' && typeof detail.showCloseBtn !== 'undefined') {
      if (detail.showCloseBtn === true) {
        closeToastBtn.removeAttribute('hidden');
      } else {
        closeToastBtn.setAttribute('hidden', true);
        if (!detail.duration) {
          toastProperties.duration = 5000;
        }
      }
      delete toastProperties.showCloseBtn;
    } else {
      closeToastBtn.setAttribute('hidden', true);
    }

    return toastProperties;
  }
}

window.customElements.define(EtoolsToast.is, EtoolsToast);
