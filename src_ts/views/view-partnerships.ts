import {PolymerElement, html} from '@polymer/polymer';
import {customElement, property} from '@polymer/decorators';

@customElement('view-partnerships')
export class ViewPartnerships extends PolymerElement {
  public static get template(): HTMLTemplateElement {
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
  public embedSource: string

  @property({type: Object})
  public user: object

  public static get observers(): string[] {
    return [
      'setEmbedSource(user)',
    ];
  }

  public setEmbedSource(): void {
    // @ts-ignore
    const country = this.user.country.name;

    const embedSource = 'https://app.powerbi.com/reportEmbed' +
    '?reportId=d807bd5b-f709-47c2-8e6c-9dbd9a86027f' +
    '&appId=56089b5f-f2cc-4121-8705-58f981db340f' +
    '&autoAuth=true&ctid=77410195-14e1-4fb8-904b-ab1892023667' +
    '&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLW5vcnRoLWV1cm9wZS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCJ9' +
    '&filterPaneEnabled=False' +
    `&$filter=actionpoints/country_name eq '${country}'` +
    ` and interventions/country_name eq '${country}'` +
    ` and partners/country_name eq '${country}'`;

    this.set('embedSource', embedSource);
  }
}

