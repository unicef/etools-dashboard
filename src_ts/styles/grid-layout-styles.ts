import {html} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout';

// language=HTML
export const GridLayoutStyles = html`<style>
  .layout-horizontal,
  .layout-vertical {
    box-sizing: border-box;
  }
  .layout-horizontal {
    @apply --layout-horizontal;
  }
  .layout-vertical {
    @apply --layout-vertical;
  }
  .row-h {
    @apply --layout-horizontal;
  }
  .row-v {
    @apply --layout-vertical;
  }
  .flex-c {
    /* flex container */
    @apply --layout-flex;
  }
  .row-h, .row-v {
    padding: 16px 24px;
  }
  .row-h + .row-h, .row-v + .row-v {
    margin-top: 20px;
  }
  .row-h:first-child + .row-v {
    margin-top: 0;
  }
  .no-overflow {
    /* used to prevent flexbox to change it's size if content grows */
    overflow: hidden;
  }
  .align-center {
    align-items: center;
  }
  .center-align {
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .start-align {
    align-items: flex-start;
  }
  .align-baseline {
    align-items: baseline;
  }

  .justify-start {
    justify-content: flex-start;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .center-justified {
    @apply --layout-center-justified;
  }

  .flex-1 {
      @apply --layout-flex;
  }

  .space-between {
    @apply --layout-justified;
  }

  .space-around {
    @apply --layout-around-justified;
  }

  .col {
    @apply --layout-horizontal;
    box-sizing: border-box;
  }
  .col:not(:first-child) {
    padding-left: 24px;
  }

  .col-half {
    flex: 0 0 4.166666667%;
    max-width: 4.166666667%;
  }

  .col-1 {
    flex: 0 0 8.33333333%;
    max-width: 8.33333333%;
  }

  .col-2 {
    flex: 0 0 16.66666667%;
    max-width: 16.66666667%;
  }
  .col-20 {
    flex: 0 0 20%;
    max-width: 20%;
  }

  .col-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .col-30 {
    flex: 0 0 30%;
    max-width: 30%;
  }

  .col-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  .col-40 {
    flex: 0 0 40%;
    max-width: 40%;
  }

  .col-5 {
    flex: 0 0 41.666666%;
    max-width: 41.666666%;
  }

  .col-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .col-7 {
    flex: 0 0 58.33333%;
    max-width: 58.33333%
  }

  .col-8 {
    flex: 0 0 66.66666%;
    max-width: 66.66666%;
  }

  .col-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }

  .col-10 {
    flex: 0 0 83.33333333%;
    max-width: 83.33333333%;
  }

  .col-11 {
    flex: 0 0 91.66666667%;
    max-width: 91.66666667%;
  }

  .col-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
</style>`;
