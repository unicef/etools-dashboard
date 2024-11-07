import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { hactProd } from "../../endpoints/power-bi-embeds";

@customElement("view-hact")
export class ViewHact extends LitElement {
  // Define component styles
  static styles = css`
    .container {
      height: 100vh;
      width: 100vw;
    }
  `;

  @property({ type: String })
  public embedSource: string = "";

  @property({ type: Object })
  public user: any;

  // Update embedSource whenever user changes
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("user")) {
      this.setEmbedSource();
    }
  }

  private setEmbedSource(): void {
    const country = this.user?.country?.name || "";
    const fixedCountry = country.replace(/[']/g, "''"); // Handles Cote D'Ivoire edge case

    this.embedSource = `${hactProd}&filterPaneEnabled=False&$filter=partners/country_name eq '${fixedCountry}'`;
  }

  render() {
    return html`
      <div class="container">
        <iframe
          width="100%"
          height="100%"
          .src="${this.embedSource}"
          frameborder="0"
          allowfullscreen="true"
        ></iframe>
      </div>
    `;
  }
}
