import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/communication-icons';

/* eslint-disable max-len */

/**
 * @polymer
 * @customElement
 */
class SupportBtn extends PolymerElement {
  static get is() {
    return 'support-btn';
  }

  static get template() {
    return html`
      <style>
        :host(:hover) {
          cursor: pointer;
        }
        a {
          color: inherit;
          text-decoration: none;
          font-size: 16px;
        }
        iron-icon {
          margin-right: 4px;
        }
      </style>
      <a href="https://unicef.service-now.com/cc/?id=sc_cat_item&sys_id=35b00b1bdb255f00085184735b9619e6&sysparm_category=c6ab1444db5b5700085184735b961920"
        target="_blank">
        <iron-icon icon="communication:textsms"></iron-icon>
        Support
      </a>
    `;
  }
}

window.customElements.define('support-btn', SupportBtn);
