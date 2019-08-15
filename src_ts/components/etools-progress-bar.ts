import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-progress/paper-progress.js';
import { property, customElement } from '@polymer/decorators';
// import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';

// const EtoolsProgressBarMixin = EtoolsMixinFactory.combineMixins([], PolymerElement);

/**
 * @polymer
 * @customElement
 * @extends {PolymerElement}
 */
@customElement('etools-progress-bar')
export class EtoolsProgressBar extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          @apply --layout-horizontal;
          @apply --layout-center;

          --paper-progress-active-color: #72C300;
          --paper-progress-secondary-color: var(--primary-background-color);
          --paper-progress-height: 10px;
        }

        /* #progress-percent {
          margin-left: 16px;
          min-width: 56px;
        } */

        paper-progress {
          width: var(--etools-progress-bar-width, 200px);
        }

        @media print {

          paper-progress {
            position: relative;
          }

          paper-progress::before,
          paper-progress::after {
            content: ' ';
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            height: 0;
          }

          paper-progress::before {
            z-index: 1;
            right: 0;
            border-bottom: 10px solid var(--paper-progress-container-color, var(--google-grey-300));
          }

          paper-progress::after {
            z-index: 1;
            border-bottom: 10px solid #72C300;
            width: var(--etools-progress-width-on-print, 0%);
          }
        }
      </style>
      <div>
        <paper-progress value="[[progressValue]]" secondary-progress="[[_getSecondaryProgress(progressValue)]]"></paper-progress>
      </div>
    `;
  }

  // static get is() {
  //   return 'etools-progress-bar';
  // }

  @property({type: Number})
  value: number = 0;

  @property({type: Number, readOnly: true})
  progressValue: number = this._getProgress(this.value);

  @property({type: Boolean})
  noDecimals: boolean = false;

  // static get properties() {
  //   return {
  //     value: {
  //       type: Number,
  //       value: 0
  //     },
  //     progressValue: {
  //       type: Number,
  //       readOnly: true,
  //       computed: '_getProgress(value)'
  //     },
  //     noDecimals: {
  //       type: Boolean,
  //       value: false
  //     }
  //   };
  // }

  _getProgress(value) {
    value = parseFloat(parseFloat(value).toFixed(2));
    if (isNaN(value)) {
      return 0;
    }
    value = (value > 100) ? 100 : value; // cannot be bigger than 100
    value = (value < 0) ? 0 : value; // cannot be less that 0

    this.updateStyles({'--etools-progress-width-on-print': value + '%'});

    return value;
  }

  /**
   * Secondary progress is used only to show a delimited at the end of the active progress.
   * It will always be 0 (value = 0 || 100) or value + 1
   * @param {number} value
   * @return {number}
   */
  _getSecondaryProgress(value) {
    return (value > 0 && value < 100) ? (value + 1) : 0;
  }

  _prepareDisplayedValue(value) {
    return parseFloat(value).toFixed(this.noDecimals ? 0 : 2);
  }
}

// window.customElements.define(EtoolsProgressBar.is, EtoolsProgressBar);
