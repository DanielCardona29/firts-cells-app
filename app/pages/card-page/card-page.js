import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html } from 'lit-element';

import styles from './card-page-styles.js';

import '@training/cells-training-card-dm/cells-training-card-dm'

/* eslint-disable new-cap */
class CardPage extends BbvaCoreIntlMixin(CellsPage) {

  static get properties() {

    return {
      cardId: { type: String },
      userName: { type: String },
      cardDetail: { type: Object }
    };
  }

  constructor() {
    super();
    this.isLoading = false;
    this.cardDetail = {};
  }


  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);

    this._logoutModal = this.shadowRoot.querySelector('#logoutModal');
    if (!this.cardId) this.navigate('dashboard');

    this._getSessionStoragedata();
    this.getCardDetail();
  }


  _getSessionStoragedata() {
    if (this.userName === undefined) this.userName = window.sessionStorage.getItem('user_name');
  }

  onPageEnter() {
    this.subscribe('user_name', (user) => {
      this.userName = user;
      window.sessionStorage.setItem('user_name', this.userName);
    });

    this.subscribe('card_id', (id) => {
      this.cardId = id;
    });

    if (!this.userName) {
      this.userName = window.sessionStorage.getItem('user_name');
    }
  }

  onPageLeave() {
    window.sessionStorage.removeItem('card_id');
  }

  getCardDetail() {

    const _dataManager = this.shadowRoot.querySelector('#dm-cards');
    _dataManager.gerCardDetail(this.cardId);
  }

  cardDetailResponseSuccess(event) {
    const { detail: { response } } = event;
    const data = JSON.parse(response);
    console.log(data)
  }

  cardDetailResponseError(event) {

  }


  render() {

    // console.log(this.userName)
    return html`

    <cells-training-card-dm id="dm-cards" @card-detail-succes=${this.cardDetailResponseSuccess}
      @card-detail-error=${this.cardDetailResponseError}></cells-training-card-dm>
    
    <cells-template-paper-drawer-panel mode="seamed">
      <div slot="app__header">
        <bbva-header-main icon-left-primary="coronita:on" accessibility-text-icon-left-primary="Cerrar Sesión"
          @header-main-icon-left-primary-click=${()=> this._logoutModal.open()}
          icon-right-primary="coronita:help"
          accessibility-text-icon-right-primary="Ayuda"
          @header-main-icon-right-primary-click=${() => this.navigate('help')}
          text=${this.t('dashboard-page.header', '', { name: this.userName })}>
        </bbva-header-main>
      </div>
    
    
    
    
      <bbva-help-modal id="logoutModal" header-icon="coronita:info"
        header-text=${this.t('dashboard-page.logout-modal.header')}
        button-text=${this.t('dashboard-page.logout-modal.button')} @help-modal-footer-button-click=${()=>
        window.cells.logout()}>
        <div slot="slot-content">
          <span>${this.t('dashboard-page.logout-modal.slot')}</span>
        </div>
      </bbva-help-modal>
    
    </cells-template-paper-drawer-panel>`;
  }

  static get styles() {
    return [styles];
  }

  static get is() {
    return 'card-page';
  }
}

window.customElements.define(CardPage.is, CardPage);