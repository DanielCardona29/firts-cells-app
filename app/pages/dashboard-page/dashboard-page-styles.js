/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`.card {
  margin-top: 20px;
  margin-bottom: 10px;
}

.aling-center {
  text-align: center;
  width: 50%;
  min-width: 367px;
}

.panel-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: "center";
  width: 100%;
}
.panel-wrapper .cards-panel {
  width: 45%;
  min-width: 367px;
}
.panel-wrapper .cards-panel .card-wrapper {
  width: 100%;
  height: 70.5vh;
  padding-top: 10px;
  padding-bottom: 10px;
  overflow-y: scroll;
  text-align: center;
  min-width: 367px;
}
.panel-wrapper .accounst-panel {
  width: 45%;
  min-width: 367px;
  padding: 20px;
  max-height: 70.5vh;
  overflow-y: hidden;
}
.panel-wrapper .accounst-panel .accounts-wrapper {
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.panel-wrapper .accounst-panel .skeleton {
  width: 100%;
  position: static !important;
  height: 100%;
}
`;