import template from './hiddenbar.html';
import controller from './hiddenbar.controller';
//import './hiddenbar.styl';

let hiddenbarComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default hiddenbarComponent;