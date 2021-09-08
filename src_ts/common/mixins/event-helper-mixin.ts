import { PolymerElement } from '@polymer/polymer';
import { Constructor } from '../../typings/globals.types';

/**
 * @polymer
 * @mixinFunction
 */
function EventHelperMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class EventHelperClass extends baseClass {
    fireEvent(eventName, eventDetail) {
      this.dispatchEvent(
        new CustomEvent(eventName, {
          detail: eventDetail,
          bubbles: true,
          composed: true,
        })
      );
    }
  }
  return EventHelperClass;
}
export default EventHelperMixin;
