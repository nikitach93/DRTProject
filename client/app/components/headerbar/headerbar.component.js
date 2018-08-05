import template from './headerbar.html';
import controller from './headerbar.controller';

import './headerbar.css';

let headerbarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default headerbarComponent;