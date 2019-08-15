import { PolymerElement } from '@polymer/polymer/polymer-element';
import { Constructor } from '../typings/globals.types';
import {property} from '@polymer/decorators';
// import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { intersection, map, prop } from 'ramda';
// import { Mixins } from './redux-store-mixin';
// export const Mixins = Mixins || {};

// window.EtoolsDashboard = window.EtoolsDashboard || {};
// window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};

/**
* @polymer
* @mixinFunction
*/
export function UserPermissionsMixin<T extends Constructor<PolymerElement>>(superClass: T) {
  class UserPermissionMixinClass extends (superClass as Constructor<PolymerElement>){
    @property({type: Object})
    groups: object = {
      'editPartner': ['UNICEF Audit Focal Point', 'Partnership Manager', 'Senior Management Team']
    }

    editPartner(user) {
      // @ts-ignore
      return intersection(map(prop('name'), user.groups), this.groups.editPartner).length > 0;
    }

    hasPermission(action, user) {
      return this[action](user);
    }
  }
  return UserPermissionMixinClass;
};
