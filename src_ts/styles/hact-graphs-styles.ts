import '@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="hact-graph-styles">
  <template>
    <style>
      .completed {
        font-weight: 500;
        font-size: 24px;
        color: #000;
      }

      .subheading {
        font-size: 11px;
      }

      .sub-col {
        padding-left: 12px;
      }

      .financial-col  {
        margin: 16px 24px;
      }

      .financial-col > div {
        border-bottom: 1px solid var(--divider-light-color);
        line-height: 32px;
        padding: 0 12px;
      }

      .label {
        font-size: 13px;
      }

      .risk-ratings {
        line-height: 16px;
      }

      .risk-ratings > div {
        border-bottom: 1px solid var(--divider-light-color);
        padding: 8px 0;
      }

      .ratings-wrapper {
        padding-top: 32px;
        margin-left: 24px;
      }

      .financial-highlight {
        background-color: var(--medium-theme-background-color);
      }

      .financial-col .audit-line:not(:last-of-type) {
        border-bottom: none;
      }

      .risk-rating-title {
        color: var(--secondary-text-color);
        margin-bottom: 12px;
        font-size: 14px;
      }

      .marker {
        height: 18px;
        width: 6px;
      }

      .risk-not-required {
        background-color: #D8D8D8;
      }

      .risk-low {
        background-color: #2FB0F2;
      }

      .risk-medium {
        background-color: #FFCC00;
      }

      .risk-significant {
        background-color: #F05454;
      }

      .risk-high {
        background-color: #740E0E;
      }

      .spot-checks-table {
        margin-top: 20%;
      }

      .coverage-pie {
        width: 100%;
        height: 220px;
      }

    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
