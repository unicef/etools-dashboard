import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {customElement, property} from '@polymer/decorators';

@customElement('view-map')
export class ViewMap extends PolymerElement {
  static get template() {
    return html`
      <style>
        div.container {
          height: 100vh;
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
  embedSource: string

  @property({type: Object})
  user: object

  static get observers() {
    return [
      'setEmbedSource(user)'
    ];
  }

  setEmbedSource() {
    // @ts-ignore
    let country = this.user.country.name;

    let embedSource = "https://app.powerbi.com/reportEmbed" +
      "?reportId=cb3c63d4-8cf7-42c7-b94d-0950082c68de&appId=2c83563f-d6fc-4ade-9c10-bbca57ed1ece" +
      "&autoAuth=true" +
      "&ctid=77410195-14e1-4fb8-904b-ab1892023667" +
      "&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLW5vcnRoLWV1cm9wZS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCJ9" +
      `&$filter=actionpoints/country_name eq '${country}'` +
      ` and engagement/country_name eq '${country}'` +
      ` and interventions/country_name eq '${country}'` +
      ` and interventions_offices_sections/country_name eq '${country}'` +
      ` and partners/country_name eq '${country}'` +
      ` and partners_interventions/country_name eq '${country}'` +
      ` and travelactivities/country_name eq '${country}'` +
      ` and travels/country_name eq '${country}'`;

    this.set('embedSource', embedSource);
  }
}

