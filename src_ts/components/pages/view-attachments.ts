import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {attachmentsProd} from '../../endpoints/power-bi-embeds';

@customElement('view-attachments')
export class ViewAttachments extends LitElement {
  // CSS for the component
  static styles = css`
    .container {
      height: 100vh;
    }
  `;

  @property({type: String})
  public embedSource = '';

  @property({type: Object})
  public user: any;

  // Observe changes to the user property and update embedSource accordingly
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('user')) {
      this.setEmbedSource();
    }
  }

  private setEmbedSource(): void {
    const country = this.user?.country?.name || '';
    const attachmentsCountry = country.replace(/\s+/g, '_');

    this.embedSource =
      `${attachmentsProd}&$filter=attachments/country_name eq '${attachmentsCountry}'` +
      ` and partner_vendor/country_name eq '${attachmentsCountry}'`;
  }

  render() {
    return html`
      <div class="container">
        <iframe
          title="view-attachments"
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
