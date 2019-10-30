import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {customElement, property} from '@polymer/decorators';

@customElement('view-map')
export class ViewMap extends PolymerElement {
  public static get template() {
    return html`
      <style>
        div.container {
          height: calc(100vh - 242px);
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
    const country = this.user.country.name;

    const embedSource = 'https://app.powerbi.com/reportEmbed' +
    '?reportId=d0902539-8039-439b-9683-bb462ae63cf2' +
    '&appId=56089b5f-f2cc-4121-8705-58f981db340f' +
    '&autoAuth=true' +
    '&ctid=77410195-14e1-4fb8-904b-ab1892023667' +
    '&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLW5vcnRoLWV1cm9wZS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCJ9' +
    `&$filter=interventionslocations/country_name eq '${country}'`;

    this.set('embedSource', embedSource);
  }
}

