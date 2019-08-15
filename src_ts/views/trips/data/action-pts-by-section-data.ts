import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EtoolsMixinFactory } from '@unicef-polymer/etools-behaviors/etools-mixin-factory.js';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
import { fireEvent } from '../../../components/utils/fire-custom-event';
import { EndpointsMixin } from '../../../endpoints/endpoints-mixin';
// import { Mixins } from '../../../mixins/redux-store-mixin';
import { isEmpty } from 'ramda';

/**
 * @polymer
 * @mixinFunction
 */
const ActionPtsBySectionMixin = EtoolsMixinFactory.combineMixins([
  EtoolsAjaxRequestMixin,
  EndpointsMixin
], PolymerElement);

/**
 * @polymer
 * @customElement
 * @appliesMixin ActionPtsBySectionMixin
 */
class ActionPtsBySection extends ActionPtsBySectionMixin {
  static get is() { return 'action-pts-by-section-data'; }

  static get properties() {
    return {
      reqOptions: {
        type: Object,
        value: {
          endpoint: null,
          csrf: null
        }
      },
      actionPointsData: {
        type: Object,
        readOnly: true,
        notify: true
      },
      filter: {
        type: Boolean,
        notify: true,
        observer: '_filterChanged'
      }
    };
  }

  _filterChanged(filter) {
    fireEvent(this, 'global-loading', { message: 'Loading chart data...', active: true });
    if (isEmpty(filter)) {
      this.set('reqOptions.endpoint', this.getEndpoint('actionPointsBySection'));
    } else {
      this.set('reqOptions.endpoint', this.getEndpoint('actionPointsBySectionOffice',
          {
            office: filter.office.join(',')
          }
      ));
    }
    this.sendRequest(this.reqOptions).then((response) => this._handleResponse(response));
  }

  _handleResponse(response) {
    this._setActionPointsData(response);
    fireEvent(this, 'global-loading', {});
  }
}

window.customElements.define(ActionPtsBySection.is, ActionPtsBySection);
