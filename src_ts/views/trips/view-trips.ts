import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {customElement, property} from '@polymer/decorators';

@customElement('view-trips')
export class ViewTrips extends PolymerElement {
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
    "?reportId=4ff8b2fc-cdca-426e-aad4-5b9cb49a85fd" +
    "&appId=56089b5f-f2cc-4121-8705-58f981db340f" +
    "&autoAuth=true" +
    "&ctid=77410195-14e1-4fb8-904b-ab1892023667" +
    "&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLW5vcnRoLWV1cm9wZS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCJ9" +
    `&$filter=travels/country_name eq '${country}'`;
      
    this.set('embedSource', embedSource);
  }
}

