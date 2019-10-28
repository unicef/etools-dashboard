import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {Constructor} from '../typings/globals.types';

export function DropdownMixin<T extends Constructor<PolymerElement>>(superClass: T) {
  class DropdownMixinClass extends (superClass as Constructor<PolymerElement>) {

    // Put a button with on-tap="clearDropdown" just before
    // a paper-dropdown-menu to add a clear selection button
    public clearDropdown(e) {
      let dropdown = e.target.nextElementSibling;
      if (dropdown) {
        if (dropdown.is === 'paper-dropdown-menu') {
          let menu = dropdown.firstElementChild;
          if (menu && menu.selected) {
            menu.set('selected', null);
          }
        }
        else if (dropdown.is === 'etools-multi-selection-menu') {
          let menu = dropdown;
          if (menu.selectedValues) {
            menu.clearValues();
          }
        }
      }
    }
  }
  return DropdownMixinClass;
}
