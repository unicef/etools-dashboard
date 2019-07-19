// import { Mixins } from './redux-store-mixin';
// export const EtoolsDashboard = window.EtoolsDashboard || {};
// export const Mixins = Mixins || {};

window.EtoolsDashboard = window.EtoolsDashboard || {};
window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};
/**
* @polymer
* @mixinFunction
*/
window.EtoolsDashboard.Mixins.AppNavigationHelper = (baseClass) => class extends baseClass {
  static get properties() {
    return {
      disableLoadingAfterAppStateChanged: Boolean
    };
  }
  /**
   * Update app state
   */
  updateAppState(routePath, qs, dispatchLocationChange) {
    // Using replace state to change the URL here ensures the browser's
    // back button doesn't take you through every query
    let currentState = window.history.state;
    window.history.replaceState(currentState, null,
      routePath + (qs.length ? '?' + qs : ''));

    if (dispatchLocationChange) {
      // This event lets app-location and app-route know
      // the URL has changed
      window.dispatchEvent(new CustomEvent('location-changed'));
    }
  }

  /**
   * Change app state
   */
  changeAppState(url) {
    if (!url) {
      return;
    }
    window.history.pushState(window.history.state, null, url);
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

};
