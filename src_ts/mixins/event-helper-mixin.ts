import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
// import { Mixins } from './redux-store-mixin';
// export const Mixins = Mixins || {};

window.EtoolsDashboard = window.EtoolsDashboard || {};
window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};

/**
* @polymer
* @mixinFunction
*/
window.EtoolsDashboard.Mixins.EventHelper = dedupingMixin((baseClass) => class extends baseClass {

  fireEvent(eventName, eventDetail) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: eventDetail,
      bubbles: true,
      composed: true
    }));
  }
});

// window.Mixins.EventHelper = Mixins.EventHelper;
