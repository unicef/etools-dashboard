import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { Mixins as Mixins$0 } from './redux-store-mixin';
export const Mixins = Mixins$0 || {};

/**
* @polymer
* @mixinFunction
*/
Mixins$0.EventHelper = dedupingMixin((baseClass) => class extends baseClass {

  fireEvent(eventName, eventDetail) {
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: eventDetail,
      bubbles: true,
      composed: true
    }));
  }
});

window.Mixins.EventHelper = Mixins$0.EventHelper;
