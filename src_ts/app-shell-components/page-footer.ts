import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import {customElement} from '@polymer/decorators';

@customElement('page-footer')
export class PageFooter extends PolymerElement {
  public static get template(): HTMLTemplateElement {
    return html`
      <style>
        :host {
          display: block;
          padding: 18px 24px;
          width: 100%;
          box-sizing: border-box;
        }

        #footer-content {
          @apply --layout-horizontal;
        }

        #unicef-logo {
          @apply --layout-horizontal;
          @apply --layout-inline;
          padding-right: 30px;
        }

        #unicef-logo img {
          height: 28px;
          width: 118px;
        }

        @media print {
          :host {
            display: none;
          }
        }
      </style>

      <footer>
        <div id="footer-content">
          <span id="unicef-logo">
            <img src\$="[[importPath]]images/UNICEF_logo.png" alt="UNICEF logo">
          </span>
        </div>
      </footer>
    `;
  }
}
