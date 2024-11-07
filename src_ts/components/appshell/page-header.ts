import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-flex-layout/iron-flex-layout.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@unicef-polymer/etools-app-selector/etools-app-selector.js";
import "@unicef-polymer/etools-profile-dropdown/etools-profile-dropdown.js";
import "./countries-dropdown";
import "../../styles/shared-styles";
import { Config } from "../../config/config";
import sortBy from "lodash-es/sortBy";
import { fireEvent } from "../../utils/fire-custom-event";
import { customElement, property } from "@polymer/decorators";
import "./support-btn";
import { GenericObject } from "../../typings/globals.types";

@customElement("page-header")
export class PageHeader extends PolymerElement {
  public static get template(): HTMLTemplateElement {
    return html`
      <style include="shared-styles">
        app-toolbar {
          padding: 0 16px 0 0;
          background-color: var(--header-bg-color, #233944);
        }

        div[main-title] {
          position: relative;
          bottom: 1px;
          margin-left: 24px;
          min-height: 30px;
          background: url("../../assets/images/etools_logo_icon.png") no-repeat
            center left;
          background-size: auto 48px;
          padding-left: 48px;
          font-size: 30px;
          color: var(--light-primary-text-color);
        }

        #profile {
          color: var(--title-toolbar-secondary-text-color);
        }

        #profile.open,
        #accountProfile,
        #powerSettings {
          color: var(--dark-secondary-text-color);
        }

        paper-icon-button#profile {
          width: 60px;
          height: 60px;
          padding: 12px 16px;
        }

        #menuButton {
          display: block;
        }

        .right-side {
          @apply --layout-horizontal;
          @apply --layout-center;
        }

        .titlebar {
          flex: 1;
          font-size: 28px;
          font-weight: 300;
          color: var(--light-primary-text-color);
        }

        .titlebar img {
          width: 34px;
          margin: 0 8px 0 24px;
        }

        .content-align {
          @apply --layout-horizontal;
          @apply --layout-center;
          height: 60px;
        }

        support-btn {
          color: var(--light-secondary-text-color);
        }

        #second-logo {
          height: 32px;
          width: auto;
        }

        .envWarning {
          color: var(--nonprod-text-warn-color);
          font-weight: 700;
          font-size: 18px;
        }

        @media (min-width: 850px) {
          #menuButton {
            display: none;
          }

          div[main-title] {
            margin-left: 32px;
          }
        }
      </style>

      <app-toolbar sticky="" class="content-align">
        <paper-icon-button
          id="menuButton"
          class="light"
          icon="menu"
          on-tap="openDrawer"
        ></paper-icon-button>
        <div class="titlebar content-align">
          <etools-app-selector
            id="selector"
            user="[[user]]"
          ></etools-app-selector>
          <img
            id="second-logo"
            src$="[[importPath]]assets/images/etools-logo-color-white.svg"
          />
          <template is="dom-if" if="[[environment]]">
            <div class="envWarning">- [[environment]] TESTING ENVIRONMENT</div>
          </template>
        </div>
        <div class="content-align">
          <countries-dropdown
            id="countries"
            countries="[[countries]]"
            current="[[user.country]]"
          ></countries-dropdown>
          <support-btn></support-btn>
          <etools-profile-dropdown profile="{{user}}" on-sign-out="_signOut">
          </etools-profile-dropdown>
        </div>
      </app-toolbar>
    `;
  }

  @property({ type: Array })
  public countries: object[];

  @property({ type: Object })
  public user: object;

  @property({ type: String })
  public environment: string = (() => Config._checkEnvironment())();

  @property({ type: Object })
  public profile: object;

  public static get observers(): string[] {
    return ["_updateCountriesList(user.countries_available)"];
  }

  public ready(): void {
    super.ready();
    this._setBgColor();
  }

  public openDrawer(): void {
    fireEvent(this, "drawer");
  }

  public _updateCountriesList(countries: GenericObject[]): void | object {
    if (!countries) {
      return;
    }
    let arrayObj = countries.map((arrayItem) => {
      return {
        id: arrayItem.id,
        imgClass: this._getFlagIconClass(arrayItem.business_area_code),
        name: arrayItem.name,
      };
    });
    arrayObj = sortBy(arrayObj, (c) => c.name);
    this.set("countries", arrayObj);
  }

  public _convertCollection(data: GenericObject[]): object[] {
    return data.map((item) => {
      return { label: item.name, value: item.id };
    });
  }

  public _signOut(): void {
    this._clearLocalStorage();
    window.location.href = window.location.origin + "/logout";
  }

  public _clearLocalStorage(): void {
    localStorage.clear();
  }

  public _setBgColor(): void {
    // If not production environment, changing header color to red
    if (this.environment) {
      this.updateStyles({ "--header-bg-color": "var(--nonprod-header-color)" });
    }
  }

  private _getFlagIconClass(id: string): string {
    let flagIdMap = {
      "0": "us",
      "2070": "in",
      "234R": "syxb",
      "2490": "lb",
      "4020": "su",
      "4140": "sy",
    };
    return "flag-icon " + "flag-icon-" + flagIdMap[id];
  }
}
