import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {mapProd} from '../../endpoints/power-bi-embeds';

@customElement('view-map')
export class ViewMap extends LitElement {
  // Define component styles
  static styles = css`
    .container {
      height: 100vh;
    }
  `;

  @property({type: String})
  public embedSource = '';

  @property({type: Object})
  public user: any;

  // Update embedSource whenever user changes
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('user')) {
      this.setEmbedSource();
    }
  }

  private setEmbedSource(): void {
    const country = this.user?.country?.name || '';
    const fixedCountry = country.replace(/[']/g, "''"); // Handles Cote D'Ivoire edge case

    this.embedSource =
      `${mapProd}&$filter=interventionslocations/country_name eq '${fixedCountry}'` +
      +` and fundsreservationitem/country_name eq '${fixedCountry}'`;
  }

  render() {
    return html`
      <div class="container">
        <iframe
          title="view-map"
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
