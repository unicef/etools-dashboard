import '@polymer/polymer/polymer-element';
import '@polymer/iron-flex-layout/iron-flex-layout';
import './app-mixins';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="buttons-styles">
  <template>
    <style>
      :host > * {
        --primary-button-default: {
          color: var(--light-primary-text-color, #fff);
          font-weight: bold;
          padding: 5px 10px;
        };

         --primary-button-with-prefix: {
          padding: 5px 10px 5px 16px;
        };
      }

      .buttons-section {
        border-top: 1px solid var(--dark-divider-color);
        padding: 25px;
      }

      .buttons-section.horizontal {
        @apply --layout-horizontal;
      }

      .buttons-section.vertical {
        @apply --layout-vertical;
      }

      a.text-button {
        color: var(--ecp-header-bg);
        text-transform: uppercase;
        cursor: pointer;
        padding-bottom: 8px;
      }

      .buttons-section.vertical .primary-btn:not(:first-of-type) {
        margin-top: 15px;
      }

      .primary-btn {
        background-color: var(--primary-color, #0099ff);
        --paper-button: {
          @apply --primary-button-default;
        };
      }
      
      .primary-btn[disabled] {
        background-color: var(--light-disabled-icon-color);
      }

      .danger-btn {
        background-color: #E54F2E; /* TODO: replace with app-theme var */
      }

      .warning-btn {
        background-color: #F7A14B; /* TODO: replace with app-theme var */
      }

      .success-btn {
        background-color: #75c300; /* TODO: replace with app-theme var */;
      }

      .primary-btn.with-prefix {
        --paper-button: {
          @apply --primary-button-default;
          @apply --primary-button-with-prefix;
        };
      }

      paper-button.w100 {
        width: 100%;
        margin-right: 0;
        margin-left: 0;
      }

      .secondary-btn-wrapper {
        width: 100%;
        --paper-input-container-input: {
          @apply --basic-btn-style;
        };
      }

      .secondary-btn {
        --paper-button: {
          @apply --basic-btn-style;
        };
      }

      .secondary-btn iron-icon {
        margin-right: 5px;
      }

      /* responsive css rules */
      @media (min-width: 850px) {

      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
