import angular from 'angular';
import chatComponent from './chat.component';

const chatModule = angular.module('chat', [])
  .component('chat', chatComponent);
export default chatModule;