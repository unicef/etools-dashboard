import {html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout';

// language=HTML
export const ListStyles = html`<style>
 :host {
    @apply --layout-flex;
    font-weight: 400;
    --paper-input-container-color: var(--secondary-text-color);
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }

  a {
    color: var(--accent-color);
  }

  .flex-c {
    @apply --layout-flex;
  }

  .list-panel {
    margin-bottom: 24px;
  }

  .listControls {
    display: flex !important;
    flex-direction: row;
    padding-top: 8px;
    padding-bottom: 8px;
    min-height: 86px;
    box-sizing: border-box;
  }

  .wrap-controls,
  .fixed-controls,
  .wrap-controls .filter,
  .controls-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .wrap-controls, .wrap {
    @apply --layout-wrap;
  }

  .wrap-controls>*:not(:last-child) {
    margin-right: 16px;
  }

  .wrap-controls paper-input {
    min-width: 200px;
  }

  .fixed-controls {
    @apply --layout-end-justified;
    margin-left: auto;
    white-space: nowrap;
  }



  .button {
    color: var(--accent-color);
    text-transform: uppercase;
  }



  #hiddenToggle {
    @apply --layout-horizontal;
    padding: 10px 8px 10px 8px;
    cursor: pointer;
    font-weight: normal;
    font-size: 16px;
  }

  #hiddenToggle paper-toggle-button {
    margin-left: 10px;
  }

  #list {
    display: block;
    opacity: 1;
    transition: opacity 0.4s;
    background-color: #FFFFFF;
    padding: 0;
  }

  #list.hidden {
    transition: none;
    opacity: 0;
  }

  *[slot="row-data"],
  *[slot="row-data-details"] {
    @apply --layout-horizontal;
    @apply --layout-flex;
    @apply --layout-center;
  }



  *[slot="row-data"] {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .row-details-content {
    font-size: 12px;
  }

  .row-details-content .rdc-title {
    display: inline-block;
    width: 100%;
    color: var(--secondary-text-color, rgba(0, 0, 0, 0.54));
    font-weight: bold;
    margin-bottom: 10px;
  }

  .col-data {
    font-weight: normal;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  *[slot="row-data"] .col-data {
    line-height: 24px;
  }

  a.col-data,
  .description a {
    font-weight: 400;
    cursor: pointer;
  }

  a.col-data:not(:first-child) {
    padding-left: 8px;
  }

  .list-panel a {
    padding-right: 24px;
  }

  .list-content {
    /*7 list items max visible 49px x 7*/
    max-height: 343px;
    overflow: scroll;
  }

  .suppData {
    font-size: 12px;
    color: var(--dark-ink-color);
  }

  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 24px;
  }

  .description-size {
    max-width: 66.66666%;
  }

  .trip {
    @apply --layout-horizontal;
    @apply --layout-justified;
    @apply --layout-center;
    font-weight: 500;
    padding: 16px 24px;
    min-width: 200px;
    box-sizing: border-box;
    min-height: 64px;
  }

  .trip h1 {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 500;
    margin: 0;
    line-height: 16px;
  }

  .trips {
    @apply --layout-wrap;
    @apply --layout-horizontal;
  }

  .paper-material.half-paper {
    width: calc(50% - 6px);
    height: 100%;
  }

  .half-paper:nth-child(1) {
    margin-right: 12px;
  }

  .clear-pad {
    padding: 0;
  }

  .tabs-header {
    border-bottom: 1px solid var(--dark-divider-color, rgba(0, 0, 0, 0.12));
  }

  .trip-type-one,
  .trip-type-one h1 {
    background: var(--trip-color-one);
    color: var(--trip-heading);
  }

  .trip-type-two,
  .trip-type-two h1 {
    background: var(--trip-color-two);
    color: var(--trip-heading);
  }

  .trip-type-three,
  .trip-type-three h1 {
    background: var(--trip-color-three);
    color: var(--light-primary-text-color);
  }

  .trip-type-four,
  .trip-type-four h1 {
    background: var(--trip-color-four);
    color: var(--light-primary-text-color);
  }
</style>`;
