import {html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {layoutStyles} from '@unicef-polymer/etools-unicef/src/styles/layout-styles';

@customElement('page-not-found')
export class PageNotFound extends LitElement {
  static get styles() {
    return [layoutStyles];
  }

  render() {
    return html`
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
