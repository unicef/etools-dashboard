import {Constructor} from '../typings/globals.types';
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
import {Config} from '../config/config';
import {Endpoints} from './endpoints';
import template from 'lodash-es/template';
import isEmpty from 'lodash-es/isEmpty';

export function EndpointsMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class EndpointsMixinClass extends EtoolsAjaxRequestMixin(baseClass as Constructor<PolymerElement>) {

    public getEndpoint(endpointName: string, data?: object) {
      let endpoint = JSON.parse(JSON.stringify(Endpoints[endpointName]));
      if (endpoint && this.endpointHasTemplate(endpoint)) {
        endpoint.url = window.location.origin + template(endpoint.template)(data);
      } else {
        endpoint.url = Config.baseSite + endpoint.url;
      }
      return endpoint;
    }

    public endpointHasTemplate(ep) {
      return ep.hasOwnProperty('template') && !isEmpty(ep.template);
    }

    public authorizationTokenMustBeAdded(endpoint: object): boolean {
      return endpoint && ('token' in endpoint);
    }

    protected _getDeferrer() {
      // create defer object (utils behavior contains too many other unneeded methods to be used)
      const defer: any = {};
      defer.promise = new Promise(function(resolve, reject) {
        defer.resolve = resolve;
        defer.reject = reject;
      });
      return defer;
    }

    public decodeBase64Token(encodedToken: string) {
      const base64Url = encodedToken.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

    public tokenIsValid(token: string) {
      const decodedToken = this.decodeBase64Token(token);
      return Date.now() < decodedToken.exp;
    }

    public getAuthorizationHeader(token: string) {
      return {'Authorization': 'JWT ' + token};
    }

    public requestToken(endpoint: object) {
      return this.sendRequest({
        endpoint: endpoint
      });
    }

    protected _buildOptionsWithTokenHeader(options: any, token: string) {
      options.headers = this.getAuthorizationHeader(token);
      delete options.endpoint.token; // cleanup token from endpoint object
      return options;
    }

    public addTokenToRequestOptions(endpointName: string, data: object) {
      let options: any = {};
      try {
        options.endpoint = this.getEndpoint(endpointName, data);
      } catch (e) {
        return Promise.reject(e);
      }

      // create defer object (utils behavior contains to many other unneeded methods to be used)
      const defer = this._getDeferrer();
      defer.resolve(options);
      return defer.promise;
    }

    protected _addAdditionalRequestOptions(options: any, requestAdditionalOptions: any) {
      if (requestAdditionalOptions) {
        Object.keys(requestAdditionalOptions).forEach(function(key) {
          switch (key) {
            case 'endpoint':
              break;
            case 'headers':
              // add additional headers
              options.headers = Object.assign({}, options.headers, requestAdditionalOptions[key]);
              break;
            default:
              options[key] = requestAdditionalOptions[key];
          }
        });
      }
      return options;
    }

    public fireRequest(endpoint: any, endpointTemplateData?: object,
    requestAdditionalOptions?: object, activeReqKey?: string) {
      if (!endpoint) {
        console.log('Endpoint name is missing.', 'Endpoints:fireRequest');
        return;
      }
      const defer = this._getDeferrer();
      const self = this;
      this.addTokenToRequestOptions(endpoint, endpointTemplateData)
          .then(function(requestOptions: any) {
            const options = self._addAdditionalRequestOptions(requestOptions, requestAdditionalOptions);
            return self.sendRequest(options, activeReqKey);
          })
          .then(function(endpointResponse: any) {
            defer.resolve(endpointResponse);
          })
          .catch(function(error: any) {
            defer.reject(error);
          });
      return defer.promise;
    }
  }
  return EndpointsMixinClass;
}
