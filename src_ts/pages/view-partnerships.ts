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

  @property({ type: String })
  public environment: string = (() => Config._checkEnvironment())();

  @property({ type: String })
  countryCode!: string;

  public static get observers(): string[] {
    return ['setEmbedSource(countryCode)'];
  }

  public setEmbedSource(): void {
    const embedSource =
      partnershipsProd +
      `&filter=business_area/area_code eq ` +
      this.countryCode;
    this.set('embedSource', embedSource);
  }
}
