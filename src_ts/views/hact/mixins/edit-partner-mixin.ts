import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { fireEvent } from '../../../components/utils/fire-custom-event';
import '../../../mixins/user-permissions-mixin';
// import { Mixins } from '../../../mixins/redux-store-mixin';
// export const Mixins = Mixins || {};

window.EtoolsDashboard = window.EtoolsDashboard || {};
window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};

/**
 *
 * @polymerMixin
 * @mixinFunction
 */
window.EtoolsDashboard.Mixins.HactEditPartner = dedupingMixin((base) =>

  class extends window.EtoolsDashboard.Mixins.UserPermissions(base) {
    constructor() {
      super();
    }

    static get properties() {
      return {
        canEditPartner: {
          type: Boolean,
          computed: 'hasPermission(\'editPartner\',user)'
        }
      };
    }

    dispatchEditRequest({ model }) {
      fireEvent(this, 'edit-partner', model.partner);
    }
  });
