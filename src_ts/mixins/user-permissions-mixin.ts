import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { intersection, map, prop } from 'ramda';
import { Mixins as Mixins$0 } from './redux-store-mixin';
export const Mixins = Mixins$0 || {};

/**
* @polymer
* @mixinFunction
*/
Mixins$0.UserPermissions = dedupingMixin((superClass) => class extends superClass {
  constructor() {
    super();
    // @ts-ignore
    this.groups = {
      'editPartner': ['UNICEF Audit Focal Point', 'Partnership Manager', 'Senior Management Team']
    };
  }
  editPartner(user) {
    return intersection(map(prop('name'), user.groups), this.groups.editPartner).length > 0;
  }

  hasPermission(action, user) {
    return this[action](user);
  }
});
