import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('view-custom')
export class ViewCustom extends LitElement {
  // Define component styles
  static styles = css`
    .container {
      height: 100vh;
    }
    #no-embed-msg {
      padding: 24px 48px;
    }
  `;

  @property({type: String})
  public embedSource = '';

  @property({type: Object})
  public user: any;

  // Observe changes to user property and update embedSource accordingly
  updated(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('user')) {
      this.embedSource = this.user?.country?.custom_dashboards?.bi_url || '';
    }
  }

  render() {
    return html`
      ${this.embedSource
        ? html`
            <div class="container">
              <iframe
                title="view-custom"
                width="100%"
                height="100%"
                .src="${this.embedSource}"
                frameborder="0"
                allowfullscreen="true"
              ></iframe>
            </div>
          `
        : html` <div id="no-embed-msg">Ask your workspace administrator to set a custom Power BI embed code.</div> `}
    `;
  }
}
