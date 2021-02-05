import {PolymerElement} from '@polymer/polymer';
import {Constructor, GenericObject} from '../typings/globals.types';

/**
 * @polymer
 * @mixinFunction
 */
function CommonGeneralMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class CommonGeneralClass extends baseClass {

  }
  return CommonGeneralClass;
}
export default CommonGeneralMixin;
