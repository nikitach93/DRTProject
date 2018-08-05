import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import hiddenbarComponent from './hiddenbar.component';

let hiddenbarModule = angular.module('hiddenbar', [
  uiRouter
])

.component('hiddenbar', hiddenbarComponent);

export default hiddenbarModule;
