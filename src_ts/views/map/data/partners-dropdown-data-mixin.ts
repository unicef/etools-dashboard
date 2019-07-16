import '../../../mixins/data-element-mixin';
import '../../../mixins/event-helper-mixin';
import { Mixins as Mixins$0 } from '../../../mixins/redux-store-mixin';
import { compose } from '../../../scripts/ramda-utils';
export const Mixins = Mixins$0 || {};

const EtoolsPartnersDropdownMixin = compose(
  Mixins$0.EventHelper,
  Mixins$0.DataElement
);
/**
 *
 * @polymerMixin
 * @mixinFunction
 */
Mixins$0.PartnersDropdownData = (superclass) =>
  class extends EtoolsPartnersDropdownMixin(superclass) {
    static get properties() {
      return {
        endpointName: {
          type: String,
          value: 'partnersDropdown'
        },
        partners: {
          type: Array,
          notify: true,
          readOnly: true
        },
        loadedInitially: {
          type: Boolean,
          value: false
        }

      };
    }

    // ready() {
    //   super.ready();
    //   if (!this.loadedInitially) {
    //     this.fireEvent('global-loading', { message: 'Loading partners data...', active: true, loadingSource: 'partners-dropdown' });
    //     this.set('loadedInitially', true);
    //   }
    // }

    _handleMyResponse(data) {
      const filteredPartners = data.reduce(
        (filtered, partner)=> {
          if(!partner.name) {
            return filtered;
          }
          filtered.push({
            value: parseInt(partner.id),
            label: partner.name
          });
          return filtered;
        }, []
      );

      this._setPartners(filteredPartners);
      this.fireEvent('global-loading', { active: false });
    }

  };
