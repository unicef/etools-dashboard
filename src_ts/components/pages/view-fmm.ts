import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fmmProd } from "../../endpoints/power-bi-embeds";

@customElement("view-fmm")
export class ViewFMM extends LitElement {
  // Define component styles
  static styles = css`
    .container {
      height: 100vh;
      width: 100vw;
    }
  `;

  @property({ type: String })
  public embedSource: string = "";

  @property({ type: String })
  public countryCode!: string;

  // Update embedSource whenever countryCode changes
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has("countryCode")) {
      this.embedSource = `${fmmProd}&$filter=fm_ontrack/Area_x0020_Code eq '${this.countryCode}'`;
    }
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
