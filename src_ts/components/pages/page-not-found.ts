import {PolymerElement, html} from '@polymer/polymer';
import {customElement} from '@polymer/decorators';

@customElement('page-not-found')
export class PageNotFound extends PolymerElement {
  public static get template(): HTMLTemplateElement {
    return html`
      <style>
        div.container {
          height: 100vh;
        }
      </style>
      <div class="container">
        <h2>Oops! You hit a 404</h2>
        <p>
          The page you're looking for doesn't seem to exist. Head back
          <a href="/">home</a> and try again?
        </p>
      </div>
    `;
  }
}
