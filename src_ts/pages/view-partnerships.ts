import { Config } from '../config/config';
import { partnershipsProd } from '../endpoints/power-bi-embeds';
import { PolymerElement, html } from '@polymer/polymer';
import { customElement, property } from '@polymer/decorators';

@customElement('view-partnerships')
export class ViewPartnerships extends PolymerElement {
  public static get template(): HTMLTemplateElement {
    return html`
      <style>
        div.container {
          height: 100vh;
          width: 100vw;
        }
      </style>
      <div class="container">
        <iframe
          width="100%"
          height="100%"
          src="[[embedSource]]"
          frameborder="0"
          allowfullscreen="true"
        >
        </iframe>
      </div>
    `;
  }

  @property({ type: String })
  public embedSource: string;

  @property({ type: Object })
  public user: object;

  @property({ type: String })
  public environment: string = (() => Config._checkEnvironment())();

  public static get observers(): string[] {
    return ['setEmbedSource(user)'];
  }

  public setEmbedSource(): void {
    // @ts-ignore
    const country = this.user.country.name;
    // handles Cote D'Ivoire edge case
    let fixedCountry = country.replace(/[']/g, "''");
    const embedSource =
      partnershipsProd +
      `&$filter=interventions/country_name eq '${fixedCountry}'` +
      ` and partners/country_name eq '${fixedCountry}'` +
      ` and agreements/country_name eq '${fixedCountry}'` +
      ` and funds_by_intervention/country_name eq '${fixedCountry}'`;
    this.set('embedSource', embedSource);
  }
}
