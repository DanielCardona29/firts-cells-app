/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`:root {
  --page-bg-color: #5472d3;
  --page-header-color: #5472d3;
}

bbva-header-main {
  --bbva-header-main-bg-color: var(--page-header-color);
}

cells-template-paper-drawer-panel {
  --cells-template-paper-drawer-panel-section-bg: var(--page-bg-color);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container > * {
  margin-top: 10px;
}

.toast-wrapper {
  position: absolute;
  bottom: 0;
}
`;