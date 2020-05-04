import {PolymerElement, html} from '@polymer/polymer';
import {customElement, property} from '@polymer/decorators';
import {Config} from '../config/config';
import {mapProd} from '../endpoints/power-bi-embeds';

@customElement('view-map')
export class ViewMap extends PolymerElement {
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

  @property({type: String})
  public environment: string = (() => Config._checkEnvironment())()

  public static get observers(): string[] {
    return [
      'setEmbedSource(user)'
    ];
  }

  public setEmbedSource(): void {
    // @ts-ignore
    const country = this.user.country.name;

    const embedSource = mapProd +
    `&$filter=interventionslocations/country_name eq '${country}'`;

    this.set('embedSource', embedSource);
  }
}

