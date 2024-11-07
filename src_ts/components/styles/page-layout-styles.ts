/* This file will be dedicated to page layout and related layout elements. */
import "@polymer/polymer/polymer-element.js";
import "@polymer/iron-flex-layout/iron-flex-layout.js";
const DocumentContainer = document.createElement("template");

DocumentContainer.innerHTML = `<dom-module id="page-layout-styles">
  <template>
    <style>
      [hidden] {
        display: none;
      }
      app-header-layout {
        position: inherit;
      }

      app-header {
        background-color: #2A3B46;  /* TODO: replace with app-theme var */
      }

      div.paper-material {
        width: calc(100vw - 48px)
      }

      #pageContent {
        @apply --layout-flex;
      }

      #sidebar {
        width: 225px;
        padding-left: 24px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }

      .page-top-content {
        background-color: #ffffff; /* TODO: replace with app-theme var */
        border-bottom: 1px solid #bdbdbd; /* TODO: replace with app-theme var */
        padding: 0 24px;
        min-height: 85px;
      }

      .top-content {
        @apply --layout-vertical;
        @apply --layout-start-justified;
        @apply --layout-flex;
      }

      .top-content-row {
        @apply --layout-horizontal;
        @apply --layout-start-justified;
      }

      .top-content-row + .top-content-row {
        margin-top: 5px;
      }

      .top-content-row.title-row {
        margin: 30px 0 0;
        padding: 0 24px;
        min-height: 34px;
      }

      .title-row h1[main-title] {
        @apply --layout-flex;
        margin: 0;
        font-weight: normal;
        text-transform: capitalize;
        font-size: 24px;
        line-height: 1.3;
        min-height: 31px;
      }

      .title-row h1[sub-title]{
        margin: 0;
        font-size: 20px;
        font-weight: 500;
      }

      .title-row h2[sub-title]{
        margin: 0;
        font-size: 16px;
        font-weight: 500;
      }

      .top-content-actions-wrapper {
        @apply --layout-horizontal;
      }
      
      .top-content-action {
        @apply --layout-horizontal;
        @apply --layout-center-justified;
      }

      .top-content-action a {
        @apply --layout;
        @apply --layout-self-center;
      }
      

      .top-content-action paper-button iron-icon {
        margin-right: 10px;
      }

      .content-section:not(:first-of-type) {
        margin-top: 25px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild(DocumentContainer.content);
