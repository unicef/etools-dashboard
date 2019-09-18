import {PolymerElement} from '@polymer/polymer/polymer-element';
import {Constructor, GenericObject} from '../typings/globals.types';
import {property} from '@polymer/decorators';
import {intersection, map, prop} from 'ramda';

export function UserPermissionsMixin<T extends Constructor<PolymerElement>>(superClass: T) {
  class UserPermissionMixinClass extends (superClass as Constructor<PolymerElement>){
    
    @property({type: Object})
    groups: GenericObject = {
      editPartner: ['UNICEF Audit Focal Point', 'Partnership Manager', 'Senior Management Team']
    }

    editPartner(user) {
      return intersection(map(prop('name'), user.groups), this.groups.editPartner).length > 0;
    }

    hasPermission(action, user) {
      return this[action](user);
    }
  }
  return UserPermissionMixinClass;
};
