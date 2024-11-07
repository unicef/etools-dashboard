import { PolymerElement, html } from "@polymer/polymer";
import { customElement, property } from "@polymer/decorators";
import { famProd } from "../../endpoints/power-bi-embeds";

@customElement("view-fam")
export class ViewFam extends PolymerElement {
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
  countryCode!: string;

  public static get observers(): string[] {
    return ["setEmbedSource(countryCode)"];
  }

  public setEmbedSource(): void {
    const embedSource =
      famProd +
      `&$filter=business_area/area_code eq '` +
      this.countryCode +
      `'`;
    this.set("embedSource", embedSource);
  }
}
