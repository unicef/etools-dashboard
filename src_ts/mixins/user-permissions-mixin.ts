import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { intersection, map, prop } from 'ramda';
// import { Mixins } from './redux-store-mixin';
// export const Mixins = Mixins || {};

window.EtoolsDashboard = window.EtoolsDashboard || {};
window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};

/**
* @polymer
* @mixinFunction
*/
window.EtoolsDashboard.Mixins.UserPermissions = dedupingMixin((superClass) => class extends superClass {
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
