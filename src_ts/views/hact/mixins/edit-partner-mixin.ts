import '../../../mixins/event-helper-mixin';
import '../../../mixins/user-permissions-mixin';
import { Mixins as Mixins$0 } from '../../../mixins/redux-store-mixin';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';
export const Mixins = Mixins$0 || {};

/**
 *
 * @polymerMixin
 * @mixinFunction
 */
Mixins$0.HactEditPartner = dedupingMixin((base) =>

  class extends Mixins$0.EventHelper(
    Mixins$0.UserPermissions(base)) {
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
      this.fireEvent('edit-partner', model.partner);
    }
  });
