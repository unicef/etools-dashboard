import { Mixins as Mixins$0 } from './redux-store-mixin';
export const Mixins = Mixins$0 || {};

/**
 * @polymer
 * @mixinFunction
 */
Mixins$0.Dropdown = (superClass) => class extends superClass {
  constructor() {
    super()
  }
  // Put a button with on-tap="clearDropdown" just before
  // a paper-dropdown-menu to add a clear selection button
  clearDropdown(e) {
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
          menu.clearValues()
        }
      }
    }
  }
}
