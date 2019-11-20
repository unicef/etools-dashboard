import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {Constructor, GenericObject} from '../typings/globals.types';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin.js';
import {Config} from '../config/config';
import {Endpoints} from './endpoints';
import template from 'lodash-es/template';
import isEmpty from 'lodash-es/isEmpty';

export function EndpointsMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class EndpointsMixinClass extends EtoolsAjaxRequestMixin(baseClass as Constructor<PolymerElement>) {

    public getEndpoint(endpointName: string, data?: object): object {
      const endpoint = JSON.parse(JSON.stringify(Endpoints[endpointName]));
      if (endpoint && this.endpointHasTemplate(endpoint)) {
        endpoint.url = window.location.origin + template(endpoint.template)(data);
      } else {
        endpoint.url = Config.baseSite + endpoint.url;
      }
      return endpoint;
    }

    public endpointHasTemplate(ep: GenericObject): boolean {
      return ep.hasOwnProperty('template') && !isEmpty(ep.template);
    }

    public authorizationTokenMustBeAdded(endpoint: object): boolean {
      return endpoint && ('token' in endpoint);
    }

    public decodeBase64Token(encodedToken: string): GenericObject {
      const base64Url = encodedToken.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

    public tokenIsValid(token: string): boolean {
      const decodedToken = this.decodeBase64Token(token);
      return Date.now() < decodedToken.exp;
    }

    public getAuthorizationHeader(token: string): object {
      return {'Authorization': 'JWT ' + token};
    }

    public requestToken(endpoint: object): void {
      return this.sendRequest({
        endpoint: endpoint
      });
    }

    public addTokenToRequestOptions(endpointName: string, data: object) {
      const options: GenericObject = {};
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

    public fireRequest(endpoint: string, endpointTemplateData?: object,
        requestAdditionalOptions?: object, activeReqKey?: string): void {
      if (!endpoint) {
        console.log('Endpoint name is missing.', 'Endpoints:fireRequest');
        return;
      }
      const defer = this._getDeferrer();
      const self = this;
      this.addTokenToRequestOptions(endpoint, endpointTemplateData)
          .then((requestOptions: object) => {
                const options = self._addAdditionalRequestOptions(requestOptions, requestAdditionalOptions);
                return self.sendRequest(options, activeReqKey);
          })
          .then((endpointResponse: any) => {
                defer.resolve(endpointResponse);
          })
          .catch((error: any) => {
                defer.reject(error);
          });
      return defer.promise;
    }

    protected _buildOptionsWithTokenHeader(options: GenericObject, token: string): object {
      options.headers = this.getAuthorizationHeader(token);
      delete options.endpoint.token; // cleanup token from endpoint object
      return options;
    }

    protected _addAdditionalRequestOptions(options: GenericObject, requestAdditionalOptions: object): object {
      if (requestAdditionalOptions) {
        Object.keys(requestAdditionalOptions).forEach((key: string) => {
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

    protected _getDeferrer(): GenericObject {
      // create defer object (utils behavior contains too many other unneeded methods to be used)
      const defer: GenericObject = {};
      defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
      });
      return defer;
    }
  }
  return EndpointsMixinClass;
}
