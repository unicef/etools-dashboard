import '@polymer/polymer/polymer-element.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
import '../../../mixins/event-helper-mixin';
import '../../../mixins/ajax-server-errors-mixin';
import '../../../endpoints/endpoints-mixin';
// import { Mixins } from '../../../mixins/redux-store-mixin';
import { db } from '../../../config/dexie-db-config';
// export const Mixins = Mixins || {};

window.EtoolsDashboard = window.EtoolsDashboard || {};
window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};

window.EtoolsDashboard.Mixins.PartnerItemData = dedupingMixin((base) =>

  class extends EtoolsAjaxRequestMixin(
    window.EtoolsDashboard.Mixins.EventHelper(
      window.EtoolsDashboard.Mixins.AjaxServerErrors(
        window.EtoolsDashboard.Mixins.Endpoints(base)))) {

    static get properties() {
      return {
        endpoints: {
          type: Object,
          value: {
            DETAILS: 'partnerDetails',
            PROGVISITS: 'programmaticVisits'
          }
        }
      };
    }

    savePartnerDetails(body, partnerId, cb) {
      const params = {
        method: 'PATCH',
        endpoint: this.getEndpoint(this.endpoints.DETAILS, { id: partnerId }),
        body
      };
      this.sendRequest(params)
      .then((resp)=>{
        db.partners.put(resp)
        .then(()=>cb());
      })
      .catch((err)=> this.handleErrorResponse(err));
    }
  });
