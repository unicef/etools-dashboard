import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
// import { Mixins } from '../mixins/redux-store-mixin';
import { Config } from '../config/config';
import { Endpoints as Endpoints$0 } from './endpoints';
import {template} from 'lodash-es';
import {isEmpty} from 'ramda';
// const { template } = _;

// export const Mixins = Mixins || {};

window.EtoolsDashboard = window.EtoolsDashboard || {};
window.EtoolsDashboard.Mixins = window.EtoolsDashboard.Mixins || {};

/**
* @polymer
* @mixinFunction
* @appliesMixin EtoolsAjaxRequestMixin
* @appliesMixin EtoolsDashboard.Mixins.ReduxStore
*/
window.EtoolsDashboard.Mixins.Endpoints = dedupingMixin(
  (superClass) => class extends EtoolsAjaxRequestMixin(window.EtoolsDashboard.Mixins.ReduxStore(superClass)) {

    getEndpoint(endpointName, data) {
      let endpoint = JSON.parse(JSON.stringify(Endpoints$0[endpointName]));
      if (endpoint && this.endpointHasTemplate(endpoint)) {
        endpoint.url = window.location.origin + template(endpoint.template)(data);
      } else {
        endpoint.url = Config.baseSite + endpoint.url;
      }
      return endpoint;
    }

    endpointHasTemplate(ep) {
      return ep.hasOwnProperty('template') && !isEmpty(ep.template);
    }

  }
);
