import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin';
import { Mixins as Mixins$0 } from '../mixins/redux-store-mixin';
import { Config } from '../config/config';
import { Endpoints as Endpoints$0 } from './endpoints';
import {template} from 'lodash-es';
import {isEmpty} from '../scripts/ramda-utils';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin';
// const { template } = _;

export const Mixins = Mixins$0 || {};

/**
* @polymer
* @mixinFunction
* @appliesMixin EtoolsAjaxRequestMixin
* @appliesMixin EtoolsDashboard.Mixins.ReduxStore
*/
Mixins$0.Endpoints = dedupingMixin(
  (superClass) => class extends EtoolsAjaxRequestMixin(Mixins$0.ReduxStore(superClass)) {

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
