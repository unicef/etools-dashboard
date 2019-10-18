// import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
// import '@polymer/iron-icon/iron-icon.js';
// import { fireEvent } from '../../components/utils/fire-custom-event';
// // import { Mixins } from '../../mixins/redux-store-mixin';
// // import * as _ from 'lodash-es';
// import isEmpty from 'lodash-es/isEmpty';
// import { customElement, property, observe } from '@polymer/decorators';
// import { GenericObject } from '../../typings/globals.types';

// @customElement('data-table-column')
// export class DataTableColumn extends (PolymerElement) {
//   static get template() {
//     return html`
//       <style>
//         :host {
//           @apply --layout-horizontal;
//           @apply --layout-center;
//           height: 56px;
//           font-size: 12px;
//           color: var(--secondary-text-color);
//           font-weight: 500;
//           white-space: nowrap;
//           @apply --column-height;
//         }

//         :host([sortable]) {
//           cursor: pointer;
//         }

//         #label {
//           -webkit-user-select: none;
//           -moz-user-select: none;
//           -ms-user-select: none;
//           user-select: none;
//         }

//         #icon-wrapper, iron-icon {
//           width: 16px;
//           height: 16px;
//           @apply --icon-display;
//         }

//         #up, #down {
//           display: none;
//         }

//         .group-wrapper {
//           @apply --layout-vertical;
//           @apply --layout-flex;
//         }

//         #label.is-group {
//           @apply --layout-horizontal;
//           @apply --layout-center;
//           @apply --layout-justified;
//           @apply --custom-style;
//           padding-top: 0;
//           margin-right: 0;
//         }

//         .group-heading {
//           /* border-bottom: 1px solid rgba(0, 0, 0, 0.12); */
//           border-bottom: var(--header-bottom-line, 1px solid rgba(0, 0, 0, 0.12));
//           padding-bottom: 10px;
//           padding-top: 10px;
//           width: 100%;
//           text-align: center;
//           white-space: nowrap;
//         }

//         :host(:not([selected]):hover[sortable]) #up {
//           display: block;
//         }

//         :host([selected]) #label,
//         :host(:not([selected]):hover[sortable]) #label {
//           color: var(--primary-text-color, rgba(0, 0, 0, 0.87));
//         }

//         :host([selected][direction="asc"]) #up {
//           display: block;
//         }

//         :host([selected][direction="desc"]) #down {
//           display: block;
//         }

//         :host(:not([selected])) iron-icon {
//           color: var(--sort-icon-hover-color, rgba(0, 0, 0, 0.38));
//         }

//         :host([selected]) iron-icon {
//           color: var(--sort-icon-color, rgba(0, 0, 0, 0.87));
//         }
//       </style>

//       <div id="groupWrapper" class="group-wrapper">
//         <template is="dom-if" if="[[groupHeading]]">
//           <span class="group-heading">[[groupHeading]]</span>
//         </template>
//         <span id="label">
//             <slot></slot>
//           </span>
//       </div>

//       <div id="iconWrapper" class="icon-wrapper">
//         <iron-icon id="up" icon="arrow-upward"></iron-icon>
//         <iron-icon id="down" icon="arrow-downward"></iron-icon>
//       </div>
//     `;
//   }

//   @property({type: Boolean, reflectToAttribute: true})
//   selected: boolean = false;

//   @property({type: String})
//   field: string

//   @property({type: String, reflectToAttribute: true})
//   direction: string

//   @property({type: String})
//   groupHeading: string;
  
//   @property({type: String})
//   headingAlign: string = 'center';

//   @property({type: Boolean})
//   spaceAround: boolean = false;

//   @property({type: Boolean})
//   transparent: boolean = false;

//   ready() {
//     this.addEventListener('tap', this._sort);
//     super.ready()
//   }

//   connectedCallback() {
//     super.connectedCallback();
//     if (!this.hasAttribute('sortable')) {
//       this.updateStyles({['--icon-display']: 'display: none'});
//     }
//   }

//   _sort() {
//     if (!this.hasAttribute('sortable')) {
//       return;
//     }
//     if (!this.selected || !this.direction) {
//       this.set('selected', true);
//       this.set('direction', 'asc');
//     } else {
//       this.set('direction', this.direction === 'asc' ? 'desc' : 'asc');
//     }
//     fireEvent(this, 'sort-changed', {field: this.field, direction: this.direction});
//   }

//   @observe('headingAlign')
//   _changeHeadingAlign() {
//     if (!isEmpty(this.groupHeading)) {
//       // @ts-ignore
//       this.$.heading.updateStyles({['group-heading.text-align']: this.headingAlign})
//     }
//   }

//   @observe('groupHeading', 'spaceAround')
//   _isGroup() {
//     if (!isEmpty(this.groupHeading)) {
//       this.$.label.classList.add('is-group');
//       this.updateStyles({['--column-height']: 'height: auto'});
//     }
//   }

//   // allows for including headings that are not part of a group without altering spacing
//   _makeTransparent() {
//     if (this.transparent) {
//       let x: GenericObject = this.$.groupWrapper;
//       x.style.color = "transparent";
//     }
//   }
// }
