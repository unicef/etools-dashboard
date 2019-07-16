import { Mixins as Mixins$0 } from './redux-store-mixin';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';
import { intersection, map, prop } from '../scripts/ramda-utils';
export const Mixins = Mixins$0 || {};

/**
* @polymer
* @mixinFunction
*/
Mixins$0.UserPermissions = dedupingMixin((superClass) => class extends superClass {
  constructor() {
    super();
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
