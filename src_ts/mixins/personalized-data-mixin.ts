import {store} from '../store';
import * as personalizedDataActions from '../actions/personalized-data';
import {EndpointsMixin} from '../endpoints/endpoints-mixin';
import {logError} from '@unicef-polymer/etools-behaviors/etools-logging.js';
import {Constructor} from '../typings/globals.types';
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {property} from '@polymer/decorators';

function PersonalizedDataMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class PersonalizedDataClass extends EndpointsMixin(baseClass) {
    
    @property({type: Array})
    personalizedDataEndpoints: string[] = [
      'actionPointsByMe', 'actionPointsForMe', 'trips', 'tripsSupervised'
    ];

    public loadPersonalizedData(id: object) {
      this._getPersonalizedData(this.personalizedDataEndpoints, id);
    }

    protected _getPersonalizedData(endpointsNames: string[], id: object) {
      endpointsNames.forEach((endpointName: string) => {
        this._makeRequest(endpointName, id, this._getEndpointSuccessHandler(endpointName), this._errorHandler);
      });
    }
  
    protected _makeRequest(endpointName: string, id: object, successHandler: any, errorHandler: any) {
      this.fireRequest(endpointName, id).then((resp: any) => {
        successHandler.bind(this, resp)();
      }).catch((error: any) => {
        errorHandler.bind(this, error)();
      });
    }

    protected _errorHandler(err: any) {
      logError('Error getting static data', 'personalized-data', err);
    }

    protected _getEndpointSuccessHandler(endpointName: string) {
      switch (endpointName) {
        case 'actionPointsByMe':
          return this._handleActionPointsByMeResponse;
        case 'actionPointsForMe':
          return this._handleActionPointsForMeResponse;
        case 'trips':
          return this._handleTripsResponse;
        case 'tripsSupervised':
          return this._handleTripsSupervisedResponse;
        default:
          return null;
      }
    }

    private _validReqResponseData(data: any): boolean {
      // return data instanceof Array && data.length > 0;
      if (data) {
        return true;
      } else {
        return false;
      }
    }

    protected _handleActionPointsByMeResponse(response: any) {
      if (this._validReqResponseData(response)) {
        store.dispatch(personalizedDataActions.setActionPointsByMe(response));
      }
    }

    protected _handleTripsResponse(response: any) {
      if (this._validReqResponseData(response)) {
        store.dispatch(personalizedDataActions.setTrips(response));
      }
    }

    protected _handleTripsSupervisedResponse(response: any) {
      if (this._validReqResponseData(response)) {
        store.dispatch(personalizedDataActions.setTripsSupervised(response));
      }
    }

    protected _handleActionPointsForMeResponse(response: any) {
      if (this._validReqResponseData(response)) {
        // set locations values
        store.dispatch(personalizedDataActions.setActionPointsForMe(response));
      }
    }
  }

  return PersonalizedDataClass;
}

export default PersonalizedDataMixin;
