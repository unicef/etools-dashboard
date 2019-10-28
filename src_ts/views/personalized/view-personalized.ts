import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {customElement, property} from '@polymer/decorators';

@customElement('view-personalized')
export class ViewPersonalized extends PolymerElement {
  public static get template() {
    return html`
      <style>
        div.container {
          height: calc(100vh - 200px);
          width: 100vw
        }
      </style>
      <div class="container">
        <iframe width="100%"
                height="100%"
                src="[[embedSource]]"
                frameborder="0"
                allowFullScreen="true">
        </iframe>
      </div>
    `;
  }

  @property({type: String})
  public embedSource: string

  @property({type: Object})
  public user: object

  public static get observers() {
    return [
      'setEmbedSource(user)'
    ];
  }

  public setEmbedSource() {
    // @ts-ignore
    const email = this.user.email;

    const embedSource = 'https://app.powerbi.com/reportEmbed' +
    '?reportId=1b2bb9b9-402c-4bec-b556-4da8c34123f3' +
    '&appId=56089b5f-f2cc-4121-8705-58f981db340f' +
    '&autoAuth=true' +
    '&ctid=77410195-14e1-4fb8-904b-ab1892023667' +
    '&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLW5vcnRoLWV1cm9wZS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCJ9' +
    '&filterPaneEnabled=False' +
    `&$filter=interventions_focalpoints/unicef_focal_point_email eq '${email}'` +
    ` and actionpointsfor/assigned_to_email eq '${email}'` +
    ` and actionpointsby/assigned_by_email eq '${email}'` +
    ` and tripsby/supervisor_email eq '${email}'` +
    ` and tripsfor/traveler_email eq '${email}'`;

    this.set('embedSource', embedSource);
  }
}
