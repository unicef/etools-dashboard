// import EtoolsAjaxRequestMixin from '@unicef-polymer/etools-ajax/etools-ajax-request-mixin';
import { isEmpty } from 'ramda';
import './data-element-mixin';
import './user-permissions-mixin';
import { Mixins as Mixins$0 } from './redux-store-mixin';
export const Mixins = Mixins$0 || {};

/**
 * `user-data` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {PolymerElement}
 * @appliesMixin EtoolsDashboard.Mixins.DataElement
 * @appliesMixin EtoolsDashboard.Mixins.UserPermissions
 */

Mixins$0.UserProfileData = (baseClass) =>
  class extends Mixins$0.DataElement(
    Mixins$0.UserPermissions(baseClass)) {

    /**
     * Object describing property-related metadata used by Polymer features
     */
    static get properties() {
      return {
        endpointName: {
          type: String,
          value: 'myProfile'
        },

        user: {
          type: Object,
          notify: true
        },

        permissions: {
          type: Object,
          readOnly: true,
          notify: true
        },

         _saveActionInProgress: Boolean,

        profileSaveLoadingMsgSource: {
          type: String,
          value: 'profile-modal'
        }

      };
    }

    saveProfile(profile) {
      if (isEmpty(profile)) {
        // empty profile means no changes found
        this.fireEvent('toast', {
          text: 'There is nothing to save. No change detected on your profile.',
          showCloseBtn: true
        });
        return;
      }
      this.fireEvent('global-loading', {
        message: 'Saving profile data...',
        active: true,
        loadingSource: this.profileSaveLoadingMsgSource
      });
      this.set('_saveActionInProgress', true);
      this._dispatchSaveProfileRequest(profile);
    }

    _dispatchSaveProfileRequest(profile) {
      let config = {
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
    _handleMyResponse(resp) {
      this.set('user', resp);
      this._hideProfileSaveLoadingMsg();
    }

    _hideProfileSaveLoadingMsg() {
      if (this._saveActionInProgress) {
        this.fireEvent('global-loading', {
          active: false,
          loadingSource: this.profileSaveLoadingMsgSource
        });
        this.set('_saveActionInProgress', false);
      }
    }
  };
