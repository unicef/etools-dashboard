import {html, css, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {personalizedDev, personalizedProd} from '../../endpoints/power-bi-embeds';
import {Environment, EnvironmentType} from '@unicef-polymer/etools-utils/dist/singleton/environment';

@customElement('view-personalized')
export class ViewPersonalized extends LitElement {
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
    const email = this.user?.email || '';

    if (Environment.is(EnvironmentType.DEV)) {
      this.embedSource = `${personalizedDev}&filter=user/email eq '${email}'`;
    } else {
      this.embedSource =
        `${personalizedProd}&$filter=interventions_focalpoints/unicef_focal_point_email eq '${email}'` +
        ` and actionpointsfor/assigned_to_email eq '${email}'` +
        ` and actionpointsby/assigned_by_email eq '${email}'` +
        ` and tripsby/supervisor_email eq '${email}'` +
        ` and tripsfor/traveler_email eq '${email}'`;
    }
  }

  render() {
    return html`
      <div class="container">
        <iframe
          title="view-per"
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
