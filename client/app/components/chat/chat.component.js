import template from './chat.component.html';
import controller from './chat.controller.js';
import './chat.component.scss';

let chatComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};
export default chatComponent;