import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/communication-icons';

/* eslint-disable max-len */

/**
 * @polymer
 * @customElement
 */
export class SupportBtn extends PolymerElement {
  public static get template(): HTMLTemplateElement {
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
      <a href="https://unicef.service-now.com/cc?id=sc_cat_item&sys_id=c8e43760db622450f65a2aea4b9619ad&sysparm_category=99c51053db0a6f40f65a2aea4b9619af"
        target="_blank">
        <iron-icon icon="communication:textsms"></iron-icon>
        Support
      </a>
    `;
  }
}
