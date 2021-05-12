import {html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout';

// language=HTML
export const PartnershipsStyles = html`<style>
  #query {
    padding-left: 24px;
  }

  .right-align {
    text-align: right;
    padding-right: 8px;
  }

  .text-right {
    text-align: right;
  }

  div.sections.col-data {
    height: 48px;
    white-space: normal;
    overflow-y: auto;
    display: flex;
    align-items: center;
    line-height: normal;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  paper-icon-item {
    --paper-item-icon-width: 32px;
  }

  paper-menu-button {
    padding: 0;
  }

  paper-icon-button.remove-field.remove.red {
    top: 0;
  }

  div.alerts-panel div.alert-row {
    width: 50%;
  }

  .alert-row div[slot="row-data"] {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    width: 100%;
  }

  .alerts-panel {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .filter-name {
    cursor: pointer;
    white-space: nowrap;
  }

  .filter-name:hover {
    color: #0099FF;
  }

  .alerts-title {
    color: rgba(0,0,0,0.54);
    font-size: 13px;
    font-weight: 500;
    line-height: 15px;
  }

  .alerts-comment {
    color: rgba(0,0,0,0.54);
    font-size: 10px;
    font-weight: 500;
    line-height: 15px;
  }

  .alerts-total {
    text-align: right;
    padding-right: 16px;
  }

  .clear-button {
    opacity: 0.0;
  }

  div[slot="row-data"] {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>`
