import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html, css } from 'lit-element';

import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';
import '@bbva-web-components/bbva-form-toggle';

//Custom components
import '@bbva-web-components/cells-training-login-ui/cells-training-login-ui';
import '@bbva-web-components/bbva-notification-toast/bbva-notification-toast';
import '@bbva-web-components/cells-traing-tsec-dm/cells-traing-tsec-dm';

import styles from './login-page-styles.js';


import { default as darkModeStyles } from '../../scripts/appDarkMode-themeStyles.js';
import { setDocumentComponentsDarkModeStyles } from '@bbva-web-components/bbva-core-lit-helpers/src/BbvaCoreLitThemeHelpers';

setDocumentComponentsDarkModeStyles([ darkModeStyles ]);

/* eslint-disable new-cap */
class LoginPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'login-page';
  }


  static get properties() {
    return {
      showToast: { type: String },
      toastMessage: { type: String },
      toastType: { type: String },

    };
  }

  constructor() {
    super();

    this.showToast = false;
    this.toastMessage = '';
    this.toastType = '';
  }


  toggleDarkMode() {
    if (document.querySelector(':root').getAttribute('color-scheme-dark') === 'true') {
      document.querySelector(':root').removeAttribute('color-scheme-dark');
    } else {
      document.querySelector(':root').setAttribute('color-scheme-dark', 'true');
    }
  }

  handleClickLoginButton(EventC) {
    const { detail: userInfo } = EventC;

    const _tsec = this.shadowRoot.querySelector('#taining-dm');

    // Inciamos los datos 
    // correct user '1234567890';
    // correct password '112233';

    _tsec.user = userInfo.user;
    _tsec.password = userInfo.password;
    _tsec.consumerId = '10000003';

    _tsec.Login();
  }


  handleTsecSuccess(EventC) {
    const { detail: response } = EventC;

    if (response.statusText === 'OK') {

      this._setToast('success', 'Inicio de session correcto');
      const _tsec = this.shadowRoot.querySelector('#taining-dm');
      
      this.publish('user_name', _tsec.user);
      this.navigate('dashboard');
    } else {
      this._setToast('error', 'Error al iniciar session intente de nuevo por favor');
    }
  }

  handleTsecError() {
    this._setToast('error', 'Error al iniciar session intente de nuevo por favor');
  }


  toastNotification(type, message) {
    const _type = type || this.toastType;
    const _message = message || this.toastMessage;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);

    return html`
    <bbva-notification-toast pusher type="${_type}" show>
      <p>${_message}</p>
    </bbva-notification-toast>
    `;
  }

  _setToast(type = 'success', message = '') {
    this.showToast = true;
    this.toastType = type;
    this.toastMessage = message;
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel mode="seamed" class="login-wrapper">
      
        <div slot="app__header">
          <bbva-header-main text="BBVA">
          </bbva-header-main>
          <bbva-form-toggle label="Theme" radio="" tag-on="🌙" value="night" tag-off="☀️" value-off="day"
            @change=${this.toggleDarkMode}>
          </bbva-form-toggle>
        </div>
      
        <div slot="app__main" class="container">
      
          <!-- controla el llamado a la API -->
          <cells-traing-tsec-dm host="https://artichoke.platform.bbva.com" country="co" id="taining-dm"
            @login-tsec-success=${this.handleTsecSuccess} @login-tsec-error=${this.handleTsecError}>
          </cells-traing-tsec-dm>
      
          <!-- Comporta el login -->
          <cells-training-login-ui @login-button-clicked=${this.handleClickLoginButton}></cells-training-login-ui>
      
          <!-- Comporta el estado de las notificaciones -->
          <div class="toast-wrapper" id="toast-wrapper">
            ${this.showToast ? this.toastNotification() : ''}
          </div>
      
        </div>
      </cells-template-paper-drawer-panel>`;
  }


  static get styles() {
    return [ styles ];
  }
}

window.customElements.define(LoginPage.is, LoginPage);