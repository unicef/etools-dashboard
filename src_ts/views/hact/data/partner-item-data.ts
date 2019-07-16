import '@polymer/polymer/polymer-element';
import '../../../mixins/event-helper-mixin';
import '../../../mixins/ajax-server-errors-mixin';
import '../../../endpoints/endpoints-mixin';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin';
import { Mixins as Mixins$0 } from '../../../mixins/redux-store-mixin';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';
import { DexieDb } from '../../../config/dexie-db-config';
import { compose } from '../../../scripts/ramda-utils';
export const Mixins = Mixins$0 || {};

const EtoolsPartnerDataBaseMixin = compose(
  EtoolsAjaxRequestMixin,
  Mixins$0.EventHelper,
  Mixins$0.AjaxServerErrors,
  Mixins$0.Endpoints
);

Mixins$0.PartnerItemData = dedupingMixin((base) =>

  class extends EtoolsPartnerDataBaseMixin(base) {

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
        DexieDb.partners.put(resp)
        .then(()=>cb());
      })
      .catch((err)=> this.handleErrorResponse(err));
    }


  });
