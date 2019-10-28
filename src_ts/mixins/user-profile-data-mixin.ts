import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {Constructor} from '../typings/globals.types';
import {property} from '@polymer/decorators';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin';
import isEmpty from 'lodash-es/isEmpty';
import {AjaxErrorsParserMixin} from './ajax-errors-parser-mixin';
import {DataElementMixin} from './data-element-mixin';
import {EndpointsMixin} from '../endpoints/endpoints-mixin';
import {fireEvent} from '../components/utils/fire-custom-event';

export function UserProfileDataMixin<T extends Constructor<PolymerElement>>(baseClass: T) {
  class UserProfileDataMixinClass extends AjaxErrorsParserMixin(
      DataElementMixin(
        EtoolsAjaxRequestMixin(
          EndpointsMixin(
            baseClass as Constructor<PolymerElement>)))) {
    [x: string]: any;

    /**
     * Object describing property-related metadata used by Polymer features
     */
    @property({type: String})
    public endpointName: string = 'myProfile';

    @property({type: Object, notify: true})
    public user: object;

    @property({type: Object, readOnly: true, notify: true})
    public permissions: object;

    @property({type: Boolean})
    public _saveActionInProgress: boolean;

    @property({type: String})
    public profileSaveLoadingMsgSource: string = 'profile-modal';

    public saveProfile(profile) {
      if (isEmpty(profile)) {
        // empty profile means no changes found
        fireEvent(this, 'toast', {
          text: 'There is nothing to save. No change detected on your profile.',
          showCloseBtn: true
        });
        return;
      }
      fireEvent(this, 'global-loading', {
        message: 'Saving profile data...',
        active: true,
        loadingSource: this.profileSaveLoadingMsgSource
      });
      this.set('_saveActionInProgress', true);
      this._dispatchSaveProfileRequest(profile);
    }

    private _dispatchSaveProfileRequest(profile) {
      const config = {
        endpoint: this.getEndpoint(this.endpointName),
        method: 'PATCH',
        body: profile
      };
      this.sendRequest(config).then((resp) => {
        this._handleMyResponse(resp);
      }).catch((err) => {
        this.parseRequestErrorsAndShowAsToastMsgs(err);
        this._hideProfileSaveLoadingMsg();
      });
    }

    // called after profile get request on initial load
    private _handleMyResponse(resp) {
      this.set('user', resp);
      this._hideProfileSaveLoadingMsg();
    }

    private _hideProfileSaveLoadingMsg() {
      if (this._saveActionInProgress) {
        fireEvent(this, 'global-loading', {
          active: false,
          loadingSource: this.profileSaveLoadingMsgSource
        });
        this.set('_saveActionInProgress', false);
      }
    }
  }
  return UserProfileDataMixinClass
};
