import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import '@unicef-polymer/etools-unicef/src/etools-app-layout/app-toolbar';
import '@unicef-polymer/etools-unicef/src/etools-icon-button/etools-icon-button';
import '@unicef-polymer/etools-unicef/src/etools-app-selector/etools-app-selector';
import '@unicef-polymer/etools-unicef/src/etools-profile-dropdown/etools-profile-dropdown';
import '@unicef-polymer/etools-unicef/src/etools-accesibility/etools-accesibility';

import '@unicef-polymer/etools-modules-common/dist/components/dropdowns/languages-dropdown';
import '@unicef-polymer/etools-modules-common/dist/components/dropdowns/countries-dropdown';
import '@unicef-polymer/etools-modules-common/dist/components/dropdowns/organizations-dropdown';

import '@unicef-polymer/etools-unicef/src/etools-dropdown/etools-dropdown.js';
import {layoutStyles} from '@unicef-polymer/etools-unicef/src/styles/layout-styles';
import {Endpoints} from '../../endpoints/endpoints';

/**
 * page header element
 * @LitElement
 * @customElement
 */
@customElement('page-header')
export class PageHeader extends LitElement {
  static get styles() {
    return [layoutStyles];
  }

  @property({type: Object})
  profile!: any;

  public render() {
    // main template
    // language=HTML
    return html`
      <style>
        etools-accesibility {
          display: none;
        }
      </style>

      <app-toolbar sticky class="layout-horizontal align-items-center" hide-app-menu .profile=${this.profile}>
        <div slot="dropdowns">
          <countries-dropdown
            id="countries"
            .profile="${this.profile}"
            .changeCountryEndpoint="${Endpoints.changeCountry}"
            @country-changed="${this.countryOrOrganizationChanged}"
          >
          </countries-dropdown>
        </div>
        <div slot="icons">
          <etools-profile-dropdown .profile="${this.profile ? {...this.profile} : {}}" @sign-out="${this._signOut}">
          </etools-profile-dropdown>
          <etools-accesibility></etools-accesibility>
        </div>
      </app-toolbar>
    `;
  }

  public connectedCallback() {
    super.connectedCallback();
  }

  public countryOrOrganizationChanged() {
    // force page reload to load all data specific to the new country
    document.location.assign(window.location.href);
  }

  protected _signOut() {
    this.clearLocalStorage();
    window.location.href = window.location.origin + '/logout';
  }

  protected clearLocalStorage() {
    localStorage.clear();
  }
}
