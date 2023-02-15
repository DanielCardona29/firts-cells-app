import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html, css } from 'lit-element';

import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';
import '@bbva-web-components/bbva-list-simple';

import styles from './movement-detail-page-styles.js';

import { getMovementDetail } from '../../scripts/utils/movements-mock.js';

/* eslint-disable new-cap */
class MovementDetailPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'movement-detail-page';
  }

  static get properties() {
    return {
      movementTitle: { type: String },
      items: { type: Array },
    };
  }

  constructor() {
    super();

    this.items = [];
  }

  onPageEnter() {
    this.subscribe('movement_title', (movementTitle) => this.movementTitle = movementTitle);
    getMovementDetail(this.params.id).then((items) => this.items = items);
  }

  onPageLeave() {
    this.items = [];
  }

  get movementDetailItems() {
    if (!this.items.length) {
      return null;
    }

    return this.items.map(({key, value}) => {
      const localizedKey = this.t(key);

      return html`
        <bbva-list-simple  label="${localizedKey}" label-medium description="${value}">
        </bbva-list-simple>
      `;
    });
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
          <bbva-header-main
            icon-left-primary="coronita:return-12"
            accessibility-text-icon-left-primary="Volver"
            text=${this.movementTitle}
            @header-main-icon-left-primary-click=${() => window.history.back()}>
          </bbva-header-main>
        </div>

        <div slot="app__main" class="container">
          ${this.movementDetailItems ? html`${this.movementDetailItems}` : html`<cells-skeleton-loading-page visible></cells-skeleton-loading-page>`}
        </div>
     </cells-template-paper-drawer-panel>`;
  }

  static get styles() {
    return [ styles ];
  }
}

window.customElements.define(MovementDetailPage.is, MovementDetailPage);