import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html } from 'lit-element';

import '@cells-components/cells-template-paper-drawer-panel';
import '@cells-components/cells-skeleton-loading-page';
import '@bbva-web-components/bbva-help-modal/bbva-help-modal.js';
import '@training/cells-training-card-dm/cells-training-card-dm.js';
import '@training/cells-training-cards-panel-ui/cells-training-cards-panel-ui';
import styles from './dashboard-page-styles.js';

/* eslint-disable new-cap */
class DashboardPage extends BbvaCoreIntlMixin(CellsPage) {

  static get properties() {
    return {
      userName: { type: String },
      isLoadingCards: { type: Boolean },
      cardsList: { type: Object }
    };
  }

  constructor() {
    super();
    this.isLoadingCards = false;
    this.cardsList = {
      data: []
    };
  }


  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);

    this._logoutModal = this.shadowRoot.querySelector('#logoutModal');
    this._getCardsList();
  }

  onPageEnter() {
    //Validacion del tsec
    if(!window.sessionStorage.getItem('tsec')) {
      this.navigate('login');
    }
    
    this.subscribe('user_name', (user) => {
      this.userName = user
      window.sessionStorage.setItem('user_name', this.userName);
    });

    if (!this.userName) {
      this.userName = window.sessionStorage.getItem('user_name');
    }
  }

  _getCardsList() {
    const dataManager = this.shadowRoot.querySelector('cells-training-card-dm');
    this.isLoadingCards = true;
    dataManager && dataManager.getCards();
  }

  cardRequestResponse(event) {
    const { detail: response } = event;

    if (response.statusText === 'OK') {
      const queryResponse = JSON.parse(response.response);
      queryResponse.data = queryResponse.data.map((card) => {

        let status = '';
        switch (card.status.id) {
          case 'BLOCKED':
            status = 'blocked'
            break;
          case 'INOPERATIVE':
            status = 'off'
            break;
          default:
            status = ''
            break;
        }
        return {
          brand: card.brandAssociation.name,
          cardId: card.cardId,
          cardNumber: card.number,
          currentBalance: card.availableBalance.currentBalances[0],
          name: card.alias,
          padingBalance: card.availableBalance.pendingBalances[0],
          status
        }
      })

      this.cardsList = queryResponse;
    } else {
      this.cardsList = {
        data: [],
        apiInfo: {},
        error: true
      }
    }
    this.isLoadingCards = false;
  }

  cardClick(event) {
    const {detail}= event;
    this.publish('card_id', detail);
    this.navigate('card');
  }

  render() {

    // console.log(this.userName)
    return html`

    <cells-training-card-dm id="dm-cards" @request-cards-success=${this.cardRequestResponse}></cells-training-card-dm>
    
    
    
    <cells-template-paper-drawer-panel mode="seamed">
      <div slot="app__header">
        <bbva-header-main icon-left-primary="coronita:on" accessibility-text-icon-left-primary="Cerrar Sesión"
          @header-main-icon-left-primary-click=${() => this._logoutModal.open()}
          icon-right-primary="coronita:help"
          accessibility-text-icon-right-primary="Ayuda"
          @header-main-icon-right-primary-click=${() => this.navigate('help')}
          text=${this.t('dashboard-page.header', '', { name: this.userName })}>
        </bbva-header-main>
      </div>
    
    
    
      <div slot="app__main" class="container">
        <div class="aling-center">
          <h4>Tarjetas de credito</h4>
          <div class="card-wrapper">
            <cells-training-cards-panel-ui .isLoading=${this.isLoadingCards} .cardsList=${this.cardsList.data} @card-click=${this.cardClick}>
            </cells-training-cards-panel-ui>
          </div>
        </div>
    
    
        <bbva-help-modal id="logoutModal" header-icon="coronita:info"
          header-text=${this.t('dashboard-page.logout-modal.header')}
          button-text=${this.t('dashboard-page.logout-modal.button')} @help-modal-footer-button-click=${() =>
           window.cells.logout()}>
          <div slot="slot-content">
            <span>${this.t('dashboard-page.logout-modal.slot')}</span>
          </div>
        </bbva-help-modal>
    
      </div>
    </cells-template-paper-drawer-panel>`;
  }

  static get styles() {
    return [styles];
  }

  static get is() {
    return 'dashboard-page';
  }
}

window.customElements.define(DashboardPage.is, DashboardPage);