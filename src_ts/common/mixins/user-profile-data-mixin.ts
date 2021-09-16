import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { Constructor, GenericObject } from '../../typings/globals.types';
import { property } from '@polymer/decorators';
import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin';
import isEmpty from 'lodash-es/isEmpty';
import { AjaxErrorsParserMixin } from './ajax-errors-parser-mixin';
import { DataElementMixin } from './data-element-mixin';
import { EndpointsMixin } from '../../endpoints/endpoints-mixin';
import { fireEvent } from '../../utils/fire-custom-event';

export function UserProfileDataMixin<T extends Constructor<PolymerElement>>(
  baseClass: T
) {
  class UserProfileDataMixinClass extends AjaxErrorsParserMixin(
    DataElementMixin(
      EtoolsAjaxRequestMixin(
        EndpointsMixin(baseClass as Constructor<PolymerElement>)
      )
    )
  ) {
    [x: string]: any;

    /**
     * Object describing property-related metadata used by Polymer features
     */
    @property({ type: String })
    public endpointName: string = 'myProfile';

    @property({ type: Object, notify: true })
    public user: object;

    @property({ type: Object, readOnly: true, notify: true })
    public permissions: object;

    @property({ type: Boolean })
    public _saveActionInProgress: boolean;

    @property({ type: String })
    public profileSaveLoadingMsgSource: string = 'profile-modal';

    public saveProfile(profile: GenericObject): void {
      if (isEmpty(profile)) {
        // empty profile means no changes found
        fireEvent(this, 'toast', {
          showCloseBtn: true,
          text: 'There is nothing to save. No change detected on your profile.',
        });
        return;
      }
      fireEvent(this, 'global-loading', {
        active: true,
        loadingSource: this.profileSaveLoadingMsgSource,
        message: 'Saving profile data...',
      });
      this.set('_saveActionInProgress', true);
      this._dispatchSaveProfileRequest(profile);
    }

    private _dispatchSaveProfileRequest(profile: GenericObject): void {
      const config = {
        body: profile,
        endpoint: this.getEndpoint(this.endpointName),
        method: 'PATCH',
      };
      this.sendRequest(config)
        .then((resp) => {
          this._handleMyResponse(resp);
        })
        .catch((err) => {
          this.parseRequestErrorsAndShowAsToastMsgs(err);
          this._hideProfileSaveLoadingMsg();
        });
    }

    // called after profile get request on initial load
    private _handleMyResponse(resp: object): void {
      this.set('user', resp);
      this._hideProfileSaveLoadingMsg();
    }

    private _hideProfileSaveLoadingMsg(): void {
      if (this._saveActionInProgress) {
        fireEvent(this, 'global-loading', {
          active: false,
          loadingSource: this.profileSaveLoadingMsgSource,
        });
        this.set('_saveActionInProgress', false);
      }
    }
  }
  return UserProfileDataMixinClass;
}
