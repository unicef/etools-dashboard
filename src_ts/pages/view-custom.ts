import {PolymerElement, html} from '@polymer/polymer';
import {customElement, property} from '@polymer/decorators';

@customElement('view-custom')
export class ViewCustom extends PolymerElement {
  public static get template(): HTMLTemplateElement {
    return html`
      <style>
        div.container {
          height: 100vh;
          width: 100vw
        }
        #no-embed-msg {
          padding: 24px 48px;
        }
      </style>
      <template is="dom-if" if="{{embedSource.length}}">
        <div class="container">
          <iframe width="100%"
                  height="100%"
                  src="[[embedSource]]"
                  frameborder="0"
                  allowFullScreen="true">
          </iframe>
        </div>
      </template>
      <template is="dom-if" if="{{!embedSource.length}}">
        <div id="no-embed-msg">Ask your workspace administrator to set a custom Power BI embed code.</div>
      </template>
    `;
  }

  @property({type: String})
  public embedSource: string

  @property({type: Object})
  public user: object

  public static get observers(): string[] {
    return [
      'setEmbedSource(user)'
    ];
  }

  public setEmbedSource(): void {
    // @ts-ignore
    const embedSource = this.user.country.custom_dashboards.bi_url;
    this.set('embedSource', embedSource);
  }
}
