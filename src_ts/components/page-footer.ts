import { PolymerElement } from '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout';
import { html } from '@polymer/polymer/lib/utils/html-tag';
/**
 * @polymer
 * @customElement
 */
class PageFooter extends PolymerElement {
  static get template() {
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
          <img src\$="[[importPath]]../../../images/UNICEF_logo.png" alt="UNICEF logo">
        </span>
      </div>
    </footer>
`;
  }

  static get is() {
    return 'page-footer';
  }
}

window.customElements.define(PageFooter.is, PageFooter);
