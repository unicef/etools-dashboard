import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {partnershipsProd} from '../../endpoints/power-bi-embeds';

@customElement('view-partnerships')
export class ViewPartnerships extends LitElement {
  // Define component styles
  static styles = css`
    .container {
      height: 100vh;
    }
  `;

  @property({type: String})
  public embedSource = '';

  @property({type: String})
  public countryCode!: string;

  // Update embedSource whenever countryCode changes
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('countryCode')) {
      this.setEmbedSource();
    }
  }

  private setEmbedSource(): void {
    this.embedSource = `${partnershipsProd}&$filter=business_area/area_code eq '${this.countryCode}'`;
  }

  render() {
    return html`
      <div class="container">
        <iframe
          title="view-par"
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
