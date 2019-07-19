// import { Mixins } from './redux-store-mixin';
// export const Mixins = Mixins || {};

window.EtoolsDashboard = window.EtoolsDashboard || {};
window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};

/**
 * @polymer
 * @mixinFunction
 */
window.EtoolsDashboard.Mixins.Dropdown = (superClass) => class extends superClass {
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
