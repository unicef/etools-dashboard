// Mixins used all over the app. This will prevent duplicating css rules

import '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/polymer/lib/elements/custom-style.js';
const DocumentContainer = document.createElement('template');

DocumentContainer.innerHTML = `<custom-style>
  <style>
    html {
      --nested-content-panel-title: {
        color: #1e86bf; /* TODO: replace with app-theme var */
        text-align: left;
        font-size: 16px;
        font-weight: bold;
      };

      --nested-content-panel-collapse-btn: {
        color: var(--dark-icon-color);
        width: 28px;
        height: 28px;
        padding: 0;
        margin-right: 15px;
      };

      --paper-fab-btn-green: {
        width: 58px;
        height: 58px;
        background: var(--paper-fab-add-color);
        z-index: 51;

      };

      --basic-btn-style: {
        width: auto;
        margin: 0;
        color: #00aeef; /* TODO: replace with app-theme var */
        padding: 0 5px 0 0;
        font-size: 14px;
        font-weight: bold;
      };

      --partner-status-wrapper: {
        @apply --layout-vertical;
        @apply --layout-center-justified;
        width: 24px;
        height: 24px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
      }
    }
  </style>
</custom-style>`;

document.head.appendChild(DocumentContainer.content);
