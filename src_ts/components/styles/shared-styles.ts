/* shared styles for all pages */
/* not for styling index.html or app-shell */
import "@polymer/polymer/polymer-element.js";
const DocumentContainer = document.createElement("template");

DocumentContainer.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
      *[hidden] {
        display: none !important;
      }
      h1 {
        font-size: 25px;
        margin: 16px 0;
        color: var(--primary-text-color);
      }

      a {
        text-decoration: inherit;
        color: inherit;
      }

      a:focus {
        outline: inherit;
      }

      app-toolbar {
        height: var(--toolbar-height);
      }

      #tabs {
        height: 48px;
      }

      .paper-material {
        padding: 16px 24px;
        background-color: var(--light-theme-content-color);
        box-sizing: border-box;      
      }

      iron-icon.dark {
        --iron-icon-fill-color: var(--dark-icon-color);
      }

      iron-icon.light {
        --iron-icon-fill-color: var(--light-icon-color);
      }

      paper-icon-button.dark {
        color: var(--dark-icon-color);
        --paper-icon-button-ink-color: var(--dark-ink-color);
      }

      paper-icon-button.light {
        color: var(--light-icon-color);
        --paper-icon-button-ink-color: var(--light-ink-color);
      }

      .dropdown-with-clear-btn paper-icon-button.clear,
      .dropdown-with-clear-btn paper-icon-button.remove,
      paper-icon-button.remove-field.remove {
        width: 35px;
        height: 35px;
        top: 10px;
      }

      .dropdown-with-clear-btn paper-icon-button.remove,
      paper-icon-button.remove-field.remove {
        color: #ea4022 /* TODO: replace with app-theme var */
      }

      .dropdown-with-clear-btn {
        @apply --layout-horizontal;
        @apply --layout-center;
        padding-bottom: 8px;
      }

      paper-input {
        --paper-input-prefix: {
          margin-top: -5px;
          margin-right: 10px;
          color: var(--dark-secondary-text-color);
        };
        --paper-input-suffix: {
          margin-top: -5px;
          margin-left: 10px;
          color: var(--dark-secondary-text-color);
        };
      }
      paper-dropdown-menu paper-item {
        cursor: pointer;
      }

      /* responsive css rules */
      @media (min-width: 850px) {

      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild(DocumentContainer.content);
