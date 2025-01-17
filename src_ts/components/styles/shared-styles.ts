import {html} from 'lit';

export const sharedStyles = html`
  <style>
    *[hidden] {
      display: none !important;
    }
    .layout-vertical,
    .layout-horizontal {
      padding: 16px 24px;
    }

    h1 {
      font-size: var(--etools-font-size-24, 24px);
      font-weight: normal;
      margin: 16px 0;
      color: var(--primary-text-color);
    }

    a {
      text-decoration: inherit;
      color: inherit;
    }

    a.primary {
      color: var(--primary-color);
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

    .tab-link {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div[elevation] {
      padding: 15px 20px;
      background-color: var(--primary-background-color);
    }

    etools-icon.dark {
      --etools-icon-fill-color: var(--dark-icon-color);
    }

    etools-icon.light {
      --etools-icon-fill-color: var(--light-icon-color);
    }

    etools-icon-button.dark {
      color: var(--dark-icon-color);
      --etools-icon-button-ink-color: var(--dark-ink-color);
    }

    etools-icon-button.light {
      color: var(--light-icon-color);
      --etools-icon-button-ink-color: var(--light-ink-color);
    }

    .dropdown-with-clear-btn etools-icon-button.clear,
    .dropdown-with-clear-btn etools-icon-button.remove,
    etools-icon-button.remove-field.remove {
      --etools-icon-font-size: var(--etools-font-size-35, 35px);
      top: 10px;
    }

    .dropdown-with-clear-btn etools-icon-button.remove,
    etools-icon-button.remove-field.remove {
      color: var(--icon-delete-color);
    }

    .dropdown-with-clear-btn {
      display: flex;
      align-items: center;
    }

    datepicker-lite[readonly],
    etools-dropdown[readonly],
    etools-dropdown-multi[readonly],
    etools-currency[readonly],
    .form-field-wrapper {
      width: 100%;
    }

    .custom-field-wrapper {
      padding: 8px 0;
    }

    .capitalize {
      text-transform: capitalize;
    }

    .input-label {
      min-height: 24px;
      padding-top: 4px;
      min-width: 0;
    }

    .input-label[empty]::after {
      content: '—';
      color: var(--secondary-text-color);
    }
    .placeholder-style {
      color: var(--secondary-text-color);
      font-size: var(--etools-font-size-16, 16px);
    }

    /* responsive css rules */
    @media (min-width: 850px) {
    }
    .w100 {
      width: 100%;
    }
    .header-text {
      font-size: var(--etools-font-size-12, 12px);
      color: var(--list-secondary-text-color, #757575);
      font-weight: bold;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .p-relative {
      position: relative;
    }

    .break-word {
      word-break: break-word;
      word-wrap: break-word; /* for IE */
      width: 100%;
    }

    etools-content-panel::part(ecp-header) {
      background-color: var(--primary-background-color);
      border-bottom: 1px groove var(--dark-divider-color);
    }

    etools-content-panel::part(ecp-header-title) {
      font-size: var(--etools-font-size-18, 18px);
      font-weight: 500;
      text-align: left;
    }

    etools-content-panel::part(ecp-content) {
      padding: 0;
      overflow: hidden;
    }
  </style>
`;
