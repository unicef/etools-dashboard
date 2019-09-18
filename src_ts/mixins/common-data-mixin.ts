import {store} from '../store';
import * as commonDataActions from '../actions/common-data';
import {EndpointsMixin} from '../endpoints/endpoints-mixin';
import {logError} from '@unicef-polymer/etools-behaviors/etools-logging.js';
import {Constructor} from '../typings/globals.types';
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {UserProfileDataMixin} from './user-profile-data-mixin';
import {property} from '@polymer/decorators';

function CommonDataMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class CommonDataClass extends UserProfileDataMixin(EndpointsMixin(baseClass)) {

    @property({type: Array})
    commonDataEndpoints: string[] = [
      'userCountry', 'staticData', 'pdssfas', 'countryProgrammes'
    ];

    public loadCommonData() {
      // get static data
      this._getStaticData(this.commonDataEndpoints);
    }

    protected _getStaticData(endpointsNames: string[]) {
      endpointsNames.forEach((endpointName: string) => {
        this._makeRequest(endpointName, this._getEndpointSuccessHandler(endpointName), this._errorHandler);
      });
    }
  
    protected _makeRequest(endpointName: string, successHandler: any, errorHandler: any) {
      this.fireRequest(endpointName).then((resp: any) => {
        successHandler.bind(this, resp)();
      }).catch((error: any) => {
        errorHandler.bind(this, error)();
      });
    }

    protected _errorHandler(err: any) {
      logError('Error getting static data', 'static-common-data', err);
    }

    protected _getEndpointSuccessHandler(endpointName: string) {
      switch (endpointName) {
        // case 'unicefUsers':
        //   return this._handleUnicefUsersResponse;
        case 'countryProgrammes':
          return this._handleCountryProgrammesResponse;
        // case 'offices':
        //   return this._handleOfficesResponse;
        // case 'countries':
        //   return this._handleCountriesResponse;
        case 'userCountry':
          return this._handleUserCountryResponse;
        // case 'changeCountry':
        //   return this._handleChangeCountryResponse;
        // case 'agreements':
        //   return this._handleAgreementsResponse;
        // case 'partners':
        //   return this._handlePartnersResponse;
        // case 'partnershipsOverview':
        //   return this._handlePartnershipsOverviewResponse;
        // case 'partnerDetails':
        //   return this._handlePartnerDetailsResponse;
        // case 'partnersDropdown':
        //   return this._handlePartnersDropdownResponse;
        case 'staticData':
          return this._handleStaticDataResponse;
        // case 'sectors':
        //   return this._handleSectorsResponse;
        case 'actionPointsByMe':
          return this._handleActionPointsByMeResponse;
        case 'actionPointsForMe':
          return this._handleActionPointsForMeResponse;
        // case 'interventions':
        //   return this._handleInterventionsResponse;
        // case 'partnerships':
        //   return this._handlePartnershipseResponse;
        case 'pdssfas':
          return this._handlePdssfasResponse;
        case 'trips':
          return this._handleTripsResponse;
        case 'tripsSupervised':
          return this._handleTripsSupervisedResponse;
        case 'attachments':
          return this._handleAttachmentsResponse;
        // case 'myProfile':
        //   return this._handleMyProfileResponse;
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

    protected _handleUnicefUsersResponse(response: any) {
      if (this._validReqResponseData(response)) {
        // set setUsersData values
        store.dispatch(commonDataActions.setUnicefUsers(response));
      }
    }
    protected _handleCountryProgrammesResponse(response: any) {
      if (this._validReqResponseData(response)) {
        // set setUsersData values
        store.dispatch(commonDataActions.setCountryProgrammes(response));
      }
    }

    protected _handlePdssfasResponse(response: any) {
      if (this._validReqResponseData(response)) {
        store.dispatch(commonDataActions.setPdssfas(response));
      }
    }

    protected _handleAttachmentsResponse(response: any) {
      if (this._validReqResponseData(response)) {
        store.dispatch(commonDataActions.setAttachments(response));
      }
    }

    protected _handleStaticDataResponse(response: any) {
      if (this._validReqResponseData(response)) {
        store.dispatch(commonDataActions.setStaticData(response));
      }
    }

    protected _handleOfficesResponse(response: any) {
      if (this._validReqResponseData(response)) {
        // set offices values
        store.dispatch(commonDataActions.setOffices(response));
      }
    }

    protected _handlePartnershipsResponse(response: any) {
      if (this._validReqResponseData(response)) {
        // set partnerships values
        store.dispatch(commonDataActions.setPartnerships(response));
      }
    }

    protected _handleAgreementsResponse(response: any) {
      if (this._validReqResponseData(response)) {
        // set user country data
        store.dispatch(commonDataActions.setAgreements(response));
      }
    }

    protected _handleSectorsResponse(response: any) {
      if (this._validReqResponseData(response)) {
        // set offices values
        store.dispatch(commonDataActions.setSectors(response));
      }
    }


    protected _handleUserCountryResponse(response: any) {
      if (this._validReqResponseData(response)) {
        // set user country data
        store.dispatch(commonDataActions.setUserCountry(response[0]));
      }
    }
  }

  return CommonDataClass;
}

export default CommonDataMixin;
