import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html } from 'lit-element';

import '@cells-components/cells-template-paper-drawer-panel';
import '@cells-components/cells-skeleton-loading-page';
import '@bbva-web-components/bbva-help-modal/bbva-help-modal.js';

import '@training/cells-training-card-dm/cells-training-card-dm.js';
import '@training/cells-training-cards-panel-ui/cells-training-cards-panel-ui';

import '@training/training-account-dm/training-account-dm';
import '@training/training-panel-accounts-ui/training-panel-accounts-ui';

import styles from './dashboard-page-styles.js';

/* eslint-disable new-cap */
class DashboardPage extends BbvaCoreIntlMixin(CellsPage) {

  static get properties() {
    return {
      userName: { type: String },
      isLoadingCards: { type: Boolean },
      isLoadingAccounst: { type: Boolean },
      cardsList: { type: Object },
      cardsError: { type: Boolean },

      accountsList: { type: Array },
      accountsError: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.isLoadingCards = false;
    this.isLoadingAccounst = false;
    this.accountsList = [];
    this.cardsList = {
      data: [],
      apiInfo: []
    };
  }


  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);

    this._logoutModal = this.shadowRoot.querySelector('#logoutModal');

    //Inicialiazadores para obtaner la data
    this._getCardsList();
    this._getAccounst();
  }

  onPageEnter() {
    //Validacion del tsec
    if (!window.sessionStorage.getItem('tsec')) {
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
    const dataManager = this.shadowRoot.querySelector('#dm-cards');
    this.isLoadingCards = true;
    dataManager && dataManager.getCards();
  }

  _getAccounst() {
    const dataManager = this.shadowRoot.querySelector('#dm-accounts');
    this.isLoadingAccounst = true
    dataManager && dataManager.getAccounts();
  }

  cardRequestResponse(event) {
    const { detail: response } = event;

    if (response.statusText === 'OK') {
      const queryResponse = JSON.parse(response.response);
      queryResponse.data = queryResponse.data.map((card) => {
        return {
          brand: card.brandAssociation.name,
          cardId: card.cardId,
          cardNumber: card.number,
          currentBalance: card.availableBalance.currentBalances[0],
          name: card.alias,
          padingBalance: card.availableBalance.pendingBalances[0],
          status: card.status.id
        }
      })

      this.cardsList = queryResponse;
      console.log(this.cardsList)
    } else {
      this.cardsList = {
        data: [],
        apiInfo: {},
        error: true
      }
    }
    this.isLoadingCards = false;
  }

  accountsGetResponse(event) {
    const { detail: { response }, detail } = event;

    if (detail.statusText !== "OK") {
      this.accountsError = true;
      return;
    };

    const JSONresponse = JSON.parse(response);

    const mapData = JSONresponse.data.map((account) => {
      return {
        title: account.title.id,
        status: account.status.id,
        number: account.number,
        alias: account.alias,
        availableBalance: account.availableBalance,
        accountType: account.accountType.id,
        accountId: account.accountId,
        accountFamily: account.accountFamily.id
      }
    });

    this.accountsList = mapData;
  }

  cardClick(event) {
    this.publish('card_id', event);
    this.navigate('card');
  }

  render() {

    // console.log(this.userName)
    return html`

    <cells-training-card-dm id="dm-cards" @request-cards-success=${this.cardRequestResponse}></cells-training-card-dm>
    <training-account-dm id="dm-accounts" @accounts-success=${this.accountsGetResponse}></training-account-dm>
    
    
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
    
        <div class="panel-wrapper">
    
        <div class=" aling-center accounst-panel">
            <h4>Cuentas</h4>
            ${
              this.accountsList.length > 0
              ?html`<div class="accounts-wrapper"><training-panel-accounts-ui .data=${this.accountsList}></training-panel-accounts-ui></div>`
              :html`<cells-skeleton-loading-page visible class="skeleton"></cells-skeleton-loading-page>`
            }
          </div>


          <div class="aling-center cards-panel">
            <h4>Tarjetas de credito</h4>
            <div class="card-wrapper">
              <cells-training-cards-panel-ui .isLoading=${this.isLoadingCards} .cardsList=${this.cardsList.data}
                @card-click=${this.cardClick}>
              </cells-training-cards-panel-ui>
            </div>
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