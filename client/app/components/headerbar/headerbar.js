import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import headerbarComponent from './headerbar.component';

let headerbarModule = angular.module('headerbar', [
  uiRouter
])

.component('headerbar', headerbarComponent);

export default headerbarModule;
