// This file will be dedicated to theming
// variables used throughout the app

import '@polymer/polymer/polymer-element.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import '@polymer/polymer/lib/elements/custom-style.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/paper-styles/color.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<custom-style>
  <style>
    html {
      --primary-background-color: #FFFFFF;
      --primary-color: #0099ff;
      --secondary-color: #0099FF;
      --secondary-background-color: var(--paper-indigo-700);
      --ternary-background-color: var(--paper-indigo-800);
      --accent-color: #0099FF;
      --error-color: var(--paper-deep-orange-a700);
      --dark-primary-text-color: rgba(0, 0, 0, 0.87);
      --primary-text-color: rgba(0, 0, 0, 0.87);
      --secondary-text-color: rgba(0, 0, 0, 0.54);
      --light-primary-text-color: rgba(255, 255, 255, 1);
      --dark-secondary-text-color: rgba(0, 0, 0, 0.54);
      --light-secondary-text-color: rgba(255, 255, 255, 0.7);
      --dark-disabled-text-color: rgba(182, 147, 147, 0.38);
      --light-disabled-text-color: rgba(255, 255, 255, 0.5);
      --dark-icon-color: rgba(0, 0, 0, 0.54);
      --light-icon-color: rgba(255, 255, 255, 1);
      --dark-disabled-icon-color: rgba(0, 0, 0, 0.38);
      --light-disabled-icon-color: #eaeaea;
      --dark-divider-color: rgba(0, 0, 0, 0.12);
      --light-divider-color: rgba(255, 255, 255, 0.12);
      --dark-hover-color: rgba(0, 0, 0, 0.01);
      --light-hover-color: rgba(255, 255, 255, 0.01);
      --dark-ink-color: rgba(0, 0, 0, 0.38);
      --light-ink-color: rgba(255, 255, 255, 0.3);
      --light-theme-background-color: var(paper-grey-50);
      --light-theme-content-color: #FFFFFF;
      --title-toolbar-secondary-text-color: #C7CED2;
      --gray-light: rgba(0, 0, 0, 0.38);
      --dark-theme-background-color: #233944;

      --nonprod-header-color: #a94442;
      --nonprod-text-warn-color: #e6e600;
      --header-bg-color: var(--dark-theme-background-color);

      --error-color: #ea4022;
      --light-error-color: #f1b8ae;
      --dark-error-color: #c5102a;

      --paper-toggle-button-checked-bar-color: #88D4F7;
      --paper-toggle-button-checked-button-color: #3baaee;
      
      --partnership-management-color: var(--primary-background-color);
      --dashboards-toolbar-color: #009A54;
      --work-planning-color: var(--paper-light-green-500);
      --field-monitering-color: var(--paper-green-500);
      --app-selector-icon-color: rgba(0, 0, 0, 0.87);
      --app-selector-text-color: rgba(0, 0, 0, 0.87);
      --primary-element-background: #FFFFFF;
      --toolbar-height: 60px;
      --medium-theme-background-color: #EEEEEE;
      --side-bar-scrolling: hidden;
      --list-item-hover-color: #e8e8e8;
      --title-toolbar-secondary-text-color: #BCC1C6;
      --trip-color-one: #FCF39F;
      --trip-color-two: #BFE58A;
      --trip-color-three: #64BD00;
      --trip-color-four: #009a54;
      --trip-heading: rgba(0, 0, 0, 0.54);
      --esmm-external-wrapper: {
        width: 100%;
        margin: 0;
      };
    }
  </style>

</custom-style>`;

document.head.appendChild($_documentContainer.content);

;
