import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {fmpProd} from '../../endpoints/power-bi-embeds';

@customElement('view-fmp')
export class ViewFMP extends LitElement {
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
      this.embedSource = `${fmpProd}&$filter=fm_ontrack/Area_x0020_Code eq '${this.countryCode}'`;
    }
  }

  render() {
    return html`
      <div class="container">
        <iframe
          title="view-fmp"
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
