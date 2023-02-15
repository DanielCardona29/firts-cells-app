import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';
import '@bbva-web-components/bbva-list-info';
import styles from './help-page-styles.js';

class HelpPage extends CellsPage {
  static get is() {
    return 'help-page';
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
          <bbva-header-main
            text="Made with ❤️ by Cells Team"
            icon-left-primary="coronita:return-12"
            accessibility-text-icon-left-primary="Volver"
            @header-main-icon-left-primary-click=${() => window.history.back()}>
          </bbva-header-main>
        </div>

        <div slot="app__main" class="container">
          <bbva-list-info icon="coronita:communicationpublic">
            <p>
              Aplicación de ejemplo donde se muestran las capacidades de la disciplina y el uso de Cells Bridge como librería de construcción de aplicaciones basadas en Web Components (implementadas en LitElement!)
            </p>
          </bbva-list-info>

          <bbva-list-info icon="coronita:info">
            <ul>
              <li>Construcción de una aplicación utilizando páginas declarativas (y sus hooks!), basadas integramente en LitElement.</li>
              <li>Navegación, paso de parámetros entre páginas.</li>
              <li>Uso de módulos (DataManagers, Utils).</li>
              <li>Creación y reutilización de componentes LitElement (@bbva-web-components)</li>
              <li>¡Incluye proyecto de tests E2E basado en las últimas herramientas de la disciplina! (Cells Pepino V2, Testing Framework)
            </ul>
          </bbva-list-info>
        </div>
     </cells-template-paper-drawer-panel>`;
  }

  static get styles() {
    return [ styles ];
  }
}

window.customElements.define(HelpPage.is, HelpPage);