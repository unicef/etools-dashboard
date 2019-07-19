import '@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="hact-tables-styles">
  <template>
    <style>
      :host {
        --paper-input-container-label: {
          margin-left: 34px;

        }
        --paper-tooltip-opacity: 1;
        width: 100%;
        --cell-pad-right: {
          padding-right: 10px;
        }
      }

      .buffer {
        background-color: rgb(248, 248, 248);
        border-left: 1px solid rgba(0, 0, 0, 0.24);
      }

      .hact-icon {
        --iron-icon-height: 12px;
        --iron-icon-width: 12px;
      }

      .edit-icon {
        color: var(--dark-icon-color);
        position: absolute;
        right: 10px;
        display: none;
        cursor: pointer;
      }

      .nowrap {
        white-space: nowrap;
      }

      .right {
        text-align: right !important;
        justify-content: flex-end !important;
      }

      .padding-right-10 {
        @apply --cell-pad-right;
      }

      .vertical {
        @apply --layout-horizontal;
        @apply --layout-center;
      }

      data-table-row.totals {
        --primary-background-color: var(--medium-theme-background-color);
        --custom-style: {
          background: var(--medium-theme-background-color);
          border-top: 1px solid rgba(0, 0, 0, 0.24);
          box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.24);
        }
      }

      data-table-row:hover {
        background: var(--medium-theme-background-color);
      }

      data-table-row:hover .edit-icon {
        display: block;
      }

      /* data-table-row:hover .monetary {
        box-sizing: border-box;
        justify-content: flex-end !important;
        text-align: right;
      } */

      .monetary {
          text-align: right;
          justify-content: flex-end !important;
        }

      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        padding-right: 10px;
        flex: 1;
      }

      .no-padding {
        padding: var(--paper-material-padding, 0 24px 0 24px);
      }

       data-table-row .last-col, data-table-column .last-col, .last-col {
          padding-right: 16px;
        }

      /* support for IE */

      @supports (-ms-ime-align:auto) {
        data-table-header {
          height: 74px;
          /* padding-top: 20px; */
        }
      }

      @media screen and (-ms-high-contrast: active),
      (-ms-high-contrast: none) {
        data-table-header {
          height: 74px;
          /* padding-top: 20px; */
        }
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
