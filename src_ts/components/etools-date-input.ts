import { PolymerElement } from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-input/paper-input';
import { IronValidatableBehavior } from '@polymer/iron-validatable-behavior/iron-validatable-behavior';
// import 'etools-datepicker/etools-datepicker-button';
import '../mixins/date-mixin';
import '../styles/shared-styles';
import { Mixins } from '../mixins/redux-store-mixin';
import { html } from '@polymer/polymer/lib/utils/html-tag';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

/**
 * @polymer
 * @mixinFunction
 */
const EtoolsDateInputRequiredMixins = Mixins.Date(PolymerElement);
/**
 * @polymer
 * @customElement
 * @appliesMixin EtoolsDashboard.Mixins.Date
 */
class EtoolsDateInput extends
    mixinBehaviors([IronValidatableBehavior], EtoolsDateInputRequiredMixins) {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        @apply --etools-date-input;
      }

      /* TODO: Find a way to separate readonly CSS from shared-styles, and use it here,
      then include it in shared-styles(do not use shared-styles here) */
    </style>

    <paper-input id="dateInput" label="[[label]]" value="[[prettyDate(value)]]" placeholder="[[placeholder]]" on-down="openDatePicker" on-keypress="openDatePicker" data-selector="datePickerButton" disabled\$="[[disabled]]" required\$="[[required]]" invalid\$="[[invalid]]" error-message="[[_getErrorMessage(errorMessage, invalid)]]">
      <span slot="prefix">
        <iron-icon icon="date-range" hidden\$="[[!readonly]]"></iron-icon>
        <etools-datepicker-button id="datePickerButton" format="YYYY-MM-DD" pretty-date="{{value}}" json-date="{{jsonValue}}" date="[[prepareDatepickerDate(value)]]" is-disabled\$="[[_disabledDatepicker(readonly, disabled)]]" hidden\$="[[readonly]]" no-init="[[noInit]]" open="{{open}}" show-clear-btn="[[showClearBtn]]" fire-date-has-changed="[[fireDateHasChanged]]">
        </etools-datepicker-button>
      </span>
    </paper-input>
`;
  }

  static get is() {
    return 'etools-date-input';
  }

  static get properties() {
    return {
      label: String,
      value: {
        value: null,
        notify: true
      },
      jsonValue: {
        value: null,
        notify: true
      },
      placeholder: {
        type: String,
        value: '—'
      },
      noInit: Boolean,
      showClearBtn: Boolean,
      readonly: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_readonlyStateChange'
      },
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      fireDateHasChanged: {
        type: Boolean,
        value: false
      },
      required: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_requiredChange'
      },
      autoValidate: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      invalid: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      open: {
        type: Boolean,
        value: false,
        notify: true,
        observer: '_openChanged'
      },
      errorMessage: {
        type: String,
        value: 'Please select a date'
      },
      format: {
        type: String,
        value: 'YYYY-MM-DD'
      },
      elemAttached: {
        type: Boolean,
        value: false
      },
      validator: String
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.set('elemAttached', true);
    // makes the input not be editable while keeping the way it looks
    this.$.dateInput.set('readonly', true);
  }

  _readonlyStateChange(newValue, oldValue) {
    this._refreshStyles(newValue, oldValue);
  }

  _requiredChange(newValue, oldValue) {
    this._refreshStyles(newValue, oldValue);
  }

  _refreshStyles(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.updateStyles();
    }
  }

  _disabledDatepicker(readonly, disabled) {
    return readonly || disabled;
  }

  _openChanged(datepickerOpen) {
    // elemAttached condition is to prevent eager validation
    if (this.autoValidate && !datepickerOpen && this.elemAttached) {
      this.validate();
    }
  }

  /**
   * overwrites default functionality from iron-input
   * @return {boolean}
   */
  validate() {
    let hasValidator = this.hasValidator();
    let valid = true;

    if (hasValidator) {
      // custom validator provided, use it to validate this field
      valid = this.validate.call(this, this.value);
    } else {
      // let paper-input use it's default validator
      valid = this.$.dateInput.validate();
    }

    this.set('invalid', !valid);
    return valid;
  }

  resetInvalidState() {
    this.set('invalid', false);
    // because `invalid` has one-way binding, the paper-input doesn't always follow the invalid flag
    // so to make sure, we have to set it manually
    this.$.dateInput.set('invalid', false);
  }

  // prevents the element from rendering an error message container when valid
  _getErrorMessage(message, invalid) {
    return invalid ? message: '';
  }
}

window.customElements.define(EtoolsDateInput.is, EtoolsDateInput);
